/**
 * ============================================================================
 * INPUT/OUTPUT PRACTICE EXERCISES COMPONENT
 * ============================================================================
 * Interactive learning component with boilerplate code and TODO placeholders
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

// ============================================================================
// BASIC EXERCISE 1: Simple @Input - CHILD COMPONENT (TO COMPLETE)
// ============================================================================
@Component({
  selector: 'app-greeting-card',
  standalone: true,
  template: `
        <div class="card greeting-card">
            <!-- TODO: Display "Hello, {name}!" using the name input -->
            <h3>Hello, !</h3>
            <p>Welcome to Angular Input/Output exercises!</p>
        </div>
    `,
  styles: [`
        .greeting-card { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 1.5rem; border-radius: 12px; text-align: center; }
    `]
})
export class GreetingCardComponent {
  // TODO: Add @Input() decorator to receive 'name' from parent
  // Hint: @Input() propertyName: type;

}

// ============================================================================
// BASIC EXERCISE 2: Simple @Output - CHILD COMPONENT (TO COMPLETE)
// ============================================================================
@Component({
  selector: 'app-click-button',
  standalone: true,
  template: `
        <button class="click-btn" (click)="handleClick()">
            Click Me ({{ clickCount }} times)
        </button>
    `,
  styles: [`
        .click-btn { background: #22c55e; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer; }
        .click-btn:hover { background: #16a34a; }
    `]
})
export class ClickButtonComponent {
  clickCount = 0;

  // TODO: Add @Output() decorated EventEmitter
  // Hint: @Output() eventName = new EventEmitter<number>();

  handleClick() {
    this.clickCount++;
    // TODO: Emit the clickCount to the parent
    // Hint: this.eventName.emit(value);

  }
}

// ============================================================================
// BASIC EXERCISE 3: Two-Way Binding - CHILD COMPONENT (TO COMPLETE)
// ============================================================================
@Component({
  selector: 'app-volume-slider',
  standalone: true,
  template: `
        <div class="slider-container">
            <label>Volume: {{ volume }}%</label>
            <input 
                type="range" 
                [value]="volume"
                (input)="onSlide($event)"
                min="0" 
                max="100">
        </div>
    `,
  styles: [`
        .slider-container { padding: 1rem; background: var(--bg-secondary, #f8f9fa); border-radius: 8px; }
        .slider-container input { width: 100%; margin-top: 0.5rem; }
    `]
})
export class VolumeSliderComponent {
  // TODO: Add @Input() for volume
  // Hint: @Input() volume: number = 50;
  volume = 50;

  // TODO: Add @Output() volumeChange - NOTE THE NAMING CONVENTION!
  // For two-way binding [(volume)], output must be named volumeChange
  // Hint: @Output() volumeChange = new EventEmitter<number>();

  onSlide(event: Event) {
    const value = +(event.target as HTMLInputElement).value;
    // TODO: Update local volume and emit volumeChange
    // Hint: this.volume = value; this.volumeChange.emit(value);

  }
}

// ============================================================================
// BASIC EXERCISE 4: Multiple Inputs - CHILD COMPONENT (TO COMPLETE)
// ============================================================================
@Component({
  selector: 'app-user-card',
  standalone: true,
  template: `
        <div class="user-card">
            <!-- TODO: Bind all inputs to the template -->
            <div class="avatar">
                <img src="" alt="User avatar">
            </div>
            <h3></h3>
            <p class="email"></p>
            <span class="status">
                
            </span>
        </div>
    `,
  styles: [`
        .user-card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1); text-align: center; }
        .avatar img { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; }
        .status { display: inline-block; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; }
        .status.online { background: #dcfce7; color: #16a34a; }
        .status.offline { background: #fee2e2; color: #dc2626; }
    `]
})
export class UserCardComponent {
  // TODO: Add @Input() for name (string)

  // TODO: Add @Input() for email (string)

  // TODO: Add @Input() for avatarUrl (string)

  // TODO: Add @Input() for isOnline (boolean, default false)

}

// ============================================================================
// COMPLEX SCENARIO 1: Shopping Cart Product Card (TO COMPLETE)
// ============================================================================
export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
}

export interface CartEvent {
  product: Product;
  quantity: number;
  action: 'add' | 'remove';
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
        <div class="product-card">
            <div class="product-image">
                <img [src]="product?.imageUrl" [alt]="product?.name">
            </div>
            <h3>{{ product?.name }}</h3>
            <p class="price">{{ product?.price | currency }}</p>
            
            <div class="quantity-controls">
                <button (click)="decrementQty()" [disabled]="quantity <= 1">-</button>
                <span>{{ quantity }}</span>
                <button (click)="incrementQty()">+</button>
            </div>
            
            <button 
                class="add-btn"
                [disabled]="!product?.inStock"
                (click)="addToCart()">
                {{ product?.inStock ? 'Add to Cart' : 'Out of Stock' }}
            </button>
        </div>
    `,
  styles: [`
        .product-card { background: white; border-radius: 12px; padding: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .product-image img { width: 100%; height: 150px; object-fit: cover; border-radius: 8px; }
        .price { font-size: 1.25rem; font-weight: bold; color: #667eea; }
        .quantity-controls { display: flex; align-items: center; justify-content: center; gap: 1rem; margin: 1rem 0; }
        .quantity-controls button { width: 32px; height: 32px; border-radius: 50%; border: 1px solid #e5e7eb; background: white; cursor: pointer; }
        .add-btn { width: 100%; padding: 0.75rem; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer; }
        .add-btn:disabled { background: #e5e7eb; color: #9ca3af; cursor: not-allowed; }
    `]
})
export class ProductCardComponent {
  // TODO: Add @Input() product: Product
  product: Product | null = null;

  // TODO: Add @Output() cartAction: EventEmitter<CartEvent>
  // Hint: @Output() cartAction = new EventEmitter<CartEvent>();

  quantity = 1;

  incrementQty() {
    this.quantity++;
  }

  decrementQty() {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart() {
    /*
      TODO: Emit cartAction event with CartEvent object
      - product: this.product
      - quantity: this.quantity
      - action: 'add'
    */

  }
}

// ============================================================================
// MAIN EXERCISE COMPONENT (ORCHESTRATOR)
// ============================================================================
@Component({
  selector: 'app-learner-exercise',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    GreetingCardComponent,
    ClickButtonComponent,
    VolumeSliderComponent,
    UserCardComponent,
    ProductCardComponent
  ],
  template: `
        <div class="container">
            <header class="header">
                <h1>🎯 Practice Exercises</h1>
                <p class="subtitle">Complete the TODO sections to master &#64;Input/&#64;Output</p>
                <a routerLink=".." class="back-link">← Back to Overview</a>
            </header>

            <!-- BASIC EXERCISE 1 -->
            <section class="exercise">
                <div class="exercise-header">
                    <span class="badge basic">Basic</span>
                    <h2>Exercise 1: Simple &#64;Input()</h2>
                </div>
                <p>Pass the username to the greeting card.</p>
                <div class="demo-area">
                    <input [(ngModel)]="userName" placeholder="Enter your name">
                    <!-- TODO: Pass userName to greeting card using [name]="userName" -->
                    <app-greeting-card></app-greeting-card>
                </div>
            </section>

            <!-- BASIC EXERCISE 2 -->
            <section class="exercise">
                <div class="exercise-header">
                    <span class="badge basic">Basic</span>
                    <h2>Exercise 2: Simple &#64;Output()</h2>
                </div>
                <p>Listen for click events from the button.</p>
                <div class="demo-area">
                    <p>Total clicks received: <strong>{{ totalClicks }}</strong></p>
                    <!-- TODO: Listen for (clicked) event and call onButtonClicked($event) -->
                    <app-click-button></app-click-button>
                </div>
            </section>

            <!-- BASIC EXERCISE 3 -->
            <section class="exercise">
                <div class="exercise-header">
                    <span class="badge basic">Basic</span>
                    <h2>Exercise 3: Two-Way Binding</h2>
                </div>
                <p>Sync the slider with the input using [(volume)].</p>
                <div class="demo-area">
                    <p>Parent volume value: <strong>{{ volume }}</strong></p>
                    <input type="number" [(ngModel)]="volume" min="0" max="100">
                    <!-- TODO: Use [(volume)]="volume" for two-way binding -->
                    <app-volume-slider></app-volume-slider>
                </div>
            </section>

            <!-- BASIC EXERCISE 4 -->
            <section class="exercise">
                <div class="exercise-header">
                    <span class="badge basic">Basic</span>
                    <h2>Exercise 4: Multiple Inputs</h2>
                </div>
                <p>Pass multiple properties to the user card.</p>
                <div class="demo-area">
                    <!-- TODO: Pass all properties: name, email, avatarUrl, isOnline -->
                    <app-user-card></app-user-card>
                </div>
            </section>

            <!-- COMPLEX SCENARIO 1 -->
            <section class="exercise">
                <div class="exercise-header">
                    <span class="badge complex">Complex</span>
                    <h2>Scenario 1: Shopping Cart</h2>
                </div>
                <p>Product cards emit add-to-cart events.</p>
                <div class="demo-area">
                    <div class="cart-summary">
                        <p>Items in cart: <strong>{{ cartItems.length }}</strong></p>
                        <p>Total: <strong>{{ cartTotal | currency }}</strong></p>
                    </div>
                    <div class="product-grid">
                        @for (product of products; track product.id) {
                            <!-- TODO: Pass [product] and listen for (cartAction) -->
                            <app-product-card></app-product-card>
                        }
                    </div>
                </div>
            </section>

            <section class="instructions">
                <h2>📝 How to Complete</h2>
                <ol>
                    <li>Open the component files in your editor</li>
                    <li>Find all <code>// TODO:</code> comments</li>
                    <li>Implement the missing logic</li>
                    <li>Test by interacting with the components</li>
                </ol>
                <p class="hint">
                    💡 <strong>Hint:</strong> Check the <code>practice-exercises.md</code> file for detailed instructions!
                </p>
            </section>
        </div>
    `,
  styles: [`
        .container { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .header h1 { color: var(--primary-color, #667eea); margin-bottom: 0.5rem; }
        .back-link { color: var(--primary-color); text-decoration: none; }

        .exercise { background: white; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .exercise-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
        .badge { padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600; }
        .badge.basic { background: #dbeafe; color: #2563eb; }
        .badge.complex { background: #fee2e2; color: #dc2626; }

        .demo-area { background: #f8fafc; padding: 1rem; border-radius: 8px; margin-top: 1rem; }
        .demo-area input { padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px; margin-bottom: 1rem; width: 100%; max-width: 300px; }

        .cart-summary { background: #667eea; color: white; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; display: flex; gap: 2rem; }
        .product-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }

        .instructions { background: #fef3c7; padding: 1.5rem; border-radius: 12px; }
        .instructions ol { margin: 1rem 0; padding-left: 1.5rem; }
        .hint { margin-top: 1rem; padding: 0.75rem; background: white; border-radius: 8px; }
        code { background: rgba(0,0,0,0.1); padding: 0.1rem 0.3rem; border-radius: 3px; }
    `]
})
export class LearnerExerciseComponent {
  // Exercise 1 data
  userName = 'Angular Developer';

  // Exercise 2 data
  totalClicks = 0;

  // Exercise 3 data
  volume = 50;

  // Exercise 4 data
  user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    isOnline: true
  };

  // Scenario 1 data
  products: Product[] = [
    { id: 1, name: 'Wireless Headphones', price: 79.99, imageUrl: 'https://picsum.photos/200?random=1', inStock: true },
    { id: 2, name: 'Mechanical Keyboard', price: 129.99, imageUrl: 'https://picsum.photos/200?random=2', inStock: true },
    { id: 3, name: 'Gaming Mouse', price: 49.99, imageUrl: 'https://picsum.photos/200?random=3', inStock: false }
  ];
  cartItems: CartEvent[] = [];
  cartTotal = 0;

  // TODO: Implement this method for Exercise 2
  onButtonClicked(count: number) {
    this.totalClicks = count;
  }

  // TODO: Implement this method for Scenario 1
  handleCartAction(event: CartEvent) {
    if (event.action === 'add') {
      this.cartItems.push(event);
      this.cartTotal += event.product.price * event.quantity;
    }
  }
}
