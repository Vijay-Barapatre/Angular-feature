/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 4: FILE UPLOAD
 * ============================================================================
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-scenario-4-upload',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 4: File Upload with Progress</h2>
                <p>Upload files with progress tracking using HttpClient.</p>
            </div>

            <div class="content">
                <div class="upload-zone" 
                    (dragover)="onDragOver($event)" 
                    (drop)="onDrop($event)"
                    [class.dragover]="isDragOver()">
                    <div class="upload-icon">📁</div>
                    <p>Drag & drop files here or</p>
                    <label class="file-input">
                        Browse Files
                        <input type="file" (change)="onFileSelect($event)" multiple hidden>
                    </label>
                </div>

                @if (files().length > 0) {
                    <div class="files-list">
                        <h4>Selected Files</h4>
                        @for (file of files(); track file.name) {
                            <div class="file-item">
                                <span class="file-name">{{ file.name }}</span>
                                <span class="file-size">{{ formatSize(file.size) }}</span>
                                <div class="progress-bar">
                                    <div class="progress" [style.width.%]="file.progress"></div>
                                </div>
                                <span class="file-status">{{ file.status }}</span>
                            </div>
                        }
                    </div>
                    
                    <button class="upload-btn" (click)="simulateUpload()">
                        Upload All
                    </button>
                }

                <div class="code-example">
                    <h4>File Upload Code</h4>
                    <pre><code>uploadFile(file: File): Observable&lt;HttpEvent&lt;any&gt;&gt; {{ '{' }}
  const formData = new FormData();
  formData.append('file', file);

  return this.http.post(url, formData, {{ '{' }}
    reportProgress: true,
    observe: 'events'
  {{ '}' }});
{{ '}' }}

// Handle progress
this.uploadFile(file).subscribe(event => {{ '{' }}
  if (event.type === HttpEventType.UploadProgress) {{ '{' }}
    const progress = Math.round(100 * event.loaded / event.total);
  {{ '}' }}
{{ '}' }});</code></pre>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 600px; }
        .instructions { background: #fef2f2; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #06b6d4; }
        .content { background: white; padding: 1.5rem; border-radius: 8px; }
        .upload-zone { padding: 3rem; border: 2px dashed #e5e7eb; border-radius: 12px; text-align: center; transition: all 0.3s; }
        .upload-zone.dragover { border-color: #06b6d4; background: #ecfeff; }
        .upload-icon { font-size: 3rem; margin-bottom: 1rem; }
        .file-input { display: inline-block; padding: 0.75rem 1.5rem; background: #06b6d4; color: white; border-radius: 6px; cursor: pointer; }
        .files-list { margin: 1.5rem 0; }
        .files-list h4 { margin: 0 0 1rem; }
        .file-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: #f8fafc; border-radius: 8px; margin-bottom: 0.5rem; }
        .file-name { flex: 1; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .file-size { color: #6b7280; font-size: 0.85rem; }
        .progress-bar { width: 100px; height: 6px; background: #e5e7eb; border-radius: 3px; overflow: hidden; }
        .progress { height: 100%; background: #06b6d4; transition: width 0.3s; }
        .file-status { font-size: 0.75rem; min-width: 60px; text-align: right; }
        .upload-btn { width: 100%; padding: 0.75rem; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 1rem; }
        .code-example { margin-top: 1.5rem; padding: 1rem; background: #1e1e2e; border-radius: 8px; }
        .code-example h4 { color: white; margin: 0 0 0.5rem; font-size: 0.9rem; }
        .code-example pre { margin: 0; overflow-x: auto; }
        .code-example code { color: #a6e3a1; font-size: 0.8rem; }
    `]
})
export class Scenario4UploadComponent {
    isDragOver = signal(false);
    files = signal<{ name: string; size: number; progress: number; status: string }[]>([]);

    onDragOver(event: DragEvent): void {
        event.preventDefault();
        this.isDragOver.set(true);
    }

    onDrop(event: DragEvent): void {
        event.preventDefault();
        this.isDragOver.set(false);

        const droppedFiles = event.dataTransfer?.files;
        if (droppedFiles) {
            this.addFiles(droppedFiles);
        }
    }

    onFileSelect(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            this.addFiles(input.files);
        }
    }

    private addFiles(fileList: FileList): void {
        const newFiles = Array.from(fileList).map(f => ({
            name: f.name,
            size: f.size,
            progress: 0,
            status: 'Pending'
        }));
        this.files.update(files => [...files, ...newFiles]);
    }

    simulateUpload(): void {
        this.files().forEach((file, index) => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 20;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    this.updateFile(index, 100, '✅ Done');
                } else {
                    this.updateFile(index, Math.round(progress), 'Uploading...');
                }
            }, 200);
        });
    }

    private updateFile(index: number, progress: number, status: string): void {
        this.files.update(files =>
            files.map((f, i) => i === index ? { ...f, progress, status } : f)
        );
    }

    formatSize(bytes: number): string {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / 1048576).toFixed(1) + ' MB';
    }
}
