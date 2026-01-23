import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwPush } from '@angular/service-worker';

@Component({
    selector: 'app-push-notifications',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full flex flex-col">
      <div class="p-6">
        <h2 class="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">
          Push Notifications
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Push Demo -->
          <div class="space-y-6">
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <h3 class="font-semibold text-slate-800 dark:text-slate-100 mb-4">Subscription Status</h3>
              
              <div class="space-y-4">
                 <div class="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span class="text-sm text-slate-600 dark:text-slate-400">Push Enabled</span>
                  <span class="px-2 py-1 rounded text-xs font-semibold" 
                        [ngClass]="swPush.isEnabled ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
                    {{ swPush.isEnabled ? 'YES' : 'NO' }}
                  </span>
                </div>

                <div class="p-4 bg-violet-50 dark:bg-violet-900/30 rounded-lg border border-violet-100 dark:border-violet-800">
                  <h4 class="font-medium text-violet-900 dark:text-violet-200 mb-2">Request Permission</h4>
                  <p class="text-xs text-violet-700 dark:text-violet-400 mb-3">
                    Requires a valid VAPID Public Key from your server.
                  </p>
                  <button (click)="subscribeToNotifications()" 
                          [disabled]="!swPush.isEnabled"
                          class="px-4 py-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium">
                    Subscribe
                  </button>
                  <p *ngIf="subscription" class="mt-4 text-xs font-mono break-all text-slate-500 bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-700">
                    {{ subscription | json }}
                  </p>
                </div>
              </div>
            </div>

            <div class="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800">
                <h4 class="font-semibold text-slate-800 dark:text-slate-200 mb-2">Architecture Note</h4>
                <p class="text-sm text-slate-600 dark:text-slate-400">
                   Push notifications require a backend. The Angular <code>SwPush</code> service handles the client-side subscription and receives messages, but your server must send them via a push service (like FCM or Mozilla's service).
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
export class PushNotificationsComponent {
    readonly VAPID_PUBLIC_KEY = 'YOUR_GENERATED_VAPID_PUBLIC_KEY';
    subscription: PushSubscription | null = null;

    constructor(public swPush: SwPush) { }

    subscribeToNotifications() {
        if (!this.swPush.isEnabled) {
            alert('Service Worker is not enabled. Cannot subscribe.');
            return;
        }

        this.swPush.requestSubscription({
            serverPublicKey: this.VAPID_PUBLIC_KEY
        })
            .then(sub => {
                this.subscription = sub;
                console.log('Notification Subscription: ', sub);
                // TODO: Send this subscription object to your backend!
            })
            .catch(err => console.error('Could not subscribe to notifications', err));
    }
}
