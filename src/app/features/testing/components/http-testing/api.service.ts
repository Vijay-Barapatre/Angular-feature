/**
 * ============================================================================
 * API SERVICE (HTTP Testing)
 * ============================================================================
 * 
 * Service that makes HTTP requests.
 * Demonstrates HttpClientTestingModule usage.
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export interface CreatePostDto {
    title: string;
    body: string;
    userId: number;
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private http = inject(HttpClient);
    private baseUrl = 'https://jsonplaceholder.typicode.com';

    /**
     * GET: Fetch all posts
     */
    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.baseUrl}/posts`).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * GET: Fetch single post by ID
     */
    getPost(id: number): Observable<Post> {
        return this.http.get<Post>(`${this.baseUrl}/posts/${id}`).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * POST: Create a new post
     */
    createPost(post: CreatePostDto): Observable<Post> {
        return this.http.post<Post>(`${this.baseUrl}/posts`, post).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * PUT: Update existing post
     */
    updatePost(id: number, post: Partial<Post>): Observable<Post> {
        return this.http.put<Post>(`${this.baseUrl}/posts/${id}`, post).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * DELETE: Remove post
     */
    deletePost(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/posts/${id}`).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * GET with query params
     */
    getPostsByUser(userId: number): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.baseUrl}/posts`, {
            params: { userId: userId.toString() }
        }).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * Centralized error handling
     */
    private handleError(error: HttpErrorResponse): Observable<never> {
        let message = 'An error occurred';

        if (error.error instanceof ErrorEvent) {
            // Client-side error
            message = error.error.message;
        } else {
            // Server-side error
            message = `Error ${error.status}: ${error.statusText}`;
        }

        return throwError(() => new Error(message));
    }
}
