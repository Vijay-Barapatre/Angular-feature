/**
 * USE CASE 3: PARENT COMPONENT - View Lifecycle Hooks
 * 
 * Demonstrates ngAfterViewInit and ngAfterViewChecked lifecycle hooks.
 * Shows how to access @ViewChild elements after the view is initialized.
 * 
 * LEARNING OBJECTIVES:
 * - Understanding when view lifecycle hooks are called
 * - Safe access to @ViewChild elements
 * - Initializing third-party libraries after view renders
 * - View check cycle awareness
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ChartComponent } from './chart.component';

@Component({
    selector: 'app-use-case-3-parent',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink, ChartComponent],
    templateUrl: './parent.component.html',
    styleUrl: './parent.component.css'
})
export class UseCase3ParentComponent {
    /**
     * Controls chart visibility
     */
    showChart = true;

    /**
     * Chart data that can be updated
     */
    chartData = [65, 59, 80, 81, 56, 55, 40];

    /**
     * Log of view lifecycle events
     */
    viewLifecycleLog: { time: string; event: string; type: 'init' | 'checked' }[] = [];

    /**
     * Toggle chart visibility
     */
    toggleChart(): void {
        this.showChart = !this.showChart;
    }

    /**
     * Update chart data to trigger view updates
     */
    randomizeData(): void {
        this.chartData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100));
    }

    /**
     * Add a new data point
     */
    addDataPoint(): void {
        this.chartData = [...this.chartData, Math.floor(Math.random() * 100)];
    }

    /**
     * Receive lifecycle events from child
     */
    onViewLifecycleEvent(event: { time: string; event: string; type: 'init' | 'checked' }): void {
        this.viewLifecycleLog.unshift(event);
        if (this.viewLifecycleLog.length > 20) {
            this.viewLifecycleLog.pop();
        }
    }

    /**
     * Clear the log
     */
    clearLog(): void {
        this.viewLifecycleLog = [];
    }
}
