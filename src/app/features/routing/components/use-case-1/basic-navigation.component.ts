import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-basic-navigation',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    template: `
    <div class="h-full flex flex-col">
      <div class="p-6">
        <h2 class="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">
          Basic Navigation
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Interactive Demo -->
          <div class="space-y-8">
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div class="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                <h3 class="font-semibold text-slate-800 dark:text-slate-100">Navigation Menu Demo</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400">Notice the active state and avoiding full page reloads</p>
              </div>
              
              <div class="p-6">
                <nav class="flex flex-col space-y-2 max-w-xs mx-auto">
                  <!-- RouterLink vs Href Comparison -->
                  <a routerLink="/routing" 
                     routerLinkActive="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700"
                     [routerLinkActiveOptions]="{exact: true}"
                     class="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:bg-slate-50 dark:hover:bg-slate-700 transition-all font-medium text-slate-600 dark:text-slate-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Back to Overview (RouterLink)
                  </a>

                  <a href="/routing" 
                     class="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:bg-slate-50 dark:hover:bg-slate-700 transition-all font-medium text-slate-600 dark:text-slate-300 group">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-slate-400 group-hover:text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Full Reload (Href) <span class="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">Avoid</span>
                  </a>

                  <div class="my-4 border-t border-slate-200 dark:border-slate-700"></div>

                  <!-- Active Link Styling -->
                  <a routerLink="." 
                     routerLinkActive="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700"
                     class="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:bg-slate-50 dark:hover:bg-slate-700 transition-all font-medium text-slate-600 dark:text-slate-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Current Page (Active)
                  </a>
                </nav>
              </div>
            </div>

            <div class="p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-lg">
              <h4 class="font-semibold text-indigo-900 dark:text-indigo-300 mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
                Key Insight
              </h4>
              <p class="text-indigo-800 dark:text-indigo-400 text-sm">
                Always use <code>routerLink</code> for internal navigation. It intercepts the click and updates the view without reloading the entire page, preserving application state and performance.
              </p>
            </div>
          </div>

          <!-- Documentation placeholder -->
          <div class="h-full">
            <!-- This area will normally be covered by the guide on the right side in the layout, 
                 but for standalone view we can add some context -->
             <div class="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 h-full">
                <h3 class="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Why RouterLink?</h3>
                <ul class="space-y-4">
                  <li class="flex gap-3">
                    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-medium text-slate-800 dark:text-slate-200">SPA Performance</h4>
                      <p class="text-sm text-slate-600 dark:text-slate-400">Only the view component changes, not the entire DOM.</p>
                    </div>
                  </li>
                  <li class="flex gap-3">
                    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-medium text-slate-800 dark:text-slate-200">Active Styling</h4>
                      <p class="text-sm text-slate-600 dark:text-slate-400">Automatically applies classes when the route matches.</p>
                    </div>
                  </li>
                </ul>
             </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class BasicNavigationComponent { }
