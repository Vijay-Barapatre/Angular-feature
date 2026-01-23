import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dynamic-modal',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" (click)="close()"></div>
      
      <!-- Content -->
      <div class="relative bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-scale-in border border-slate-200 dark:border-slate-700">
        <!-- Close Button -->
        <button (click)="close()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="p-6">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
    styles: [`
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    .animate-fade-in { animation: fadeIn 0.2s ease-out; }
    .animate-scale-in { animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
  `]
})
export class DynamicModalComponent {
    @Output() closeEvent = new EventEmitter<void>();

    close() {
        this.closeEvent.emit();
    }
}
