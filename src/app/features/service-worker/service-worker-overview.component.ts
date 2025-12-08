import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-service-worker-overview',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="container mx-auto p-6 max-w-4xl">
      <div class="mb-8 text-center">
        <h1 class="text-4xl font-bold mb-4 text-slate-800 dark:text-slate-100">
          Angular Service Worker (PWA)
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Transform your application into a Progressive Web App with offline capabilities, 
          caching strategies, and update management.
        </p>
        <div class="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg inline-block text-left">
          <p class="text-sm text-amber-800 dark:text-amber-300 font-medium flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            Requirement: Production Build
          </p>
          <p class="text-xs text-amber-700 dark:text-amber-400 mt-1">
            Service Workers generally only work in production mode. You must build the app 
            (<code>ng build</code>) and serve it with a static server (e.g., <code>http-server</code>) to test these features.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Use Case 1: Update Notifications -->
        <a [routerLink]="['update-notification']" 
           class="group block p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-700 hover:border-sky-500 dark:hover:border-sky-400">
          <div class="flex items-start gap-4">
            <div class="p-3 bg-sky-50 dark:bg-sky-900/30 rounded-lg group-hover:bg-sky-100 dark:group-hover:bg-sky-900/50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-sky-600 dark:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-semibold mb-2 text-slate-800 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                Update Notifications
              </h2>
              <p class="text-slate-600 dark:text-slate-400 text-sm">
                Detect when a new version of the app is available and prompt the user to reload using <code>SwUpdate</code>.
              </p>
            </div>
          </div>
        </a>

        <!-- Use Case 2: Caching Strategies -->
        <a [routerLink]="['caching-strategies']" 
           class="group block p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-400">
          <div class="flex items-start gap-4">
            <div class="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-semibold mb-2 text-slate-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Caching Strategies
              </h2>
              <p class="text-slate-600 dark:text-slate-400 text-sm">
                Explore <code>performance</code> vs <code>freshness</code> API caching strategies in <code>ngsw-config.json</code>.
              </p>
            </div>
          </div>
        </a>

        <!-- Use Case 3: Offline Indicator -->
        <a [routerLink]="['offline-indicator']" 
           class="group block p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-700 hover:border-rose-500 dark:hover:border-rose-400">
          <div class="flex items-start gap-4">
            <div class="p-3 bg-rose-50 dark:bg-rose-900/30 rounded-lg group-hover:bg-rose-100 dark:group-hover:bg-rose-900/50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-semibold mb-2 text-slate-800 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                Offline Indicator
              </h2>
              <p class="text-slate-600 dark:text-slate-400 text-sm">
                Detect network status changes and display a global offline warning to the user.
              </p>
            </div>
          </div>
        </a>

        <!-- Use Case 4: Push Notifications -->
        <a [routerLink]="['push-notifications']" 
           class="group block p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-700 hover:border-violet-500 dark:hover:border-violet-400">
          <div class="flex items-start gap-4">
            <div class="p-3 bg-violet-50 dark:bg-violet-900/30 rounded-lg group-hover:bg-violet-100 dark:group-hover:bg-violet-900/50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-semibold mb-2 text-slate-800 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                Push Notifications
              </h2>
              <p class="text-slate-600 dark:text-slate-400 text-sm">
                Learn about VAPID keys, requesting subscription permission, and handling push events.
              </p>
            </div>
          </div>
        </a>

        <!-- Use Case 5: Unrecoverable State & Bypass -->
        <a [routerLink]="['bypass-service-worker']" 
           class="group block p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-400">
          <div class="flex items-start gap-4">
            <div class="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-lg group-hover:bg-amber-100 dark:group-hover:bg-amber-900/50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-semibold mb-2 text-slate-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Bypass & Recovery
              </h2>
              <p class="text-slate-600 dark:text-slate-400 text-sm">
                 Handle broken hash states using the <code>unrecoverable</code> event and bypass the SW with <code>?ngsw-bypass</code>.
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  `,
    styles: [`
    :host {
      display: block;
    }
  `]
})
export class ServiceWorkerOverviewComponent { }
