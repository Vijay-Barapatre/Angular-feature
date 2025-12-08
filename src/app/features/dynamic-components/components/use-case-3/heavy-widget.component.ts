import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-heavy-widget',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl shadow-lg animate-fade-in">
      <div class="flex items-center gap-4 mb-4">
        <div class="text-4xl">📊</div>
        <div>
          <h3 class="text-xl font-bold text-amber-900 dark:text-amber-100">Heavy Analytics Widget</h3>
          <p class="text-sm text-amber-700 dark:text-amber-300">Loaded efficiently on demand!</p>
        </div>
      </div>
      
      <div class="grid grid-cols-3 gap-2 h-24">
        <div class="bg-amber-200 dark:bg-amber-800 rounded animate-pulse" style="animation-delay: 0ms"></div>
        <div class="bg-amber-300 dark:bg-amber-700 rounded animate-pulse" style="animation-delay: 100ms"></div>
        <div class="bg-amber-400 dark:bg-amber-600 rounded animate-pulse" style="animation-delay: 200ms"></div>
      </div>
      <p class="mt-4 text-xs font-mono text-amber-800/60 dark:text-amber-200/60 text-center">
        Bundle Chunk ID: {{ chunkId }}
      </p>
    </div>
  `,
    styles: [`
    @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
    .animate-fade-in { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
  `]
})
export class HeavyWidgetComponent {
    chunkId = Math.random().toString(36).substring(7);
    constructor() {
        console.log('HeavyWidgetComponent: Instance Created');
    }
}
