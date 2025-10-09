// File caching service for optimization
// Stores uploaded files temporarily to avoid re-uploading for format conversions

interface CachedFile {
  originalPath: string;
  originalName: string;
  mimetype: string;
  size: number;
  uploadedAt: Date;
  sessionId: string;
  fileHash: string; // To identify duplicate files
}

interface FileCache {
  [fileId: string]: CachedFile;
}

class FileCacheService {
  private cache: FileCache = {};
  private readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
  private readonly MAX_CACHE_SIZE = 100; // Maximum number of cached files

  // Clean up expired files periodically
  constructor() {
    setInterval(() => this.cleanupExpiredFiles(), 5 * 60 * 1000); // Every 5 minutes
  }

  /**
   * Store a file in cache and return cache ID
   */
  cacheFile(file: Express.Multer.File, sessionId: string): string {
    const fileId = this.generateFileId(file, sessionId);
    
    this.cache[fileId] = {
      originalPath: file.path,
      originalName: file.filename || file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      uploadedAt: new Date(),
      sessionId,
      fileHash: this.generateFileHash(file)
    };

    // Cleanup old files if cache is getting too large
    if (Object.keys(this.cache).length > this.MAX_CACHE_SIZE) {
      this.cleanupOldestFiles();
    }

    console.log(`📁 Cached file: ${file.originalname} as ${fileId}`);
    return fileId;
  }

  /**
   * Get cached file information
   */
  getCachedFile(fileId: string): CachedFile | null {
    const cached = this.cache[fileId];
    if (!cached) return null;

    // Check if file has expired
    if (Date.now() - cached.uploadedAt.getTime() > this.CACHE_DURATION) {
      delete this.cache[fileId];
      return null;
    }

    return cached;
  }

  /**
   * Get all cached files for a session
   */
  getSessionFiles(sessionId: string): { [fileId: string]: CachedFile } {
    const sessionFiles: { [fileId: string]: CachedFile } = {};
    
    for (const [fileId, cached] of Object.entries(this.cache)) {
      if (cached.sessionId === sessionId && 
          Date.now() - cached.uploadedAt.getTime() <= this.CACHE_DURATION) {
        sessionFiles[fileId] = cached;
      }
    }

    return sessionFiles;
  }

  /**
   * Generate unique file ID based on content and session
   */
  private generateFileId(file: Express.Multer.File, sessionId: string): string {
    const timestamp = Date.now();
    const hash = this.generateFileHash(file);
    return `${sessionId}_${hash}_${timestamp}`;
  }

  /**
   * Generate file hash for deduplication
   */
  private generateFileHash(file: Express.Multer.File): string {
    // Simple hash based on file properties
    return `${file.originalname}_${file.size}_${file.mimetype}`.replace(/[^a-zA-Z0-9]/g, '_');
  }

  /**
   * Clean up expired files
   */
  private cleanupExpiredFiles(): void {
    const now = Date.now();
    let removedCount = 0;

    for (const [fileId, cached] of Object.entries(this.cache)) {
      if (now - cached.uploadedAt.getTime() > this.CACHE_DURATION) {
        delete this.cache[fileId];
        removedCount++;
      }
    }

    if (removedCount > 0) {
      console.log(`🧹 Cleaned up ${removedCount} expired cached files`);
    }
  }

  /**
   * Clean up oldest files when cache is full
   */
  private cleanupOldestFiles(): void {
    const entries = Object.entries(this.cache)
      .sort(([,a], [,b]) => a.uploadedAt.getTime() - b.uploadedAt.getTime());
    
    // Remove oldest 20% of files
    const removeCount = Math.floor(entries.length * 0.2);
    for (let i = 0; i < removeCount; i++) {
      delete this.cache[entries[i][0]];
    }

    console.log(`🧹 Removed ${removeCount} oldest cached files to free space`);
  }

  /**
   * Clear all cached files for a session
   */
  clearSession(sessionId: string): void {
    let removedCount = 0;
    for (const [fileId, cached] of Object.entries(this.cache)) {
      if (cached.sessionId === sessionId) {
        delete this.cache[fileId];
        removedCount++;
      }
    }
    console.log(`🗑️ Cleared ${removedCount} cached files for session ${sessionId}`);
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      totalFiles: Object.keys(this.cache).length,
      totalSize: Object.values(this.cache).reduce((sum, file) => sum + file.size, 0),
      oldestFile: Math.min(...Object.values(this.cache).map(f => f.uploadedAt.getTime())),
      newestFile: Math.max(...Object.values(this.cache).map(f => f.uploadedAt.getTime()))
    };
  }
}

// Export singleton instance
export const fileCacheService = new FileCacheService();
export { CachedFile };