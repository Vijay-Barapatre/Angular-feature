import { Component, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Placeholder for user to implement
@Pipe({
    name: 'filter',
    standalone: true
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        // TODO: Implement filtering logic
        // Hint: Return items if searchText is empty works
        // Filter items where name includes searchText (case insensitive)
        if (!items) return [];
        if (!searchText) return items;

        return items.filter(item =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
        );
    }
}

@Component({
    selector: 'app-pipes-exercise',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule, FilterPipe],
    template: `
    <div class="use-case-container fade-in">
      <div class="page-header">
        <a routerLink="/pipes" class="back-link">← Back to Overview</a>
        <h1>✏️ Exercise: Create a Filter Pipe</h1>
        <p class="header-description">Implementing a real-world search filter for a list.</p>
      </div>

      <div class="exercise-card">
        <h2>🎯 Goal</h2>
        <p>
          Implement the logic in <code>FilterPipe</code> to filter the product list 
          based on the search text entered below.
        </p>
        
        <div class="search-box">
          <input type="text" [(ngModel)]="searchTerm" placeholder="Search products..." class="search-input">
        </div>

        <div class="products-grid">
          <div *ngFor="let product of products | filter:searchTerm" class="product-card">
            <div class="icon">{{ product.icon }}</div>
            <h3>{{ product.name }}</h3>
            <p class="price">\${{ product.price }}</p>
          </div>
          
          <div *ngIf="(products | filter:searchTerm).length === 0" class="no-results">
            No products found matching "{{ searchTerm }}"
          </div>
        </div>
      </div>
      
      <div class="hint-box">
        <h3>💡 Hints</h3>
        <ul>
            <li>Original list has {{ products.length }} items.</li>
            <li>Edit <code>filter.pipe.ts</code> (embedded in this component for now).</li>
            <li>Use <code>Array.filter()</code> and <code>String.includes()</code>.</li>
            <li>Don't forget to handle case sensitivity!</li>
        </ul>
      </div>
    </div>
  `,
    styles: [`
    .use-case-container { max-width: 900px; margin: 0 auto; padding: 20px; }
    .page-header { margin-bottom: 30px; }
    .back-link { text-decoration: none; color: var(--primary-color); display: inline-block; margin-bottom: 10px; }
    
    .exercise-card {
      background: var(--bg-secondary);
      padding: 30px;
      border-radius: 12px;
      margin-bottom: 30px;
    }
    
    .search-box { margin: 20px 0; }
    .search-input {
      width: 100%;
      padding: 12px;
      font-size: 1.1rem;
      border-radius: 8px;
      border: 2px solid var(--border-color);
      background: var(--bg-card);
      color: var(--text-primary);
    }
    .search-input:focus { outline: none; border-color: var(--primary-color); }
    
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 15px;
      margin-top: 20px;
    }
    
    .product-card {
      background: var(--bg-card);
      padding: 20px;
      border-radius: 10px;
      text-align: center;
      transition: transform 0.2s;
    }
    .product-card:hover { transform: translateY(-3px); }
    
    .icon { font-size: 2.5rem; margin-bottom: 10px; }
    .product-card h3 { margin: 10px 0; font-size: 1.1rem; }
    .price { color: var(--success); font-weight: bold; }
    
    .no-results {
      grid-column: 1 / -1;
      text-align: center;
      padding: 40px;
      color: var(--text-muted);
      font-style: italic;
    }
    
    .hint-box {
      background: #fff3cd;
      color: #856404;
      padding: 20px;
      border-radius: 8px;
    }
    .hint-box h3 { margin-top: 0; }
  `]
})
export class LearnerExerciseComponent {
    searchTerm = '';

    products = [
        { name: 'Laptop', price: 999, icon: '💻' },
        { name: 'Smartphone', price: 699, icon: '📱' },
        { name: 'Headphones', price: 199, icon: '🎧' },
        { name: 'Camera', price: 599, icon: '📷' },
        { name: 'Watch', price: 299, icon: '⌚' },
        { name: 'Tablet', price: 499, icon: '📟' },
        { name: 'Mouse', price: 49, icon: '🖱️' },
        { name: 'Keyboard', price: 99, icon: '⌨️' }
    ];
}
