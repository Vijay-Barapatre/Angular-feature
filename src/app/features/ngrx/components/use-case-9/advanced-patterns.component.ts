import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Simulated Action type
interface SimulatedAction {
  type: string;
  payload?: any;
  timestamp: Date;
}

// Simulated State
interface AppState {
  counter: number;
  user: { name: string; role: string } | null;
  settings: { theme: 'light' | 'dark'; notifications: boolean };
}

@Component({
  selector: 'app-advanced-patterns',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="h-full flex flex-col overflow-auto">
      <div class="p-6">
        <h2 class="text-3xl font-bold mb-2 text-slate-800 dark:text-slate-100">
          ⚙️ Use Case 9: Advanced NgRx Patterns
        </h2>
        <p class="text-slate-600 dark:text-slate-400 mb-6">
          Interactive demo of Meta-Reducers and Runtime Checks concepts.
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Left Column: Controls -->
          <div class="space-y-6">
            <!-- Action Dispatcher -->
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <h3 class="font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <span class="text-2xl">📤</span>
                Dispatch Actions
              </h3>
              
              <div class="space-y-3">
                <button 
                  (click)="dispatch('INCREMENT')"
                  class="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
                  [Counter] Increment (+1)
                </button>

                <button 
                  (click)="dispatch('DECREMENT')"
                  class="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium">
                  [Counter] Decrement (-1)
                </button>

                <button 
                  (click)="dispatch('LOGIN', { name: 'John Doe', role: 'Admin' })"
                  class="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium">
                  [Auth] Login User
                </button>

                <button 
                  (click)="dispatch('LOGOUT')"
                  class="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium">
                  [Auth] Logout (Reset State)
                </button>

                <button 
                  (click)="dispatch('TOGGLE_THEME')"
                  class="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium">
                  [Settings] Toggle Theme
                </button>
              </div>
            </div>

            <!-- Meta-Reducer Toggles -->
            <div class="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl shadow-sm border border-orange-100 dark:border-orange-800 p-6">
              <h3 class="font-semibold text-orange-900 dark:text-orange-200 mb-4 flex items-center gap-2">
                <span class="text-2xl">🔧</span>
                Meta-Reducer Settings
              </h3>
              
              <div class="space-y-4">
                <label class="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" [(ngModel)]="loggerEnabled" 
                         class="w-5 h-5 rounded border-orange-300 text-orange-600 focus:ring-orange-500">
                  <div>
                    <div class="font-medium text-orange-800 dark:text-orange-300">Logger Meta-Reducer</div>
                    <div class="text-xs text-orange-600 dark:text-orange-400">Logs all actions to history</div>
                  </div>
                </label>

                <label class="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" [(ngModel)]="persistenceEnabled" 
                         class="w-5 h-5 rounded border-orange-300 text-orange-600 focus:ring-orange-500">
                  <div>
                    <div class="font-medium text-orange-800 dark:text-orange-300">Persistence Meta-Reducer</div>
                    <div class="text-xs text-orange-600 dark:text-orange-400">Saves state to localStorage</div>
                  </div>
                </label>

                <label class="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" [(ngModel)]="resetOnLogout" 
                         class="w-5 h-5 rounded border-orange-300 text-orange-600 focus:ring-orange-500">
                  <div>
                    <div class="font-medium text-orange-800 dark:text-orange-300">Reset Meta-Reducer</div>
                    <div class="text-xs text-orange-600 dark:text-orange-400">Clears state on LOGOUT action</div>
                  </div>
                </label>
              </div>
            </div>

            <!-- Runtime Checks Demo -->
            <div class="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl shadow-sm border border-red-100 dark:border-red-800 p-6">
              <h3 class="font-semibold text-red-900 dark:text-red-200 mb-4 flex items-center gap-2">
                <span class="text-2xl">🔍</span>
                Runtime Checks Demo
              </h3>
              
              <div class="space-y-3">
                <button 
                  (click)="tryMutation()"
                  class="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium text-left">
                  <div class="font-semibold">❌ Try Mutating State</div>
                  <div class="text-xs text-red-100 mt-1">This would fail with strictStateImmutability</div>
                </button>

                <button 
                  (click)="tryNonSerializable()"
                  class="w-full px-4 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors font-medium text-left">
                  <div class="font-semibold">⚠️ Non-Serializable Action</div>
                  <div class="text-xs text-yellow-100 mt-1">Functions in payload fail serializability</div>
                </button>
              </div>

              @if (runtimeError()) {
                <div class="mt-4 p-3 bg-red-100 dark:bg-red-900/40 border border-red-300 dark:border-red-700 rounded-lg">
                  <div class="text-sm font-semibold text-red-800 dark:text-red-200">Runtime Check Failed!</div>
                  <div class="text-xs text-red-700 dark:text-red-300 mt-1">{{ runtimeError() }}</div>
                </div>
              }
            </div>
          </div>

          <!-- Right Column: State Display -->
          <div class="space-y-6">
            <!-- Current State -->
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <h3 class="font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <span class="text-2xl">🗄️</span>
                Current State
              </h3>
              
              <pre class="text-sm bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto font-mono">{{ stateJson() }}</pre>
              
              <div class="mt-4 grid grid-cols-3 gap-3 text-center">
                <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ state().counter }}</div>
                  <div class="text-xs text-blue-500">Counter</div>
                </div>
                <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div class="text-lg font-bold text-green-600 dark:text-green-400">{{ state().user?.name || '—' }}</div>
                  <div class="text-xs text-green-500">User</div>
                </div>
                <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div class="text-lg font-bold text-purple-600 dark:text-purple-400">{{ state().settings.theme }}</div>
                  <div class="text-xs text-purple-500">Theme</div>
                </div>
              </div>
            </div>

            <!-- Action History (Logger Meta-Reducer) -->
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <div class="flex justify-between items-center mb-4">
                <h3 class="font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <span class="text-2xl">📜</span>
                  Action History
                  <span class="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-full">
                    {{ actionHistory().length }} actions
                  </span>
                </h3>
                <button (click)="clearHistory()" 
                        class="text-xs px-3 py-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg transition-colors">
                  Clear
                </button>
              </div>
              
              <div class="space-y-2 max-h-64 overflow-y-auto">
                @for (action of actionHistory(); track action.timestamp) {
                  <div class="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700 text-sm">
                    <div class="flex justify-between items-start">
                      <span class="font-mono font-semibold text-blue-600 dark:text-blue-400">{{ action.type }}</span>
                      <span class="text-xs text-slate-400">{{ action.timestamp | date:'HH:mm:ss.SSS' }}</span>
                    </div>
                    @if (action.payload) {
                      <pre class="text-xs text-slate-500 dark:text-slate-400 mt-1">{{ action.payload | json }}</pre>
                    }
                  </div>
                } @empty {
                  <div class="text-center text-slate-400 py-8">
                    No actions dispatched yet. Click a button above!
                  </div>
                }
              </div>
            </div>

            <!-- localStorage Preview -->
            @if (persistenceEnabled) {
              <div class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl shadow-sm border border-green-100 dark:border-green-800 p-6">
                <h3 class="font-semibold text-green-900 dark:text-green-200 mb-3 flex items-center gap-2">
                  <span class="text-2xl">💾</span>
                  localStorage (Simulated)
                </h3>
                <pre class="text-xs bg-slate-900 text-emerald-400 p-3 rounded-lg overflow-x-auto">{{ localStoragePreview() }}</pre>
              </div>
            }
          </div>
        </div>

        <!-- Concept Explanation -->
        <div class="mt-8 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 class="font-semibold text-slate-800 dark:text-slate-100 mb-4">💡 What Are Meta-Reducers?</h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Meta-reducers are <strong>higher-order reducers</strong> that wrap around your normal reducers. 
            They intercept every action and can:
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div class="font-semibold text-blue-600 dark:text-blue-400 mb-2">📝 Logger</div>
              <p class="text-xs text-slate-500">Log every action and state change for debugging</p>
            </div>
            <div class="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div class="font-semibold text-green-600 dark:text-green-400 mb-2">💾 Persistence</div>
              <p class="text-xs text-slate-500">Auto-save state to localStorage/sessionStorage</p>
            </div>
            <div class="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div class="font-semibold text-red-600 dark:text-red-400 mb-2">🔄 Reset</div>
              <p class="text-xs text-slate-500">Clear entire state on specific actions (logout)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AdvancedPatternsComponent {
  // Meta-reducer toggles
  loggerEnabled = true;
  persistenceEnabled = true;
  resetOnLogout = true;

  // State using signals
  private initialState: AppState = {
    counter: 0,
    user: null,
    settings: { theme: 'light', notifications: true }
  };

  state = signal<AppState>({ ...this.initialState });
  actionHistory = signal<SimulatedAction[]>([]);
  runtimeError = signal<string | null>(null);

  // Computed values
  stateJson = computed(() => JSON.stringify(this.state(), null, 2));
  localStoragePreview = computed(() =>
    JSON.stringify({ ngrx_state: this.state() }, null, 2)
  );

  dispatch(type: string, payload?: any): void {
    this.runtimeError.set(null);

    const action: SimulatedAction = { type, payload, timestamp: new Date() };

    // META-REDUCER 1: Logger
    if (this.loggerEnabled) {
      this.actionHistory.update(history => [action, ...history].slice(0, 20));
      console.log(`[NgRx Logger] Action: ${type}`, payload || '');
    }

    // META-REDUCER 2: Reset on Logout
    if (this.resetOnLogout && type === 'LOGOUT') {
      this.state.set({ ...this.initialState });
      console.log('[NgRx Reset] State cleared on LOGOUT');
      return;
    }

    // Regular reducer logic
    this.state.update(currentState => {
      switch (type) {
        case 'INCREMENT':
          return { ...currentState, counter: currentState.counter + 1 };
        case 'DECREMENT':
          return { ...currentState, counter: currentState.counter - 1 };
        case 'LOGIN':
          return { ...currentState, user: payload };
        case 'LOGOUT':
          return { ...currentState, user: null };
        case 'TOGGLE_THEME':
          return {
            ...currentState,
            settings: {
              ...currentState.settings,
              theme: currentState.settings.theme === 'light' ? 'dark' : 'light'
            }
          };
        default:
          return currentState;
      }
    });

    // META-REDUCER 3: Persistence
    if (this.persistenceEnabled) {
      console.log('[NgRx Persistence] State saved to localStorage');
    }
  }

  tryMutation(): void {
    // Simulate what would happen if you tried to mutate state
    this.runtimeError.set(
      'ERROR: Detected state mutation! In NgRx with strictStateImmutability enabled, ' +
      'directly modifying state (e.g., state.counter++) would throw this error. ' +
      'Always use the spread operator to create new state objects.'
    );
  }

  tryNonSerializable(): void {
    // Simulate non-serializable action payload
    this.runtimeError.set(
      'ERROR: Action payload contains non-serializable value (function)! ' +
      'With strictActionSerializability enabled, payloads must be JSON-serializable. ' +
      'Avoid passing functions, Dates, Maps, or class instances.'
    );
  }

  clearHistory(): void {
    this.actionHistory.set([]);
  }
}
