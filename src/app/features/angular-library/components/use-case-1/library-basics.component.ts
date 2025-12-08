/**
 * ============================================================================
 * USE CASE 1: LIBRARY BASICS
 * ============================================================================
 * Generating, structuring, and configuring Angular libraries
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-library-basics',
  standalone: true,
  imports: [CommonModule],
  template: `
        <div class="container">
            <header class="header">
                <h1>🛠️ Library Basics</h1>
                <p class="subtitle">Generate, Structure & Configure</p>
            </header>

            <section class="generate-section">
                <h2>📦 Generating a Library</h2>
                <pre class="code terminal"><code># Generate a new library in your workspace
ng generate library my-awesome-lib

# Short form
ng g lib my-awesome-lib

# With prefix (recommended for components)
ng g lib my-awesome-lib --prefix=mal</code></pre>
            </section>

            <section class="structure-section">
                <h2>📁 Library Project Structure</h2>
                <div class="structure-visual">
                    <pre class="code"><code>workspace/
├── projects/
│   └── my-awesome-lib/           # 📚 Your library
│       ├── src/
│       │   ├── lib/              # 🧩 Library code
│       │   │   ├── my-awesome-lib.component.ts
│       │   │   ├── my-awesome-lib.service.ts
│       │   │   └── my-awesome-lib.module.ts
│       │   └── public-api.ts     # 🔑 Entry point - exports go here!
│       ├── ng-package.json       # 📋 ng-packagr config
│       ├── package.json          # 📋 npm package metadata
│       └── tsconfig.lib.json     # ⚙️ TypeScript config
├── angular.json                  # Workspace config (includes library)
└── tsconfig.json                 # Path mappings for local dev</code></pre>
                </div>
            </section>

            <section class="public-api-section">
                <h2>🔑 The public-api.ts (Entry Point)</h2>
                <p class="highlight">
                    This file defines what gets <strong>exported</strong> from your library.
                    Only items listed here are accessible to consumers!
                </p>
                <pre class="code"><code>// projects/my-awesome-lib/src/public-api.ts

/*
 * Public API Surface of my-awesome-lib
 * 🛡️ CRITICAL: Only export what consumers should use!
 */

// Components
export * from './lib/my-awesome-lib.component';
export * from './lib/button/button.component';
export * from './lib/card/card.component';

// Services
export * from './lib/my-awesome-lib.service';

// Directives
export * from './lib/highlight.directive';

// Pipes
export * from './lib/format-date.pipe';

// Module (if using NgModule-based approach)
export * from './lib/my-awesome-lib.module';</code></pre>
            </section>

            <section class="ng-package-section">
                <h2>📋 ng-package.json Configuration</h2>
                <pre class="code"><code>// projects/my-awesome-lib/ng-package.json
{{ '{' }}
  "$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
  "dest": "../../dist/my-awesome-lib",  // Build output location
  "lib": {{ '{' }}
    "entryFile": "src/public-api.ts"    // 🔑 Entry point
  {{ '}' }}
{{ '}' }}</code></pre>
            </section>

            <section class="package-json-section">
                <h2>📋 Library package.json</h2>
                <pre class="code"><code>// projects/my-awesome-lib/package.json
{{ '{' }}
  "name": "my-awesome-lib",
  "version": "0.0.1",
  "peerDependencies": {{ '{' }}
    "&#64;angular/common": "^17.0.0",   // 🛡️ Peer deps = consumer provides
    "&#64;angular/core": "^17.0.0"
  {{ '}' }},
  "dependencies": {{ '{' }}
    "tslib": "^2.3.0"
  {{ '}' }},
  "sideEffects": false               // 🌲 Enable tree-shaking
{{ '}' }}</code></pre>
            </section>

            <section class="tsconfig-section">
                <h2>⚙️ Path Mappings (Local Development)</h2>
                <pre class="code"><code>// tsconfig.json (workspace root)
{{ '{' }}
  "compilerOptions": {{ '{' }}
    "paths": {{ '{' }}
      // 🛡️ CRITICAL: Allows importing without building
      "my-awesome-lib": [
        "dist/my-awesome-lib"        // Built library (production)
      ],
      "my-awesome-lib/*": [
        "projects/my-awesome-lib/*", // Source files (development)
        "dist/my-awesome-lib/*"
      ]
    {{ '}' }}
  {{ '}' }}
{{ '}' }}</code></pre>
                <p class="note">
                    During development, you can import directly from source.
                    For production, always build first!
                </p>
            </section>

            <section class="angular-json-section">
                <h2>⚙️ angular.json Library Config</h2>
                <pre class="code"><code>// angular.json (auto-generated)
{{ '{' }}
  "projects": {{ '{' }}
    "my-awesome-lib": {{ '{' }}
      "projectType": "library",      // Not "application"!
      "root": "projects/my-awesome-lib",
      "sourceRoot": "projects/my-awesome-lib/src",
      "prefix": "mal",               // Component selector prefix
      "architect": {{ '{' }}
        "build": {{ '{' }}
          "builder": "&#64;angular-devkit/build-angular:ng-packagr"
        {{ '}' }},
        "test": {{ '{' }}
          "builder": "&#64;angular-devkit/build-angular:karma"
        {{ '}' }}
      {{ '}' }}
    {{ '}' }}
  {{ '}' }}
{{ '}' }}</code></pre>
            </section>

            <section class="key-differences">
                <h2>📊 Library vs Application</h2>
                <table>
                    <tr><th>Aspect</th><th>Application</th><th>Library</th></tr>
                    <tr><td>Runs standalone</td><td>✅ Yes</td><td>❌ No</td></tr>
                    <tr><td>Has index.html</td><td>✅ Yes</td><td>❌ No</td></tr>
                    <tr><td>Output format</td><td>Bundle (JS)</td><td>Package (npm)</td></tr>
                    <tr><td>Entry point</td><td>main.ts</td><td>public-api.ts</td></tr>
                    <tr><td>Build tool</td><td>esbuild/webpack</td><td>ng-packagr</td></tr>
                    <tr><td>Dependencies</td><td>Regular</td><td>Peer dependencies</td></tr>
                </table>
            </section>
        </div>
    `,
  styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); }

        .code { background: #1e1e2e; color: #a6e3a1; padding: 1.5rem; border-radius: 10px; overflow-x: auto; font-size: 0.8rem; }
        .code.terminal { background: #0d1117; color: #58a6ff; }

        section { margin-bottom: 2rem; }

        .highlight { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1rem 1.5rem; border-radius: 8px; margin-bottom: 1rem; }
        .note { background: #fef3c7; padding: 0.75rem; border-radius: 6px; margin-top: 1rem; }

        table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: var(--bg-secondary); }
    `]
})
export class LibraryBasicsComponent { }
