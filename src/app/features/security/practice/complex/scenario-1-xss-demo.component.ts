/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 1: XSS ATTACK PREVENTION DEMO
 * ============================================================================
 * 
 * 📋 REAL-WORLD REQUIREMENT:
 * A content management system allows admins to create blog posts with
 * rich HTML. Meanwhile, regular users can post comments. The system must:
 * - Allow trusted admin content with full HTML
 * - Sanitize user comments to prevent XSS
 * - Display a security dashboard showing blocked attacks
 * - Log potential attack attempts for security audit
 * 
 * 📝 PROBLEM STATEMENT:
 * Create a blog post viewer that demonstrates the difference between
 * trusted and untrusted content rendering, with attack detection.
 * 
 * ✅ EXPECTED RESULT:
 * - Admin posts render fully (including allowed scripts for analytics)
 * - User comments have dangerous content stripped
 * - Security dashboard shows attack statistics
 * - Attack attempts are logged with details
 */

import { Component, Injectable, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// ========================================
// INTERFACES
// ========================================

interface BlogPost {
    id: number;
    title: string;
    content: string;
    author: string;
    isTrusted: boolean;
}

interface Comment {
    id: number;
    postId: number;
    content: string;
    author: string;
    timestamp: Date;
}

interface AttackLog {
    timestamp: Date;
    type: string;
    content: string;
    blocked: boolean;
}

// ========================================
// SECURITY SERVICE
// ========================================

@Injectable({ providedIn: 'root' })
export class XssSecurityService {
    private attackLogs = signal<AttackLog[]>([]);

    /**
     * TODO: Implement XSS pattern detection
     * 
     * Detect various XSS attack patterns:
     * 1. <script> tags
     * 2. javascript: URLs
     * 3. on* event handlers (onclick, onerror, onload, etc.)
     * 4. data: URLs in src attributes
     * 5. expression() in CSS
     * 6. eval() calls
     * 7. document.cookie access
     * 
     * Return array of detected attack types
     */
    detectXssPatterns(content: string): string[] {
        const detected: string[] = [];

        /*
         * TODO: Implement feature logic here
         * 
         * const patterns = [
         *     { regex: /<script[\s\S]*?>[\s\S]*?<\/script>/gi, type: 'Script Tag' },
         *     { regex: /javascript\s*:/gi, type: 'JavaScript Protocol' },
         *     { regex: /on\w+\s*=/gi, type: 'Event Handler' },
         *     { regex: /data\s*:\s*text\/html/gi, type: 'Data URL' },
         *     { regex: /expression\s*\(/gi, type: 'CSS Expression' },
         *     { regex: /eval\s*\(/gi, type: 'Eval Call' },
         *     { regex: /document\.cookie/gi, type: 'Cookie Access' },
         * ];
         * 
         * patterns.forEach(p => {
         *     if (p.regex.test(content)) {
         *         detected.push(p.type);
         *     }
         * });
         */

        return detected;
    }

    /**
     * TODO: Implement content sanitization
     * 
     * Remove dangerous patterns while preserving safe HTML:
     * - Remove <script> tags entirely
     * - Remove on* event handlers from elements
     * - Remove javascript: from hrefs
     * - Keep safe tags: p, b, i, a (with safe href), ul, li, br
     */
    sanitizeContent(content: string): string {
        /*
         * TODO: Implement feature logic here
         * 
         * let sanitized = content;
         * 
         * // Remove script tags and content
         * sanitized = sanitized.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
         * 
         * // Remove event handlers
         * sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
         * 
         * // Remove javascript: protocols
         * sanitized = sanitized.replace(/javascript\s*:/gi, '');
         * 
         * return sanitized;
         */

        return content; // Replace with sanitized content
    }

    /**
     * TODO: Log attack attempt
     */
    logAttack(type: string, content: string, blocked: boolean): void {
        /*
         * TODO: Implement feature logic here
         * 
         * this.attackLogs.update(logs => [...logs, {
         *     timestamp: new Date(),
         *     type,
         *     content: content.substring(0, 100) + (content.length > 100 ? '...' : ''),
         *     blocked
         * }]);
         */
    }

    getAttackLogs() {
        return this.attackLogs;
    }

    getAttackStats(): { total: number; blocked: number; types: Record<string, number> } {
        const logs = this.attackLogs();
        const types: Record<string, number> = {};

        logs.forEach(log => {
            types[log.type] = (types[log.type] || 0) + 1;
        });

        return {
            total: logs.length,
            blocked: logs.filter(l => l.blocked).length,
            types
        };
    }
}

// ========================================
// BLOG COMPONENT
// ========================================

@Component({
    selector: 'app-scenario-xss-demo',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="scenario-container">
            <h2>🛡️ Scenario 1: XSS Attack Prevention Demo</h2>
            
            <div class="layout">
                <div class="main-content">
                    <!-- Blog Post -->
                    <article class="blog-post">
                        <h3>{{ blogPost.title }}</h3>
                        <p class="meta">By {{ blogPost.author }} | Trusted: {{ blogPost.isTrusted }}</p>
                        <div class="content" [innerHTML]="renderPost()"></div>
                    </article>

                    <!-- Comment Form -->
                    <div class="comment-form">
                        <h4>Add Comment</h4>
                        <textarea 
                            [(ngModel)]="newComment" 
                            rows="4" 
                            placeholder="Write a comment (try XSS attacks!)">
                        </textarea>
                        <div class="form-actions">
                            <button (click)="addComment()">Post Comment</button>
                            <button class="secondary" (click)="tryXssPayloads()">🎯 Try XSS Payloads</button>
                        </div>
                    </div>

                    <!-- Comments List -->
                    <div class="comments-section">
                        <h4>Comments ({{ comments.length }})</h4>
                        <div class="comment" *ngFor="let comment of comments">
                            <p class="comment-meta">{{ comment.author }} | {{ comment.timestamp | date:'short' }}</p>
                            <div class="comment-content" [innerHTML]="renderComment(comment)"></div>
                        </div>
                    </div>
                </div>

                <!-- Security Dashboard -->
                <aside class="security-dashboard">
                    <h3>🔒 Security Dashboard</h3>
                    
                    <div class="stats">
                        <div class="stat">
                            <span class="num">{{ stats.total }}</span>
                            <span class="label">Attacks Detected</span>
                        </div>
                        <div class="stat">
                            <span class="num">{{ stats.blocked }}</span>
                            <span class="label">Blocked</span>
                        </div>
                    </div>

                    <div class="attack-types">
                        <h4>Attack Types</h4>
                        <div class="type" *ngFor="let type of getAttackTypes()">
                            <span class="type-name">{{ type.name }}</span>
                            <span class="type-count">{{ type.count }}</span>
                        </div>
                    </div>

                    <div class="recent-attacks">
                        <h4>Recent Logs</h4>
                        <div class="log" *ngFor="let log of recentLogs">
                            <span class="log-type">{{ log.type }}</span>
                            <span class="log-status" [class.blocked]="log.blocked">
                                {{ log.blocked ? '🚫 Blocked' : '⚠️ Warning' }}
                            </span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    `,
    styles: [`
        .scenario-container { max-width: 1100px; margin: 2rem auto; padding: 1.5rem; }
        h2 { color: #ef4444; border-bottom: 2px solid #ef4444; padding-bottom: 0.5rem; }
        
        .layout { display: grid; grid-template-columns: 1fr 300px; gap: 2rem; }
        
        .blog-post { background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 1.5rem; }
        .blog-post h3 { margin: 0 0 0.5rem; }
        .blog-post .meta { color: #6b7280; font-size: 0.85rem; margin-bottom: 1rem; }
        .blog-post .content { line-height: 1.6; }
        
        .comment-form textarea { width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 6px; resize: vertical; }
        .form-actions { display: flex; gap: 0.5rem; margin-top: 0.5rem; }
        .form-actions button { padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer; }
        .form-actions button:first-child { background: #10b981; color: white; }
        .form-actions button.secondary { background: #f59e0b; color: white; }
        
        .comments-section { margin-top: 1.5rem; }
        .comment { background: #f8fafc; padding: 1rem; border-radius: 6px; margin-bottom: 0.5rem; }
        .comment-meta { font-size: 0.8rem; color: #6b7280; margin: 0 0 0.5rem; }
        
        .security-dashboard { background: #1e1e2e; color: white; padding: 1.5rem; border-radius: 8px; position: sticky; top: 1rem; }
        .security-dashboard h3 { margin: 0 0 1rem; color: #ef4444; }
        .security-dashboard h4 { margin: 1rem 0 0.5rem; color: #a6e3a1; font-size: 0.9rem; }
        
        .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 1rem; }
        .stat { background: rgba(255,255,255,0.1); padding: 0.75rem; border-radius: 6px; text-align: center; }
        .stat .num { display: block; font-size: 1.5rem; font-weight: bold; color: #ef4444; }
        .stat .label { font-size: 0.75rem; color: #9ca3af; }
        
        .type { display: flex; justify-content: space-between; padding: 0.25rem 0; font-size: 0.85rem; }
        .type-count { color: #ef4444; }
        
        .log { display: flex; justify-content: space-between; padding: 0.25rem 0; font-size: 0.8rem; }
        .log-status { padding: 0.125rem 0.25rem; border-radius: 2px; }
        .log-status.blocked { color: #22c55e; }
    `]
})
export class ScenarioXssDemoComponent {
    private sanitizer = inject(DomSanitizer);
    private xssService = inject(XssSecurityService);

    blogPost: BlogPost = {
        id: 1,
        title: 'Welcome to Our Blog',
        content: '<p>This is a <b>trusted</b> blog post from our CMS.</p><p>It can contain <a href="https://angular.io">links</a> and formatting.</p>',
        author: 'Admin',
        isTrusted: true
    };

    comments: Comment[] = [];
    newComment = '';
    stats = { total: 0, blocked: 0, types: {} as Record<string, number> };
    recentLogs: AttackLog[] = [];

    /**
     * TODO: Implement blog post rendering
     * 
     * For trusted content (admin posts):
     * - Bypass sanitization with bypassSecurityTrustHtml
     * 
     * For untrusted content:
     * - Use built-in sanitization
     */
    renderPost(): SafeHtml {
        /*
         * TODO: Implement feature logic here
         * 
         * if (this.blogPost.isTrusted) {
         *     return this.sanitizer.bypassSecurityTrustHtml(this.blogPost.content);
         * }
         * return this.blogPost.content;
         */

        return ''; // Replace with your implementation
    }

    /**
     * TODO: Implement comment rendering with XSS detection
     * 
     * Steps:
     * 1. Detect XSS patterns in comment
     * 2. Log any attacks found
     * 3. Sanitize the content
     * 4. Return sanitized SafeHtml
     */
    renderComment(comment: Comment): SafeHtml {
        /*
         * TODO: Implement feature logic here
         * 
         * const attacks = this.xssService.detectXssPatterns(comment.content);
         * 
         * attacks.forEach(type => {
         *     this.xssService.logAttack(type, comment.content, true);
         * });
         * 
         * const sanitized = this.xssService.sanitizeContent(comment.content);
         * return sanitized;
         */

        return ''; // Replace with your implementation
    }

    addComment(): void {
        if (this.newComment.trim()) {
            this.comments.push({
                id: this.comments.length + 1,
                postId: this.blogPost.id,
                content: this.newComment,
                author: 'Anonymous User',
                timestamp: new Date()
            });
            this.newComment = '';
            this.updateStats();
        }
    }

    tryXssPayloads(): void {
        const payloads = [
            '<script>alert("XSS")</script>',
            '<img src=x onerror="alert(1)">',
            '<a href="javascript:alert(1)">Click me</a>',
            '<div onmouseover="eval(atob(\'YWxlcnQoMSk=\'))">Hover me</div>'
        ];

        payloads.forEach((payload, i) => {
            setTimeout(() => {
                this.newComment = payload;
                this.addComment();
            }, i * 500);
        });
    }

    updateStats(): void {
        this.stats = this.xssService.getAttackStats();
        this.recentLogs = this.xssService.getAttackLogs()().slice(-5);
    }

    getAttackTypes(): Array<{ name: string; count: number }> {
        return Object.entries(this.stats.types).map(([name, count]) => ({ name, count }));
    }
}
