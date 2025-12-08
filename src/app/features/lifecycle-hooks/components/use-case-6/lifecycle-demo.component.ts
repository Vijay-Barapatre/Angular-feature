/**
 * LIFECYCLE DEMO COMPONENT - Complete Lifecycle Demonstration
 * 
 * This component implements ALL lifecycle hooks and logs their execution.
 * Use this to understand the exact order in which hooks are called.
 * 
 * LIFECYCLE ORDER:
 * 1. constructor - Class instantiation
 * 2. ngOnChanges - Input property changes (before ngOnInit)
 * 3. ngOnInit - Component initialization
 * 4. ngDoCheck - Custom change detection
 * 5. ngAfterContentInit - After content projection
 * 6. ngAfterContentChecked - After content check
 * 7. ngAfterViewInit - After view initialization
 * 8. ngAfterViewChecked - After view check
 * 9. ngOnDestroy - Before destruction
 */

import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy,
    SimpleChanges,
    ViewChild,
    ElementRef,
    ContentChild
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-lifecycle-demo',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="lifecycle-demo-card">
            <div class="demo-header">
                <span class="status-badge">🎬 All Hooks Active</span>
            </div>

            <!-- View Child Example -->
            <div class="demo-content">
                <div #viewChildRef class="view-child-box">
                    &#64;ViewChild Reference
                </div>

                <!-- Content Projection -->
                <div class="content-projection">
                    <ng-content></ng-content>
                </div>

                <!-- Current State -->
                <div class="state-display">
                    <strong>Message:</strong> {{ message }}
                </div>
            </div>

            <!-- Hook Counters -->
            <div class="hook-counters">
                <div class="counter" *ngFor="let counter of hookCounters">
                    <span class="counter-name" [style.color]="counter.color">
                        {{ counter.name }}
                    </span>
                    <span class="counter-value">{{ counter.count }}</span>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .lifecycle-demo-card {
            background: var(--bg-secondary);
            border-radius: var(--radius-lg);
            padding: var(--spacing-xl);
            border: 2px solid rgba(102, 126, 234, 0.3);
        }

        .demo-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: var(--spacing-lg);
        }

        .status-badge {
            padding: var(--spacing-xs) var(--spacing-md);
            border-radius: var(--radius-sm);
            font-size: 0.875rem;
            font-weight: 600;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(167, 139, 250, 0.2));
            color: var(--primary-light);
        }

        .demo-content {
            margin-bottom: var(--spacing-lg);
        }

        .view-child-box {
            background: var(--bg-card);
            padding: var(--spacing-md);
            border-radius: var(--radius-md);
            text-align: center;
            font-size: 0.875rem;
            color: var(--text-muted);
            margin-bottom: var(--spacing-md);
            border: 1px dashed rgba(236, 72, 153, 0.3);
        }

        .content-projection {
            background: rgba(245, 158, 11, 0.1);
            padding: var(--spacing-md);
            border-radius: var(--radius-md);
            border: 1px dashed rgba(245, 158, 11, 0.3);
            margin-bottom: var(--spacing-md);
        }

        .content-projection ::ng-deep p {
            margin: 0;
            color: var(--text-secondary);
            font-size: 0.875rem;
        }

        .state-display {
            background: var(--bg-card);
            padding: var(--spacing-md);
            border-radius: var(--radius-md);
            font-size: 0.875rem;
        }

        .hook-counters {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: var(--spacing-sm);
        }

        .counter {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: var(--spacing-sm);
            background: var(--bg-card);
            border-radius: var(--radius-sm);
        }

        .counter-name {
            font-size: 0.65rem;
            font-family: 'Consolas', 'Monaco', monospace;
            margin-bottom: 2px;
        }

        .counter-value {
            font-size: 1.25rem;
            font-weight: bold;
            color: var(--text-primary);
        }
    `]
})
export class LifecycleDemoComponent implements
    OnChanges, OnInit, DoCheck,
    AfterContentInit, AfterContentChecked,
    AfterViewInit, AfterViewChecked, OnDestroy {

    @Input() message = '';

    @Output() lifecycleEvent = new EventEmitter<{
        time: string;
        hook: string;
        phase: string;
        color: string;
    }>();

    @ViewChild('viewChildRef') viewChildRef!: ElementRef;

    /**
     * Track hook call counts
     */
    hookCounters = [
        { name: 'OnChanges', count: 0, color: '#60a5fa' },
        { name: 'OnInit', count: 0, color: '#4ade80' },
        { name: 'DoCheck', count: 0, color: '#a78bfa' },
        { name: 'ContentInit', count: 0, color: '#f59e0b' },
        { name: 'ContentCheck', count: 0, color: '#fbbf24' },
        { name: 'ViewInit', count: 0, color: '#ec4899' },
        { name: 'ViewCheck', count: 0, color: '#f472b6' },
        { name: 'OnDestroy', count: 0, color: '#f87171' },
    ];

    private getTimeString(): string {
        return new Date().toLocaleTimeString();
    }

    private emitEvent(hook: string, phase: string, color: string): void {
        this.lifecycleEvent.emit({
            time: this.getTimeString(),
            hook,
            phase,
            color
        });
    }

    // 1. Constructor (not a hook, but part of lifecycle)
    constructor() {
        console.log('🏗️ [Demo] constructor');
    }

    // 2. ngOnChanges
    ngOnChanges(changes: SimpleChanges): void {
        this.hookCounters[0].count++;
        console.log('🔄 [Demo] ngOnChanges', changes);
        this.emitEvent('ngOnChanges', 'Input', '#60a5fa');
    }

    // 3. ngOnInit
    ngOnInit(): void {
        this.hookCounters[1].count++;
        console.log('🚀 [Demo] ngOnInit');
        this.emitEvent('ngOnInit', 'Init', '#4ade80');
    }

    // 4. ngDoCheck
    ngDoCheck(): void {
        this.hookCounters[2].count++;
        // Only log first few to avoid spam
        if (this.hookCounters[2].count <= 3) {
            console.log('🔍 [Demo] ngDoCheck');
            this.emitEvent('ngDoCheck', 'Check', '#a78bfa');
        }
    }

    // 5. ngAfterContentInit
    ngAfterContentInit(): void {
        this.hookCounters[3].count++;
        console.log('📦 [Demo] ngAfterContentInit');
        this.emitEvent('ngAfterContentInit', 'Content', '#f59e0b');
    }

    // 6. ngAfterContentChecked
    ngAfterContentChecked(): void {
        this.hookCounters[4].count++;
        if (this.hookCounters[4].count <= 3) {
            console.log('📦 [Demo] ngAfterContentChecked');
            this.emitEvent('ngAfterContentChecked', 'Content', '#fbbf24');
        }
    }

    // 7. ngAfterViewInit
    ngAfterViewInit(): void {
        this.hookCounters[5].count++;
        console.log('👁️ [Demo] ngAfterViewInit');
        console.log('ViewChild available:', this.viewChildRef?.nativeElement);
        this.emitEvent('ngAfterViewInit', 'View', '#ec4899');
    }

    // 8. ngAfterViewChecked
    ngAfterViewChecked(): void {
        this.hookCounters[6].count++;
        if (this.hookCounters[6].count <= 3) {
            console.log('👁️ [Demo] ngAfterViewChecked');
            this.emitEvent('ngAfterViewChecked', 'View', '#f472b6');
        }
    }

    // 9. ngOnDestroy
    ngOnDestroy(): void {
        this.hookCounters[7].count++;
        console.log('💀 [Demo] ngOnDestroy');
        this.emitEvent('ngOnDestroy', 'Destroy', '#f87171');
    }
}
