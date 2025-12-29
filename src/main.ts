/**
 * Main Application Entry Point
 * 
 * This file bootstraps the Angular application using standalone components.
 * It imports the root AppComponent and configures the application providers.
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideServiceWorker } from '@angular/service-worker';
import { isDevMode } from '@angular/core';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { productReducer } from './app/features/ngrx/components/use-case-3/store/product.reducer';
import { cartReducer } from './app/features/ngrx/components/use-case-4/store/cart.reducer';
import { devToolsReducer } from './app/features/ngrx/components/use-case-5/store/devtools.reducer';

/**
 * Bootstrap the Angular application
 * 
 * - bootstrapApplication: Modern Angular (v14+) way to bootstrap standalone components
 * - provideRouter: Provides routing functionality to the application
 * - provideHttpClient: Configures the HTTP client for API calls
 */
bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes),      // Enable routing
        provideHttpClient(),        // Enable HTTP client for mock API calls
        provideStore({              // ✅ Initialize NgRx Store with reducers
            products: productReducer,   // Entity Adapter use case
            cart: cartReducer,          // Selectors use case
            devtools: devToolsReducer   // DevTools use case
        }),
        provideEffects(),           // ✅ Initialize NgRx Effects
        provideStoreDevtools({      // ✅ Enable Redux DevTools
            maxAge: 25,
            logOnly: false,
            autoPause: true
        }),
        // Register Service Worker
        provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
        })
    ]
}).catch((err) => console.error(err));
