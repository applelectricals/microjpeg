// Client-Side RAW Processor using WebAssembly
// Inspired by Picflow.com's approach for browser-based RAW conversion

import { useState, useCallback } from 'react';

interface RAWFile {
  file: File;
  format: string;
}

interface ProcessedRAWResult {
  id: string;
  originalName: string;
  originalSize: number;
  processedSize: number;
  compressionRatio: number;
  downloadUrl: string;
  originalFormat: string;
  outputFormat: string;
  wasConverted: boolean;
  processingTime: number;
  processedClientSide: true;
}

interface RAWProcessingProgress {
  stage: 'loading' | 'processing' | 'converting' | 'compressing' | 'complete';
  progress: number;
  message: string;
}

interface ClientRAWProcessorProps {
  onComplete: (results: ProcessedRAWResult[]) => void;
  onProgress: (progress: RAWProcessingProgress) => void;
  onError: (error: string) => void;
  outputFormat: 'jpeg' | 'png' | 'webp' | 'avif' | 'tiff';
  quality: number;
}

// RAW file format detection
const RAW_FORMATS = {
  'cr2': 'Canon RAW',
  'cr3': 'Canon RAW',
  'crw': 'Canon RAW',
  'nef': 'Nikon RAW',
  'arw': 'Sony RAW', 
  'dng': 'Adobe DNG',
  'orf': 'Olympus RAW',
  'raf': 'Fujifilm RAW',
  'rw2': 'Panasonic RAW',
  '3fr': 'Hasselblad RAW',
  'dcr': 'Kodak RAW',
  'erf': 'Epson RAW',
  'fff': 'Imacon RAW',
  'mrw': 'Minolta RAW',
  'pef': 'Pentax RAW',
  'x3f': 'Sigma RAW'
};

export function useClientRAWProcessor({
  onComplete,
  onProgress,
  onError,
  outputFormat,
  quality
}: ClientRAWProcessorProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [dcrawModule, setDcrawModule] = useState<any>(null);

  // Load dcraw WebAssembly module
  const loadDcrawModule = useCallback(async () => {
    try {
      onProgress({ stage: 'loading', progress: 0, message: 'Loading RAW processing engine...' });
      
      // Import dcraw module
      const dcraw = await import('dcraw');
      setDcrawModule(dcraw);
      
      onProgress({ stage: 'loading', progress: 100, message: 'RAW processing engine loaded' });
      return dcraw;
    } catch (error) {
      console.error('Failed to load dcraw module:', error);
      onError('Failed to load RAW processing engine. Please refresh and try again.');
      return null;
    }
  }, [onProgress, onError]);

  // Detect if file is RAW format
  const isRAWFile = useCallback((file: File): boolean => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    return extension ? extension in RAW_FORMATS : false;
  }, []);

  // Get RAW format info
  const getRAWFormat = useCallback((file: File): string => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    return extension ? RAW_FORMATS[extension as keyof typeof RAW_FORMATS] || 'Unknown RAW' : 'Unknown';
  }, []);

  // Process single RAW file using dcraw
  const processRAWFile = useCallback(async (
    file: File,
    dcraw: any,
    outputFormat: string,
    quality: number
  ): Promise<ProcessedRAWResult> => {
    const startTime = Date.now();
    
    try {
      // Update progress
      onProgress({ 
        stage: 'processing', 
        progress: 10, 
        message: `Processing ${file.name}...` 
      });

      // Read RAW file as ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      onProgress({ 
        stage: 'processing', 
        progress: 30, 
        message: 'Decoding RAW data...' 
      });

      // Process with dcraw to get RGB data
      const dcrawOptions = {
        exportAsTiff: true,
        use16BitLinearMode: false,
        useExportMode: true,
        noAutoBrightness: false,
        verbose: false
      };

      const tiffBuffer = dcraw(uint8Array, dcrawOptions);
      
      if (!tiffBuffer || tiffBuffer.length === 0) {
        throw new Error('Failed to process RAW file - empty result');
      }

      onProgress({ 
        stage: 'converting', 
        progress: 60, 
        message: 'Converting to output format...' 
      });

      // Convert TIFF to desired output format using Canvas API
      const processedBlob = await convertTiffToFormat(tiffBuffer, outputFormat, quality);

      onProgress({ 
        stage: 'compressing', 
        progress: 90, 
        message: 'Optimizing file size...' 
      });

      // Calculate compression ratio based on uncompressed TIFF size
      const baselineSize = tiffBuffer.length; // Uncompressed TIFF size
      const finalSize = processedBlob.size;
      const compressionRatio = Math.round(((baselineSize - finalSize) / baselineSize) * 100);

      // Create download URL
      const downloadUrl = URL.createObjectURL(processedBlob);
      
      const processingTime = Date.now() - startTime;

      onProgress({ 
        stage: 'complete', 
        progress: 100, 
        message: `${file.name} processed successfully` 
      });

      return {
        id: `raw_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        originalName: file.name,
        originalSize: baselineSize, // Use TIFF baseline for display
        processedSize: finalSize,
        compressionRatio: Math.max(0, compressionRatio), // Ensure non-negative
        downloadUrl,
        originalFormat: getRAWFormat(file),
        outputFormat: outputFormat.toUpperCase(),
        wasConverted: true,
        processingTime,
        processedClientSide: true
      };

    } catch (error) {
      console.error(`RAW processing failed for ${file.name}:`, error);
      throw new Error(`Failed to process ${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [onProgress, getRAWFormat]);

  // Convert TIFF buffer to desired format using Canvas
  const convertTiffToFormat = useCallback(async (
    tiffBuffer: Uint8Array,
    outputFormat: string,
    quality: number
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      try {
        // Create a blob URL from TIFF data
        const tiffBlob = new Blob([tiffBuffer], { type: 'image/tiff' });
        const tiffUrl = URL.createObjectURL(tiffBlob);

        // Create image element to load TIFF
        const img = new Image();
        img.onload = () => {
          try {
            // Create canvas and draw image
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            if (!ctx) {
              reject(new Error('Failed to get canvas context'));
              return;
            }

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // Convert to desired format
            const mimeType = getMimeType(outputFormat);
            const qualityValue = outputFormat === 'jpeg' ? quality / 100 : undefined;

            canvas.toBlob((blob) => {
              URL.revokeObjectURL(tiffUrl); // Clean up
              
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Failed to convert image to blob'));
              }
            }, mimeType, qualityValue);

          } catch (error) {
            URL.revokeObjectURL(tiffUrl);
            reject(error);
          }
        };

        img.onerror = () => {
          URL.revokeObjectURL(tiffUrl);
          reject(new Error('Failed to load TIFF image'));
        };

        img.src = tiffUrl;

      } catch (error) {
        reject(error);
      }
    });
  }, []);

  // Get MIME type for output format
  const getMimeType = useCallback((format: string): string => {
    switch (format.toLowerCase()) {
      case 'jpeg': return 'image/jpeg';
      case 'png': return 'image/png';
      case 'webp': return 'image/webp';
      case 'avif': return 'image/avif';
      case 'tiff': return 'image/tiff';
      default: return 'image/jpeg';
    }
  }, []);

  // Main processing function
  const processRAWFiles = useCallback(async (files: File[]): Promise<void> => {
    if (isProcessing) return;

    setIsProcessing(true);
    
    try {
      // Filter RAW files
      const rawFiles = files.filter(isRAWFile);
      
      if (rawFiles.length === 0) {
        onError('No RAW files detected in selection');
        return;
      }

      // Load dcraw module if not already loaded
      let dcraw = dcrawModule;
      if (!dcraw) {
        dcraw = await loadDcrawModule();
        if (!dcraw) return;
      }

      const results: ProcessedRAWResult[] = [];

      // Process each RAW file
      for (let i = 0; i < rawFiles.length; i++) {
        const file = rawFiles[i];
        
        try {
          const result = await processRAWFile(file, dcraw, outputFormat, quality);
          results.push(result);
        } catch (error) {
          console.error(`Failed to process ${file.name}:`, error);
          // Continue with other files, don't fail entire batch
          onError(`Failed to process ${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }

      // Return results
      if (results.length > 0) {
        onComplete(results);
      }

    } catch (error) {
      console.error('RAW processing failed:', error);
      onError(`RAW processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, dcrawModule, loadDcrawModule, processRAWFile, outputFormat, quality, isRAWFile, onComplete, onError]);

  return {
    processRAWFiles,
    isProcessing,
    isRAWFile,
    getRAWFormat,
    supportedFormats: Object.keys(RAW_FORMATS)
  };
}

export { RAW_FORMATS };