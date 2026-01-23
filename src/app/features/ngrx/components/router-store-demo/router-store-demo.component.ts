import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getRouterSelectors } from '@ngrx/router-store';

@Component({
  selector: 'app-router-store-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full flex flex-col">
      <div class="p-6">
        <h2 class="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">
          Router Store (&#64;ngrx/router-store)
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Router State from Store -->
          <div class="space-y-6">
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <h3 class="font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <span class="text-2xl">🔗</span>
                Router State from Store
              </h3>
              
              <div class="space-y-3">
                <div class="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
                  <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">Current URL</div>
                  <div class="text-sm font-mono text-slate-700 dark:text-slate-300">{{ (currentUrl$ | async) || 'N/A' }}</div>
                </div>

                <div class="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
                  <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">Query Params</div>
                  <div class="text-sm font-mono text-slate-700 dark:text-slate-300">{{ (queryParams$ | async) | json }}</div>
                </div>

                <div class="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
                  <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">Route Params</div>
                  <div class="text-sm font-mono text-slate-700 dark:text-slate-300">{{ (params$ | async) | json }}</div>
                </div>

                <div class="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
                  <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">Route Data</div>
                  <div class="text-sm font-mono text-slate-700 dark:text-slate-300">{{ (data$ | async) | json }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation Actions -->
          <div class="space-y-6">
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <h3 class="font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <span class="text-2xl">🧭</span>
                Navigate via Router
              </h3>
              
              <div class="space-y-3">
                <button 
                  (click)="navigateToUseCase1()"
                  class="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-left">
                  <div class="font-semibold">Go to </div>
                  <div class="text-xs text-blue-100 mt-1">Navigate programmatically</div>
                </button>

                <button 
                  (click)="navigateWithParams()"
                  class="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium text-left">
                  <div class="font-semibold">Navigate with Query Params</div>
                  <div class="text-xs text-purple-100 mt-1">Add ?page=2&sort=name</div>
                </button>

                <button 
                  (click)="goBack()"
                  class="w-full px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium text-left">
                  <div class="font-semibold">Go Back</div>
                  <div class="text-xs text-gray-100 mt-1">Use browser history</div>
                </button>
              </div>
            </div>

            <div class="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl shadow-sm border border-indigo-100 dark:border-indigo-800 p-6">
              <h3 class="font-semibold text-indigo-900 dark:text-indigo-200 mb-3 flex items-center gap-2">
                <span class="text-2xl">💡</span>
                Key Concept
              </h3>
              <p class="text-sm text-indigo-800 dark:text-indigo-300 leading-relaxed">
                <strong>Router Store</strong> syncs Angular Router state with NgRx Store. This allows you to:
                <br/>• Select route info using <code class="px-1 py-0.5 bg-white dark:bg-slate-800 rounded">selectors</code>
                <br/>• Navigate via <code class="px-1 py-0.5 bg-white dark:bg-slate-800 rounded">actions/effects</code>
                <br/>• Trigger data loading based on routes
                <br/>• Time-travel through navigation history
              </p>
            </div>
          </div>
        </div>

        <!-- Info Section -->
        <div class="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <span class="text-2xl">⚠️</span>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Router Store Setup Required
              </h3>
              <div class="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                <p>To use <code class="px-1 bg-yellow-100 dark:bg-yellow-800 rounded">&#64;ngrx/router-store</code>, you need to:</p>
                <ol class="list-decimal list-inside mt-2 space-y-1">
                  <li>Install: <code class="px-1 bg-yellow-100 dark:bg-yellow-800 rounded">npm install &#64;ngrx/router-store</code></li>
                  <li>Add <code class="px-1 bg-yellow-100 dark:bg-yellow-800 rounded">provideRouterStore()</code> to app config</li>
                  <li>Use <code class="px-1 bg-yellow-100 dark:bg-yellow-800 rounded">getRouterSelectors()</code> to access route state</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    code {
      font-family: 'Courier New', monospace;
      font-size: 0.875rem;
    }
  `]
})
export class RouterStoreDemoComponent {
  // Router selectors from Store
  private selectors = getRouterSelectors();

  currentUrl$ = this.store.select(this.selectors.selectUrl);
  queryParams$ = this.store.select(this.selectors.selectQueryParams);
  params$ = this.store.select(this.selectors.selectRouteParams);
  data$ = this.store.select(this.selectors.selectRouteData);

  constructor(
    private router: Router,
    private store: Store
  ) { }

  navigateToUseCase1(): void {
    this.router.navigate(['/ngrx/use-case-1']);
  }

  navigateWithParams(): void {
    this.router.navigate([], {
      queryParams: { page: 2, sort: 'name' },
      queryParamsHandling: 'merge'
    });
  }

  goBack(): void {
    window.history.back();
  }
}
