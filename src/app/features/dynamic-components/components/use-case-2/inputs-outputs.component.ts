import { Component, ComponentRef, EventEmitter, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';

// ----------------------------------------------------
// The Dynamic Child Component
// ----------------------------------------------------
@Component({
    selector: 'app-dynamic-user-card',
    standalone: true,
    template: `
    <div class="p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4 animate-slide-in">
      <div class="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-2xl">
        {{ avatar }}
      </div>
      <div class="flex-1">
        <h4 class="font-bold text-slate-800 dark:text-slate-100">{{ name }}</h4>
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ role }}</p>
      </div>
      <button (click)="onDelete()" class="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 p-2 rounded-full transition-colors">
        🗑️
      </button>
    </div>
  `,
    styles: [`
    @keyframes slideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
    .animate-slide-in { animation: slideIn 0.3s ease-out; }
  `]
})
export class DynamicUserCardComponent {
    @Input() name = 'Unknown User';
    @Input() role = 'Guest';
    @Input() avatar = '👤';
    @Output() delete = new EventEmitter<void>();

    onDelete() {
        this.delete.emit();
    }
}

// ----------------------------------------------------
// The Host Component
// ----------------------------------------------------
@Component({
    selector: 'app-inputs-outputs',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full flex flex-col">
      <div class="p-6">
        <h2 class="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">
          Inputs & Outputs
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Demo Area -->
          <div class="space-y-6">
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <h3 class="font-semibold text-slate-800 dark:text-slate-100 mb-4">User Management</h3>
              
              <div class="flex flex-wrap gap-2 mb-6">
                <button (click)="addUser('Alice', 'Engineer', '👩‍💻')" 
                        class="px-3 py-1.5 bg-sky-100 text-sky-700 hover:bg-sky-200 rounded-md text-sm font-medium transition-colors">
                  + Add Alice
                </button>
                <button (click)="addUser('Bob', 'Designer', '🎨')" 
                        class="px-3 py-1.5 bg-amber-100 text-amber-700 hover:bg-amber-200 rounded-md text-sm font-medium transition-colors">
                  + Add Bob
                </button>
                <button (click)="addUser('Charlie', 'Manager', '👔')" 
                        class="px-3 py-1.5 bg-violet-100 text-violet-700 hover:bg-violet-200 rounded-md text-sm font-medium transition-colors">
                  + Add Charlie
                </button>
              </div>

              <div class="space-y-3 min-h-[100px]">
                 <ng-container #container></ng-container>
                 <p *ngIf="logMessages.length > 0" class="text-xs text-slate-400 mt-4 border-t pt-2">
                    Logs:
                 </p>
                 <div class="text-xs font-mono text-slate-500 max-h-32 overflow-y-auto">
                    <div *ngFor="let log of logMessages">{{ log }}</div>
                 </div>
              </div>
            </div>
            
            <div class="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-lg">
                <h4 class="font-semibold text-emerald-900 dark:text-emerald-200 mb-2">Key Concept</h4>
                <ul class="list-disc list-inside text-sm text-emerald-800 dark:text-emerald-300 space-y-1">
                    <li>Use <code>ref.setInput('key', value)</code> to safely set Inputs.</li>
                    <li>Access <code>ref.instance.output.subscribe()</code> to listen to Outputs.</li>
                </ul>
            </div>
          </div>

          <!-- Component/Guide Placeholder -->
          <div class="h-full"></div>
        </div>
      </div>
    </div>
  `
})
export class InputsOutputsComponent {
    @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;
    logMessages: string[] = [];

    addUser(name: string, role: string, avatar: string) {
        // 1. Create the component
        const ref: ComponentRef<DynamicUserCardComponent> = this.container.createComponent(DynamicUserCardComponent);

        // 2. Set Inputs (The Modern Way: setInput handles signal inputs too)
        ref.setInput('name', name);
        ref.setInput('role', role);
        ref.setInput('avatar', avatar);

        // 3. Subscribe to Outputs (Manually manage subscription)
        const sub = ref.instance.delete.subscribe(() => {
            this.log(`Deleted user: ${name}`);
            // Destroy the specific component view
            ref.destroy();
            // Don't forget to unsubscribe to prevent leaks (though destroying ref usually cleans up)
            sub.unsubscribe();
        });

        this.log(`Added user: ${name}`);
    }

    log(msg: string) {
        this.logMessages.unshift(`[${new Date().toLocaleTimeString()}] ${msg}`);
    }
}
