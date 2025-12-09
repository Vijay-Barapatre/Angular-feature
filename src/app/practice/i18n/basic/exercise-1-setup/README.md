# Exercise 1: i18n Setup

## 🎯 Objective

Configure Angular i18n with @angular/localize.

## ✅ Requirements

- [ ] Add @angular/localize package
- [ ] Configure locales in angular.json
- [ ] Set source locale

## 💻 Solution

```bash
ng add @angular/localize
```

```json
// angular.json
{
  "projects": {
    "app": {
      "i18n": {
        "sourceLocale": "en-US",
        "locales": {
          "fr": "src/locale/messages.fr.xlf",
          "de": "src/locale/messages.de.xlf"
        }
      }
    }
  }
}
```

## 📊 Build per Locale

```bash
ng build --localize
# Creates: dist/app/en-US/, dist/app/fr/, dist/app/de/
```
