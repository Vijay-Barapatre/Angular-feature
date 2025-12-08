import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-programmatic-navigation',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full flex flex-col">
      <div class="p-6">
        <h2 class="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">
          Programmatic Navigation
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Action Demo -->
          <div class="space-y-6">
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <h3 class="font-semibold text-slate-800 dark:text-slate-100 mb-4">Navigation Actions</h3>
              
              <div class="space-y-4">
                <!-- Simple Navigate -->
                <div class="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
                  <p class="text-sm text-slate-600 dark:text-slate-400 mb-3">Navigate explicitly using array syntax.</p>
                  <button (click)="goHome()" 
                          class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium">
                    Go to Overview
                  </button>
                  <code class="block mt-2 text-xs text-slate-500 font-mono">this.router.navigate(['/routing'])</code>
                </div>

                <!-- Navigate Actions -->
                <div class="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
                  <p class="text-sm text-slate-600 dark:text-slate-400 mb-3">Simulate a logic-based redirect (e.g., after login).</p>
                  <button (click)="simulateLogin()" 
                          class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2">
                    <span *ngIf="isLoggingIn" class="animate-spin">⏳</span>
                    {{ isLoggingIn ? 'Logging in...' : 'Login & Go to Dashboard' }}
                  </button>
                  <code class="block mt-2 text-xs text-slate-500 font-mono">
                    .then(() => this.router.navigate(['../child-routes/overview'], {{ '{' }}relativeTo: this.route{{ '}' }}))
                  </code>
                </div>

                <!-- Navigate By URL -->
                <div class="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
                   <p class="text-sm text-slate-600 dark:text-slate-400 mb-3">Navigate using absolute string path.</p>
                   <button (click)="goByUrl()" 
                           class="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors font-medium">
                     Go to Query Params (By URL)
                   </button>
                   <code class="block mt-2 text-xs text-slate-500 font-mono">this.router.navigateByUrl('/routing/query-parameters?sort=asc')</code>
                </div>
              </div>
            </div>

            <div class="p-4 bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800 rounded-lg">
              <h4 class="font-semibold text-violet-900 dark:text-violet-300 mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
                Best Practice
              </h4>
              <p class="text-violet-800 dark:text-violet-400 text-sm">
                Prefer <code>router.navigate(['path', param])</code> over <code>navigateByUrl</code> string concatenation. It's safer and handles URL encoding for you.
              </p>
            </div>
          </div>

          <!-- Guide Placeholder -->
          <div class="h-full"></div>
        </div>
      </div>
    </div>
  `
})
export class ProgrammaticNavigationComponent {
    isLoggingIn = false;

    constructor(private router: Router, private route: ActivatedRoute) { }

    goHome() {
        this.router.navigate(['/routing']);
    }

    simulateLogin() {
        this.isLoggingIn = true;
        setTimeout(() => {
            this.isLoggingIn = false;
            // Relative navigation demonstration
            this.router.navigate(['../child-routes/overview'], { relativeTo: this.route });
        }, 1500);
    }

    goByUrl() {
        // Useful when you get a full URL strings from an API
        this.router.navigateByUrl('/routing/query-parameters?sort=asc');
    }
}
