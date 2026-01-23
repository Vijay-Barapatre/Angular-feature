/**
 * ============================================================================
 * User Service (Dependency to be Mocked)
 * ============================================================================
 * 
 * A service that would typically make HTTP calls.
 * In tests, we mock this to control behavior.
 */

import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'guest';
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    /**
     * Simulates fetching user from API
     */
    getUser(id: number): Observable<User> {
        // In real app, this would be an HTTP call
        const user: User = {
            id,
            name: 'John Doe',
            email: 'john@example.com',
            role: 'user'
        };
        return of(user).pipe(delay(500));
    }

    /**
     * Simulates fetching all users
     */
    getUsers(): Observable<User[]> {
        const users: User[] = [
            { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
            { id: 2, name: 'Bob', email: 'bob@example.com', role: 'user' },
            { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'guest' }
        ];
        return of(users).pipe(delay(300));
    }

    /**
     * Checks if user has admin role
     */
    isAdmin(user: User): boolean {
        return user.role === 'admin';
    }
}
