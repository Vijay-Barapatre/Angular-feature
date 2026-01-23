import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_PLUGINS } from './plugin.token';
import { AppPlugin } from './plugin.model';
import { AnalyticsPlugin, LoggerPlugin, ThemePlugin } from './plugin.implementations';

@Component({
    selector: 'app-multi-provider-example',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4 text-gray-800">🔄 Multi Providers (Plugin System)</h2>
      
      <div class="mb-6 p-4 bg-blue-50 rounded border border-blue-200">
        <h3 class="font-semibold text-lg mb-2">Registered Plugins:</h3>
        <p class="text-gray-600 mb-2">These plugins were injected as a single array using <code>multi: true</code>.</p>
        
        <ul class="space-y-2">
          <li *ngFor="let plugin of plugins" class="flex items-center gap-2 p-2 bg-white rounded shadow-sm">
            <span class="text-xl">🧩</span>
            <span class="font-medium">{{ plugin.name }} Plugin</span>
            <span class="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Active</span>
          </li>
        </ul>
      </div>

      <div class="p-4 bg-gray-50 rounded border border-gray-200">
        <h3 class="font-semibold text-sm mb-2 text-gray-500">CONSOLE OUTPUT:</h3>
        <div class="font-mono text-xs text-gray-700 bg-gray-100 p-3 rounded">
          Check the browser console to see the <code>init()</code> logs!
        </div>
      </div>
    </div>
  `,
    providers: [
        // 🔌 Registering multiple plugins for the SAME token
        { provide: APP_PLUGINS, useClass: AnalyticsPlugin, multi: true },
        { provide: APP_PLUGINS, useClass: LoggerPlugin, multi: true },
        { provide: APP_PLUGINS, useClass: ThemePlugin, multi: true }
    ]
})
export class MultiProviderExampleComponent implements OnInit {

    // 📥 We inject the TOKEN, but we get an ARRAY of plugins!
    constructor(@Inject(APP_PLUGINS) public plugins: AppPlugin[]) {
        console.log('📥 [MultiProviderExample] Injected Plugins:', plugins);
    }

    ngOnInit() {
        // 🚀 Initialize all plugins
        this.plugins.forEach(plugin => plugin.init());
    }
}
