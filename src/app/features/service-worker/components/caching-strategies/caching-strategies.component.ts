import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-caching-strategies',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full flex flex-col">
      <div class="p-6">
        <h2 class="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">
          Caching Strategies
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Strategy Demo -->
          <div class="space-y-6">
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <h3 class="font-semibold text-slate-800 dark:text-slate-100 mb-4">Configured Strategies</h3>
              
              <div class="space-y-4">
                <!-- AssetGroup: Performance -->
                <div class="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg border border-emerald-100 dark:border-emerald-800">
                  <div class="flex items-start gap-3">
                    <div class="p-2 bg-emerald-100 dark:bg-emerald-800 rounded text-emerald-600 dark:text-emerald-300">
                      ⚡
                    </div>
                    <div>
                      <h4 class="font-medium text-emerald-900 dark:text-emerald-200">AssetGroup: Performance</h4>
                      <p class="text-sm text-emerald-700 dark:text-emerald-400 mt-1">
                        Strategy: <code>performance</code>
                      </p>
                      <p class="text-xs text-emerald-600 dark:text-emerald-500 mt-2">
                        Files: Fonts, CSS, Images, JS bundles. <br>
                        Behavior: Serve from cache IMMEDIATELY. Update in background.
                      </p>
                    </div>
                  </div>
                </div>

                <!-- DataGroup: Freshness -->
                <div class="p-4 bg-sky-50 dark:bg-sky-900/30 rounded-lg border border-sky-100 dark:border-sky-800">
                  <div class="flex items-start gap-3">
                    <div class="p-2 bg-sky-100 dark:bg-sky-800 rounded text-sky-600 dark:text-sky-300">
                      📡
                    </div>
                    <div>
                      <h4 class="font-medium text-sky-900 dark:text-sky-200">DataGroup: Freshness</h4>
                      <p class="text-sm text-sky-700 dark:text-sky-400 mt-1">
                        Strategy: <code>freshness</code>
                      </p>
                      <p class="text-xs text-sky-600 dark:text-sky-500 mt-2">
                        URLs: <code>/api/*</code> <br>
                        Behavior: Try network first. Use cache only if offline/slow.
                      </p>
                      <button (click)="fetchData()" class="mt-3 px-3 py-1.5 bg-sky-600 text-white text-xs rounded hover:bg-sky-700 transition-colors">
                        Test API Call (Check Network Tab)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

             <div class="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800">
                <h4 class="font-semibold text-slate-800 dark:text-slate-200 mb-2">How to Verify</h4>
                <ol class="list-decimal list-inside text-sm text-slate-600 dark:text-slate-400 space-y-2">
                  <li>Run <code>npm run build</code> and serve with <code>http-server</code>.</li>
                  <li>Open DevTools > Network.</li>
                  <li>Click "Test API Call".</li>
                  <li>Offline Mode: Toggle "Offline" in DevTools.</li>
                  <li>Click "Test API Call" again -> Should serve from cache (if configured) or fail (if strictly freshness with no timeout).</li>
                </ol>
             </div>
          </div>

          <!-- Component/Guide Placeholder -->
          <div class="h-full"></div>
        </div>
      </div>
    </div>
  `
})
export class CachingStrategiesComponent {
    constructor(private http: HttpClient) { }

    fetchData() {
        // Just a dummy call to trigger the Service Worker interceptor
        this.http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe(
            data => console.log('API Data:', data),
            err => console.error('API Error:', err)
        );
    }
}
