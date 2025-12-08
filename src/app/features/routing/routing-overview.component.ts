import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-routing-overview',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="container mx-auto p-6 max-w-4xl">
      <div class="mb-8 text-center">
        <h1 class="text-4xl font-bold mb-4 text-slate-800 dark:text-slate-100">
          Angular Routing & Navigation
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Master the Angular Router: From basic navigation to advanced patterns like 
          lazy loading, guards, and programmatic control.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Use Case 1: Basic Navigation -->
        <a [routerLink]="['basic-navigation']" 
           class="group block p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400">
          <div class="flex items-start gap-4">
            <div class="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-semibold mb-2 text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Basic Navigation
              </h2>
              <p class="text-slate-600 dark:text-slate-400 text-sm">
                Fundamental routing concepts including routerLink, routerLinkActive, and router-outlet configuration.
              </p>
            </div>
          </div>
        </a>

        <!-- Use Case 2: Route Parameters -->
        <a [routerLink]="['route-parameters']" 
           class="group block p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-700 hover:border-rose-500 dark:hover:border-rose-400">
          <div class="flex items-start gap-4">
            <div class="p-3 bg-rose-50 dark:bg-rose-900/30 rounded-lg group-hover:bg-rose-100 dark:group-hover:bg-rose-900/50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-semibold mb-2 text-slate-800 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                Route Parameters
              </h2>
              <p class="text-slate-600 dark:text-slate-400 text-sm">
                Pass and retrieve data using required and optional route parameters with ActivatedRoute.
              </p>
            </div>
          </div>
        </a>

        <!-- Use Case 3: Query Parameters -->
        <a [routerLink]="['query-parameters']" 
           class="group block p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-400">
          <div class="flex items-start gap-4">
            <div class="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-lg group-hover:bg-amber-100 dark:group-hover:bg-amber-900/50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-semibold mb-2 text-slate-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Query Parameters
              </h2>
              <p class="text-slate-600 dark:text-slate-400 text-sm">
                Master query strings for filtering, sorting, and preserving state across navigation events.
              </p>
            </div>
          </div>
        </a>

        <!-- Use Case 4: Child Routes -->
        <a [routerLink]="['child-routes']" 
           class="group block p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-400">
          <div class="flex items-start gap-4">
            <div class="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-semibold mb-2 text-slate-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Child Routes
              </h2>
              <p class="text-slate-600 dark:text-slate-400 text-sm">
                Structure complex layouts using nested routes and multiple router-outlet targets.
              </p>
            </div>
          </div>
        </a>

        <!-- Use Case 5: Programmatic Navigation -->
        <a [routerLink]="['programmatic-navigation']" 
           class="group block p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-700 hover:border-violet-500 dark:hover:border-violet-400">
          <div class="flex items-start gap-4">
            <div class="p-3 bg-violet-50 dark:bg-violet-900/30 rounded-lg group-hover:bg-violet-100 dark:group-hover:bg-violet-900/50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-semibold mb-2 text-slate-800 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                Programmatic Navigation
              </h2>
              <p class="text-slate-600 dark:text-slate-400 text-sm">
                Control navigation logic with the Router API, including extras and navigation events.
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
export class RoutingOverviewComponent { }
