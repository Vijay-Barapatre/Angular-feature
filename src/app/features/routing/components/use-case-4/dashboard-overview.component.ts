import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dashboard-overview',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full flex flex-col justify-center items-center text-center">
      <div class="mb-4 p-4 bg-white dark:bg-slate-800 rounded-full shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Overview Panel</h2>
      <p class="text-slate-500 dark:text-slate-400 max-w-xs">
        This component is rendered inside the parent's router-outlet when the path is <span class="font-mono text-indigo-500">.../overview</span>
      </p>
    </div>
  `
})
export class DashboardOverviewComponent { }
