import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwUpdate } from '@angular/service-worker';

@Component({
    selector: 'app-bypass-service-worker',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full flex flex-col">
      <div class="p-6">
        <h2 class="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">
          Unrecoverable State & Bypass
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Bypass Demo -->
          <div class="space-y-6">
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <h3 class="font-semibold text-slate-800 dark:text-slate-100 mb-4">Emergency Bypass</h3>
              
              <div class="space-y-4">
                 <div class="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                  <h4 class="font-medium text-amber-900 dark:text-amber-200 mb-2">Scenario: Broken Cache</h4>
                  <p class="text-sm text-amber-800 dark:text-amber-300">
                    If a bad Service Worker is deployed, it might serve a broken app and refuse to update.
                    You can force the browser to ignore the Service Worker using a special query parameter.
                  </p>
                </div>

                <div class="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
                  <p class="text-xs text-slate-500 font-mono mb-2">Query Parameter:</p>
                  <code class="block bg-slate-200 dark:bg-slate-800 p-2 rounded text-indigo-600 dark:text-indigo-400 font-mono text-sm mb-4">
                    ?ngsw-bypass=true
                  </code>
                  
                  <button (click)="bypassAndReload()" 
                          class="w-full px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clip-rule="evenodd" />
                    </svg>
                    Reload with Bypass
                  </button>
                </div>
              </div>
            </div>

            <div class="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg border border-rose-200 dark:border-rose-800">
               <h4 class="font-semibold text-rose-800 dark:text-rose-200 mb-2">Unrecoverable State</h4>
               <p class="text-sm text-rose-700 dark:text-rose-300">
                 The <code>unrecoverable</code> event fires when the browser tries to fetch a file that the SW expects to exist, but the server returns 404. 
                 This usually happens if you overwrite a deployment without keeping old hashed files (Atomic Deployment is recommended).
               </p>
            </div>
          </div>

          <!-- Component/Guide Placeholder -->
          <div class="h-full"></div>
        </div>
      </div>
    </div>
  `
})
export class BypassServiceWorkerComponent {
    constructor(private updates: SwUpdate) {
        if (this.updates.isEnabled) {
            this.updates.unrecoverable.subscribe(event => {
                console.error('Core app files missing. Reloading...', event.reason);
                document.location.reload();
            });
        }
    }

    bypassAndReload() {
        // Appending ngsw-bypass tells the Service Worker to let this request 
        // go straight to the network and NOT serve index.html from cache.
        const url = new URL(window.location.href);
        url.searchParams.set('ngsw-bypass', 'true');
        window.location.href = url.toString();
    }
}
