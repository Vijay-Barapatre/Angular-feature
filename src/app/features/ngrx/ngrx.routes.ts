import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { NgRxOverviewComponent } from './components/overview/overview.component';
import { counterReducer } from './components/use-case-1/store/counter.reducer';
import { userReducer } from './components/use-case-2/store/user.reducer';
import { UserEffects } from './components/use-case-2/store/user.effects';

export const NGRX_ROUTES: Routes = [
    {
        path: '',
        component: NgRxOverviewComponent
    },
    {
        path: 'use-case-1',
        loadComponent: () => import('./components/use-case-1/store-basics.component').then(m => m.StoreBasicsComponent),
        providers: [
            provideState({ name: 'counter', reducer: counterReducer })
        ]
    },
    {
        path: 'use-case-2',
        loadComponent: () => import('./components/use-case-2/effects-demo.component').then(m => m.EffectsDemoComponent),
        providers: [
            provideState({ name: 'usersViaEffects', reducer: userReducer }),
            provideEffects(UserEffects)
        ]
    },
    {
        path: 'use-case-3',
        loadComponent: () => import('./components/use-case-3/entity-adapter.component').then(m => m.EntityAdapterComponent)
    },
    {
        path: 'use-case-4',
        loadComponent: () => import('./components/use-case-4/selectors-demo.component').then(m => m.SelectorsDemoComponent)
    },
    {
        path: 'use-case-5',
        loadComponent: () => import('./components/use-case-5/devtools-demo.component').then(m => m.DevToolsDemoComponent)
    },
    {
        path: 'use-case-6',
        loadComponent: () => import('./components/use-case-6/best-practices.component').then(m => m.BestPracticesComponent)
    },
    // TODO: Uncomment after installing @ngrx/router-store with: npm install @ngrx/router-store@17
    // {
    //     path: 'use-case-7',
    //     loadComponent: () => import('./components/use-case-7/router-store-demo.component').then(m => m.RouterStoreDemoComponent)
    // },
    // {
    //     path: 'use-case-8',
    //     loadComponent: () => import('./components/use-case-8/component-store-demo.component').then(m => m.ComponentStoreDemoComponent)
    // },
    {
        path: 'use-case-9',
        loadComponent: () => import('./components/use-case-9/advanced-patterns.component').then(m => m.AdvancedPatternsComponent)
    }
];

