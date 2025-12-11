# Scenario 4: File Upload with Progress - Solution

## ✅ Complete Solution

### Step 1: HTML Template

```html
<!-- File Input -->
<input 
    type="file" 
    (change)="onFileSelected($event)"
    accept="image/*,.pdf"
    #fileInput
>

<!-- Drop Zone -->
<div 
    class="drop-zone"
    (dragover)="onDragOver($event)"
    (drop)="onDrop($event)"
>
    Drop files here
</div>

<!-- Progress Display -->
<div *ngIf="uploading" class="upload-progress">
    <div class="file-info">
        {{ selectedFile?.name }} ({{ formatSize(selectedFile?.size) }})
    </div>
    <div class="progress-bar">
        <div 
            class="progress-fill" 
            [style.width.%]="uploadProgress"
        ></div>
    </div>
    <span>{{ uploadProgress }}%</span>
    <button (click)="cancelUpload()">Cancel</button>
</div>

<!-- Success/Error -->
<div *ngIf="uploadComplete" class="success">✅ Upload Complete!</div>
<div *ngIf="uploadError" class="error">❌ {{ uploadError }}</div>
```

### Step 2: Component Implementation

```typescript
import { Component, inject } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpEvent } from '@angular/common/http';
import { Subscription, finalize } from 'rxjs';

@Component({...})
export class FileUploadComponent {
    private http = inject(HttpClient);

    selectedFile: File | null = null;
    uploading = false;
    uploadProgress = 0;
    uploadComplete = false;
    uploadError = '';
    
    private uploadSubscription: Subscription | null = null;

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.selectedFile = input.files[0];
            this.validateAndUpload();
        }
    }

    validateAndUpload(): void {
        if (!this.selectedFile) return;

        // Validation
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (this.selectedFile.size > maxSize) {
            this.uploadError = 'File too large (max 10MB)';
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!allowedTypes.includes(this.selectedFile.type)) {
            this.uploadError = 'Invalid file type';
            return;
        }

        this.startUpload();
    }

    startUpload(): void {
        if (!this.selectedFile) return;

        this.uploading = true;
        this.uploadProgress = 0;
        this.uploadComplete = false;
        this.uploadError = '';

        // Create FormData
        const formData = new FormData();
        formData.append('file', this.selectedFile, this.selectedFile.name);

        // Create request with progress reporting
        const request = new HttpRequest('POST', '/api/upload', formData, {
            reportProgress: true  // Enable progress events
        });

        // Subscribe to events
        this.uploadSubscription = this.http.request(request).pipe(
            finalize(() => this.uploading = false)
        ).subscribe({
            next: (event: HttpEvent<any>) => {
                this.handleUploadEvent(event);
            },
            error: (err) => {
                this.uploadError = 'Upload failed: ' + err.message;
            }
        });
    }

    private handleUploadEvent(event: HttpEvent<any>): void {
        switch (event.type) {
            case HttpEventType.UploadProgress:
                // Calculate percentage
                if (event.total) {
                    this.uploadProgress = Math.round(
                        (event.loaded / event.total) * 100
                    );
                }
                break;

            case HttpEventType.Response:
                // Upload complete
                this.uploadComplete = true;
                console.log('Server response:', event.body);
                break;
        }
    }

    cancelUpload(): void {
        // Unsubscribing cancels the HTTP request!
        this.uploadSubscription?.unsubscribe();
        this.uploading = false;
        this.uploadProgress = 0;
    }

    formatSize(bytes?: number): string {
        if (!bytes) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }
}
```

## 🔑 Key Concepts

### HttpRequest vs http.post

```typescript
// Standard approach (no progress)
this.http.post('/api/upload', formData).subscribe();

// With progress events
const request = new HttpRequest('POST', '/api/upload', formData, {
    reportProgress: true
});
this.http.request(request).subscribe(event => {
    // Receives HttpEvent objects
});
```

### HttpEventType Handling

```typescript
this.http.request(request).subscribe(event => {
    switch (event.type) {
        case HttpEventType.Sent:
            console.log('Request sent');
            break;
            
        case HttpEventType.UploadProgress:
            const percent = Math.round(100 * event.loaded / event.total!);
            console.log(`Upload progress: ${percent}%`);
            break;
            
        case HttpEventType.ResponseHeader:
            console.log('Headers received');
            break;
            
        case HttpEventType.Response:
            console.log('Complete!', event.body);
            break;
    }
});
```

### Drag and Drop

```typescript
onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
}

onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
        this.selectedFile = files[0];
        this.validateAndUpload();
    }
}
```

## 💡 Pro Tips

1. **Don't set Content-Type** for FormData - let the browser set it with boundary
2. **Unsubscribe to cancel** - Angular's HttpClient cancels on unsubscribe
3. **Use total property** carefully - it might be undefined if server doesn't send Content-Length
4. **Show uploaded bytes** alongside percentage for large files
5. **Implement retry logic** for failed uploads
