# 📁 Use Case 8: File Upload/Download

> **Goal**: Handle file operations with progress tracking.

---

## 1. 🔍 How It Works

### Key Concepts

| Feature | Config |
|---------|--------|
| Progress events | `reportProgress: true` |
| Download blob | `responseType: 'blob'` |
| Upload files | `FormData` |

---

## 2. 🚀 Implementation

### Upload with Progress

```typescript
const formData = new FormData();
formData.append('file', file);

const req = new HttpRequest('POST', url, formData, {
    reportProgress: true
});

this.http.request(req).subscribe(event => {
    if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total!);
    }
});
```

### Download as Blob

```typescript
this.http.get(url, {
    responseType: 'blob'
}).subscribe(blob => {
    const url = URL.createObjectURL(blob);
    // Trigger download
});
```

---

## 3. ❓ Interview Questions

### Basic Questions

#### Q1: How do you track file upload progress?
**Answer:** Use `HttpRequest` with `reportProgress: true` and listen for `HttpEventType.UploadProgress`.

#### Q2: What's the difference between responseType 'blob' and 'arraybuffer'?
**Answer:**
| Type | Use Case |
|------|----------|
| `blob` | Files, images (browser handles) |
| `arraybuffer` | Binary processing, crypto |

---

### Scenario-Based Questions

#### Scenario 1: Upload with Progress Bar
**Question:** Show a progress bar during file upload.

**Answer:**
```typescript
const req = new HttpRequest('POST', '/api/upload', formData, {
    reportProgress: true
});

this.http.request(req).subscribe(event => {
    if (event.type === HttpEventType.UploadProgress && event.total) {
        this.progress = Math.round(100 * event.loaded / event.total);
    }
    if (event.type === HttpEventType.Response) {
        this.uploadComplete = true;
    }
});
```

#### Scenario 2: Download and Save File
**Question:** Download a PDF and trigger browser save dialog.

**Answer:**
```typescript
this.http.get('/api/report.pdf', { responseType: 'blob' })
    .subscribe(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'report.pdf';
        a.click();
        URL.revokeObjectURL(url);
    });
```

---

## 🧠 Mind Map

```mermaid
mindmap
  root((File Operations))
    Upload
      FormData
      reportProgress
      HttpRequest
    Download
      responseType blob
      createObjectURL
    Progress
      HttpEventType
      UploadProgress
      DownloadProgress
```

