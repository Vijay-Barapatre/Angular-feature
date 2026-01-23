import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-simple-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4 rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-800 flex justify-between items-center mb-4 animate-fade-in">
      <span class="font-medium">✨ I am a Dynamically Created Component! ({{ timestamp | date:'mediumTime' }})</span>
      <button (click)="destroy()" class="text-indigo-600 hover:text-indigo-900 font-bold px-2">&times;</button>
    </div>
  `,
  styles: [`
    @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    .animate-fade-in { animation: fadeIn 0.3s ease-out; }
  `]
})
export class SimpleAlertComponent {
  timestamp = new Date();

  // Method to self-destruct (optional, for demo)
  destroy() {
    this.ref.destroy();
  }

  // We inject ComponentRef to access our own lifecycle/destruction method
  constructor(private ref: ComponentRef<SimpleAlertComponent>) { }
}

@Component({
  selector: 'app-basic-creation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full flex flex-col">
      <div class="p-6">
        <h2 class="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">
          Basic Creation (ViewContainerRef)
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Demo Area -->
          <div class="space-y-6">
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <h3 class="font-semibold text-slate-800 dark:text-slate-100 mb-4">View Container Host</h3>
              
              <div class="flex gap-4 mb-6">
                <button (click)="addComponent()" 
                        class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2">
                  <span class="text-xl">+</span> Add Component
                </button>
                <button (click)="clearAll()" 
                        class="px-4 py-2 text-rose-600 hover:bg-rose-50 hover:text-rose-700 border border-current rounded-lg transition-colors font-medium">
                  Clear All
                </button>
              </div>

              <!-- This is the container where components will be injected -->
              <div class="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-4 min-h-[200px] bg-slate-50 dark:bg-slate-900/50">
                 <p class="text-slate-400 text-center text-sm mb-4" *ngIf="componentCount === 0">
                   Components will appear here...
                 </p>
                 <ng-container #container></ng-container>
              </div>
              
              <p class="mt-2 text-right text-xs text-slate-500">
                Count: {{ componentCount }}
              </p>
            </div>
            
            <div class="p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-lg">
                <h4 class="font-semibold text-indigo-900 dark:text-indigo-200 mb-2">Key Concept</h4>
                <p class="text-sm text-indigo-800 dark:text-indigo-300">
                    <code>ViewContainerRef</code> represents a container where one or more views can be attached to a component. 
                    We use <code>createComponent(ComponentType)</code> to instantiate the component class and insert its host view into the DOM.
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
export class BasicCreationComponent {
  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  get componentCount() {
    return this.container ? this.container.length : 0;
  }

  addComponent() {
    // 1. Create the component dynamically
    this.container.createComponent(SimpleAlertComponent);
  }

  clearAll() {
    // 2. Destroy all views in the container
    this.container.clear();
  }
}
