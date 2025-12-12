# SSR Practice Exercises

This module provides hands-on practice exercises for Server-Side Rendering concepts.

## 🟦 Basic Exercises (4)

### Exercise 1: Platform Detection Basics
**Difficulty:** Easy | **Time:** 15 mins

**Objective:** Learn to detect browser vs server environment and guard browser-only code.

**Skills:** `isPlatformBrowser`, `isPlatformServer`, `PLATFORM_ID`

---

### Exercise 2: Safe DOM Access
**Difficulty:** Easy | **Time:** 20 mins

**Objective:** Use Renderer2 and DOCUMENT token for cross-platform DOM manipulation.

**Skills:** `Renderer2`, `DOCUMENT` injection, cross-platform code

---

### Exercise 3: Transfer State Basics
**Difficulty:** Medium | **Time:** 25 mins

**Objective:** Implement data sharing between server and client using TransferState.

**Skills:** `TransferState`, `makeStateKey`, state serialization

---

### Exercise 4: SEO Meta Tags
**Difficulty:** Easy | **Time:** 15 mins

**Objective:** Dynamically update page title and meta tags for SEO.

**Skills:** `Title` service, `Meta` service, Open Graph tags

---

## 🟥 Complex Scenarios (4)

### Scenario 1: SSR-Ready Data Service
**Difficulty:** Hard | **Time:** 40 mins

**Objective:** Build a service that fetches data server-side, caches it, and prevents duplicate calls on the client.

**Skills:** Transfer State, HttpClient, caching strategies

---

### Scenario 2: Browser-Only Components
**Difficulty:** Medium | **Time:** 30 mins

**Objective:** Create a chart component that only initializes on the browser, showing a placeholder during SSR.

**Skills:** `afterNextRender`, lazy loading, ngSkipHydration

---

### Scenario 3: Dynamic SEO Service
**Difficulty:** Medium | **Time:** 30 mins

**Objective:** Build a reusable SEO service that sets all meta tags from a configuration object.

**Skills:** Title, Meta, JSON-LD structured data, canonical URLs

---

### Scenario 4: Hybrid SSR/SSG Route Strategy
**Difficulty:** Hard | **Time:** 45 mins

**Objective:** Implement a hybrid approach where some routes are prerendered and others use SSR.

**Skills:** Route configuration, prerender options, cache strategies

---

## 🎯 Learning Outcomes

After completing these exercises, you will be able to:

1. ✅ Detect and handle platform differences in SSR apps
2. ✅ Use Renderer2 for cross-platform DOM manipulation
3. ✅ Implement Transfer State to prevent duplicate API calls
4. ✅ Configure SEO meta tags dynamically
5. ✅ Build browser-only components with graceful fallbacks
6. ✅ Create SSR-ready services with caching
7. ✅ Implement structured data for rich search results
8. ✅ Design hybrid SSR/SSG architectures
