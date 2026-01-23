/**
 * ============================================================================
 * FILE UPLOAD/DOWNLOAD
 * ============================================================================
 * 
 * 🎯 WHAT THIS DEMONSTRATES:
 * How to handle file operations with progress tracking in Angular.
 * File handling requires special HTTP configurations.
 * 
 * 💡 KEY CONCEPTS:
 * 
 * 1. FILE UPLOAD:
 *    
 *    Use FormData to send files:
 *    
 *    const formData = new FormData();
 *    formData.append('file', selectedFile);
 *    http.post('/api/upload', formData)
 *    
 *    ⚠️ DON'T set Content-Type header manually!
 *    Browser automatically sets it with boundary for multipart.
 * 
 * 2. PROGRESS TRACKING:
 *    
 *    Standard POST doesn't report progress.
 *    Use HttpRequest with reportProgress: true:
 *    
 *    const req = new HttpRequest('POST', url, formData, {
 *        reportProgress: true
 *    });
 *    
 *    Then listen for HttpEventType.UploadProgress
 * 
 * 3. HttpEventType VALUES:
 *    
 *    | Type            | Meaning                       |
 *    |-----------------|-------------------------------|
 *    | Sent (0)        | Request has been sent         |
 *    | UploadProgress (1) | Upload progress event      |
 *    | ResponseHeader (2) | Headers received          |
 *    | DownloadProgress (3) | Download progress event |
 *    | Response (4)    | Full response received        |
 * 
 * 4. FILE DOWNLOAD:
 *    
 *    Use responseType: 'blob' to get binary data:
 *    
 *    http.get(url, { responseType: 'blob' })
 *    
 *    Then create a download link:
 *    const url = URL.createObjectURL(blob);
 *    window.open(url);
 * 
 * ⚠️ IMPORTANT:
 * - Total bytes may be undefined if server doesn't send Content-Length
 * - Unsubscribe cancels the upload (useful for cancel button)
 * - Large files may need chunked upload strategy
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';

@Component({
    selector: 'app-file-operations',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <h1>📁 File Upload/Download</h1>
            <p class="description">
                Handle file operations with progress tracking.
            </p>

            <div class="demo-grid">
                <!-- File Upload -->
                <section class="demo-section">
                    <h3>📤 File Upload</h3>
                    <input type="file" (change)="onFileSelected($event)" #fileInput>
                    <button (click)="uploadFile()" [disabled]="!selectedFile || uploading">
                        {{ uploading ? 'Uploading...' : 'Upload' }}
                    </button>
                    
                    @if (uploading || uploadProgress > 0) {
                        <div class="progress-container">
                            <div class="progress-bar">
                                <div class="progress" [style.width.%]="uploadProgress"></div>
                            </div>
                            <span>{{ uploadProgress }}%</span>
                        </div>
                    }
                    
                    @if (uploadResult) {
                        <div class="result success">✅ {{ uploadResult }}</div>
                    }
                </section>

                <!-- File Download -->
                <section class="demo-section">
                    <h3>📥 File Download</h3>
                    <button (click)="downloadFile()" [disabled]="downloading">
                        {{ downloading ? 'Downloading...' : 'Download Sample File' }}
                    </button>
                    
                    @if (downloading || downloadProgress > 0) {
                        <div class="progress-container">
                            <div class="progress-bar">
                                <div class="progress" [style.width.%]="downloadProgress"></div>
                            </div>
                            <span>{{ downloadProgress }}%</span>
                        </div>
                    }
                    
                    @if (downloadResult) {
                        <div class="result success">✅ {{ downloadResult }}</div>
                    }
                </section>
            </div>

            <div class="code-examples">
                <h3>💻 Code Examples</h3>
                <div class="code-grid">
                    <div class="code-block">
                        <h4>Upload with Progress</h4>
                        <pre>
const formData = new FormData();
formData.append('file', file);

const req = new HttpRequest('POST', url, formData, {{ '{' }}
    reportProgress: true // Enable progress events
{{ '}' }});

this.http.request(req).subscribe(event => {{ '{' }}
    if (event.type === HttpEventType.UploadProgress) {{ '{' }}
        const progress = Math.round(
            100 * event.loaded / event.total!
        );
    {{ '}' }}
{{ '}' }});
                        </pre>
                    </div>
                    <div class="code-block">
                        <h4>Download as Blob</h4>
                        <pre>
this.http.get(url, {{ '{' }}
    responseType: 'blob',
    reportProgress: true,
    observe: 'events'
{{ '}' }}).subscribe(event => {{ '{' }}
    if (event.type === HttpEventType.Response) {{ '{' }}
        const blob = event.body;
        // Create download link
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'file.txt';
        a.click();
    {{ '}' }}
{{ '}' }});
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        h1 { color: #1a1a2e; margin-bottom: 0.5rem; }
        .description { color: #666; margin-bottom: 2rem; }

        .demo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
        .demo-section { background: #f8f9fa; padding: 1.5rem; border-radius: 12px; }
        .demo-section h3 { margin-top: 0; }
        .demo-section input[type="file"] { margin-bottom: 1rem; }
        .demo-section button { background: #667eea; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; }

        .progress-container { display: flex; align-items: center; gap: 1rem; margin-top: 1rem; }
        .progress-bar { flex: 1; height: 20px; background: #e0e0e0; border-radius: 10px; overflow: hidden; }
        .progress { height: 100%; background: linear-gradient(90deg, #667eea, #4ade80); transition: width 0.3s; }

        .result { padding: 1rem; border-radius: 6px; margin-top: 1rem; }
        .result.success { background: #dcfce7; color: #166534; }

        .code-examples { background: #1a1a2e; padding: 1.5rem; border-radius: 12px; }
        .code-examples h3 { color: white; margin-top: 0; }
        .code-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 1rem; }
        .code-block { background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px; }
        .code-block h4 { color: #4ade80; margin-top: 0; }
        .code-block pre { color: #e0e0e0; margin: 0; font-size: 0.8rem; overflow-x: auto; }
    `]
})
export class FileOperationsComponent {
    private http = inject(HttpClient);

    selectedFile: File | null = null;
    uploading = false;
    uploadProgress = 0;
    uploadResult = '';

    downloading = false;
    downloadProgress = 0;
    downloadResult = '';

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.selectedFile = input.files[0];
        }
    }

    /**
     * FILE UPLOAD WITH PROGRESS
     */
    uploadFile(): void {
        if (!this.selectedFile) return;

        this.uploading = true;
        this.uploadProgress = 0;
        this.uploadResult = '';

        const formData = new FormData();
        formData.append('file', this.selectedFile);

        // Use HttpRequest for progress events
        const req = new HttpRequest('POST', 'http://localhost:3000/api/upload', formData, {
            reportProgress: true // 🛡️ Enable progress tracking
        });

        this.http.request(req).subscribe({
            next: (event: HttpEvent<any>) => {
                switch (event.type) {
                    case HttpEventType.UploadProgress:
                        // Calculate upload progress
                        if (event.total) {
                            this.uploadProgress = Math.round(100 * event.loaded / event.total);
                        }
                        break;
                    case HttpEventType.Response:
                        this.uploadResult = `File uploaded: ${event.body?.filename || 'success'}`;
                        this.uploading = false;
                        break;
                }
            },
            error: (err) => {
                console.error('Upload failed:', err);
                this.uploading = false;
            }
        });
    }

    /**
     * FILE DOWNLOAD (Simulated)
     */
    downloadFile(): void {
        this.downloading = true;
        this.downloadProgress = 0;
        this.downloadResult = '';

        // Simulate download progress
        const interval = setInterval(() => {
            this.downloadProgress += 10;
            if (this.downloadProgress >= 100) {
                clearInterval(interval);
                this.downloadResult = 'Download complete!';
                this.downloading = false;

                // In real app, create blob and trigger download:
                // const blob = new Blob(['data'], { type: 'text/plain' });
                // const url = URL.createObjectURL(blob);
                // window.open(url);
            }
        }, 200);
    }
}
