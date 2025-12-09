# Scenario 6: The "Broken Image" Fixer 🖼️

## 🎯 Objective

Create a directive that automatically handles broken image links (404 errors) by swapping the source with a fallback placeholder.

## 📋 Scenario

Your e-commerce dashboard displays hundreds of product images. Occasionally, an image URL is invalid or the server is down. Instead of showing a browser's default "broken image" icon, you want to seamlessly show a generic placeholder.

## ✅ Requirements

- [ ] Create `appImageFallback` directive
- [ ] Listen for the `error` event on the host `<img>` element
- [ ] When an error occurs, update the `src` attribute to a fallback URL
- [ ] Allow the fallback URL to be customized via an `@Input`
- [ ] Default fallback should be `'https://via.placeholder.com/150?text=No+Image'`

## 🚀 To Do

1. Open `image-fallback.directive.ts`
2. Implement the logic to detect errors and update the DOM
3. Use the directive in the provided component template checks
