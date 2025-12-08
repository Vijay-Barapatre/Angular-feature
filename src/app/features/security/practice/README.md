# 🔒 Security in Angular - Practice Exercises

## 📘 Feature Overview

**Angular Security** encompasses protecting your application from common web vulnerabilities:

- **XSS (Cross-Site Scripting)**: Injecting malicious scripts
- **CSRF (Cross-Site Request Forgery)**: Tricking users into unwanted actions
- **Injection Attacks**: SQL, NoSQL, Command injection
- **Broken Authentication**: Session hijacking, insecure tokens

### Why It Matters
A single security vulnerability can:
- Expose user data (passwords, PII)
- Allow account takeover
- Damage reputation and trust
- Result in legal/compliance issues

### Angular's Built-in Protection
- **Template Sanitization**: Auto-escapes interpolated values
- **DomSanitizer**: Controls bypassing of security
- **HttpClient XSRF**: Built-in CSRF token support
- **AOT Compilation**: Prevents template injection

---

## 📄 Practice Requirement Document

### What You Will Learn
1. How Angular automatically prevents XSS attacks
2. When and how to use `DomSanitizer` safely
3. Implementing CSRF protection with Angular HttpClient
4. Secure JWT token handling patterns
5. Input validation and sanitization techniques
6. Building security-aware components

### Architecture Expectations
- Services handle security logic (not components)
- Interceptors centralize HTTP security
- Validators are reusable and testable
- Error handling is graceful and secure

### Key Rules During Implementation
1. ✅ NEVER bypass security for user-provided content
2. ✅ Always validate on both client AND server
3. ✅ Use HttpOnly cookies for sensitive tokens
4. ✅ Implement CSP headers in production
5. ✅ Never store secrets in frontend code
6. ❌ Don't use `eval()` or `innerHTML` with user input
7. ❌ Don't disable Angular's built-in sanitization

---

## 🟦 Basic Practice Exercises

### Exercise 1: Safe HTML Rendering
### Exercise 2: Secure Input Validation
### Exercise 3: XSRF Token Configuration  
### Exercise 4: Secure Local Storage Wrapper

---

## 🟥 Complex Scenario-Based Use Cases

### Scenario 1: XSS Attack Prevention Demo
### Scenario 2: JWT Token Refresh with Interceptor
### Scenario 3: Role-Based Content Security
### Scenario 4: Secure Form with Validation
### Scenario 5: Security Audit Logger

---

See individual component files for implementation details.
