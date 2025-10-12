// Client-Side RAW Processor using wasm-vips
// Alternative approach using libvips WebAssembly which has better RAW support

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

// Wasm-vips RAW Processing Hook
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
      return [];
    }

    setIsProcessing(true);
    const startTime = Date.now();
    
    try {
      // Filter for RAW files only
      const rawFiles = files.filter(isRAWFile);
      if (rawFiles.length === 0) {
        throw new Error('No RAW files found to process');
      }

      const updateProgress = (stage: RAWProcessingProgress['stage'], progress: number, message: string) => {
        const progressData = { stage, progress, message };
        setCurrentProgress(progressData);
        onProgress?.(progressData);
      };

      updateProgress('loading', 5, 'Loading wasm-vips WebAssembly engine...');

      // Dynamic import of wasm-vips
      let Vips: any;
      try {
        Vips = await import('wasm-vips');
        console.log('📦 wasm-vips imported successfully');
      } catch (importError) {
        console.error('❌ Failed to import wasm-vips:', importError);
        throw new Error('Failed to load wasm-vips WebAssembly library. Please ensure wasm-vips is installed.');
      }

      updateProgress('loading', 15, 'Initializing vips processor...');

      // Initialize vips
      const vips = await Vips.Vips();
      console.log('✅ wasm-vips initialized successfully');

      const results: ProcessedRAWResult[] = [];

      // Process each RAW file
      for (let i = 0; i < rawFiles.length; i++) {
        const file = rawFiles[i];
        const fileStartTime = Date.now();
        
        updateProgress('processing', 20 + (i * 60 / rawFiles.length), `Processing ${file.name}...`);

        try {
          console.log(`🔧 Processing ${file.name} (${(file.size / 1024 / 1024).toFixed(1)}MB)`);

          // Read file as ArrayBuffer
          const arrayBuffer = await file.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);

          updateProgress('processing', 25 + (i * 60 / rawFiles.length), `Decoding RAW data for ${file.name}...`);

          // Load RAW image with vips
          let image;
          try {
            // vips can load RAW files directly from buffer
            image = vips.Image.newFromBuffer(uint8Array);
            console.log(`✅ Successfully loaded ${file.name} with vips`);
            console.log(`📊 Image dimensions: ${image.width}x${image.height}, bands: ${image.bands}`);
          } catch (vipsError) {
            console.error(`❌ Failed to load ${file.name} with vips:`, vipsError);
            throw new Error(`Failed to load RAW file ${file.name}: ${vipsError instanceof Error ? vipsError.message : 'Unknown error'}`);
          }

          updateProgress('converting', 40 + (i * 60 / rawFiles.length), `Converting ${file.name} to ${outputFormat.toUpperCase()}...`);

          // Convert to desired output format
          let outputBuffer: Uint8Array;
          try {
            const vipsFormat = outputFormat === 'jpeg' ? '.jpg' : `.${outputFormat}`;
            const options: any = {};

            // Set quality for lossy formats
            if (outputFormat === 'jpeg') {
              options.Q = quality;
            } else if (outputFormat === 'webp') {
              options.Q = quality;
            }

            // Write to buffer
            outputBuffer = image.writeToBuffer(vipsFormat, options);
            console.log(`✅ Successfully converted ${file.name} to ${outputFormat.toUpperCase()}`);
          } catch (conversionError) {
            console.error(`❌ Failed to convert ${file.name}:`, conversionError);
            throw new Error(`Failed to convert ${file.name} to ${outputFormat}: ${conversionError instanceof Error ? conversionError.message : 'Unknown error'}`);
          }

          updateProgress('compressing', 70 + (i * 60 / rawFiles.length), `Finalizing ${file.name}...`);

          // Create blob and download URL
          const outputBlob = new Blob([outputBuffer], { 
            type: outputFormat === 'jpeg' ? 'image/jpeg' : 
                  outputFormat === 'png' ? 'image/png' : 
                  outputFormat === 'webp' ? 'image/webp' :
                  outputFormat === 'avif' ? 'image/avif' :
                  `image/${outputFormat}`
          });

          const downloadUrl = URL.createObjectURL(outputBlob);
          
          // Generate output filename
          const baseName = file.name.replace(/\.[^/.]+$/, '');
          const outputExtension = outputFormat === 'jpeg' ? 'jpg' : outputFormat;

          // Calculate compression ratio and processing time
          const compressionRatio = parseFloat(((file.size - outputBlob.size) / file.size * 100).toFixed(2));
          const processingTime = Date.now() - fileStartTime;

          const result: ProcessedRAWResult = {
            id: `vips_raw_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
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
          console.log(`✅ Completed processing ${file.name} in ${(processingTime / 1000).toFixed(1)}s`);

          // Clean up vips image
          image.delete();

        } catch (fileError) {
          console.error(`❌ Error processing RAW file ${file.name}:`, fileError);
          // Continue with other files instead of failing completely
          const errorMessage = `Failed to process ${file.name}: ${fileError instanceof Error ? fileError.message : 'Unknown error'}`;
          onError?.(errorMessage);
        }
      }

      const totalTime = Date.now() - startTime;
      updateProgress('complete', 100, `Successfully processed ${results.length}/${rawFiles.length} RAW file(s) in ${(totalTime / 1000).toFixed(1)}s`);

      onComplete?.(results);
      return results;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred during RAW processing';
      console.error('❌ RAW processing error:', error);
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

export default useClientRAWProcessor;