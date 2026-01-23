import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { NgRxOverviewComponent } from './components/overview/overview.component';
import { counterReducer } from './components/store-basics/store/counter.reducer';
import { userReducer } from './components/effects-demo/store/user.reducer';
import { UserEffects } from './components/effects-demo/store/user.effects';

export const NGRX_ROUTES: Routes = [
    {
        path: '',
        component: NgRxOverviewComponent
    },
    {
        path: 'store-basics',
        loadComponent: () => import('./components/store-basics/store-basics.component').then(m => m.StoreBasicsComponent),
        providers: [
            provideState({ name: 'counter', reducer: counterReducer })
        ]
    },
    {
        path: 'effects-demo',
        loadComponent: () => import('./components/effects-demo/effects-demo.component').then(m => m.EffectsDemoComponent),
        providers: [
            provideState({ name: 'usersViaEffects', reducer: userReducer }),
            provideEffects(UserEffects)
        ]
    },
    {
        path: 'entity-adapter',
        loadComponent: () => import('./components/entity-adapter/entity-adapter.component').then(m => m.EntityAdapterComponent)
    },
    {
        path: 'selectors-demo',
        loadComponent: () => import('./components/selectors-demo/selectors-demo.component').then(m => m.SelectorsDemoComponent)
    },
    {
        path: 'devtools-demo',
        loadComponent: () => import('./components/devtools-demo/devtools-demo.component').then(m => m.DevToolsDemoComponent)
    },
    {
        path: 'best-practices',
        loadComponent: () => import('./components/best-practices/best-practices.component').then(m => m.BestPracticesComponent)
    },
    // TODO: Uncomment after installing @ngrx/router-store with: npm install @ngrx/router-store@17
    // {
    //     path: 'router-store-demo',
    //     loadComponent: () => import('./components/router-store-demo/router-store-demo.component').then(m => m.RouterStoreDemoComponent)
    // },
    // {
    //     path: 'component-store-demo',
    //     loadComponent: () => import('./components/component-store-demo/component-store-demo.component').then(m => m.ComponentStoreDemoComponent)
    // },
    {
        path: 'advanced-patterns',
        loadComponent: () => import('./components/advanced-patterns/advanced-patterns.component').then(m => m.AdvancedPatternsComponent)
    }
];

