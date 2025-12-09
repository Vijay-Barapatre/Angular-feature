# Exercise 3: Extract & Translate

## 🎯 Objective

Generate and manage translation files.

## ✅ Requirements

- [ ] Extract messages with ng extract-i18n
- [ ] Create translation files
- [ ] Translate messages

## 💻 Solution

```bash
# Extract messages
ng extract-i18n --output-path src/locale

# Creates messages.xlf
```

```xml
<!-- src/locale/messages.fr.xlf -->
<trans-unit id="welcomeHeader">
  <source>Welcome</source>
  <target>Bienvenue</target>
</trans-unit>
```

```bash
# Build specific locale
ng build --configuration=fr

# Serve specific locale
ng serve --configuration=fr
```
