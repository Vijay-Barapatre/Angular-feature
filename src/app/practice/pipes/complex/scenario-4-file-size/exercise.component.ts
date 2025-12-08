/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 4: FILE SIZE
 * ============================================================================
 */

import { Component, Pipe, PipeTransform, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Pipe({ name: 'fileSize', standalone: true })
export class FileSizePipe implements PipeTransform {
    private units = ['B', 'KB', 'MB', 'GB', 'TB'];

    transform(bytes: number, decimals = 2): string {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const size = parseFloat((bytes / Math.pow(k, i)).toFixed(decimals));
        return `${size} ${this.units[i]}`;
    }
}

@Component({
    selector: 'app-scenario-4-file-size',
    standalone: true,
    imports: [CommonModule, FileSizePipe],
    template: `
        <div class="scenario">
            <div class="instructions">
                <h2>🟥 Scenario 4: File Size Pipe</h2>
                <p>Convert bytes to human-readable file sizes.</p>
            </div>

            <div class="content">
                <div class="file-list">
                    @for (file of files; track file.name) {
                        <div class="file-item">
                            <span class="icon">{{ file.icon }}</span>
                            <span class="name">{{ file.name }}</span>
                            <span class="size">{{ file.size | fileSize }}</span>
                        </div>
                    }
                </div>

                <div class="total">
                    <strong>Total:</strong> {{ totalSize() | fileSize }}
                </div>

                <div class="converter">
                    <h4>Size Converter</h4>
                    <input type="number" [value]="inputBytes()" 
                        (input)="inputBytes.set(+$any($event.target).value)">
                    <span class="result">= {{ inputBytes() | fileSize:3 }}</span>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario { max-width: 800px; }
        .instructions { background: #fef2f2; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; color: #1e1e2e; border-left: 4px solid #ef4444; }
        .instructions h2 { margin: 0 0 0.5rem; color: #ef4444; }
        .content { background: white; padding: 1.5rem; border-radius: 12px; }
        .file-list { margin-bottom: 1rem; }
        .file-item { display: flex; gap: 1rem; padding: 0.75rem; background: #f8fafc; border-radius: 6px; margin-bottom: 0.5rem; align-items: center; }
        .icon { font-size: 1.25rem; }
        .name { flex: 1; }
        .size { color: #6b7280; font-family: monospace; }
        .total { padding: 1rem; background: #ecfdf5; border-radius: 8px; margin-bottom: 1rem; }
        .converter { padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .converter h4 { margin: 0 0 0.5rem; }
        .converter input { padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 6px; width: 150px; }
        .result { margin-left: 1rem; color: #10b981; font-weight: 500; }
    `]
})
export class Scenario4FileSizeComponent {
    files = [
        { name: 'photo.jpg', size: 2457600, icon: '🖼️' },
        { name: 'document.pdf', size: 524288, icon: '📄' },
        { name: 'video.mp4', size: 1073741824, icon: '🎬' },
        { name: 'music.mp3', size: 5242880, icon: '🎵' },
        { name: 'data.json', size: 1024, icon: '📊' },
    ];

    inputBytes = signal(1048576);

    totalSize(): number {
        return this.files.reduce((sum, f) => sum + f.size, 0);
    }
}
