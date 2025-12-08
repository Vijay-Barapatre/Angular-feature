
import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // Using Signals for reactive state
    isLoggedIn = signal<boolean>(false);
    currentUser = signal<string | null>(null);

    login(username: string) {
        this.isLoggedIn.set(true);
        this.currentUser.set(username);
    }

    logout() {
        this.isLoggedIn.set(false);
        this.currentUser.set(null);
    }
}
