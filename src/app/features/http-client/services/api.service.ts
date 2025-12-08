/**
 * ============================================================================
 * API SERVICE
 * ============================================================================
 * 
 * 💡 BEST PRACTICE:
 * Centralize all HTTP calls in a service. Components should NOT directly
 * use HttpClient. This provides:
 * - Single source of truth for API URLs
 * - Easy mocking for tests
 * - Reusable across components
 * - Encapsulation of HTTP logic
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, shareReplay, tap } from 'rxjs';

// ============================================
// INTERFACES
// ============================================

export interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    isActive: boolean;
    avatar: string;
    roles: string[];
    favoriteColors: string[];
}

export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    inStock: boolean;
}

export interface Post {
    id: number;
    title: string;
    body: string;
    author: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface SearchResult {
    query: string;
    count: number;
    results: (User | Product)[];
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    /**
     * INJECT HTTP CLIENT
     * Using the inject() function (Angular 14+) instead of constructor injection.
     */
    private http = inject(HttpClient);

    /**
     * API BASE URL
     * In real apps, this comes from environment files.
     */
    private readonly API_URL = 'http://localhost:3000/api';

    // ============================================
    // BASIC CRUD OPERATIONS
    // ============================================

    /**
     * GET ALL USERS
     * Returns Observable<User[]>
     */
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.API_URL}/users`);
    }

    /**
     * GET SINGLE USER
     */
    getUser(id: number): Observable<User> {
        return this.http.get<User>(`${this.API_URL}/users/${id}`);
    }

    /**
     * CREATE USER
     * 
     * POST request with JSON body.
     * HttpClient automatically serializes objects to JSON.
     */
    createUser(user: Partial<User>): Observable<User> {
        return this.http.post<User>(`${this.API_URL}/users`, user);
    }

    /**
     * UPDATE USER
     */
    updateUser(id: number, user: Partial<User>): Observable<User> {
        return this.http.put<User>(`${this.API_URL}/users/${id}`, user);
    }

    /**
     * DELETE USER
     * Note: void return type since DELETE typically returns empty body
     */
    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.API_URL}/users/${id}`);
    }

    // ============================================
    // PRODUCTS
    // ============================================

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.API_URL}/products`);
    }

    // ============================================
    // TESTING ENDPOINTS
    // ============================================

    /**
     * SLOW ENDPOINT
     * For testing loading states
     */
    getSlowData(delayMs = 2000): Observable<any> {
        const params = new HttpParams().set('delay', delayMs.toString());
        return this.http.get(`${this.API_URL}/slow`, { params });
    }

    /**
     * ERROR ENDPOINT
     * For testing error handling
     */
    getError(code = 500): Observable<any> {
        const params = new HttpParams().set('code', code.toString());
        return this.http.get(`${this.API_URL}/error`, { params });
    }

    /**
     * RANDOM FAIL ENDPOINT
     * For testing retry logic
     */
    getRandomFail(): Observable<any> {
        return this.http.get(`${this.API_URL}/random-fail`);
    }

    /**
     * SEARCH ENDPOINT
     * For testing debounce/switchMap
     */
    search(query: string): Observable<SearchResult> {
        const params = new HttpParams().set('q', query);
        return this.http.get<SearchResult>(`${this.API_URL}/search`, { params });
    }

    /**
     * PAGINATED POSTS
     */
    getPosts(page = 1, limit = 10): Observable<PaginatedResponse<Post>> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString());
        return this.http.get<PaginatedResponse<Post>>(`${this.API_URL}/posts`, { params });
    }

    /**
     * COMBINED DATA
     * For testing forkJoin
     */
    getCombinedData(): Observable<any> {
        return this.http.get(`${this.API_URL}/combined`);
    }

    // ============================================
    // CACHING EXAMPLE
    // ============================================

    private usersCache$: Observable<User[]> | null = null;

    /**
     * GET USERS WITH CACHE
     * Uses shareReplay to cache the response.
     */
    getUsersCached(): Observable<User[]> {
        if (!this.usersCache$) {
            this.usersCache$ = this.http.get<User[]>(`${this.API_URL}/users`).pipe(
                tap(() => console.log('🔄 Fetching users from API...')),
                shareReplay(1) // 🛡️ CRITICAL: Cache the last emission
            );
        }
        console.log('📦 Returning cached users observable');
        return this.usersCache$;
    }

    /**
     * INVALIDATE CACHE
     */
    invalidateUsersCache(): void {
        this.usersCache$ = null;
        console.log('🗑️ Users cache invalidated');
    }
}
