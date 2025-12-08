import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-lazy-loading',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full flex flex-col">
      <div class="p-6">
        <h2 class="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">
          Lazy Loading Components
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Demo Area -->
          <div class="space-y-6">
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 min-h-[300px] flex flex-col">
              <h3 class="font-semibold text-slate-800 dark:text-slate-100 mb-4">On-Demand Widget Loading</h3>
              
              <div class="mb-8" *ngIf="!isLoaded">
                <p class="text-slate-500 dark:text-slate-400 mb-4">
                  The "Heavy Widget" component is not part of the initial bundle. 
                  Clicking the button will fetch its code from the server.
                </p>
                <div class="flex items-center gap-3">
                   <button (click)="loadComponent()" 
                           [disabled]="isLoading"
                           class="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-70 disabled:cursor-wait text-white rounded-lg transition-all font-medium shadow-md hover:shadow-lg flex items-center gap-2">
                     <span *ngIf="isLoading" class="animate-spin">⏳</span>
                     {{ isLoading ? 'Loading Chunk...' : 'Load Heavy Widget' }}
                   </button>
                   <span *ngIf="isLoading" class="text-xs text-amber-600 font-medium animate-pulse">Fetching JS...</span>
                </div>
              </div>

              <!-- Container for the lazy loaded component -->
              <ng-container #container></ng-container>

              <button *ngIf="isLoaded" (click)="clear()" class="mt-auto self-start text-sm text-red-500 hover:text-red-700 underline">
                Clear & Reset
              </button>
            </div>
            
            <div class="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-lg">
                <h4 class="font-semibold text-amber-900 dark:text-amber-200 mb-2">Performance Win</h4>
                <p class="text-sm text-amber-800 dark:text-amber-300">
                    By using <code>import('./path').then(m => m.Component)</code>, we tell Webpack/Esbuild to create a separate JS chunk file.
                    This reduces the main bundle size and speeds up initial page load.
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
export class LazyLoadingComponent {
    @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;
    isLoading = false;
    isLoaded = false;

    async loadComponent() {
        this.isLoading = true;

        // Simulate network delay to make it visible
        await new Promise(resolve => setTimeout(resolve, 800));

        // Dynamic Import!
        const { HeavyWidgetComponent } = await import('./heavy-widget.component');

        this.container.clear();
        this.container.createComponent(HeavyWidgetComponent);

        this.isLoading = false;
        this.isLoaded = true;
    }

    clear() {
        this.container.clear();
        this.isLoaded = false;
    }
}
