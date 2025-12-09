# Exercise 2: Mark for Translation

## 🎯 Objective

Use i18n attribute to mark content for translation.

## ✅ Requirements

- [ ] Mark text with i18n attribute
- [ ] Add meaning and description
- [ ] Mark attribute values

## 💻 Solution

```html
<!-- Basic -->
<h1 i18n>Welcome to our app</h1>

<!-- With ID for translators -->
<h1 i18n="@@welcomeHeader">Welcome</h1>

<!-- With meaning|description -->
<h1 i18n="site header|Main welcome message@@welcome">
  Welcome
</h1>

<!-- Attribute translation -->
<img i18n-alt alt="Company logo" src="logo.png">
<button i18n-title title="Submit form">Submit</button>

<!-- Pluralization -->
<span i18n>{count, plural,
  =0 {No items}
  =1 {One item}
  other {{{count}} items}
}</span>
```
