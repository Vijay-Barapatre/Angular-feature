import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickTrackerDirective } from './click-tracker.directive';

@Component({
    selector: 'app-analytics-demo',
    standalone: true,
    imports: [CommonModule, ClickTrackerDirective],
    template: `
        <div class="container">
            <h3>📊 Analytics Tracker Demo</h3>
            <p>Open the browser console to see tracking logs.</p>
            
            <div class="button-group">
                <button appTrackClick="btn_download_pdf">
                    Download PDF 📄
                </button>
                
                <button appTrackClick="btn_signup_newsletter">
                    Sign Up Now 📧
                </button>

                <!-- This one should NOT log anything (no directive) -->
                <button>
                    Untracked Button ❌
                </button>
            </div>
        </div>
    `,
    styles: [`
        .container { padding: 20px; }
        .button-group { display: flex; gap: 15px; margin-top: 15px; }
        button { padding: 10px 20px; cursor: pointer; border-radius: 6px; border: 1px solid #ccc; background: #f0f0f0; }
        button:hover { background: #e0e0e0; }
    `]
})
export class AnalyticsDemoComponent { }
