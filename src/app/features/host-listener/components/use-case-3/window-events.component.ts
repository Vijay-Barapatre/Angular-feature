/**
 * ============================================================================
 * USE CASE 3: WINDOW/DOCUMENT EVENTS
 * ============================================================================
 * 
 * 💡 LIGHTBULB MOMENT:
 * @HostListener can target window and document for global events like
 * scroll, resize, online/offline status, and visibility changes.
 * 
 * TARGETS:
 * - 'window:scroll'  - Page scroll
 * - 'window:resize'  - Browser resize
 * - 'window:online'  - Network reconnected
 * - 'window:offline' - Network disconnected
 * - 'document:visibilitychange' - Tab focus/blur
 */

import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-window-events',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <h1>🖥️ Use Case 3: Window/Document Events</h1>
            <p class="description">
                Scroll, resize, or switch tabs to see window-level event handling.
            </p>

            <div class="status-grid">
                <div class="status-card">
                    <span class="icon">📜</span>
                    <h3>Scroll Position</h3>
                    <p class="value">{{ scrollY }}px</p>
                    <div class="progress-bar">
                        <div class="progress" [style.width.%]="scrollPercent"></div>
                    </div>
                </div>

                <div class="status-card">
                    <span class="icon">📐</span>
                    <h3>Window Size</h3>
                    <p class="value">{{ windowWidth }} x {{ windowHeight }}</p>
                </div>

                <div class="status-card" [class.online]="isOnline" [class.offline]="!isOnline">
                    <span class="icon">{{ isOnline ? '🟢' : '🔴' }}</span>
                    <h3>Network Status</h3>
                    <p class="value">{{ isOnline ? 'Online' : 'Offline' }}</p>
                </div>

                <div class="status-card">
                    <span class="icon">{{ isVisible ? '👁️' : '😴' }}</span>
                    <h3>Tab Visibility</h3>
                    <p class="value">{{ isVisible ? 'Visible' : 'Hidden' }}</p>
                </div>
            </div>

            <!-- Scroll content to test -->
            <div class="scroll-content">
                <p>Scroll down to see the scroll position update...</p>
                @for (i of [1,2,3,4,5,6,7,8,9,10]; track i) {
                    <div class="scroll-block">Block {{ i }}</div>
                }
            </div>

            <div class="back-to-top" [class.visible]="scrollY > 200" (click)="scrollToTop()">
                ↑ Top
            </div>
        </div>
    `,
    styles: [`
        .container { max-width: 800px; margin: 0 auto; padding: 2rem; }
        h1 { color: #1a1a2e; margin-bottom: 0.5rem; }
        .description { color: #666; margin-bottom: 2rem; }

        .status-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 2rem; position: sticky; top: 1rem; z-index: 10; }
        .status-card {
            background: white; padding: 1.5rem; border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center;
        }
        .status-card .icon { font-size: 2rem; display: block; margin-bottom: 0.5rem; }
        .status-card h3 { margin: 0 0 0.5rem 0; font-size: 0.9rem; color: #666; }
        .status-card .value { margin: 0; font-size: 1.2rem; font-weight: bold; color: #1a1a2e; }
        .status-card.online { border: 2px solid #4ade80; }
        .status-card.offline { border: 2px solid #ef4444; }

        .progress-bar { height: 6px; background: #e0e0e0; border-radius: 3px; margin-top: 0.5rem; overflow: hidden; }
        .progress { height: 100%; background: linear-gradient(90deg, #667eea, #764ba2); transition: width 0.1s; }

        .scroll-content { margin-top: 2rem; }
        .scroll-block {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; padding: 3rem; margin-bottom: 1rem;
            border-radius: 12px; text-align: center; font-size: 1.5rem;
        }

        .back-to-top {
            position: fixed; bottom: 2rem; right: 2rem;
            background: #667eea; color: white;
            padding: 1rem; border-radius: 50%;
            cursor: pointer; opacity: 0; transition: opacity 0.3s;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .back-to-top.visible { opacity: 1; }
    `]
})
export class WindowEventsComponent implements OnInit {
    scrollY = 0;
    scrollPercent = 0;
    windowWidth = 0;
    windowHeight = 0;
    isOnline = true;
    isVisible = true;

    ngOnInit() {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.isOnline = navigator.onLine;
    }

    /**
     * WINDOW SCROLL EVENT
     */
    @HostListener('window:scroll')
    onScroll() {
        this.scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        this.scrollPercent = docHeight > 0 ? (this.scrollY / docHeight) * 100 : 0;
    }

    /**
     * WINDOW RESIZE EVENT
     */
    @HostListener('window:resize')
    onResize() {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
    }

    /**
     * NETWORK ONLINE/OFFLINE
     */
    @HostListener('window:online')
    onOnline() {
        this.isOnline = true;
        console.log('Network: Back online');
    }

    @HostListener('window:offline')
    onOffline() {
        this.isOnline = false;
        console.log('Network: Went offline');
    }

    /**
     * TAB VISIBILITY CHANGE
     */
    @HostListener('document:visibilitychange')
    onVisibilityChange() {
        this.isVisible = !document.hidden;
        console.log('Tab visibility:', this.isVisible ? 'Visible' : 'Hidden');
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
