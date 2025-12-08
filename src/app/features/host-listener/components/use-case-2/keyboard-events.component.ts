/**
 * ============================================================================
 * USE CASE 2: KEYBOARD EVENTS
 * ============================================================================
 * 
 * 💡 LIGHTBULB MOMENT:
 * @HostListener can listen to document-level keyboard events for global shortcuts.
 * Use 'document:keydown' or 'document:keyup' to capture keyboard input anywhere.
 * 
 * SPECIAL SYNTAX FOR KEYS:
 * @HostListener('document:keydown.escape')  - ESC key
 * @HostListener('document:keydown.enter')   - Enter key
 * @HostListener('document:keydown.control.s') - Ctrl+S
 */

import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-keyboard-events',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="container">
            <h1>⌨️ Use Case 2: Keyboard Events</h1>
            <p class="description">
                Press keys anywhere on this page. Try: ESC, Enter, Arrow keys, Ctrl+S, Ctrl+Z.
            </p>

            <div class="keyboard-display">
                <div class="key-pressed" [class.active]="lastKey">
                    {{ lastKey || 'Press a key...' }}
                </div>
                <div class="modifiers">
                    <span [class.active]="modifiers.ctrl">Ctrl</span>
                    <span [class.active]="modifiers.shift">Shift</span>
                    <span [class.active]="modifiers.alt">Alt</span>
                </div>
            </div>

            <div class="shortcuts">
                <h3>🎯 Active Shortcuts</h3>
                <div class="shortcut-list">
                    <div class="shortcut" [class.triggered]="lastShortcut === 'escape'">
                        <kbd>ESC</kbd> Close/Cancel
                    </div>
                    <div class="shortcut" [class.triggered]="lastShortcut === 'enter'">
                        <kbd>Enter</kbd> Submit/Confirm
                    </div>
                    <div class="shortcut" [class.triggered]="lastShortcut === 'ctrl+s'">
                        <kbd>Ctrl+S</kbd> Save (prevented default)
                    </div>
                    <div class="shortcut" [class.triggered]="lastShortcut === 'ctrl+z'">
                        <kbd>Ctrl+Z</kbd> Undo
                    </div>
                    <div class="shortcut" [class.triggered]="lastShortcut === 'arrows'">
                        <kbd>↑↓←→</kbd> Arrow Navigation
                    </div>
                </div>
            </div>

            <div class="code-ref">
                <pre>
// Specific key binding
&#64;HostListener('document:keydown.escape')
onEscape() {{ '{' }} console.log('ESC pressed'); {{ '}' }}

// Combo key binding
&#64;HostListener('document:keydown.control.s', ['$event'])
onSave(event: KeyboardEvent) {{ '{' }}
    event.preventDefault(); // Prevent browser save dialog
    console.log('Ctrl+S pressed');
{{ '}' }}
                </pre>
            </div>
        </div>
    `,
    styles: [`
        .container { max-width: 800px; margin: 0 auto; padding: 2rem; }
        h1 { color: #1a1a2e; margin-bottom: 0.5rem; }
        .description { color: #666; margin-bottom: 2rem; }

        .keyboard-display {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; padding: 2rem; border-radius: 12px;
            text-align: center; margin-bottom: 2rem;
        }
        .key-pressed {
            font-size: 2rem; font-weight: bold; margin-bottom: 1rem;
            padding: 1rem 2rem; background: rgba(0,0,0,0.2); border-radius: 8px;
            display: inline-block; min-width: 150px;
            transition: all 0.2s ease;
        }
        .key-pressed.active { background: rgba(255,255,255,0.2); transform: scale(1.1); }
        .modifiers { display: flex; justify-content: center; gap: 1rem; }
        .modifiers span {
            padding: 0.5rem 1rem; background: rgba(0,0,0,0.2);
            border-radius: 6px; opacity: 0.5; transition: all 0.2s;
        }
        .modifiers span.active { opacity: 1; background: #4ade80; color: #000; }

        .shortcuts { background: #f8f9fa; padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem; }
        .shortcuts h3 { margin-top: 0; color: #1a1a2e; }
        .shortcut-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
        .shortcut {
            background: white; padding: 1rem; border-radius: 8px;
            border: 2px solid #e0e0e0; transition: all 0.3s;
        }
        .shortcut.triggered { border-color: #4ade80; background: #dcfce7; }
        .shortcut kbd {
            background: #1a1a2e; color: #4ade80; padding: 0.25rem 0.5rem;
            border-radius: 4px; font-family: monospace; margin-right: 0.5rem;
        }

        .code-ref { background: #1a1a2e; padding: 1.5rem; border-radius: 12px; }
        .code-ref pre { color: #4ade80; margin: 0; overflow-x: auto; font-size: 0.85rem; }
    `]
})
export class KeyboardEventsComponent {
    lastKey = '';
    lastShortcut = '';
    modifiers = { ctrl: false, shift: false, alt: false };

    /**
     * GENERAL KEYDOWN LISTENER
     * Captures all key presses for display purposes.
     */
    @HostListener('document:keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        this.lastKey = event.key;
        this.modifiers = {
            ctrl: event.ctrlKey,
            shift: event.shiftKey,
            alt: event.altKey
        };

        // Clear highlight after delay
        setTimeout(() => {
            if (this.lastShortcut) this.lastShortcut = '';
        }, 500);
    }

    @HostListener('document:keyup')
    onKeyUp() {
        this.modifiers = { ctrl: false, shift: false, alt: false };
    }

    /**
     * ESCAPE KEY
     */
    @HostListener('document:keydown.escape')
    onEscape() {
        this.lastShortcut = 'escape';
        console.log('ESC pressed - Close/Cancel action');
    }

    /**
     * ENTER KEY
     */
    @HostListener('document:keydown.enter')
    onEnter() {
        this.lastShortcut = 'enter';
        console.log('Enter pressed - Submit action');
    }

    /**
     * CTRL+S - Save shortcut
     * 🛡️ CRITICAL: preventDefault() stops browser's save dialog!
     */
    @HostListener('document:keydown.control.s', ['$event'])
    onSave(event: KeyboardEvent) {
        event.preventDefault();
        this.lastShortcut = 'ctrl+s';
        console.log('Ctrl+S pressed - Save action');
    }

    /**
     * CTRL+Z - Undo shortcut
     */
    @HostListener('document:keydown.control.z', ['$event'])
    onUndo(event: KeyboardEvent) {
        event.preventDefault();
        this.lastShortcut = 'ctrl+z';
        console.log('Ctrl+Z pressed - Undo action');
    }

    /**
     * ARROW KEYS
     */
    @HostListener('document:keydown.arrowup')
    @HostListener('document:keydown.arrowdown')
    @HostListener('document:keydown.arrowleft')
    @HostListener('document:keydown.arrowright')
    onArrow() {
        this.lastShortcut = 'arrows';
    }
}
