import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import fetch from 'node-fetch';

async function testCompression() {
    try {
        // First, let's test if we can upload an image
        const testImagePath = path.join(process.cwd(), 'client', 'src', 'assets', 'background.webp');
        
        if (!fs.existsSync(testImagePath)) {
            console.log('❌ Test image not found at:', testImagePath);
            console.log('📁 Let me check what images are available...');
            
            const assetsDir = path.join(process.cwd(), 'client', 'src', 'assets');
            if (fs.existsSync(assetsDir)) {
                const files = fs.readdirSync(assetsDir);
                console.log('Available files:', files);
                
                // Try to find any image file
                const imageFile = files.find(f => f.match(/\.(jpg|jpeg|png|webp)$/i));
                if (imageFile) {
                    console.log('🖼️ Using image:', imageFile);
                    const imagePath = path.join(assetsDir, imageFile);
                    await uploadAndCompress(imagePath, imageFile);
                } else {
                    console.log('❌ No image files found in assets directory');
                }
            } else {
                console.log('❌ Assets directory not found');
            }
        } else {
            await uploadAndCompress(testImagePath, 'background.webp');
        }
        
    } catch (error) {
        console.error('❌ Error during compression test:', error);
        console.error('Stack:', error.stack);
    }
}

async function uploadAndCompress(imagePath, filename) {
    try {
        console.log(`🚀 Testing compression with: ${filename}`);
        
        // Upload and compress in one step using /api/compress
        const form = new FormData();
        const imageBuffer = fs.readFileSync(imagePath);
        form.append('files', imageBuffer, filename);
        
        console.log('📤 Uploading and compressing image...');
        const compressResponse = await fetch('http://localhost:5000/api/compress', {
            method: 'POST',
            body: form,
            headers: {
                ...form.getHeaders()
            }
        });
        
        if (!compressResponse.ok) {
            const errorText = await compressResponse.text();
            console.log('❌ Compression failed:', compressResponse.status, errorText);
            return;
        }
        
        const compressResult = await compressResponse.json();
        console.log('✅ Compression successful:', compressResult);
        
        // Check if there are any jobs created
        if (compressResult.jobs && compressResult.jobs.length > 0) {
            const jobId = compressResult.jobs[0].id;
            console.log('📊 Checking job status for:', jobId);
            
            const statusResponse = await fetch(`http://localhost:5000/api/job/${jobId}/status`);
            
            if (statusResponse.ok) {
                const statusResult = await statusResponse.json();
                console.log('📈 Job status:', statusResult);
            } else {
                console.log('❌ Could not get job status');
            }
        }
        
    } catch (error) {
        console.error('❌ Error in upload and compress:', error);
        console.error('Stack:', error.stack);
    }
}

testCompression();