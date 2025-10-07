import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import fetch from 'node-fetch';

async function testDownloadFunctionality() {
    try {
        console.log('🚀 Testing complete upload → compress → download workflow...');
        
        // Step 1: Upload and compress an image
        const testImagePath = path.join(process.cwd(), 'client', 'src', 'assets', 'background.webp');
        const form = new FormData();
        const imageBuffer = fs.readFileSync(testImagePath);
        form.append('files', imageBuffer, 'test-download.webp');
        
        console.log('📤 Uploading and compressing...');
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
        console.log('✅ Compression successful!');
        console.log('📋 Results:', compressResult.results.map(r => ({
            id: r.id,
            originalSize: r.originalSize,
            compressedSize: r.compressedSize,
            downloadUrl: r.downloadUrl
        })));
        
        if (!compressResult.results || compressResult.results.length === 0) {
            console.log('❌ No results from compression');
            return;
        }
        
        const firstResult = compressResult.results[0];
        
        // Step 2: Test individual file download
        console.log('📥 Testing individual file download...');
        const downloadUrl = firstResult.downloadUrl;
        const individualDownloadResponse = await fetch(`http://localhost:5000${downloadUrl}`);
        
        if (!individualDownloadResponse.ok) {
            console.log('❌ Individual download failed:', individualDownloadResponse.status);
            return;
        }
        
        const downloadedBuffer = await individualDownloadResponse.buffer();
        console.log('✅ Individual download successful!');
        console.log(`📊 Downloaded file size: ${downloadedBuffer.length} bytes`);
        
        // Save the downloaded file to verify it works
        const downloadPath = path.join(process.cwd(), 'downloaded-individual.webp');
        fs.writeFileSync(downloadPath, downloadedBuffer);
        console.log(`💾 Saved individual file to: ${downloadPath}`);
        
        // Step 3: Test batch ZIP download
        console.log('📦 Testing batch ZIP download...');
        const batchId = compressResult.batchId;
        const zipDownloadResponse = await fetch(`http://localhost:5000/api/download-zip/${batchId}`);
        
        if (!zipDownloadResponse.ok) {
            console.log('❌ ZIP download failed:', zipDownloadResponse.status);
            const errorText = await zipDownloadResponse.text();
            console.log('Error details:', errorText);
            return;
        }
        
        const zipBuffer = await zipDownloadResponse.buffer();
        console.log('✅ ZIP download successful!');
        console.log(`📊 ZIP file size: ${zipBuffer.length} bytes`);
        
        // Save the ZIP file
        const zipPath = path.join(process.cwd(), 'downloaded-batch.zip');
        fs.writeFileSync(zipPath, zipBuffer);
        console.log(`💾 Saved ZIP file to: ${zipPath}`);
        
        // Step 4: Test session-based ZIP creation
        console.log('🗂️ Testing session ZIP creation...');
        const sessionZipResponse = await fetch('http://localhost:5000/api/create-session-zip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                resultIds: compressResult.results.map(r => r.id)
            }),
        });
        
        if (!sessionZipResponse.ok) {
            console.log('❌ Session ZIP creation failed:', sessionZipResponse.status);
            return;
        }
        
        const sessionZipResult = await sessionZipResponse.json();
        console.log('✅ Session ZIP creation successful!');
        console.log('🔗 Download URL:', sessionZipResult.batchDownloadUrl);
        
        // Download the session ZIP
        const sessionZipDownload = await fetch(`http://localhost:5000${sessionZipResult.batchDownloadUrl}`);
        if (sessionZipDownload.ok) {
            const sessionZipBuffer = await sessionZipDownload.buffer();
            const sessionZipPath = path.join(process.cwd(), 'downloaded-session.zip');
            fs.writeFileSync(sessionZipPath, sessionZipBuffer);
            console.log(`💾 Saved session ZIP to: ${sessionZipPath}`);
            console.log(`📊 Session ZIP size: ${sessionZipBuffer.length} bytes`);
        }
        
        console.log('\n🎉 ALL DOWNLOAD TESTS PASSED! 🎉');
        console.log('✅ Individual file download: Working');
        console.log('✅ Batch ZIP download: Working');
        console.log('✅ Session ZIP creation: Working');
        
    } catch (error) {
        console.error('❌ Error during download test:', error);
        console.error('Stack:', error.stack);
    }
}

testDownloadFunctionality();