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
          const processor = new LibRaw.LibRaw();
          
          // Load the RAW file buffer
          const loadResult = processor.open_buffer(uint8Array);
          if (loadResult !== 0) {
            throw new Error(`LibRaw failed to open file ${file.name} (error code: ${loadResult})`);
          }

          // Unpack the RAW data
          const unpackResult = processor.unpack();
          if (unpackResult !== 0) {
            throw new Error(`LibRaw failed to unpack ${file.name} (error code: ${unpackResult})`);
          }

          updateProgress('converting', 40 + (i * 60 / rawFiles.length), `Converting ${file.name} to RGB...`);

          // Set processing parameters for high quality
          processor.imgdata.params.use_camera_wb = 1;  // Use camera white balance
          processor.imgdata.params.use_auto_wb = 0;    // Disable auto white balance
          processor.imgdata.params.output_color = 1;   // sRGB color space
          processor.imgdata.params.gamma_16bit = 0;    // Use 8-bit gamma
          processor.imgdata.params.no_auto_bright = 1; // Disable auto brightness
          processor.imgdata.params.user_qual = 0;     // High quality interpolation (AHD)
          processor.imgdata.params.four_color_rgb = 0; // Use 3-color RGB
          processor.imgdata.params.highlight = 0;     // Clip highlights
          processor.imgdata.params.use_fuji_rotate = 1; // Handle Fuji rotation

          // Process the RAW data
          const processResult = processor.dcraw_process();
          if (processResult !== 0) {
            throw new Error(`LibRaw processing failed for ${file.name} (error code: ${processResult})`);
          }

          // Get the processed image data
          const imageData = processor.dcraw_make_mem_image();
          if (!imageData) {
            throw new Error(`Failed to generate image data for ${file.name}`);
          }

          updateProgress('converting', 55 + (i * 60 / rawFiles.length), `Creating ${outputFormat.toUpperCase()} from ${file.name}...`);

          // Create canvas for format conversion
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            throw new Error('Failed to create canvas context');
          }

          // Set canvas dimensions
          canvas.width = imageData.width;
          canvas.height = imageData.height;

          // Create ImageData from LibRaw processed data
          const canvasImageData = ctx.createImageData(imageData.width, imageData.height);
          
          // LibRaw returns RGB data, convert to RGBA for canvas
          const rgbData = imageData.data;
          const rgbaData = canvasImageData.data;
          
          for (let pixel = 0; pixel < imageData.width * imageData.height; pixel++) {
            const rgbIndex = pixel * 3;
            const rgbaIndex = pixel * 4;
            
            rgbaData[rgbaIndex] = rgbData[rgbIndex];         // R
            rgbaData[rgbaIndex + 1] = rgbData[rgbIndex + 1]; // G
            rgbaData[rgbaIndex + 2] = rgbData[rgbIndex + 2]; // B
            rgbaData[rgbaIndex + 3] = 255;                   // A (fully opaque)
          }

          // Put image data on canvas
          ctx.putImageData(canvasImageData, 0, 0);

          // Clean up LibRaw processor
          processor.recycle();

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