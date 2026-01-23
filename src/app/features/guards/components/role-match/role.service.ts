/**
 * RoleService
 * 
 * Simple service to manage user roles for demonstration.
 * In a real app, this would come from an auth service or JWT token.
 */

import { Injectable, signal } from '@angular/core';

export type UserRole = 'guest' | 'user' | 'premium' | 'admin';

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    // 🔧 Using signals for reactive role state
    private currentRole = signal<UserRole>('guest');

    getRole(): UserRole {
        return this.currentRole();
    }

    setRole(role: UserRole): void {
        this.currentRole.set(role);
        console.log(`[RoleService] Role changed to: ${role}`);
    }

    hasRole(requiredRole: UserRole): boolean {
        const roleHierarchy: UserRole[] = ['guest', 'user', 'premium', 'admin'];
        const currentIndex = roleHierarchy.indexOf(this.currentRole());
        const requiredIndex = roleHierarchy.indexOf(requiredRole);
        return currentIndex >= requiredIndex;
    }

    isAdmin(): boolean {
        return this.currentRole() === 'admin';
    }

    isPremium(): boolean {
        return this.currentRole() === 'premium' || this.currentRole() === 'admin';
    }
}
