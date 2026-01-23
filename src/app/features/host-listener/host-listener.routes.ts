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
        path: 'basic-host-listener',
        loadComponent: () => import('./components/basic-host-listener/basic-host-listener.component')
            .then(m => m.BasicHostListenerComponent),
        title: 'Basic HostListener'
    },
    {
        path: 'keyboard-events',
        loadComponent: () => import('./components/keyboard-events/keyboard-events.component')
            .then(m => m.KeyboardEventsComponent),
        title: 'Keyboard Events'
    },
    {
        path: 'window-events',
        loadComponent: () => import('./components/window-events/window-events.component')
            .then(m => m.WindowEventsComponent),
        title: 'Window/Document Events'
    },
    {
        path: 'host-binding',
        loadComponent: () => import('./components/host-binding/host-binding.component')
            .then(m => m.HostBindingComponent),
        title: 'HostBinding Basics'
    },
    {
        path: 'combined',
        loadComponent: () => import('./components/combined/combined.component')
            .then(m => m.CombinedComponent),
        title: 'Combined HostListener + HostBinding'
    },
    {
        path: 'custom-directive',
        loadComponent: () => import('./components/custom-directive/custom-directive.component')
            .then(m => m.CustomDirectiveComponent),
        title: 'Custom Attribute Directive'
    }
];
