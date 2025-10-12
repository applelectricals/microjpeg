// debug-cr2-processing.js - Add this to your server
const fs = require('fs');
const path = require('path');

// Debugging middleware for CR2 processing
function debugCR2Processing(req, res, next) {
  if (req.files && req.files.some(file => file.originalname.toLowerCase().endsWith('.cr2'))) {
    console.log('🔍 CR2 DEBUG: Processing started');
    console.log('📁 Files:', req.files.map(f => ({
      name: f.originalname,
      size: f.size,
      mimetype: f.mimetype
    })));
    
    // Intercept response to log results
    const originalSend = res.send;
    res.send = function(data) {
      try {
        const parsed = JSON.parse(data);
        console.log('📊 CR2 DEBUG: Response data');
        
        if (parsed.results) {
          parsed.results.forEach((result, index) => {
            console.log(`Result ${index}:`, {
              originalSize: result.originalSize,
              compressedSize: result.compressedSize,
              hasNaN: isNaN(result.originalSize) || isNaN(result.compressedSize),
              error: result.error
            });
          });
        }
      } catch (e) {
        console.log('📊 CR2 DEBUG: Non-JSON response:', data.substring(0, 200));
      }
      
      originalSend.call(this, data);
    };
  }
  next();
}

module.exports = debugCR2Processing;