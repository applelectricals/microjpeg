// Hybrid Processing Router - Routes RAW files to client-side, regular images to server
// Implements the Picflow.com strategy of client-side RAW processing only

import { useState, useCallback } from 'react';
import { useClientRAWProcessor } from './client-raw-processor-libraw';

interface ProcessingResult {
  id: string;
  originalName: string;
  originalSize: number;
  compressedSize?: number;
  processedSize?: number;
  compressionRatio: number;
  downloadUrl: string;
  originalFormat: string;
  outputFormat: string;
  wasConverted: boolean;
  processingTime?: number;
  processedClientSide?: boolean;
  previewUrl?: string;
}

interface ProcessingProgress {
  stage: string;
  progress: number;
  message: string;
  currentFile?: string;
  totalFiles?: number;
  processedFiles?: number;
}

interface HybridProcessorProps {
  onComplete: (results: ProcessingResult[]) => void;
  onProgress: (progress: ProcessingProgress) => void;
  onError: (error: string) => void;
  outputFormat: 'jpeg' | 'png' | 'webp' | 'avif' | 'tiff';
  quality: number;
  settings?: any; // Server processing settings
}

export function useHybridProcessor({
  onComplete,
  onProgress,
  onError,
  outputFormat,
  quality,
  settings = {}
}: HybridProcessorProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedResults, setProcessedResults] = useState<ProcessingResult[]>([]);

  // Client-side RAW processor
  const rawProcessor = useClientRAWProcessor({
    onComplete: (rawResults) => {
      // Convert RAW results to unified format
      const unifiedResults: ProcessingResult[] = rawResults.map(result => ({
        id: result.id,
        originalName: result.originalName,
        originalSize: result.originalSize,
        compressedSize: result.processedSize,
        compressionRatio: result.compressionRatio,
        downloadUrl: result.downloadUrl,
        originalFormat: result.originalFormat,
        outputFormat: result.outputFormat,
        wasConverted: result.wasConverted,
        processingTime: result.processingTime,
        processedClientSide: true
      }));
      
      // Add to results
      setProcessedResults(prev => [...prev, ...unifiedResults]);
    },
    onProgress: (rawProgress) => {
      onProgress({
        stage: `Client-side RAW: ${rawProgress.stage}`,
        progress: rawProgress.progress,
        message: rawProgress.message
      });
    },
    onError: onError,
    outputFormat,
    quality
  });

  // Detect file types
  const categorizeFiles = useCallback((files: File[]) => {
    const rawFiles: File[] = [];
    const regularFiles: File[] = [];

    files.forEach(file => {
      if (rawProcessor.isRAWFile(file)) {
        rawFiles.push(file);
      } else {
        regularFiles.push(file);
      }
    });

    return { rawFiles, regularFiles };
  }, [rawProcessor]);

  // Process regular files on server (existing logic)
  const processRegularFiles = useCallback(async (files: File[]): Promise<ProcessingResult[]> => {
    if (files.length === 0) return [];

    try {
      onProgress({
        stage: 'Server Processing',
        progress: 0,
        message: `Processing ${files.length} regular image${files.length > 1 ? 's' : ''} on server...`
      });

      // Create FormData for server upload
      const formData = new FormData();
      files.forEach(file => formData.append('files', file));
      
      // Add processing settings
      formData.append('outputFormat', outputFormat);
      formData.append('quality', quality.toString());
      
      // Add other settings
      Object.entries(settings).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });

      onProgress({
        stage: 'Server Processing',
        progress: 30,
        message: 'Uploading to server...'
      });

      // Upload to server endpoint
      const response = await fetch('/api/compress-files', {
        method: 'POST',
        body: formData
      });

      onProgress({
        stage: 'Server Processing',
        progress: 80,
        message: 'Server processing complete...'
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const serverResults = await response.json();

      onProgress({
        stage: 'Server Processing',
        progress: 100,
        message: 'Server processing complete'
      });

      // Convert server results to unified format
      return serverResults.results || [];

    } catch (error) {
      console.error('Server processing failed:', error);
      throw new Error(`Server processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [outputFormat, quality, settings, onProgress]);

  // Main hybrid processing function
  const processFiles = useCallback(async (files: File[]): Promise<void> => {
    if (isProcessing) return;

    setIsProcessing(true);
    setProcessedResults([]);

    try {
      const { rawFiles, regularFiles } = categorizeFiles(files);
      
      console.log(`🎯 Hybrid Processing: ${rawFiles.length} RAW files (client-side), ${regularFiles.length} regular files (server-side)`);

      const allResults: ProcessingResult[] = [];

      // Process RAW files client-side (if any)
      if (rawFiles.length > 0) {
        onProgress({
          stage: 'Client-side RAW Processing',
          progress: 0,
          message: `Processing ${rawFiles.length} RAW file${rawFiles.length > 1 ? 's' : ''} in browser...`,
          totalFiles: files.length,
          processedFiles: 0
        });

        await rawProcessor.processRAWFiles(rawFiles);
        // Results will be added via rawProcessor.onComplete callback
      }

      // Process regular files on server (if any)
      if (regularFiles.length > 0) {
        onProgress({
          stage: 'Server Processing',
          progress: 0,
          message: `Processing ${regularFiles.length} regular file${regularFiles.length > 1 ? 's' : ''} on server...`,
          totalFiles: files.length,
          processedFiles: rawFiles.length
        });

        const serverResults = await processRegularFiles(regularFiles);
        allResults.push(...serverResults);
      }

      // Wait a moment for any pending client-side results
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Combine all results
      const finalResults = [...processedResults, ...allResults];
      
      onProgress({
        stage: 'Complete',
        progress: 100,
        message: `Successfully processed ${finalResults.length} file${finalResults.length > 1 ? 's' : ''}`,
        totalFiles: files.length,
        processedFiles: finalResults.length
      });

      // Return final results
      onComplete(finalResults);

    } catch (error) {
      console.error('Hybrid processing failed:', error);
      onError(`Processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, categorizeFiles, rawProcessor, processRegularFiles, processedResults, onProgress, onComplete, onError]);

  // Get processing info
  const getProcessingInfo = useCallback((files: File[]) => {
    const { rawFiles, regularFiles } = categorizeFiles(files);
    
    return {
      totalFiles: files.length,
      rawFiles: rawFiles.length,
      regularFiles: regularFiles.length,
      rawFormats: rawFiles.map(f => rawProcessor.getRAWFormat(f)),
      clientSideProcessing: rawFiles.length > 0,
      serverSideProcessing: regularFiles.length > 0
    };
  }, [categorizeFiles, rawProcessor]);

  return {
    processFiles,
    isProcessing,
    getProcessingInfo,
    supportedRAWFormats: Object.keys(RAW_FORMATS),
    isRAWFile: rawProcessor.isRAWFile
  };
}

export type { ProcessingResult, ProcessingProgress };