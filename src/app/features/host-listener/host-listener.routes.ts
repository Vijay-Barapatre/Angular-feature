/**
 * ============================================================================
 * HOST LISTENER & HOST BINDING FEATURE ROUTES
 * ============================================================================
 * 
 * 💡 WHAT ARE @HostListener AND @HostBinding?
 * 
 * These are Angular decorators that allow components and directives to
 * interact with their HOST ELEMENT (the DOM element they're attached to).
 * 
 * @HostListener - Listen to DOM events on the host element
 * @HostBinding - Bind host element properties, attributes, classes, styles
 * 
 * WHEN TO USE:
 * ┌────────────────────────────────────────────────────────────────────────┐
 * │  Use Case                      │  Decorator                           │
 * ├────────────────────────────────────────────────────────────────────────┤
 * │  Listen to clicks             │  @HostListener('click')               │
 * │  Keyboard shortcuts           │  @HostListener('document:keydown')    │
 * │  Scroll/resize events         │  @HostListener('window:scroll')       │
 * │  Add/remove classes           │  @HostBinding('class.active')         │
 * │  Change inline styles         │  @HostBinding('style.color')          │
 * │  Set attributes               │  @HostBinding('attr.aria-label')      │
 * └────────────────────────────────────────────────────────────────────────┘
 */

import { Routes } from '@angular/router';

export const HOST_LISTENER_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/overview/overview.component')
            .then(m => m.HostListenerOverviewComponent),
        title: 'HostListener & HostBinding'
    },
    {
        path: 'use-case-1',
        loadComponent: () => import('./components/use-case-1/basic-host-listener.component')
            .then(m => m.BasicHostListenerComponent),
        title: 'Basic HostListener'
    },
    {
        path: 'use-case-2',
        loadComponent: () => import('./components/use-case-2/keyboard-events.component')
            .then(m => m.KeyboardEventsComponent),
        title: 'Keyboard Events'
    },
    {
        path: 'use-case-3',
        loadComponent: () => import('./components/use-case-3/window-events.component')
            .then(m => m.WindowEventsComponent),
        title: 'Window/Document Events'
    },
    {
        path: 'use-case-4',
        loadComponent: () => import('./components/use-case-4/host-binding.component')
            .then(m => m.HostBindingComponent),
        title: 'HostBinding Basics'
    },
    {
        path: 'use-case-5',
        loadComponent: () => import('./components/use-case-5/combined.component')
            .then(m => m.CombinedComponent),
        title: 'Combined HostListener + HostBinding'
    },
    {
        path: 'use-case-6',
        loadComponent: () => import('./components/use-case-6/custom-directive.component')
            .then(m => m.CustomDirectiveComponent),
        title: 'Custom Attribute Directive'
    }
];
