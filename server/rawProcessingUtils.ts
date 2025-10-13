/**
 * Robust RAW Processing Result Interface
 * Based on analysis of leading RAW converters (Picflow, CloudConvert, Raw.pics.io)
 */

export interface ProcessingResult {
  success: boolean;
  originalSize: number;
  processedSize: number;
  compressionRatio: number;
  qualityAchieved: number;
  processingMethod: 'dcraw' | 'imagemagick' | 'sharp' | 'libraw' | 'wasm';
  metadata?: {
    width: number;
    height: number;
    colorSpace: string;
    camera?: string;
    format: string;
  };
  timing?: {
    processingTime: number;
    method: string;
  };
}

export interface QualityPreset {
  name: string;
  quality: number;
  compression: 'lossless' | 'high' | 'balanced' | 'web-optimized';
  maxWidth?: number;
  maxHeight?: number;
  description: string;
}

export const QUALITY_PRESETS: Record<string, QualityPreset> = {
  thumbnail: {
    name: 'Thumbnail',
    quality: 60,
    compression: 'web-optimized',
    maxWidth: 400,
    maxHeight: 400,
    description: 'Small preview images for web galleries'
  },
  web: {
    name: 'Web Optimized',
    quality: 80,
    compression: 'balanced',
    maxWidth: 1920,
    maxHeight: 1080,
    description: 'Optimized for web display and social media'
  },
  print: {
    name: 'Print Quality',
    quality: 95,
    compression: 'high',
    maxWidth: 4000,
    maxHeight: 4000,
    description: 'High quality for printing and professional use'
  },
  archive: {
    name: 'Archive Quality',
    quality: 100,
    compression: 'lossless',
    description: 'Maximum quality preservation (current default)'
  }
};

/**
 * Validates and normalizes processing results to prevent NaN values
 * Implements industry-standard validation patterns
 */
export function validateProcessingResult(result: any, originalFileSize: number): ProcessingResult {
  console.log('🔍 Validating processing result:', result);
  
  if (!result || typeof result !== 'object') {
    throw new Error('Invalid processing result structure');
  }
  
  // Extract file sizes with multiple fallback properties
  const processedSize = Number(
    result.processedSize || 
    result.finalSize || 
    result.outputSize || 
    result.compressedSize ||
    0
  );
  
  const originalSize = Number(originalFileSize) || 0;
  
  // Validate sizes are positive numbers
  if (originalSize <= 0) {
    throw new Error(`Invalid original file size: ${originalSize}`);
  }
  
  if (processedSize <= 0) {
    throw new Error(`Invalid processed file size: ${processedSize}`);
  }
  
  // Calculate compression ratio safely
  let compressionRatio = 0;
  if (originalSize > 0 && processedSize > 0) {
    compressionRatio = Math.round(
      ((originalSize - processedSize) / originalSize) * 100
    );
    
    // Clamp compression ratio to realistic bounds
    compressionRatio = Math.max(-500, Math.min(100, compressionRatio));
  }
  
  const validated: ProcessingResult = {
    success: Boolean(result.success !== false), // Default to true if not specified
    originalSize,
    processedSize,
    compressionRatio,
    qualityAchieved: Number(result.qualityUsed || result.quality || 100),
    processingMethod: result.method || result.processingMethod || 'dcraw',
    metadata: result.metadata || undefined,
    timing: result.timing || undefined
  };
  
  // Final NaN validation
  const numericFields = ['originalSize', 'processedSize', 'compressionRatio', 'qualityAchieved'];
  for (const field of numericFields) {
    const value = validated[field as keyof ProcessingResult] as number;
    if (typeof value === 'number' && (isNaN(value) || !isFinite(value))) {
      console.error(`❌ Invalid ${field}: ${value}`);
      throw new Error(`Invalid numeric value for ${field}: ${value}`);
    }
  }
  
  console.log('✅ Validation successful:', validated);
  return validated;
}

/**
 * RAW Processing Error with specific error codes and suggestions
 */
export class RAWProcessingError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly originalError?: Error,
    public readonly suggestedAction?: string
  ) {
    super(message);
    this.name = 'RAWProcessingError';
  }
}

export const RAW_ERROR_CODES = {
  UNSUPPORTED_FORMAT: 'RAW_001',
  CORRUPTED_FILE: 'RAW_002', 
  PROCESSING_TIMEOUT: 'RAW_003',
  INSUFFICIENT_MEMORY: 'RAW_004',
  INVALID_PARAMETERS: 'RAW_005',
  NAN_CALCULATION: 'RAW_006',
  FILE_TOO_LARGE: 'RAW_007',
  DCRAW_FAILED: 'RAW_008'
};

/**
 * Safe arithmetic operations to prevent NaN propagation
 */
export class SafeMath {
  static divide(numerator: number, denominator: number, defaultValue = 0): number {
    if (!isFinite(numerator) || !isFinite(denominator) || denominator === 0) {
      return defaultValue;
    }
    const result = numerator / denominator;
    return isFinite(result) ? result : defaultValue;
  }
  
  static multiply(a: number, b: number, defaultValue = 0): number {
    if (!isFinite(a) || !isFinite(b)) {
      return defaultValue;
    }
    const result = a * b;
    return isFinite(result) ? result : defaultValue;
  }
  
  static percentage(part: number, total: number): number {
    return this.multiply(this.divide(part, total, 0), 100, 0);
  }
  
  static compressionRatio(original: number, compressed: number): number {
    if (original <= 0 || compressed < 0) return 0;
    return Math.round(this.percentage(original - compressed, original));
  }
}

/**
 * Enhanced file size utilities with validation
 */
export class FileSizeUtils {
  static async getFileSizeWithValidation(filePath: string): Promise<number> {
    try {
      const fs = await import('fs/promises');
      const stats = await fs.stat(filePath);
      
      if (!stats.isFile()) {
        throw new RAWProcessingError(
          `Path is not a file: ${filePath}`,
          RAW_ERROR_CODES.INVALID_PARAMETERS
        );
      }
      
      const size = stats.size;
      if (!isFinite(size) || size < 0) {
        throw new RAWProcessingError(
          `Invalid file size: ${size}`,
          RAW_ERROR_CODES.CORRUPTED_FILE
        );
      }
      
      return size;
    } catch (error) {
      if (error instanceof RAWProcessingError) throw error;
      
      throw new RAWProcessingError(
        `Failed to get file size for ${filePath}`,
        RAW_ERROR_CODES.CORRUPTED_FILE,
        error as Error,
        'Verify file exists and is accessible'
      );
    }
  }
  
  static formatFileSize(bytes: number): string {
    if (!isFinite(bytes) || bytes < 0) return '0 B';
    
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  }
}