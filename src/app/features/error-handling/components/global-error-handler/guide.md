# ⚠️ Global Error Handler

> **💡 Lightbulb Moment**: Catch ALL unhandled errors in one place with Angular's ErrorHandler!


## 📋 Table of Contents
- [1. 🔍 What is ErrorHandler?](#1--what-is-errorhandler)
- [2. 🚀 What It Catches](#2--what-it-catches)
- [3. ❓ Interview Questions](#3--interview-questions)
  - [Basic Questions](#basic-questions)
    - [Q1: Does ErrorHandler catch HTTP errors?](#q1-does-errorhandler-catch-http-errors)
    - [Q2: How to distinguish error types?](#q2-how-to-distinguish-error-types)
  - [Scenario-Based Questions](#scenario-based-questions)
    - [Scenario: Log to Service](#scenario-log-to-service)
  - [📦 Data Flow Summary (Visual Box Diagram)](#data-flow-summary-visual-box-diagram)
- [🏥 Hospital Emergency Room Analogy (Easy to Remember!)](#hospital-emergency-room-analogy-easy-to-remember)
  - [📖 Story to Remember:](#story-to-remember)
  - [🎯 Quick Reference:](#quick-reference)
- [🧠 Mind Map](#mind-map)

---
---

## 1. 🔍 What is ErrorHandler?

Angular's global error handler catches all unhandled exceptions.

```typescript
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    handleError(error: any): void {
        console.error('Global error:', error);
        
        // Log to monitoring service
        this.loggingService.logError(error);
        
        // Show user-friendly message
        this.notificationService.showError('Something went wrong');
    }
}

// Register in app.config.ts
providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
]
```

---

## 2. 🚀 What It Catches

- Unhandled exceptions in components
- Errors in lifecycle hooks
- Errors in event handlers
- Template errors

---

## 3. ❓ Interview Questions

### Basic Questions

#### Q1: Does ErrorHandler catch HTTP errors?
**Answer:** Only if they're unhandled. HTTP errors caught by catchError in RxJS won't reach ErrorHandler.

#### Q2: How to distinguish error types?
**Answer:**
```typescript
handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
        // HTTP error
    } else if (error instanceof TypeError) {
        // JavaScript type error
    } else {
        // Unknown error
    }
}
```

---

### Scenario-Based Questions

#### Scenario: Log to Service
**Question:** Send errors to monitoring service (Sentry/Azure).

**Answer:**
```typescript
handleError(error: any) {
    const errorInfo = {
        message: error.message,
        stack: error.stack,
        url: window.location.href,
        timestamp: new Date().toISOString()
    };
    
    this.http.post('/api/log-error', errorInfo).subscribe();
}
```

---

### 📦 Data Flow Summary (Visual Box Diagram)

```
┌─────────────────────────────────────────────────────────────┐
│  GLOBAL ERROR HANDLER: CATCH ALL UNHANDLED ERRORS           │
│                                                             │
│   SETUP:                                                    │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ @Injectable()                                         │ │
│   │ export class GlobalErrorHandler implements ErrorHandler {│ │
│   │   handleError(error: any): void {                      │ │
│   │     // 1. Log to monitoring (Sentry/Azure)             │ │
│   │     this.loggingService.logError(error);               │ │
│   │     // 2. Show user-friendly message                   │ │
│   │     this.notify.showError('Something went wrong');     │ │
│   │   }                                                    │ │
│   │ }                                                      │ │
│   │                                                        │ │
│   │ // Register in app.config.ts                           │ │
│   │ { provide: ErrorHandler, useClass: GlobalErrorHandler }│ │
│   └───────────────────────────────────────────────────────┘ │
│                                                             │
│   WHAT IT CATCHES:                                          │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ ✅ Unhandled exceptions in components                 │ │
│   │ ✅ Template errors                                    │ │
│   │ ✅ Lifecycle hook errors                              │ │
│   │ ❌ HTTP errors caught by catchError (already handled) │ │
│   └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

> **Key Takeaway**: Provide your own ErrorHandler to log all unhandled errors. Only catches UNHANDLED errors!

---

## 🏥 Hospital Emergency Room Analogy (Easy to Remember!)

Think of Global Error Handler like a **Hospital Emergency Room**:

| Concept | ER Analogy | Memory Trick |
|---------|------------|--------------| 
| **ErrorHandler** | 🏥 **ER department**: Catches ALL serious cases that weren't handled elsewhere | **"Last line of defense"** |
| **handleError()** | 👨‍⚕️ **ER Doctor**: Receives patient, diagnoses, treats | **"Process the error"** |
| **Logging Service** | 📋 **Medical records**: Document everything for later review | **"Log to Sentry/Azure"** |
| **Notify User** | 📢 **Nurse announcement**: "Your doctor will see you shortly" | **"User-friendly message"** |
| **Caught errors skip** | 🏠 **Treated at home**: Minor issues handled locally never reach ER | **"Already handled"** |

### 📖 Story to Remember:

> 🏥 **The Angular Hospital**
>
> Your app is a hospital. Errors are patients:
>
> **Minor Issues (Caught locally):**
> ```typescript
> try {
>   riskyOperation();  // Patient feels sick
> } catch (e) {
>   // Treated at home (catchError)
>   // Never goes to ER!
> }
> ```
>
> **Serious Issues (Unhandled):**
> ```typescript
> throw new Error("Critical!");  // 🚨 
> ↓
> GlobalErrorHandler catches it  // 🏥 ER receives patient
> ↓
> handleError(error)             // 👨‍⚕️ Doctor examines
> ↓
> Log to monitoring              // 📋 File paperwork
> Show user message              // 📢 "We're working on it"
> ```
>
> **The ER exists for cases that weren't handled anywhere else!**

### 🎯 Quick Reference:
```
🏥 ErrorHandler       = ER (catches unhandled errors)
👨‍⚕️ handleError()      = Doctor (process the error)
📋 Log to service     = Medical records (Sentry, Azure)
📢 Notify user        = "Something went wrong" message
🏠 try/catch          = Treated at home (doesn't reach ER)
```

---

## 🧠 Mind Map

```mermaid
mindmap
  root((ErrorHandler))
    Catches
      Unhandled exceptions
      Template errors
      Lifecycle errors
    Actions
      Log error
      Notify user
      Report to service
    Limitations
      Caught errors skip it
      No retry capability
```
