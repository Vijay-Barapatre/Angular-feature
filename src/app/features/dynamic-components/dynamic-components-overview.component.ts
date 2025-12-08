import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dynamic-components-overview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mx-auto p-6 max-w-4xl">
      <div class="mb-8 text-center">
        <h1 class="text-4xl font-bold mb-4 text-slate-800 dark:text-slate-100">
          Dynamic Components
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Learn how to Create, Render, and Manage Angular components at runtime using <code>ViewContainerRef</code> and <code>*ngComponentOutlet</code>.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Use Case 1: Basic Creation -->
        <a [routerLink]="['basic-creation']" 
           class="group block p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400">
          <div class="flex items-start gap-4">
            <div class="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors">
              <span class="text-2xl">🌱</span>
            </div>
            <div>
              <h2 class="text-xl font-semibold mb-2 text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Basic Creation
              </h2>
              <p class="text-slate-600 dark:text-slate-400 text-sm">
                Understand the fundamentals of <code>ViewContainerRef</code> and <code>createComponent</code> to insert components dynamically.
              </p>
            </div>
          </div>
        </a>

        <!-- Use Case 2: Inputs & Outputs -->
        <a [routerLink]="['inputs-outputs']" 
           class="group block p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-400">
          <div class="flex items-start gap-4">
            <div class="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 transition-colors">
              <span class="text-2xl">🔌</span>
            </div>
            <div>
              <h2 class="text-xl font-semibold mb-2 text-slate-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Inputs & Outputs
              </h2>
              <p class="text-slate-600 dark:text-slate-400 text-sm">
                Learn how to programmatically set <code>&#64;Input()</code> and subscribe to <code>&#64;Output()</code> of dynamically created components.
              </p>
            </div>
          </div>
        </a>

        <!-- Use Case 3: Lazy Loading -->
        <a [routerLink]="['lazy-loading']" 
           class="group block p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-400">
          <div class="flex items-start gap-4">
            <div class="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-lg group-hover:bg-amber-100 dark:group-hover:bg-amber-900/50 transition-colors">
              <span class="text-2xl">💤</span>
            </div>
            <div>
              <h2 class="text-xl font-semibold mb-2 text-slate-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Lazy Loading
              </h2>
              <p class="text-slate-600 dark:text-slate-400 text-sm">
                Optimize performance by fetching component code only when needed using <code>import()</code>.
              </p>
            </div>
          </div>
        </a>

        <!-- Use Case 4: NgComponentOutlet -->
        <a [routerLink]="['ng-component-outlet']" 
           class="group block p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-700 hover:border-rose-500 dark:hover:border-rose-400">
          <div class="flex items-start gap-4">
            <div class="p-3 bg-rose-50 dark:bg-rose-900/30 rounded-lg group-hover:bg-rose-100 dark:group-hover:bg-rose-900/50 transition-colors">
              <span class="text-2xl">🧩</span>
            </div>
            <div>
              <h2 class="text-xl font-semibold mb-2 text-slate-800 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                *ngComponentOutlet
              </h2>
              <p class="text-slate-600 dark:text-slate-400 text-sm">
                The declarative approach. Switch components in your template without writing TS boilerplate.
              </p>
            </div>
          </div>
        </a>

        <!-- Use Case 5: Modal Service -->
        <a [routerLink]="['modal-service']" 
           class="group block p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-700 hover:border-violet-500 dark:hover:border-violet-400 md:col-span-2">
          <div class="flex items-start gap-4">
            <div class="p-3 bg-violet-50 dark:bg-violet-900/30 rounded-lg group-hover:bg-violet-100 dark:group-hover:bg-violet-900/50 transition-colors">
              <span class="text-2xl">🪄</span>
            </div>
            <div>
              <h2 class="text-xl font-semibold mb-2 text-slate-800 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                Dynamic Modal Service
              </h2>
              <p class="text-slate-600 dark:text-slate-400 text-sm">
                Build a professional <code>ModalService.open()</code> that appends components to the body, bypassing the normal template hierarchy.
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  `
})
export class DynamicComponentsOverviewComponent { }
