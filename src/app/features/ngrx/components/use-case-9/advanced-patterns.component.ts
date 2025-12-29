import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-advanced-patterns',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full flex flex-col">
      <div class="p-6">
        <h2 class="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">
          Advanced NgRx Patterns
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Meta-Reducers -->
          <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h3 class="font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
              <span class="text-2xl">⚙️</span>
              Meta-Reducers
            </h3>
            
            <div class="space-y-4">
              <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                <div class="font-semibold text-blue-900 dark:text-blue-200 mb-2">Logger Meta-Reducer</div>
                <p class="text-sm text-blue-800 dark:text-blue-300">
                  Logs every action and state change to console
                </p>
              </div>

              <div class="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
                <div class="font-semibold text-purple-900 dark:text-purple-200 mb-2">State Persistence</div>
                <p class="text-sm text-purple-800 dark:text-purple-300">
                  Automatically saves state to localStorage
                </p>
              </div>

              <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                <div class="font-semibold text-green-900 dark:text-green-200 mb-2">State Reset</div>
                <p class="text-sm text-green-800 dark:text-green-300">
                  Clears state on logout action
                </p>
              </div>
            </div>
          </div>

          <!-- Runtime Checks -->
          <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h3 class="font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
              <span class="text-2xl">🔍</span>
              Runtime Checks
            </h3>
            
            <div class="space-y-4">
              <div class="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800">
                <div class="font-semibold text-red-900 dark:text-red-200 mb-2">Immutability Check</div>
                <p class="text-sm text-red-800 dark:text-red-300">
                  Detects state mutations in development
                </p>
              </div>

              <div class="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-800">
                <div class="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">Action Serializability</div>
                <p class="text-sm text-yellow-800 dark:text-yellow-300">
                  Ensures actions are JSON-serializable
                </p>
              </div>

              <div class="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800">
                <div class="font-semibold text-indigo-900 dark:text-indigo-200 mb-2">Strict Action Checks</div>
                <p class="text-sm text-indigo-800 dark:text-indigo-300">
                  Prevents dispatching within reducers
                </p>
              </div>
            </div>
          </div>

          <!-- Code Examples -->
          <div class="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 lg:col-span-2">
            <h3 class="font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
              <span class="text-2xl">💻</span>
              Configuration Examples
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div class="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Meta-Reducer Setup</div>
                <pre class="text-xs bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto"><code>provideStore(
  reducers,
  {{'{'}}{{'}'meta reducers:[
    logger,
    localStorageSync
  ]}}
)</code></pre>
              </div>

              <div>
                <div class="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Runtime Checks</div>
                <pre class="text-xs bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto"><code>provideStore(reducers, {{'{'}}{{'}'
  runtimeChecks: {{'{'}}{{'}'
    strictStateImmutability: true,
    strictActionImmutability: true,
    strictActionSerializability: true
  }}
}})</code></pre>
              </div>
            </div>
          </div>

          <!-- Benefits -->
          <div class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl shadow-sm border border-green-100 dark:border-green-800 p-6 lg:col-span-2">
            <h3 class="font-semibold text-green-900 dark:text-green-200 mb-4 flex items-center gap-2">
              <span class="text-2xl">✨</span>
              Production-Ready Patterns
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div class="font-semibold text-green-800 dark:text-green-300 mb-2">Meta-Reducers</div>
                <ul class="text-sm text-green-700 dark:text-green-400 space-y-1">
                  <li>• Cross-cutting concerns</li>
                  <li>• Logging & debugging</li>
                  <li>• State persistence</li>
                  <li>• Global state reset</li>
                </ul>
              </div>

              <div>
                <div class="font-semibold text-green-800 dark:text-green-300 mb-2">Runtime Checks</div>
                <ul class="text-sm text-green-700 dark:text-green-400 space-y-1">
                  <li>• Catch mutations early</li>
                  <li>• Ensure serializability</li>
                  <li>• Development-only checks</li>
                  <li>• Better error messages</li>
                </ul>
              </div>

              <div>
                <div class="font-semibold text-green-800 dark:text-green-300 mb-2">State Hydration</div>
                <ul class="text-sm text-green-700 dark:text-green-400 space-y-1">
                  <li>• SSR state transfer</li>
                  <li>• Preload from API</li>
                  <li>• Restore on refresh</li>
                  <li>• Better performance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Info Note -->
        <div class="mt-8 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <span class="text-2xl">ℹ️</span>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-blue-800 dark:text-blue-200">
                Production Best Practices
              </h3>
              <div class="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <p>These advanced patterns are essential for production-ready NgRx applications:</p>
                <ul class="list-disc list-inside mt-2 space-y-1">
                  <li><strong>Meta-reducers</strong> handle cross-cutting concerns like logging and persistence</li>
                  <li><strong>Runtime checks</strong> catch common mistakes during development</li>
                  <li><strong>State hydration</strong> improves initial load performance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: []
})
export class AdvancedPatternsComponent { }
