import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fromEvent, merge, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-offline-indicator',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full flex flex-col">
      <div class="p-6">
        <h2 class="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">
          Offline Indicator
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Offline Demo -->
          <div class="space-y-6">
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex flex-col items-center justify-center min-h-[300px] transition-colors duration-500"
                 [ngClass]="isOnline ? 'bg-white dark:bg-slate-800' : 'bg-slate-100 dark:bg-slate-900'">
              
              <div class="w-24 h-24 rounded-full flex items-center justify-center mb-6 transition-all duration-500"
                   [ngClass]="isOnline ? 'bg-green-100 text-green-600' : 'bg-slate-300 text-slate-500 grayscale'">
                <svg *ngIf="isOnline" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
                <svg *ngIf="!isOnline" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
                </svg>
              </div>

              <h3 class="text-2xl font-bold mb-2 transition-colors duration-300" 
                  [ngClass]="isOnline ? 'text-green-600 dark:text-green-400' : 'text-slate-600 dark:text-slate-400'">
                {{ isOnline ? 'You are Online' : 'You are Offline' }}
              </h3>
              
              <p class="text-center text-slate-500 dark:text-slate-400 max-w-sm">
                {{ isOnline 
                  ? 'Application has full connectivity. Requests will go to the network.' 
                  : 'Application is running in offline mode. Requests will be served from cache service worker.' }}
              </p>

              <div class="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800 text-sm text-amber-800 dark:text-amber-300">
                To test this, open DevTools > Network > Presets dropdown > Select <strong>"Offline"</strong>.
              </div>
            </div>
          </div>

          <!-- Guide Placeholder -->
          <div class="h-full"></div>
        </div>
      </div>
    </div>
  `
})
export class OfflineIndicatorComponent implements OnInit, OnDestroy {
    isOnline = true;
    private subscription!: Subscription;

    ngOnInit() {
        // Initial check
        this.isOnline = navigator.onLine;

        // Listen to window events
        this.subscription = merge(
            fromEvent(window, 'online').pipe(map(() => true)),
            fromEvent(window, 'offline').pipe(map(() => false))
        ).subscribe(isOnline => {
            this.isOnline = isOnline;
            console.log('Network status changed:', isOnline ? 'Online' : 'Offline');
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
