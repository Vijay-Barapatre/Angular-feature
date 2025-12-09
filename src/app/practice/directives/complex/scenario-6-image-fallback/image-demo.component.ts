import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageFallbackDirective } from './image-fallback.directive';

@Component({
    selector: 'app-image-demo',
    standalone: true,
    imports: [CommonModule, ImageFallbackDirective],
    template: `
        <div class="container">
            <h3>🖼️ Broken Image Handler</h3>
            
            <div class="image-grid">
                <!-- Case 1: Valid Image -->
                <div class="card">
                    <p>Valid Image:</p>
                    <img src="https://via.placeholder.com/150/92c952" 
                         appImageFallback 
                         alt="Valid">
                </div>

                <!-- Case 2: Broken Image (Should show default fallback) -->
                <div class="card">
                    <p>Broken Image (Default Fallback):</p>
                    <img src="https://invalid-url-example.com/missing.jpg" 
                         appImageFallback 
                         alt="Broken">
                </div>

                <!-- Case 3: Broken Image (Custom Fallback) -->
                <div class="card">
                    <p>Broken Image (Custom Fallback):</p>
                    <img src="https://invalid-url-example.com/another-missing.jpg" 
                         appImageFallback 
                         [appImageFallback]="'https://via.placeholder.com/150/000000/FFFFFF?text=Custom+Fallback'"
                         alt="Broken Custom">
                </div>
            </div>
        </div>
    `,
    styles: [`
        .container { padding: 20px; }
        .image-grid { display: flex; gap: 20px; }
        .card { border: 1px solid #ccc; padding: 10px; border-radius: 8px; text-align: center; }
        img { width: 150px; height: 150px; object-fit: cover; border-radius: 4px; }
    `]
})
export class ImageDemoComponent { }
