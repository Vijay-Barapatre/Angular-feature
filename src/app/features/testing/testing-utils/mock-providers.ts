/**
 * ============================================================================
 * REUSABLE MOCK PROVIDERS
 * ============================================================================
 * 
 * Pre-configured mock providers for common Angular services.
 * Import and spread these in your TestBed providers array.
 */

import { Provider } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { of, Subject, BehaviorSubject } from 'rxjs';

// =============================================================================
// ROUTER MOCKS
// =============================================================================

/**
 * Create a mock Router
 */
export function createRouterMock(): jasmine.SpyObj<Router> {
    return jasmine.createSpyObj('Router', [
        'navigate',
        'navigateByUrl',
        'createUrlTree',
        'serializeUrl'
    ], {
        events: new Subject(),
        url: '/'
    });
}

/**
 * Provider for mock Router
 */
export function provideRouterMock(): Provider {
    return { provide: Router, useValue: createRouterMock() };
}

/**
 * Create a mock ActivatedRoute with customizable params
 */
export function createActivatedRouteMock(config: {
    params?: Record<string, string>;
    queryParams?: Record<string, string>;
    data?: Record<string, any>;
} = {}): any {
    const paramSubject = new BehaviorSubject(config.params || {});
    const queryParamSubject = new BehaviorSubject(config.queryParams || {});
    const dataSubject = new BehaviorSubject(config.data || {});

    return {
        params: paramSubject.asObservable(),
        queryParams: queryParamSubject.asObservable(),
        data: dataSubject.asObservable(),
        snapshot: {
            paramMap: {
                get: (key: string) => config.params?.[key] || null,
                has: (key: string) => !!config.params?.[key],
                keys: Object.keys(config.params || {}),
                getAll: (key: string) => config.params?.[key] ? [config.params[key]] : []
            },
            queryParamMap: {
                get: (key: string) => config.queryParams?.[key] || null,
                has: (key: string) => !!config.queryParams?.[key],
                keys: Object.keys(config.queryParams || {}),
                getAll: (key: string) => config.queryParams?.[key] ? [config.queryParams[key]] : []
            },
            data: config.data || {}
        }
    };
}

/**
 * Provider for mock ActivatedRoute
 */
export function provideActivatedRouteMock(config?: Parameters<typeof createActivatedRouteMock>[0]): Provider {
    return { provide: ActivatedRoute, useValue: createActivatedRouteMock(config) };
}

// =============================================================================
// HTTP MOCK HELPERS
// =============================================================================

/**
 * Create a generic service mock with common methods
 */
export function createServiceMock<T extends object>(
    serviceName: string,
    methods: (keyof T)[],
    properties: Partial<Record<keyof T, any>> = {}
): jasmine.SpyObj<T> {
    return jasmine.createSpyObj(serviceName, methods as string[], properties);
}

// =============================================================================
// DATA FACTORIES
// =============================================================================

/**
 * Factory for creating test users
 */
export function createMockUser(overrides: Partial<{
    id: number;
    name: string;
    email: string;
    role: string;
}> = {}) {
    return {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        role: 'user',
        ...overrides
    };
}

/**
 * Factory for creating multiple test users
 */
export function createMockUsers(count: number) {
    return Array.from({ length: count }, (_, i) => createMockUser({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`
    }));
}

/**
 * Factory for creating test posts
 */
export function createMockPost(overrides: Partial<{
    id: number;
    title: string;
    body: string;
    userId: number;
}> = {}) {
    return {
        id: 1,
        title: 'Test Post',
        body: 'This is test content',
        userId: 1,
        ...overrides
    };
}

// =============================================================================
// PROVIDER BUNDLES
// =============================================================================

/**
 * Common routing providers bundle
 */
export function provideRoutingMocks(config?: Parameters<typeof createActivatedRouteMock>[0]): Provider[] {
    return [
        provideRouterMock(),
        provideActivatedRouteMock(config)
    ];
}
