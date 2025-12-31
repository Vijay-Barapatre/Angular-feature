/**
 * HOME PAGE COMPONENT
 * 
 * Landing page that displays all available Angular features organized by category.
 * Users can navigate to different feature modules from here.
 * 
 * COMPONENT FEATURES:
 * - Displays feature categories in card layout
 * - Shows feature status (active/coming soon)
 * - Provides navigation to feature modules
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
    /**
     * Feature categories with metadata
     * Each feature has:
     * - name: Display name
     * - route: Navigation path
     * - description: Brief explanation
     * - status: 'active' or 'coming-soon'
     * - useCases: Number of use cases implemented
     */
    featureCategories = [
        {
            name: 'Component Communication',
            icon: '🔄',
            description: 'Learn how components communicate with each other',
            features: [
                {
                    name: '@Input & @Output',
                    route: '/input-output',
                    description: 'Parent-child component data flow and event communication',
                    status: 'active',
                    useCases: 6,
                    color: 'primary'
                },
                {
                    name: '🎯 Practice Exercises',
                    route: '/input-output/exercise',
                    description: 'Hands-on coding exercises with TODO placeholders to master @Input/@Output',
                    status: 'active',
                    useCases: 9,
                    color: 'secondary'
                },
                {
                    name: 'ViewChild & ContentChild',
                    route: '/viewchild-contentchild',
                    description: 'Access child components and projected content programmatically',
                    status: 'active',
                    useCases: 6,
                    color: 'accent'
                },
                {
                    name: 'Lifecycle Hooks',
                    route: '/lifecycle-hooks',
                    description: 'Master component lifecycle with ngOnInit, ngOnDestroy, ngOnChanges and more',
                    status: 'active',
                    useCases: 6,
                    color: 'primary'
                },
                {
                    name: '📦 Content Projection',
                    route: '/content-projection',
                    description: 'ng-content, multi-slot projection, ngTemplateOutlet, and dynamic templates',
                    status: 'active',
                    useCases: 5,
                    color: 'secondary'
                }
            ]
        },
        {
            name: 'State Management',
            icon: '📊',
            description: 'Manage and share application state effectively',
            features: [
                {
                    name: 'Services & DI',
                    route: '/services-di',
                    description: 'Dependency injection and shared services for state management',
                    status: 'active',
                    useCases: 6,
                    color: 'primary'
                },
                {
                    name: 'Signals (Angular 17+)',
                    route: '/signals',
                    description: 'Modern reactive state management with signals',
                    status: 'active',
                    useCases: 6,
                    color: 'accent'
                },
                {
                    name: 'NgRx (Redux)',
                    route: '/ngrx',
                    description: 'Enterprise state management with Actions, Reducers & Effects',
                    status: 'active',
                    useCases: 1,
                    color: 'secondary'
                }
            ]
        },
        {
            name: 'Directives',
            icon: '⚡',
            description: 'Enhance templates with attribute and structural directives',
            features: [
                {
                    name: 'Directives',
                    route: '/directives',
                    description: 'Attribute directives, structural directives, composition, and real-world patterns',
                    status: 'active',
                    useCases: 8,
                    color: 'primary'
                },
                {
                    name: 'Host Listener & Binding',
                    route: '/host-listener',
                    description: '@HostListener and @HostBinding decorators for DOM events and properties',
                    status: 'active',
                    useCases: 3,
                    color: 'accent'
                }
            ]
        },
        {
            name: 'Forms & Validation',
            icon: '📝',
            description: 'Build reactive and template-driven forms with validation',
            features: [
                {
                    name: 'Template-Driven Forms',
                    route: '/template-forms',
                    description: 'Simple forms using ngModel and Angular directives',
                    status: 'active',
                    useCases: 8,
                    color: 'primary'
                },
                {
                    name: 'Reactive Forms',
                    route: '/reactive-forms',
                    description: 'Type-safe forms with FormControl, FormGroup, and validators',
                    status: 'active',
                    useCases: 8,
                    color: 'accent'
                }
            ]
        },
        {
            name: 'Routing & Navigation',
            icon: '🧭',
            description: 'Control application navigation and route access',
            features: [
                {
                    name: 'Angular Router',
                    route: '/routing',
                    description: 'Master the Router with parameters, child routes, and programmatic navigation',
                    status: 'active',
                    useCases: 5,
                    color: 'primary'
                },
                {
                    name: 'Guards & Resolvers',
                    route: '/guards',
                    description: 'Protect routes and pre-fetch data before navigation',
                    status: 'active',
                    useCases: 3,
                    color: 'accent'
                }
            ]
        },
        {
            name: 'HTTP & Backend',
            icon: '🌐',
            description: 'Communicate with backend APIs and handle async data',
            features: [
                {
                    name: 'HTTP Client',
                    route: '/http-client',
                    description: 'GET, POST, PUT, DELETE, error handling, interceptors, and RxJS operators',
                    status: 'active',
                    useCases: 8,
                    color: 'primary'
                },
                {
                    name: '💾 Caching Strategies',
                    route: '/caching-strategies',
                    description: 'HTTP caching, memory cache, localStorage, IndexedDB, and invalidation patterns',
                    status: 'active',
                    useCases: 5,
                    color: 'accent'
                },
                {
                    name: '🚨 Error Handling',
                    route: '/error-handling',
                    description: 'Global ErrorHandler, HTTP interceptor, notifications, retry and error boundaries',
                    status: 'active',
                    useCases: 5,
                    color: 'primary'
                }
            ]
        },
        {
            name: 'Pipes & Data',
            icon: '🔧',
            description: 'Transform and format data with Pipes',
            features: [
                {
                    name: 'Pipes',
                    route: '/pipes',
                    description: 'Built-in pipes, custom pipes, pure vs impure, and async pipes',
                    status: 'active',
                    useCases: 6,
                    color: 'primary'
                }
            ]
        },
        {
            name: 'Performance & PWA',
            icon: '🚀',
            description: 'Optimize application performance and installability',
            features: [
                {
                    name: 'Zone.js & Change Detection',
                    route: '/zone-cd',
                    description: 'Understand Zones, OnPush strategy, and manual change detection controls',
                    status: 'active',
                    useCases: 5,
                    color: 'accent'
                },
                {
                    name: 'Service Worker (PWA)',
                    route: '/service-worker',
                    description: 'Offline support, caching strategies, and installable web apps',
                    status: 'active',
                    useCases: 5,
                    color: 'secondary'
                },
                {
                    name: 'Performance Optimization',
                    route: '/performance',
                    description: 'OnPush, trackBy, lazy loading, bundle optimization, and profiling',
                    status: 'active',
                    useCases: 7,
                    color: 'primary'
                },
                {
                    name: '👷 Web Workers',
                    route: '/web-workers',
                    description: 'Background thread processing for heavy computations without blocking UI',
                    status: 'active',
                    useCases: 5,
                    color: 'accent'
                }
            ]
        },
        {
            name: 'Modern Angular (v15+)',
            icon: '✨',
            description: 'Latest Angular features and modern development patterns',
            features: [
                {
                    name: 'Standalone APIs',
                    route: '/standalone-apis',
                    description: 'bootstrapApplication, provideRouter, provideHttpClient, and migration patterns',
                    status: 'active',
                    useCases: 6,
                    color: 'primary'
                },
                {
                    name: 'Defer / Lazy Views',
                    route: '/defer-views',
                    description: '@defer blocks with triggers, prefetching, and loading states',
                    status: 'active',
                    useCases: 6,
                    color: 'accent'
                },
                {
                    name: 'RxJS-Signal Interop',
                    route: '/rxjs-signal-interop',
                    description: 'toSignal(), toObservable(), effect(), and hybrid patterns',
                    status: 'active',
                    useCases: 5,
                    color: 'secondary'
                }
            ]
        },
        {
            name: 'Architecture',
            icon: '🏗️',
            description: 'Application structure, modules, and advanced patterns',
            features: [
                {
                    name: 'NgModules',
                    route: '/ngmodules',
                    description: 'Module basics, feature modules, shared modules, providers & DI',
                    status: 'active',
                    useCases: 5,
                    color: 'primary'
                },
                {
                    name: 'Dynamic Components',
                    route: '/dynamic-components',
                    description: 'ViewContainerRef, *ngComponentOutlet, and dynamic modal service',
                    status: 'active',
                    useCases: 5,
                    color: 'accent'
                },
                {
                    name: 'Angular Library',
                    route: '/angular-library',
                    description: 'Create, build, publish, and consume reusable Angular libraries',
                    status: 'active',
                    useCases: 6,
                    color: 'secondary'
                },
                {
                    name: '🔐 MSAL Authentication',
                    route: '/msal-auth',
                    description: 'Azure AD authentication with login flows, guards, and token management',
                    status: 'active',
                    useCases: 6,
                    color: 'primary'
                },
                {
                    name: '🔒 Security',
                    route: '/security',
                    description: 'XSS prevention, CSRF, CSP, authentication security, and OWASP best practices',
                    status: 'active',
                    useCases: 6,
                    color: 'accent'
                },
                {
                    name: '🖥️ Server-Side Rendering',
                    route: '/ssr',
                    description: 'Angular Universal, hydration, transfer state, SEO, and prerendering',
                    status: 'active',
                    useCases: 6,
                    color: 'primary'
                }
            ]
        },
        {
            name: 'Testing & Quality',
            icon: '🧪',
            description: 'Comprehensive testing strategies for Angular applications',
            features: [
                {
                    name: '🎭 E2E Testing (Playwright)',
                    route: '/e2e-testing',
                    description: 'End-to-end testing with Playwright: setup, page objects, API mocking, visual regression, CI/CD',
                    status: 'active',
                    useCases: 7,
                    color: 'primary'
                },
                {
                    name: 'Testing',
                    route: '/testing',
                    description: 'Unit and integration testing: components, services, HTTP, async, mocking, performance',
                    status: 'active',
                    useCases: 7,
                    color: 'accent'
                }
            ]
        },
        {
            name: 'Language Fundamentals',

            icon: '📚',
            description: 'Master JavaScript and TypeScript foundations for Angular',
            features: [
                {
                    name: '🟨 JavaScript Essentials',
                    route: '/javascript-essentials',
                    description: 'Variables, spread/rest, destructuring, arrow functions, async/await',
                    status: 'active',
                    useCases: 6,
                    color: 'primary'
                },
                {
                    name: '🔷 TypeScript Features',
                    route: '/typescript-features',
                    description: 'Interfaces, generics, decorators, type guards, utility types',
                    status: 'active',
                    useCases: 6,
                    color: 'accent'
                }
            ]
        }
    ];
}
