# Exercise 4: Locale-Aware Pipes

## 🎯 Objective

Use Angular pipes that respect the current locale.

## ✅ Requirements

- [ ] Register locale data
- [ ] Use DatePipe with locale
- [ ] Use CurrencyPipe with locale
- [ ] Use DecimalPipe

## 💻 Solution

```typescript
// app.config.ts
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeDeExtra from '@angular/common/locales/extra/de';

registerLocaleData(localeFr);
registerLocaleData(localeDeExtra);
```

```html
<!-- Template -->
{{ birthday | date:'fullDate' }}
<!-- en-US: "Saturday, January 1, 2024" -->
<!-- fr: "samedi 1 janvier 2024" -->

{{ price | currency:'EUR' }}
<!-- en-US: "€1,234.56" -->
<!-- de: "1.234,56 €" -->

{{ value | number:'1.2-3' }}
<!-- Locale-aware decimal formatting -->
```
