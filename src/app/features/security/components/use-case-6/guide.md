# 📋 Use Case 6: Security Checklist

> **Goal**: Comprehensive security checklist for Angular applications.

---

## 1. 🛡️ Angular Security Checklist

### XSS Prevention
- [ ] Use Angular's default template escaping
- [ ] Avoid `bypassSecurityTrust*` unless absolutely necessary
- [ ] Use DOMPurify for user HTML content
- [ ] Never use `innerHTML` with user input

### Authentication
- [ ] Store access tokens in memory, not localStorage
- [ ] Use HttpOnly cookies for refresh tokens
- [ ] Implement token refresh before expiry
- [ ] Add idle timeout for sensitive apps

### CSRF Protection
- [ ] Enable Angular's XSRF handling
- [ ] Use SameSite cookies
- [ ] Validate origin/referer headers server-side

### CSP
- [ ] Implement Content-Security-Policy header
- [ ] Avoid 'unsafe-inline' and 'unsafe-eval'
- [ ] Use nonces for necessary inline scripts
- [ ] Set up CSP reporting

### Input Validation
- [ ] Validate all inputs client AND server-side
- [ ] Use parameterized queries (prevent SQL injection)
- [ ] Whitelist allowed values
- [ ] Validate file uploads thoroughly

### Dependencies
- [ ] Run `npm audit` regularly
- [ ] Keep Angular and dependencies updated
- [ ] Review third-party libraries

---

## 2. ❓ Interview Questions

### Scenario-Based Questions

#### Scenario 1: Security Review
**Question:** You're reviewing a PR. What security issues do you look for?

**Answer:**
1. **XSS**: Any `innerHTML`, `bypassSecurityTrust*`, or user input in templates
2. **Hardcoded secrets**: API keys, passwords in code
3. **Missing validation**: Input not validated before use
4. **Insecure storage**: Tokens in localStorage
5. **Missing error handling**: Stack traces exposed to users
6. **Insecure dependencies**: Outdated packages with CVEs

#### Scenario 2: Security Incident
**Question:** A user reports seeing another user's data. How do you respond?

**Answer:**
1. **Contain**: Disable affected feature if possible
2. **Investigate**: Check logs for unauthorized access patterns
3. **Identify**: Find the vulnerability (broken access control?)
4. **Fix**: Patch the code
5. **Notify**: Inform affected users if data was exposed
6. **Document**: Post-mortem for future prevention

---

### Quick Reference

#### HTTP Security Headers

```
Content-Security-Policy: default-src 'self';
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

#### OWASP Top 10 (Quick)

| # | Risk | Angular Mitigation |
|---|------|-------------------|
| 1 | Broken Access Control | Route guards, server auth |
| 2 | Cryptographic Failures | HTTPS, secure storage |
| 3 | Injection | Template escaping, validation |
| 4 | Insecure Design | Threat modeling |
| 5 | Security Misconfiguration | CSP, HTTP headers |
| 6 | Vulnerable Components | npm audit, updates |
| 7 | Auth Failures | Secure token handling |
| 8 | Data Integrity | Input validation |
| 9 | Logging Failures | Proper error handling |
| 10 | SSRF | URL validation |

---

## 🧠 Mind Map

```mermaid
mindmap
  root((Security Checklist))
    Client
      XSS prevention
      Input validation
      Secure storage
    Server
      Authentication
      Authorization
      CSRF tokens
    Infrastructure
      HTTPS
      Security headers
      Dependency updates
    Process
      Code review
      Security testing
      Incident response
```
