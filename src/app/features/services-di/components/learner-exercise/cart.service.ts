import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    // using signals for modern state management
    private cartItems = signal<CartItem[]>([]);

    // Computed values
    readonly items = this.cartItems.asReadonly();

    readonly totalPrice = computed(() => {
        return this.cartItems().reduce((total, item) => total + (item.price * item.quantity), 0);
    });

    readonly itemCount = computed(() => {
        return this.cartItems().reduce((count, item) => count + item.quantity, 0);
    });

    addItem(item: CartItem): void {
        this.cartItems.update(items => {
            const existingItem = items.find(i => i.id === item.id);
            if (existingItem) {
                return items.map(i =>
                    i.id === item.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }
            return [...items, { ...item, quantity: 1 }];
        });
        console.log(`[CartService] Added item: ${item.name}`);
    }

    removeItem(id: number): void {
        this.cartItems.update(items => items.filter(i => i.id !== id));
        console.log(`[CartService] Removed item with ID: ${id}`);
    }

    clearCart(): void {
        this.cartItems.set([]);
        console.log('[CartService] Cart cleared');
    }
}
