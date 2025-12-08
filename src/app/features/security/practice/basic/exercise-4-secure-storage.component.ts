/**
 * ============================================================================
 * 🟦 BASIC EXERCISE 4: SECURE LOCAL STORAGE WRAPPER
 * ============================================================================
 * 
 * 📋 OBJECTIVE:
 * Create a secure wrapper around localStorage that encrypts sensitive data
 * and validates stored content before use.
 * 
 * 📝 DESCRIPTION:
 * LocalStorage stores data as plain text, making it vulnerable if XSS
 * occurs. Create a service that:
 * - Encrypts sensitive values before storing
 * - Validates data structure when retrieving
 * - Expires items after a configurable time
 * - Prefixes keys to avoid collisions
 * 
 * ✅ EXPECTED BEHAVIOR:
 * 1. Sensitive data stored encrypted (base64 for demo, real app uses proper encryption)
 * 2. Items auto-expire after TTL
 * 3. Invalid/tampered data returns null
 * 4. UI shows stored items with their status
 * 
 * 🎯 WHAT YOU NEED TO IMPLEMENT:
 * - Complete the setSecure method
 * - Complete the getSecure method
 * - Implement expiry checking
 * - Implement basic encoding/decoding
 */

import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ========================================
// PART 1: SECURE STORAGE SERVICE
// ========================================

interface StoredItem<T> {
    value: T;
    timestamp: number;
    ttl: number;  // Time-to-live in milliseconds
}

@Injectable({ providedIn: 'root' })
export class SecureStorageService {
    private readonly PREFIX = 'secure_';
    private readonly DEFAULT_TTL = 3600000; // 1 hour

    /**
     * TODO: Implement secure storage setter
     * 
     * Steps:
     * 1. Create StoredItem wrapper with timestamp and TTL
     * 2. Serialize to JSON
     * 3. Encode (base64 for demo - use proper encryption in production)
     * 4. Store with prefixed key
     */
    setSecure<T>(key: string, value: T, ttlMs?: number): void {
        /*
         * TODO: Implement feature logic here
         * 
         * HINT:
         * const item: StoredItem<T> = {
         *     value,
         *     timestamp: Date.now(),
         *     ttl: ttlMs || this.DEFAULT_TTL
         * };
         * 
         * const json = JSON.stringify(item);
         * const encoded = btoa(json);  // Basic encoding (use encryption in prod)
         * localStorage.setItem(this.PREFIX + key, encoded);
         */
    }

    /**
     * TODO: Implement secure storage getter
     * 
     * Steps:
     * 1. Get item with prefixed key
     * 2. Decode (base64 for demo)
     * 3. Parse JSON
     * 4. Check if expired
     * 5. Return value or null
     */
    getSecure<T>(key: string): T | null {
        /*
         * TODO: Implement feature logic here
         * 
         * HINT:
         * const encoded = localStorage.getItem(this.PREFIX + key);
         * if (!encoded) return null;
         * 
         * try {
         *     const json = atob(encoded);
         *     const item: StoredItem<T> = JSON.parse(json);
         *     
         *     // Check expiry
         *     if (Date.now() - item.timestamp > item.ttl) {
         *         this.remove(key);
         *         return null;
         *     }
         *     
         *     return item.value;
         * } catch {
         *     // Tampered or invalid data
         *     this.remove(key);
         *     return null;
         * }
         */

        return null; // Replace with your implementation
    }

    /**
     * TODO: Implement removal
     */
    remove(key: string): void {
        // TODO: Write your logic here
        // localStorage.removeItem(this.PREFIX + key);
    }

    /**
     * TODO: Get all secure keys
     */
    getAllKeys(): string[] {
        // TODO: Write your logic here
        // Return all keys that start with PREFIX (without the prefix)

        return []; // Replace with your implementation
    }

    /**
     * TODO: Check if item is expired
     */
    isExpired(key: string): boolean {
        // TODO: Write your logic here

        return true; // Replace with your implementation
    }

    /**
     * TODO: Get remaining TTL for an item
     */
    getRemainingTtl(key: string): number {
        // TODO: Write your logic here
        // Return remaining time in milliseconds, or 0 if expired

        return 0; // Replace with your implementation
    }
}

// ========================================
// PART 2: DEMO COMPONENT
// ========================================

@Component({
    selector: 'app-exercise-secure-storage',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="exercise-container">
            <h2>🔒 Exercise 4: Secure Local Storage</h2>
            
            <div class="input-section">
                <h3>Store Secure Data</h3>
                <div class="form-row">
                    <input [(ngModel)]="newKey" placeholder="Key name">
                    <input [(ngModel)]="newValue" placeholder="Value (will be encoded)">
                    <input [(ngModel)]="ttlMinutes" type="number" placeholder="TTL (minutes)">
                    <button (click)="storeItem()">Store Securely</button>
                </div>
            </div>

            <div class="retrieve-section">
                <h3>Retrieve Data</h3>
                <div class="form-row">
                    <input [(ngModel)]="retrieveKey" placeholder="Key to retrieve">
                    <button (click)="retrieveItem()">Get Value</button>
                </div>
                <div class="result" *ngIf="retrievedValue !== null">
                    <strong>Retrieved:</strong> {{ retrievedValue }}
                </div>
                <div class="error" *ngIf="retrievedValue === null && retrieveAttempted">
                    Item not found or expired
                </div>
            </div>

            <div class="stored-items">
                <h3>📦 All Stored Items</h3>
                <button (click)="refreshItems()" class="refresh-btn">🔄 Refresh</button>
                
                <div class="item-list" *ngIf="storedItems.length > 0">
                    <div class="item" *ngFor="let item of storedItems" [class.expired]="item.expired">
                        <div class="item-header">
                            <span class="key">{{ item.key }}</span>
                            <span class="status" [class.valid]="!item.expired">
                                {{ item.expired ? '⏰ Expired' : '✅ Valid' }}
                            </span>
                        </div>
                        <div class="item-details">
                            <span class="ttl" *ngIf="!item.expired">
                                TTL: {{ item.remainingTtl }}s remaining
                            </span>
                            <button class="delete-btn" (click)="deleteItem(item.key)">🗑️</button>
                        </div>
                    </div>
                </div>
                
                <div class="empty" *ngIf="storedItems.length === 0">
                    No secure items stored
                </div>
            </div>

            <div class="raw-storage">
                <h3>🔍 Raw localStorage (Encoded)</h3>
                <pre>{{ rawStorageView }}</pre>
            </div>
        </div>
    `,
    styles: [`
        .exercise-container { max-width: 700px; margin: 2rem auto; padding: 1.5rem; }
        h2 { color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 0.5rem; }
        h3 { margin-top: 1.5rem; margin-bottom: 0.75rem; }
        
        .form-row { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .form-row input { flex: 1; min-width: 120px; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 6px; }
        .form-row button { padding: 0.5rem 1rem; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; }
        
        .result { margin-top: 0.75rem; padding: 0.75rem; background: #f0fdf4; border-radius: 6px; }
        .error { margin-top: 0.75rem; padding: 0.75rem; background: #fee2e2; color: #dc2626; border-radius: 6px; }
        
        .refresh-btn { padding: 0.25rem 0.5rem; background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 4px; cursor: pointer; margin-bottom: 0.75rem; }
        
        .item { padding: 0.75rem; background: #f8fafc; border-radius: 6px; margin-bottom: 0.5rem; }
        .item.expired { opacity: 0.6; background: #fef2f2; }
        .item-header { display: flex; justify-content: space-between; align-items: center; }
        .key { font-family: monospace; font-weight: 500; }
        .status { font-size: 0.8rem; }
        .status.valid { color: #10b981; }
        .item-details { display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem; }
        .ttl { font-size: 0.8rem; color: #6b7280; }
        .delete-btn { padding: 0.25rem 0.5rem; background: none; border: none; cursor: pointer; }
        
        .empty { padding: 1rem; text-align: center; color: #9ca3af; }
        
        .raw-storage { margin-top: 1.5rem; }
        .raw-storage pre { background: #1e1e2e; color: #a6e3a1; padding: 1rem; border-radius: 8px; font-size: 0.75rem; overflow-x: auto; max-height: 150px; }
    `]
})
export class ExerciseSecureStorageComponent {
    newKey = '';
    newValue = '';
    ttlMinutes = 5;

    retrieveKey = '';
    retrievedValue: string | null = null;
    retrieveAttempted = false;

    storedItems: Array<{ key: string; expired: boolean; remainingTtl: number }> = [];
    rawStorageView = '';

    constructor(private secureStorage: SecureStorageService) {
        this.refreshItems();
    }

    storeItem(): void {
        if (this.newKey && this.newValue) {
            const ttlMs = this.ttlMinutes * 60 * 1000;
            this.secureStorage.setSecure(this.newKey, this.newValue, ttlMs);
            this.newKey = '';
            this.newValue = '';
            this.refreshItems();
        }
    }

    retrieveItem(): void {
        this.retrieveAttempted = true;
        this.retrievedValue = this.secureStorage.getSecure<string>(this.retrieveKey);
    }

    deleteItem(key: string): void {
        this.secureStorage.remove(key);
        this.refreshItems();
    }

    refreshItems(): void {
        const keys = this.secureStorage.getAllKeys();
        this.storedItems = keys.map(key => ({
            key,
            expired: this.secureStorage.isExpired(key),
            remainingTtl: Math.round(this.secureStorage.getRemainingTtl(key) / 1000)
        }));

        // Show raw storage
        this.rawStorageView = Object.entries(localStorage)
            .filter(([k]) => k.startsWith('secure_'))
            .map(([k, v]) => `${k}: ${v}`)
            .join('\n') || 'No secure items';
    }
}
