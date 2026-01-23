import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-route-parameters',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="h-full flex flex-col">
      <div class="p-6">
        <h2 class="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">
          Route Parameters
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- User List Demo -->
          <div class="space-y-6">
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div class="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                <h3 class="font-semibold text-slate-800 dark:text-slate-100">User Directory</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400">Select a user to view their profile details</p>
              </div>
              
              <div class="divide-y divide-slate-200 dark:divide-slate-700">
                <a *ngFor="let user of users" 
                   [routerLink]="['user', user.id]"
                   class="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors group">
                  <div class="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-slate-500 dark:text-slate-300 font-medium">
                    {{user.name.charAt(0)}}
                  </div>
                  <div class="flex-1">
                    <h4 class="font-medium text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {{user.name}}
                    </h4>
                    <p class="text-xs text-slate-500 dark:text-slate-400">{{user.role}}</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            <div class="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-lg">
              <h4 class="font-semibold text-amber-900 dark:text-amber-300 mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
                URL Structure
              </h4>
              <p class="text-amber-800 dark:text-amber-400 text-sm font-mono">
                /features/routing/route-parameters/user/{{ '{' }}id{{ '}' }}
              </p>
            </div>
          </div>
          
          <!-- Guide placeholder -->
          <div class="h-full"></div>
        </div>
      </div>
    </div>
  `
})
export class RouteParametersComponent {
    users = [
        { id: 1, name: 'Alice Johnson', role: 'Frontend Engineer' },
        { id: 2, name: 'Bob Smith', role: 'Product Designer' },
        { id: 3, name: 'Charlie Brown', role: 'Project Manager' },
        { id: 4, name: 'Diana Prince', role: 'DevOps Specialist' }
    ];
}
