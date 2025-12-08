import { Component, VERSION } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';

@Component({
    selector: 'app-update-notification',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full flex flex-col">
      <div class="p-6">
        <h2 class="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">
          Update Notifications (SwUpdate)
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Update Demo -->
          <div class="space-y-6">
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <h3 class="font-semibold text-slate-800 dark:text-slate-100 mb-4">Application Status</h3>
              
              <div class="space-y-4">
                <div class="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span class="text-sm text-slate-600 dark:text-slate-400">Angular Version</span>
                  <span class="font-mono text-sm font-medium text-slate-800 dark:text-slate-200">{{ angularVersion }}</span>
                </div>

                <div class="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span class="text-sm text-slate-600 dark:text-slate-400">Service Worker Enabled</span>
                  <span class="px-2 py-1 rounded text-xs font-semibold" 
                        [ngClass]="updates.isEnabled ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
                    {{ updates.isEnabled ? 'ENABLED' : 'DISABLED' }}
                  </span>
                </div>

                <div *ngIf="!updates.isEnabled" class="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                  <p class="text-xs text-amber-800 dark:text-amber-300">
                    <strong>Note:</strong> Service Workers are disabled in development mode by default. 
                    To test this, you must run a production build.
                  </p>
                </div>

                <!-- Simulation Buttons (only if disabled for demo purposes) -->
                <div *ngIf="!updates.isEnabled" class="border-t border-slate-200 dark:border-slate-700 pt-4 mt-4">
                    <p class="text-sm font-medium text-slate-800 dark:text-slate-200 mb-2">Simulate Events (Dev Mode Only)</p>
                    <button (click)="simulateUpdate()" class="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                        Simulate "Update Available"
                    </button>
                </div>
              </div>
            </div>

            <!-- Update Toast Notification -->
            <div *ngIf="updateAvailable" class="fixed bottom-6 right-6 max-w-sm w-full bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-indigo-100 dark:border-slate-700 p-4 animate-slide-up z-50">
              <div class="flex items-start gap-4">
                <div class="bg-indigo-100 dark:bg-indigo-900/50 rounded-full p-2 text-indigo-600 dark:text-indigo-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h4 class="font-semibold text-slate-800 dark:text-slate-100 mb-1">Update Available</h4>
                  <p class="text-sm text-slate-600 dark:text-slate-400 mb-3">A new version of the application is available.</p>
                  <div class="flex gap-2">
                    <button (click)="reloadPage()" class="px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded hover:bg-indigo-700 transition-colors">
                      Reload Now
                    </button>
                    <button (click)="updateAvailable = false" class="px-3 py-1.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 text-xs font-semibold transition-colors">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Guide Placeholder -->
          <div class="h-full"></div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    @keyframes slide-up {
      from { transform: translateY(100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .animate-slide-up {
      animation: slide-up 0.3s ease-out forwards;
    }
  `]
})
export class UpdateNotificationComponent {
    angularVersion = VERSION.full;
    updateAvailable = false;

    constructor(public updates: SwUpdate) {
        if (updates.isEnabled) {
            // 1. Check for updates on load
            // updates.checkForUpdate(); // Optional: usually handled by SW strategy

            // 2. Listen for VersionReadyEvent
            updates.versionUpdates
                .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
                .subscribe(evt => {
                    console.log(`Current version: ${evt.currentVersion.hash}`);
                    console.log(`New version ready: ${evt.latestVersion.hash}`);
                    // 3. Prompt user
                    this.updateAvailable = true;
                });
        }
    }

    reloadPage() {
        if (this.updates.isEnabled) {
            this.updates.activateUpdate().then(() => document.location.reload());
        } else {
            document.location.reload();
        }
    }

    simulateUpdate() {
        this.updateAvailable = true;
    }
}
