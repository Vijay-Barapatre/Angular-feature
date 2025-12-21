import { Component, Inject, Injector, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AppService } from './service.model';
import { ProdService, DebugService } from './service.implementations';
import { APP_CONFIG, AppConfig, PROD_CONFIG, DEBUG_CONFIG } from './config.token';

@Component({
  selector: 'app-use-factory-example',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4 text-gray-800">🏭 Use Case 7: useFactory Example</h2>
      
      <div class="mb-6 p-4 bg-gray-50 rounded border border-gray-200">
        <h3 class="font-semibold text-lg mb-2">Current Configuration:</h3>
        <div class="flex items-center gap-2 mb-2">
          <span class="font-medium">Mode:</span>
          <span [class]="config.isProduction ? 'text-red-600 font-bold' : 'text-green-600 font-bold'">
            {{ config.isProduction ? 'PRODUCTION 🔴' : 'DEBUG 🟢' }}
          </span>
        </div>
        <div class="text-sm text-gray-600">
          Check the console to see the service output!
        </div>
      </div>

      <div class="flex gap-4">
        <button (click)="fetchData()" 
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          📝 Fetch Data
        </button>
        
        <button (click)="toggleMode()" 
                class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors">
          🔄 Toggle Mode (Reloads Component)
        </button>
      </div>
    </div>
  `,
  providers: [
    // 1. Provide the configuration (Dynamic for this demo)
    { provide: APP_CONFIG, useValue: DEBUG_CONFIG }, // Default to Debug

    // 2. Provide the AppService using useFactory
    {
      provide: AppService,
      useFactory: (http: HttpClient, config: AppConfig) => {
        // 🏭 Factory Logic: Decide which service to create based on config
        console.log('🏭 Factory running! Config isProduction:', config.isProduction);

        if (config.isProduction) {
          return new ProdService(http);
        } else {
          return new DebugService(http);
        }
      },
      deps: [HttpClient, APP_CONFIG] // 🔧 Dependencies needed by the factory
    }
  ]
})
export class UseFactoryExampleComponent implements OnInit {
  // We inject the abstract AppService, but we get the concrete instance decided by the factory!
  constructor(
    private appService: AppService,
    @Inject(APP_CONFIG) public config: AppConfig
  ) { }

  ngOnInit() {
    this.appService.getData();
  }

  fetchData() {
    this.appService.getData();
  }

  toggleMode() {
    alert('To see the other mode, change the useValue in the providers array in the code!');
  }
}
