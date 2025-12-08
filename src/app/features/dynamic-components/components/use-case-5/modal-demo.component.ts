import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from './modal.service';

// Simple content component to show in the modal
@Component({
    selector: 'app-confirm-content',
    standalone: true,
    template: `
    <h3 class="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">{{ title }}</h3>
    <p class="text-slate-600 dark:text-slate-400 mb-6">{{ message }}</p>
    <div class="flex justify-end gap-2">
      <button class="px-4 py-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">Cancel</button>
      <button class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">Confirm Action</button>
    </div>
  `
})
export class ConfirmContentComponent {
    title = 'Default Title';
    message = 'Default Message';
}

@Component({
    selector: 'app-modal-demo',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full flex flex-col">
      <div class="p-6">
        <h2 class="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">
          Dynamic Modal Service
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Demo Area -->
          <div class="space-y-6">
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <h3 class="font-semibold text-slate-800 dark:text-slate-100 mb-4">Programmatic Modals</h3>
              
              <p class="text-slate-500 dark:text-slate-400 mb-6">
                Clicking the button calls <code>modalService.open(Component, data)</code>. 
                The modal is appended to <code>document.body</code>, overlaying the entire app.
              </p>

              <button (click)="openModal()" 
                      class="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors font-semibold shadow-md hover:shadow-lg w-full sm:w-auto">
                ✨ Open Dynamic Modal
              </button>
            </div>
            
            <div class="p-4 bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800 rounded-lg">
                <h4 class="font-semibold text-violet-900 dark:text-violet-200 mb-2">Architecture</h4>
                <p class="text-sm text-violet-800 dark:text-violet-300">
                    This implementation uses <code>ApplicationRef</code> and <code>createApplication</code> styled APIs to attach views directly to the DOM body, ensuring they appear above all other z-indexes.
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
export class ModalDemoComponent {
    constructor(private modalService: ModalService) { }

    openModal() {
        this.modalService.open(ConfirmContentComponent, {
            title: 'Delete everything?',
            message: 'Are you sure you want to delete all your hard work? This action cannot be undone.'
        });
    }
}
