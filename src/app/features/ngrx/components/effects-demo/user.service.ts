import { Injectable } from '@angular/core';
import { Observable, of, throwError, delay } from 'rxjs';

export interface User {
    id: number;
    name: string;
    role: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private mockUsers: User[] = [
        { id: 1, name: 'Alice Johnson', role: 'Admin' },
        { id: 2, name: 'Bob Smith', role: 'Editor' },
        { id: 3, name: 'Charlie Brown', role: 'Viewer' }
    ];

    getUsers(): Observable<User[]> {
        // Simulate API latency of 1500ms
        const randomError = Math.random() < 0.2; // 20% chance of error

        if (randomError) {
            return throwError(() => new Error('Server connection failed! 😱')).pipe(
                delay(1500)
            );
        }

        return of(this.mockUsers).pipe(
            delay(1500)
        );
    }
}
