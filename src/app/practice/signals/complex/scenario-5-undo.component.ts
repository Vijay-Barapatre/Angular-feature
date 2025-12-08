/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 5: UNDO/REDO HISTORY
 * ============================================================================
 */

import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DrawingState {
    shapes: string[];
}

@Component({
    selector: 'app-scenario-5-undo',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 5: Undo/Redo with Signals</h2>
                <p>State history management using signal arrays.</p>
            </div>

            <div class="editor">
                <div class="toolbar">
                    <button (click)="undo()" [disabled]="!canUndo()">⟲ Undo</button>
                    <button (click)="redo()" [disabled]="!canRedo()">⟳ Redo</button>
                    <span class="history-info">
                        Step {{ currentIndex() + 1 }} of {{ history().length }}
                    </span>
                </div>

                <div class="shapes-toolbar">
                    <button (click)="addShape('🔵')">🔵 Circle</button>
                    <button (click)="addShape('🟥')">🟥 Square</button>
                    <button (click)="addShape('🔺')">🔺 Triangle</button>
                    <button (click)="addShape('⭐')">⭐ Star</button>
                    <button (click)="clearAll()" class="clear">🗑️ Clear</button>
                </div>

                <div class="canvas">
                    @if (currentState().shapes.length > 0) {
                        @for (shape of currentState().shapes; track shape; let idx = $index) {
                            <span class="shape" (click)="removeShape(idx)">{{ shape }}</span>
                        }
                    } @else {
                        <p class="placeholder">Click shapes above to add them here</p>
                    }
                </div>

                <div class="history-panel">
                    <h4>📜 History</h4>
                    <div class="history-list">
                        @for (state of history(); track state; let i = $index) {
                            <div 
                                class="history-entry" 
                                [class.current]="i === currentIndex()"
                                (click)="goToState(i)">
                                Step {{ i + 1 }}: {{ state.shapes.length }} shapes
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 700px; }
        .instructions { background: #fef2f2; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #8b5cf6; }
        .editor { background: white; padding: 1.5rem; border-radius: 12px; }
        .toolbar { display: flex; gap: 0.5rem; align-items: center; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #e5e7eb; }
        .toolbar button { padding: 0.5rem 1rem; border: 1px solid #e5e7eb; border-radius: 6px; background: white; cursor: pointer; }
        .toolbar button:disabled { opacity: 0.5; cursor: not-allowed; }
        .history-info { margin-left: auto; color: #6b7280; font-size: 0.9rem; }
        .shapes-toolbar { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
        .shapes-toolbar button { padding: 0.5rem 1rem; border: none; border-radius: 6px; background: #8b5cf6; color: white; cursor: pointer; }
        .shapes-toolbar button.clear { background: #ef4444; }
        .canvas { min-height: 150px; padding: 1.5rem; background: #f8fafc; border-radius: 8px; border: 2px dashed #e5e7eb; margin-bottom: 1rem; display: flex; flex-wrap: wrap; gap: 0.5rem; align-content: flex-start; }
        .canvas .placeholder { width: 100%; text-align: center; color: #9ca3af; }
        .shape { font-size: 2rem; cursor: pointer; transition: transform 0.2s; }
        .shape:hover { transform: scale(1.2); }
        .history-panel { padding: 1rem; background: #1e1e2e; border-radius: 8px; color: white; }
        .history-panel h4 { margin: 0 0 0.75rem; }
        .history-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .history-entry { padding: 0.5rem 0.75rem; background: #334155; border-radius: 4px; font-size: 0.85rem; cursor: pointer; }
        .history-entry.current { background: #8b5cf6; }
        .history-entry:hover { opacity: 0.8; }
    `]
})
export class Scenario5UndoComponent {
    /**
     * TODO: Create signal for history array
     */
    history = signal<DrawingState[]>([{ shapes: [] }]);

    /**
     * TODO: Create signal for current index
     */
    currentIndex = signal(0);

    /**
     * TODO: Create computed for current state
     */
    currentState = computed(() => this.history()[this.currentIndex()]);

    /**
     * TODO: Create computed for canUndo
     */
    canUndo = computed(() => this.currentIndex() > 0);

    /**
     * TODO: Create computed for canRedo
     */
    canRedo = computed(() => this.currentIndex() < this.history().length - 1);

    /**
     * TODO: Add shape and push to history
     */
    addShape(shape: string): void {
        const newState: DrawingState = {
            shapes: [...this.currentState().shapes, shape]
        };
        this.pushState(newState);
    }

    /**
     * TODO: Remove shape at index
     */
    removeShape(index: number): void {
        const newShapes = this.currentState().shapes.filter((_, i) => i !== index);
        this.pushState({ shapes: newShapes });
    }

    /**
     * TODO: Clear all shapes
     */
    clearAll(): void {
        if (this.currentState().shapes.length > 0) {
            this.pushState({ shapes: [] });
        }
    }

    /**
     * TODO: Push new state to history (truncate future if needed)
     */
    pushState(state: DrawingState): void {
        const currentIdx = this.currentIndex();
        const newHistory = this.history().slice(0, currentIdx + 1);
        newHistory.push(state);

        this.history.set(newHistory);
        this.currentIndex.set(newHistory.length - 1);
    }

    /**
     * TODO: Undo - go back one step
     */
    undo(): void {
        if (this.canUndo()) {
            this.currentIndex.update(i => i - 1);
        }
    }

    /**
     * TODO: Redo - go forward one step
     */
    redo(): void {
        if (this.canRedo()) {
            this.currentIndex.update(i => i + 1);
        }
    }

    /**
     * TODO: Go to specific state
     */
    goToState(index: number): void {
        this.currentIndex.set(index);
    }
}
