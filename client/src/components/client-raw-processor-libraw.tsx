// Client-Side RAW Processor using LibRaw WebAssembly
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
  'x3f': 'Sigma RAW',
  'raw': 'Generic RAW'
} as const;

export function isRAWFile(file: File): boolean {
  const extension = file.name.split('.').pop()?.toLowerCase();
  return extension ? Object.keys(RAW_FORMATS).includes(extension) : false;
}

export function getRAWFormat(file: File): string {
  const extension = file.name.split('.').pop()?.toLowerCase() as keyof typeof RAW_FORMATS;
  return RAW_FORMATS[extension] || 'Unknown RAW';
}

// LibRaw WebAssembly RAW Processing Hook
export function useClientRAWProcessor() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentProgress, setCurrentProgress] = useState<RAWProcessingProgress>({
    stage: 'loading',
    progress: 0,
    message: ''
  });

  const processRAWFiles = useCallback(async (
    files: File[],
    outputFormat: 'jpeg' | 'png' | 'webp' | 'avif' | 'tiff' = 'jpeg',
    quality: number = 85,
    onProgress?: (progress: RAWProcessingProgress) => void,
    onComplete?: (results: ProcessedRAWResult[]) => void,
    onError?: (error: string) => void
  ) => {
    if (files.length === 0) {
      onError?.('No files to process');
      return;
    }

    setIsProcessing(true);
    const startTime = Date.now();
    
    try {
      // Filter for RAW files only
      const rawFiles = files.filter(isRAWFile);
      if (rawFiles.length === 0) {
        throw new Error('No RAW files found to process');
      }

      // Update progress: Loading RAW processor
      const updateProgress = (stage: RAWProcessingProgress['stage'], progress: number, message: string) => {
        const progressData = { stage, progress, message };
        setCurrentProgress(progressData);
        onProgress?.(progressData);
      };

      updateProgress('loading', 5, 'Loading LibRaw WebAssembly engine...');

      // Dynamic import of libraw-wasm
      let LibRaw: any;
      try {
        LibRaw = await import('libraw-wasm');
      } catch (importError) {
        throw new Error('Failed to load LibRaw WebAssembly library. Please ensure libraw-wasm is installed.');
      }

      updateProgress('loading', 15, 'Initializing RAW processor...');

      const results: ProcessedRAWResult[] = [];

      // Process each RAW file
      for (let i = 0; i < rawFiles.length; i++) {
        const file = rawFiles[i];
        const fileStartTime = Date.now();
        
        updateProgress('processing', 20 + (i * 60 / rawFiles.length), `Processing ${file.name}...`);

        try {
          // Read file as ArrayBuffer
          const arrayBuffer = await file.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);

          updateProgress('processing', 25 + (i * 60 / rawFiles.length), `Decoding RAW data for ${file.name}...`);

          // Initialize LibRaw processor
          const processor = new LibRaw.default();
          
          // Start with minimal settings for compatibility
          const settings = {
            halfSize: false,        // Full resolution
            useCameraWb: true,      // Use camera white balance
            outputColor: 1,         // sRGB colorspace
            outputBps: 8,           // 8 bits per sample
            userQual: 3,            // interpolation quality (0-12)
            highlight: 0,           // clip highlights
            bright: 1.0,            // brightness
            noAutoBright: false     // allow auto brightness
          };

          console.log(`🔧 Processing ${file.name} (${(file.size / 1024 / 1024).toFixed(1)}MB)`);

          // Open the RAW file with minimal settings first
          try {
            await processor.open(uint8Array, settings);
            console.log(`✅ Successfully opened ${file.name}`);
          } catch (openError) {
            console.error(`❌ Failed to open ${file.name}:`, openError);
            // Try with no settings as fallback
            try {
              await processor.open(uint8Array);
              console.log(`✅ Successfully opened ${file.name} with default settings`);
            } catch (fallbackError) {
              console.error(`❌ Failed to open ${file.name} even with default settings:`, fallbackError);
              throw new Error(`Failed to open RAW file ${file.name}. This file format may not be supported or the file may be corrupted.`);
            }
          }

          updateProgress('converting', 40 + (i * 60 / rawFiles.length), `Converting ${file.name} to RGB...`);

          // Get metadata first to check if file was processed correctly
          let metadata;
          try {
            metadata = await processor.metadata();
            console.log(`📊 Metadata for ${file.name}:`, {
              width: metadata?.width,
              height: metadata?.height,
              iso: metadata?.iso_speed,
              desc: metadata?.desc
            });
          } catch (metadataError) {
            console.error(`❌ Failed to get metadata for ${file.name}:`, metadataError);
            throw new Error(`Failed to get metadata for ${file.name}: ${metadataError instanceof Error ? metadataError.message : 'Unknown error'}`);
          }

          if (!metadata || !metadata.width || !metadata.height) {
            throw new Error(`Invalid metadata for ${file.name}: width=${metadata?.width}, height=${metadata?.height}`);
          }

          // Get the decoded image data (RGB pixels)
          let imageData;
          try {
            imageData = await processor.imageData();
            console.log(`🎨 Image data for ${file.name}:`, {
              length: imageData?.length,
              expectedLength: metadata.width * metadata.height * 3,
              type: typeof imageData
            });
          } catch (imageDataError) {
            console.error(`❌ Failed to get image data for ${file.name}:`, imageDataError);
            throw new Error(`Failed to decode image data for ${file.name}: ${imageDataError instanceof Error ? imageDataError.message : 'Unknown error'}`);
          }
          
          if (!imageData || !imageData.length) {
            throw new Error(`No image data returned for ${file.name} (length: ${imageData?.length || 0})`);
          }

          const expectedDataLength = metadata.width * metadata.height * 3; // RGB = 3 bytes per pixel
          if (imageData.length !== expectedDataLength) {
            console.warn(`⚠️ Image data length mismatch for ${file.name}: got ${imageData.length}, expected ${expectedDataLength}`);
          }

          updateProgress('converting', 55 + (i * 60 / rawFiles.length), `Creating ${outputFormat.toUpperCase()} from ${file.name}...`);

          // Create canvas for format conversion
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            throw new Error('Failed to create canvas context');
          }

          // Set canvas dimensions
          canvas.width = metadata.width;
          canvas.height = metadata.height;

          // Create ImageData from LibRaw processed data
          const canvasImageData = ctx.createImageData(metadata.width, metadata.height);
          
          // LibRaw returns RGB data as Uint8Array, convert to RGBA for canvas
          const rgbData = imageData;
          const rgbaData = canvasImageData.data;
          
          for (let pixel = 0; pixel < metadata.width * metadata.height; pixel++) {
            const rgbIndex = pixel * 3;
            const rgbaIndex = pixel * 4;
            
            rgbaData[rgbaIndex] = rgbData[rgbIndex];         // R
            rgbaData[rgbaIndex + 1] = rgbData[rgbIndex + 1]; // G
            rgbaData[rgbaIndex + 2] = rgbData[rgbIndex + 2]; // B
            rgbaData[rgbaIndex + 3] = 255;                   // A (fully opaque)
          }

          // Put image data on canvas
          ctx.putImageData(canvasImageData, 0, 0);

          updateProgress('compressing', 70 + (i * 60 / rawFiles.length), `Compressing ${file.name} as ${outputFormat.toUpperCase()}...`);

          // Convert canvas to desired output format
          const mimeType = {
            'jpeg': 'image/jpeg',
            'png': 'image/png', 
            'webp': 'image/webp',
            'avif': 'image/avif',
            'tiff': 'image/tiff'
          }[outputFormat] || 'image/jpeg';

          const outputBlob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob((blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error(`Failed to create ${outputFormat} blob from ${file.name}`));
              }
            }, mimeType, quality / 100);
          });

          // Create download URL
          const downloadUrl = URL.createObjectURL(outputBlob);
          
          // Generate output filename
          const baseName = file.name.replace(/\.[^/.]+$/, '');
          const outputExtension = outputFormat === 'jpeg' ? 'jpg' : outputFormat;
          const outputName = `${baseName}_converted.${outputExtension}`;

          // Calculate compression ratio and processing time
          const compressionRatio = parseFloat(((file.size - outputBlob.size) / file.size * 100).toFixed(2));
          const processingTime = Date.now() - fileStartTime;

          const result: ProcessedRAWResult = {
            id: `raw_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            originalName: file.name,
            originalSize: file.size,
            processedSize: outputBlob.size,
            compressionRatio: Math.max(0, compressionRatio), // Ensure non-negative
            downloadUrl,
            originalFormat: getRAWFormat(file),
            outputFormat: outputFormat.toUpperCase(),
            wasConverted: true,
            processingTime,
            processedClientSide: true
          };

          results.push(result);

        } catch (fileError) {
          console.error(`Error processing RAW file ${file.name}:`, fileError);
          // Continue with other files instead of failing completely
          onError?.(`Failed to process ${file.name}: ${fileError instanceof Error ? fileError.message : 'Unknown error'}`);
        }
      }

      updateProgress('complete', 100, `Successfully processed ${results.length} RAW file(s) in ${((Date.now() - startTime) / 1000).toFixed(1)}s`);

      onComplete?.(results);
      return results;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred during RAW processing';
      console.error('RAW processing error:', error);
      onError?.(errorMessage);
      setCurrentProgress({
        stage: 'loading',
        progress: 0,
        message: 'Processing failed'
      });
      return [];
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return {
    processRAWFiles,
    isProcessing,
    currentProgress,
    isRAWFile,
    getRAWFormat
  };
}

// React Component for Client-Side RAW Processing
export function ClientRAWProcessor({ 
  onComplete, 
  onProgress, 
  onError, 
  outputFormat = 'jpeg', 
  quality = 85 
}: ClientRAWProcessorProps) {
  const { processRAWFiles, isProcessing, currentProgress } = useClientRAWProcessor();

  const handleFileProcessing = useCallback(async (files: File[]) => {
    await processRAWFiles(files, outputFormat, quality, onProgress, onComplete, onError);
  }, [processRAWFiles, outputFormat, quality, onProgress, onComplete, onError]);

  return {
    processFiles: handleFileProcessing,
    isProcessing,
    progress: currentProgress
  };
}

export default ClientRAWProcessor;