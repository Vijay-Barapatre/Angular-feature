import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dashboard-settings',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full flex flex-col justify-center items-center text-center">
      <div class="mb-4 p-4 bg-white dark:bg-slate-800 rounded-full shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Settings Panel</h2>
      <p class="text-slate-500 dark:text-slate-400 max-w-xs">
        This component is rendered inside the SAME parent's router-outlet when the path is <span class="font-mono text-slate-500">.../settings</span>
      </p>
    </div>
  `
})
export class DashboardSettingsComponent { }
