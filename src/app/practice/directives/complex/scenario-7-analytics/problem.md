# Scenario 7: The "Click Tracker" for Analytics 📊

## 🎯 Objective

Create a directive that logs analytics events when an element is clicked, without cluttering component logic.

## 📋 Scenario

Your marketing team wants to track user interactions on various buttons (e.g., "Buy Now", "Sign Up"). Instead of manually calling `analyticsService.log()` in every component method, you want a declarative way to tag elements for tracking directly in the template.

## ✅ Requirements

- [ ] Create `appTrackClick` directive
- [ ] Accept a tracking ID string (e.g., `'hero_signup_btn'`) via `@Input`
- [ ] Listen for the `click` event on the host element
- [ ] When clicked, log a message to the console: `[Analytics] Tracked click: <TRACKING_ID>`

## 🚀 To Do

1. Open `click-tracker.directive.ts`
2. Implement the `@Input` to receive the tracking ID
3. Use `@HostListener` to capture clicks
4. Log the event with the correct ID
