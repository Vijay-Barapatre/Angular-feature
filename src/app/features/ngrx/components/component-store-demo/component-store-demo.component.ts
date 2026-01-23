import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentStore } from '@ngrx/component-store';
import { tap } from 'rxjs';

// Local state interface
interface ModalState {
  isOpen: boolean;
  title: string;
  content: string;
  confirmText: string;
  loading: boolean;
}

// Component Store for Modal
class ModalStore extends ComponentStore<ModalState> {
  constructor() {
    super({
      isOpen: false,
      title: '',
      content: '',
      confirmText: 'Confirm',
      loading: false
    });
  }

  // ===== SELECTORS =====
  readonly isOpen$ = this.select(state => state.isOpen);
  readonly title$ = this.select(state => state.title);
  readonly content$ = this.select(state => state.content);
  readonly confirmText$ = this.select(state => state.confirmText);
  readonly loading$ = this.select(state => state.loading);

  // ViewModel selector
  readonly vm$ = this.select({
    isOpen: this.isOpen$,
    title: this.title$,
    content: this.content$,
    confirmText: this.confirmText$,
    loading: this.loading$
  });

  // ===== UPDATERS =====
  readonly openModal = this.updater((state, config: { title: string; content: string }) => ({
    ...state,
    isOpen: true,
    title: config.title,
    content: config.content,
    loading: false
  }));

  readonly closeModal = this.updater(state => ({
    ...state,
    isOpen: false,
    loading: false
  }));

  readonly setLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading
  }));

  // ===== EFFECTS =====
  readonly confirm = this.effect<void>(trigger$ =>
    trigger$.pipe(
      tap(() => this.setLoading(true)),
      tap(() => {
        // Simulate async operation
        setTimeout(() => {
          console.log('Confirmed!');
          this.closeModal();
        }, 1500);
      })
    )
  );
}

@Component({
  selector: 'app-component-store-demo',
  standalone: true,
  imports: [CommonModule],
  providers: [ModalStore],
  template: `
    <div class="h-full flex flex-col">
      <div class="p-6">
        <h2 class="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">
          Component Store (&#64;ngrx/component-store)
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Component Store Demo -->
          <div class="space-y-6">
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <h3 class="font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <span class="text-2xl">🎯</span>
                Local Component State
              </h3>
              
              <div class="space-y-3">
                <button 
                  (click)="openConfirmModal()"
                  class="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
                  Open Confirmation Modal
                </button>

                <button 
                  (click)="openDeleteModal()"
                  class="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium">
                  Open Delete Modal
                </button>

                <div class="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
                  <div class="text-xs text-slate-500 dark:text-slate-400 mb-2">Modal State</div>
                  <pre class="text-xs text-slate-700 dark:text-slate-300">{{ (modalStore.vm$ | async) | json }}</pre>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl shadow-sm border border-purple-100 dark:border-purple-800 p-6">
              <h3 class="font-semibold text-purple-900 dark:text-purple-200 mb-3 flex items-center gap-2">
                <span class="text-2xl">💡</span>
                Component Store Benefits
              </h3>
              <ul class="space-y-2 text-sm text-purple-800 dark:text-purple-300">
                <li class="flex items-start gap-2">
                  <span class="text-green-600 dark:text-green-400">✓</span>
                  <span><strong>Local Scope</strong> - State lives with component</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-600 dark:text-green-400">✓</span>
                  <span><strong>Reactive</strong> - RxJS streams built-in</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-600 dark:text-green-400">✓</span>
                  <span><strong>Effects</strong> - Side effects in component</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-600 dark:text-green-400">✓</span>
                  <span><strong>Auto Cleanup</strong> - Destroyed with component</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Explanation -->
          <div class="space-y-6">
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <h3 class="font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <span class="text-2xl">📖</span>
                Global Store vs Component Store
              </h3>
              
              <div class="space-y-4">
                <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                  <div class="font-semibold text-blue-900 dark:text-blue-200 mb-2">Global Store (NgRx)</div>
                  <ul class="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                    <li>• Shared across app</li>
                    <li>• Persists after component destroyed</li>
                    <li>• Use for: User session, shared data</li>
                  </ul>
                </div>

                <div class="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
                  <div class="font-semibold text-purple-900 dark:text-purple-200 mb-2">Component Store</div>
                  <ul class="text-sm text-purple-800 dark:text-purple-300 space-y-1">
                    <li>• Scoped to component</li>
                    <li>• Auto-cleaned on destroy</li>
                    <li>• Use for: Modals, wizards, local UI</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <pre class="text-xs bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto"><code>class MyStore extends ComponentStore&lt;State&gt; &#123;

  // Selectors
  readonly data$ = this.select(s =&gt; s.data);

  // Updaters  
  readonly update = this.updater((s, v) =&gt; (...))

  // Effects
  readonly load = this.effect&lt;void&gt;(trigger$ =&gt;
    trigger$.pipe(switchMap(() =&gt; api.load()))
  )
&#125;</code></pre>
            </div>
          </div>
        </div>

        <!-- Modal Overlay -->
        <div 
          *ngIf="(modalStore.isOpen$ | async)"
          class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          (click)="modalStore.closeModal()">
          <div 
            class="bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-6 max-w-md w-full mx-4"
            (click)="$event.stopPropagation()">
            <h3 class="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              {{ modalStore.title$ | async }}
            </h3>
            <p class="text-slate-600 dark:text-slate-400 mb-6">
              {{ modalStore.content$ | async }}
            </p>
            <div class="flex gap-3 justify-end">
              <button 
                (click)="modalStore.closeModal()"
                [disabled]="(modalStore.loading$ | async)"
                class="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-lg transition-colors disabled:opacity-50">
                Cancel
              </button>
              <button 
                (click)="modalStore.confirm()"
                [disabled]="(modalStore.loading$ | async)"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 min-w-[100px]">
                <span *ngIf="!(modalStore.loading$ | async)">{{ modalStore.confirmText$ | async }}</span>
                <span *ngIf="(modalStore.loading$ | async)">Loading...</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ComponentStoreDemoComponent {
  constructor(public modalStore: ModalStore) { }

  openConfirmModal(): void {
    this.modalStore.openModal({
      title: 'Confirm Action',
      content: 'Are you sure you want to proceed with this action?'
    });
  }

  openDeleteModal(): void {
    this.modalStore.openModal({
      title: 'Delete Item',
      content: 'This action cannot be undone. Are you sure?'
    });
  }
}
