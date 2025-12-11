# Scenario 4: File Upload with Progress

## 🎯 Problem Statement

You are building a file upload feature that needs to:

1. Allow users to **select files** via drag-drop or file input
2. **Upload files** to the server with progress tracking
3. Display **real-time upload progress** percentage
4. Handle **upload cancellation**
5. Show **success/error** states

## 📋 Requirements

### Functional Requirements
- File input or drag-drop zone
- Progress bar showing percentage
- Cancel button during upload
- File size and type validation
- Success/error feedback

### Technical Requirements
- Use `reportProgress: true` option
- Use `observe: 'events'` to get HttpEvent stream
- Handle `HttpEventType.UploadProgress`
- Handle `HttpEventType.Response`
- Implement cancellation with `unsubscribe()`

## 🔗 Upload Flow

```
User selects file
       ↓
Validation (size, type)
       ↓
POST /api/upload
       ↓
┌──────────────────────────────────┐
│ Progress: [███████░░░░░░░] 45%   │
│ Uploading: photo.jpg (2.5 MB)    │
│ [Cancel Upload]                   │
└──────────────────────────────────┘
       ↓
✅ Upload Complete!
```

## 💡 Hints

1. Use `HttpRequest` for full control over the request
2. Set `reportProgress: true` and `observe: 'events'`
3. Use `HttpEventType` enum to identify event types
4. Calculate percentage: `(event.loaded / event.total) * 100`

## ⚠️ Common Mistakes

- Not setting `reportProgress: true`
- Using `observe: 'body'` instead of `'events'`
- Forgetting to handle the Response event
- Not unsubscribing to cancel upload
- Missing Content-Type for FormData (let browser set it!)

## 📊 Expected Behavior

```
1. User drags file to drop zone
   ┌────────────────────────────────┐
   │   📁 Drop file here            │
   │   or click to browse           │
   └────────────────────────────────┘

2. File selected, upload starts
   ┌────────────────────────────────┐
   │ 📄 photo.jpg (2.5 MB)          │
   │ [███████████░░░░░░░░] 65%      │
   │ Uploaded: 1.6 MB / 2.5 MB      │
   │ [Cancel]                        │
   └────────────────────────────────┘

3. Upload complete
   ┌────────────────────────────────┐
   │ ✅ Upload Complete!             │
   │ 📄 photo.jpg                   │
   │ Server response: { id: 123 }   │
   └────────────────────────────────┘
```

## 🧠 HttpEventType Reference

```typescript
HttpEventType.Sent           // 0 - Request sent
HttpEventType.UploadProgress // 1 - Upload progress
HttpEventType.ResponseHeader // 2 - Headers received
HttpEventType.DownloadProgress // 3 - Download progress
HttpEventType.Response       // 4 - Full response
HttpEventType.User           // 5 - Custom event
```
