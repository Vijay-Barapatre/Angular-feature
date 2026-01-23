/**
 * PARENT COMPONENT - Singleton vs Component-Scoped
 * 
 * PURPOSE:
 * Demonstrates how the same CounterService can have:
 * 1. A SINGLETON instance (shared across the app)
 * 2. A COMPONENT-SCOPED instance (unique to specific components)
 * 
 * KEY INSIGHT:
 * - ChildA has its OWN providers: [CounterService] → NEW instance
 * - ChildB has NO providers → Uses the ROOT singleton
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CounterService } from './counter.service';
import { UseCase2ChildAComponent } from './child-a.component';
import { UseCase2ChildBComponent } from './child-b.component';

@Component({
    selector: 'app-use-case-2-parent',
    standalone: true,
    imports: [CommonModule, RouterLink, UseCase2ChildAComponent, UseCase2ChildBComponent],
    templateUrl: './parent.component.html',
    styleUrl: './parent.component.css'
})
export class UseCase2ParentComponent {
    /**
     * Parent uses the ROOT singleton.
     * Same instance as ChildB (which also uses root).
     */
    constructor(public counterService: CounterService) {
        console.log('[Parent] Using ROOT singleton:', this.counterService.instanceId);
    }
}
