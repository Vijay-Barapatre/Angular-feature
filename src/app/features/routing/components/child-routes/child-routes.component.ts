import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-child-routes',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
    template: `
    <div class="h-full flex flex-col">
      <div class="p-6">
        <h2 class="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">
          Child Routes (Nested Routing)
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Nested Layout Demo -->
          <div class="space-y-6">
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col h-[500px]">
              
              <!-- Parent Header -->
              <div class="bg-slate-800 text-white p-4">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="font-bold text-lg">Admin Dashboard</h3>
                  <span class="text-xs bg-indigo-500 px-2 py-0.5 rounded">Parent Component</span>
                </div>
                
                <!-- Child Navigation -->
                <nav class="flex space-x-1">
                  <a routerLink="overview" 
                     routerLinkActive="bg-white/20 text-white"
                     class="px-3 py-2 rounded-t-lg hover:bg-white/10 text-slate-300 text-sm font-medium transition-colors">
                    Overview
                  </a>
                  <a routerLink="settings" 
                     routerLinkActive="bg-white/20 text-white"
                     class="px-3 py-2 rounded-t-lg hover:bg-white/10 text-slate-300 text-sm font-medium transition-colors">
                    Settings
                  </a>
                </nav>
              </div>

              <!-- Child Outlet Area -->
              <div class="flex-1 bg-slate-50 dark:bg-slate-900/50 p-6 relative">
                 <!-- The dotted border emphasizes the outlet boundary -->
                 <div class="absolute inset-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg pointer-events-none"></div>
                 <div class="absolute top-0 right-0 m-2 px-2 py-1 bg-amber-100 text-amber-800 text-xs font-mono rounded border border-amber-200">
                   &lt;router-outlet&gt;
                 </div>
                 
                 <!-- Where children are rendered -->
                 <div class="h-full pt-4">
                   <router-outlet></router-outlet>
                 </div>
              </div>
            </div>

            <div class="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-lg">
              <h4 class="font-semibold text-emerald-900 dark:text-emerald-300 mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
                Relative Navigation
              </h4>
              <p class="text-emerald-800 dark:text-emerald-400 text-sm">
                In child routes, links like <code>routerLink="settings"</code> are relative to the parent. No need to type the full path!
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
export class ChildRoutesComponent { }
