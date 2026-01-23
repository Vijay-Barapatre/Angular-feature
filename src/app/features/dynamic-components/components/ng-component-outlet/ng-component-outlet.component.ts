import { Component, Type } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';

// ----------------------------------------------------
// Dummy Widgets
// ----------------------------------------------------
@Component({
    selector: 'app-weather-widget',
    standalone: true,
    template: `
    <div class="h-full bg-sky-100 dark:bg-sky-900/30 p-4 rounded-lg flex flex-col items-center justify-center text-center animate-fade-in">
      <div class="text-4xl mb-2">🌤️</div>
      <div class="font-bold text-sky-900 dark:text-sky-100">San Francisco</div>
      <div class="text-sky-700 dark:text-sky-300">72°F / Sunny</div>
    </div>
  `
})
export class WeatherWidgetComponent { }

@Component({
    selector: 'app-stock-widget',
    standalone: true,
    template: `
    <div class="h-full bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-lg flex flex-col items-center justify-center text-center animate-fade-in">
      <div class="text-4xl mb-2">📈</div>
      <div class="font-bold text-emerald-900 dark:text-emerald-100">APPL</div>
      <div class="text-emerald-700 dark:text-emerald-300">$185.43 <span class="text-xs">▲0.5%</span></div>
    </div>
  `
})
export class StockWidgetComponent { }

@Component({
    selector: 'app-news-widget',
    standalone: true,
    template: `
    <div class="h-full bg-rose-100 dark:bg-rose-900/30 p-4 rounded-lg flex flex-col items-center justify-center text-center animate-fade-in">
      <div class="text-4xl mb-2">📰</div>
      <div class="font-bold text-rose-900 dark:text-rose-100">Breaking News</div>
      <div class="text-rose-700 dark:text-rose-300 text-sm">Angular releases new hydration features!</div>
    </div>
  `
})
export class NewsWidgetComponent { }

// ----------------------------------------------------
// Main Component
// ----------------------------------------------------
@Component({
    selector: 'app-ng-component-outlet',
    standalone: true,
    imports: [CommonModule, NgComponentOutlet], // Note: NgComponentOutlet import
    template: `
    <div class="h-full flex flex-col">
      <div class="p-6">
        <h2 class="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">
          *ngComponentOutlet
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Demo Area -->
          <div class="space-y-6">
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <h3 class="font-semibold text-slate-800 dark:text-slate-100 mb-4">Declarative Switcher</h3>
              
              <div class="flex gap-2 mb-6">
                <button *ngFor="let widget of widgets" 
                        (click)="activeComponent = widget.component"
                        [class.ring-2]="activeComponent === widget.component"
                        class="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-all border border-slate-200 dark:border-slate-600">
                   {{ widget.name }}
                </button>
              </div>

              <!-- THE MAGIC DIRECTIVE -->
              <div class="bg-slate-50 dark:bg-slate-900/50 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl h-64 p-4 flex items-center justify-center">
                  <ng-container *ngComponentOutlet="activeComponent"></ng-container>
                  
                  <p *ngIf="!activeComponent" class="text-slate-400">Select a widget to render</p>
              </div>
            </div>
            
            <div class="p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 rounded-lg">
                <h4 class="font-semibold text-rose-900 dark:text-rose-200 mb-2">Declarative vs Imperative</h4>
                <p class="text-sm text-rose-800 dark:text-rose-300">
                    Unlike <code>ViewContainerRef.createComponent()</code> (imperative), <code>*ngComponentOutlet</code> allows you to swap components purely in the template, acting like a dynamic version of <code>&lt;component-tag&gt;</code>.
                </p>
            </div>
          </div>

          <!-- Component/Guide Placeholder -->
          <div class="h-full"></div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
    .animate-fade-in { animation: fadeIn 0.3s ease-out; }
  `]
})
export class NgComponentOutletComponent {
    // We hold a reference to the CLASS (Type), not an instance
    activeComponent: Type<any> | null = null;

    widgets = [
        { name: 'Weather', component: WeatherWidgetComponent },
        { name: 'Stocks', component: StockWidgetComponent },
        { name: 'News', component: NewsWidgetComponent }
    ];
}
