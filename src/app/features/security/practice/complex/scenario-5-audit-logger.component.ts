/**
 * ============================================================================
 * 🟥 COMPLEX SCENARIO 5: SECURITY AUDIT LOGGER
 * ============================================================================
 * 
 * 📋 REAL-WORLD REQUIREMENT:
 * A financial application requires comprehensive security logging:
 * - Track all authentication events (login, logout, failed attempts)
 * - Monitor sensitive data access
 * - Detect suspicious patterns (brute force, unusual access times)
 * - Generate compliance reports
 * - Alert on security anomalies
 * 
 * 📝 PROBLEM STATEMENT:
 * Build a security audit service that logs security events,
 * detects anomalies, and provides a monitoring dashboard.
 * 
 * ✅ EXPECTED RESULT:
 * - All security events are logged with timestamp and context
 * - Brute force attacks are detected (5+ failed logins in 5 min)
 * - Unusual access patterns are flagged
 * - Real-time dashboard shows security status
 * - Logs can be exported for compliance
 */

import { Component, Injectable, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ========================================
// INTERFACES
// ========================================

type EventType =
    | 'LOGIN_SUCCESS'
    | 'LOGIN_FAILED'
    | 'LOGOUT'
    | 'PASSWORD_CHANGE'
    | 'DATA_ACCESS'
    | 'DATA_EXPORT'
    | 'PERMISSION_DENIED'
    | 'SESSION_EXPIRED'
    | 'SUSPICIOUS_ACTIVITY';

type Severity = 'info' | 'warning' | 'error' | 'critical';

interface AuditEvent {
    id: string;
    timestamp: Date;
    eventType: EventType;
    severity: Severity;
    userId: string;
    ipAddress: string;
    userAgent: string;
    resource?: string;
    details: Record<string, any>;
    sessionId: string;
}

interface SecurityAlert {
    id: string;
    timestamp: Date;
    type: string;
    message: string;
    severity: Severity;
    acknowledged: boolean;
}

interface AuditStats {
    totalEvents: number;
    failedLogins: number;
    suspiciousActivities: number;
    dataExports: number;
    activeAlerts: number;
}

// ========================================
// SECURITY AUDIT SERVICE
// ========================================

@Injectable({ providedIn: 'root' })
export class SecurityAuditService {
    private events = signal<AuditEvent[]>([]);
    private alerts = signal<SecurityAlert[]>([]);

    private readonly BRUTE_FORCE_THRESHOLD = 5;
    private readonly BRUTE_FORCE_WINDOW = 5 * 60 * 1000; // 5 minutes

    /**
     * TODO: Implement event logging
     * 
     * Create and store an audit event with:
     * - Unique ID (UUID or timestamp-based)
     * - Current timestamp
     * - All provided parameters
     * - Derived severity based on event type
     */
    logEvent(
        eventType: EventType,
        userId: string,
        details: Record<string, any> = {},
        resource?: string
    ): void {
        /*
         * TODO: Implement feature logic here
         * 
         * const event: AuditEvent = {
         *     id: this.generateId(),
         *     timestamp: new Date(),
         *     eventType,
         *     severity: this.getSeverityForEvent(eventType),
         *     userId,
         *     ipAddress: this.getClientIp(),
         *     userAgent: navigator.userAgent,
         *     resource,
         *     details,
         *     sessionId: this.getSessionId()
         * };
         * 
         * this.events.update(events => [event, ...events].slice(0, 1000));
         * 
         * // Check for anomalies after logging
         * this.detectAnomalies(event);
         */
    }

    /**
     * TODO: Determine severity based on event type
     */
    private getSeverityForEvent(eventType: EventType): Severity {
        /*
         * TODO: Implement feature logic here
         * 
         * const severityMap: Record<EventType, Severity> = {
         *     'LOGIN_SUCCESS': 'info',
         *     'LOGIN_FAILED': 'warning',
         *     'LOGOUT': 'info',
         *     'PASSWORD_CHANGE': 'warning',
         *     'DATA_ACCESS': 'info',
         *     'DATA_EXPORT': 'warning',
         *     'PERMISSION_DENIED': 'error',
         *     'SESSION_EXPIRED': 'warning',
         *     'SUSPICIOUS_ACTIVITY': 'critical'
         * };
         * 
         * return severityMap[eventType] || 'info';
         */

        return 'info';
    }

    /**
     * TODO: Detect anomalies and create alerts
     * 
     * Check for:
     * 1. Brute force (5+ failed logins in 5 minutes for same user)
     * 2. Unusual access time (outside business hours)
     * 3. Multiple sessions from different locations
     * 4. High volume data exports
     */
    private detectAnomalies(event: AuditEvent): void {
        /*
         * TODO: Implement feature logic here
         * 
         * // Check for brute force
         * if (event.eventType === 'LOGIN_FAILED') {
         *     const recentFailures = this.events().filter(e => 
         *         e.eventType === 'LOGIN_FAILED' &&
         *         e.userId === event.userId &&
         *         Date.now() - e.timestamp.getTime() < this.BRUTE_FORCE_WINDOW
         *     );
         *     
         *     if (recentFailures.length >= this.BRUTE_FORCE_THRESHOLD) {
         *         this.createAlert(
         *             'BRUTE_FORCE',
         *             `Possible brute force attack on user ${event.userId}`,
         *             'critical'
         *         );
         *     }
         * }
         * 
         * // Check for unusual access time
         * const hour = new Date().getHours();
         * if (hour < 6 || hour > 22) {
         *     if (event.eventType === 'DATA_EXPORT') {
         *         this.createAlert(
         *             'UNUSUAL_TIME',
         *             `Data export at unusual time by ${event.userId}`,
         *             'warning'
         *         );
         *     }
         * }
         */
    }

    /**
     * TODO: Create security alert
     */
    private createAlert(type: string, message: string, severity: Severity): void {
        /*
         * TODO: Implement feature logic here
         */
    }

    /**
     * TODO: Get audit statistics
     */
    getStats(): AuditStats {
        /*
         * TODO: Implement feature logic here
         * 
         * const events = this.events();
         * const alerts = this.alerts();
         * 
         * return {
         *     totalEvents: events.length,
         *     failedLogins: events.filter(e => e.eventType === 'LOGIN_FAILED').length,
         *     suspiciousActivities: events.filter(e => e.eventType === 'SUSPICIOUS_ACTIVITY').length,
         *     dataExports: events.filter(e => e.eventType === 'DATA_EXPORT').length,
         *     activeAlerts: alerts.filter(a => !a.acknowledged).length
         * };
         */

        return {
            totalEvents: 0,
            failedLogins: 0,
            suspiciousActivities: 0,
            dataExports: 0,
            activeAlerts: 0
        };
    }

    /**
     * TODO: Filter events by criteria
     */
    filterEvents(criteria: {
        eventType?: EventType;
        userId?: string;
        severity?: Severity;
        fromDate?: Date;
        toDate?: Date;
    }): AuditEvent[] {
        /*
         * TODO: Implement feature logic here
         */

        return [];
    }

    /**
     * TODO: Export events to JSON for compliance
     */
    exportToJson(events: AuditEvent[]): string {
        /*
         * TODO: Implement feature logic here
         * 
         * return JSON.stringify(events.map(e => ({
         *     ...e,
         *     timestamp: e.timestamp.toISOString()
         * })), null, 2);
         */

        return '[]';
    }

    acknowledgeAlert(alertId: string): void {
        this.alerts.update(alerts =>
            alerts.map(a => a.id === alertId ? { ...a, acknowledged: true } : a)
        );
    }

    getEvents() { return this.events; }
    getAlerts() { return this.alerts; }

    private generateId(): string {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    private getClientIp(): string {
        return '192.168.1.' + Math.floor(Math.random() * 255); // Simulated
    }

    private getSessionId(): string {
        return sessionStorage.getItem('sessionId') || 'session_' + this.generateId();
    }
}

// ========================================
// DEMO COMPONENT - AUDIT DASHBOARD
// ========================================

@Component({
    selector: 'app-scenario-audit-logger',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="scenario-container">
            <h2>🔍 Scenario 5: Security Audit Logger</h2>
            
            <!-- Stats Dashboard -->
            <div class="stats-grid">
                <div class="stat-card">
                    <span class="stat-value">{{ stats.totalEvents }}</span>
                    <span class="stat-label">Total Events</span>
                </div>
                <div class="stat-card warning">
                    <span class="stat-value">{{ stats.failedLogins }}</span>
                    <span class="stat-label">Failed Logins</span>
                </div>
                <div class="stat-card danger">
                    <span class="stat-value">{{ stats.suspiciousActivities }}</span>
                    <span class="stat-label">Suspicious</span>
                </div>
                <div class="stat-card">
                    <span class="stat-value">{{ stats.activeAlerts }}</span>
                    <span class="stat-label">Active Alerts</span>
                </div>
            </div>

            <!-- Simulate Events -->
            <div class="simulate-section">
                <h3>🎮 Simulate Events</h3>
                <div class="button-grid">
                    <button (click)="simulateEvent('LOGIN_SUCCESS')" class="success">
                        ✅ Login Success
                    </button>
                    <button (click)="simulateEvent('LOGIN_FAILED')" class="warning">
                        ❌ Login Failed
                    </button>
                    <button (click)="simulateEvent('LOGOUT')" class="info">
                        🚪 Logout
                    </button>
                    <button (click)="simulateEvent('DATA_ACCESS')" class="info">
                        📄 Data Access
                    </button>
                    <button (click)="simulateEvent('DATA_EXPORT')" class="warning">
                        📤 Data Export
                    </button>
                    <button (click)="simulateEvent('PERMISSION_DENIED')" class="danger">
                        🚫 Permission Denied
                    </button>
                    <button (click)="simulateBruteForce()" class="danger">
                        ⚠️ Simulate Brute Force (5 fails)
                    </button>
                </div>
            </div>

            <!-- Active Alerts -->
            <div class="alerts-section" *ngIf="alerts().length > 0">
                <h3>🚨 Active Alerts</h3>
                <div class="alert-item" *ngFor="let alert of alerts()" 
                     [class]="alert.severity" 
                     [class.acknowledged]="alert.acknowledged">
                    <div class="alert-header">
                        <span class="alert-type">{{ alert.type }}</span>
                        <span class="alert-time">{{ alert.timestamp | date:'short' }}</span>
                    </div>
                    <p class="alert-message">{{ alert.message }}</p>
                    <button *ngIf="!alert.acknowledged" 
                            (click)="acknowledgeAlert(alert.id)">
                        Acknowledge
                    </button>
                </div>
            </div>

            <!-- Event Filters -->
            <div class="filter-section">
                <h3>🔎 Filter Events</h3>
                <div class="filter-row">
                    <select [(ngModel)]="filterEventType">
                        <option value="">All Types</option>
                        <option value="LOGIN_SUCCESS">Login Success</option>
                        <option value="LOGIN_FAILED">Login Failed</option>
                        <option value="LOGOUT">Logout</option>
                        <option value="DATA_ACCESS">Data Access</option>
                        <option value="DATA_EXPORT">Data Export</option>
                        <option value="PERMISSION_DENIED">Permission Denied</option>
                    </select>
                    <select [(ngModel)]="filterSeverity">
                        <option value="">All Severities</option>
                        <option value="info">Info</option>
                        <option value="warning">Warning</option>
                        <option value="error">Error</option>
                        <option value="critical">Critical</option>
                    </select>
                    <button (click)="exportEvents()">📤 Export JSON</button>
                </div>
            </div>

            <!-- Event Log -->
            <div class="events-section">
                <h3>📋 Event Log</h3>
                <div class="event-table">
                    <div class="event-row header">
                        <span class="col-time">Time</span>
                        <span class="col-type">Event</span>
                        <span class="col-user">User</span>
                        <span class="col-severity">Severity</span>
                        <span class="col-ip">IP</span>
                    </div>
                    <div class="event-row" *ngFor="let event of filteredEvents" 
                         [class]="event.severity">
                        <span class="col-time">{{ event.timestamp | date:'HH:mm:ss' }}</span>
                        <span class="col-type">{{ event.eventType }}</span>
                        <span class="col-user">{{ event.userId }}</span>
                        <span class="col-severity">
                            <span class="severity-badge" [class]="event.severity">
                                {{ event.severity }}
                            </span>
                        </span>
                        <span class="col-ip">{{ event.ipAddress }}</span>
                    </div>
                    <div class="empty" *ngIf="filteredEvents.length === 0">
                        No events found
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .scenario-container { max-width: 1000px; margin: 2rem auto; padding: 1.5rem; }
        h2 { color: #ef4444; border-bottom: 2px solid #ef4444; padding-bottom: 0.5rem; }
        h3 { margin-top: 1.5rem; margin-bottom: 0.75rem; }
        
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
        .stat-card { padding: 1rem; background: #f0fdf4; border-radius: 8px; text-align: center; }
        .stat-card.warning { background: #fef3c7; }
        .stat-card.danger { background: #fee2e2; }
        .stat-value { display: block; font-size: 2rem; font-weight: bold; color: #10b981; }
        .stat-card.warning .stat-value { color: #f59e0b; }
        .stat-card.danger .stat-value { color: #ef4444; }
        .stat-label { font-size: 0.85rem; color: #6b7280; }
        
        .button-grid { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .button-grid button { padding: 0.5rem 1rem; border: none; border-radius: 6px; cursor: pointer; color: white; }
        .button-grid .success { background: #10b981; }
        .button-grid .warning { background: #f59e0b; }
        .button-grid .danger { background: #ef4444; }
        .button-grid .info { background: #3b82f6; }
        
        .alerts-section { margin-top: 1rem; }
        .alert-item { padding: 1rem; border-radius: 8px; margin-bottom: 0.5rem; border-left: 4px solid; }
        .alert-item.warning { background: #fef3c7; border-color: #f59e0b; }
        .alert-item.critical { background: #fee2e2; border-color: #ef4444; }
        .alert-item.acknowledged { opacity: 0.5; }
        .alert-header { display: flex; justify-content: space-between; margin-bottom: 0.25rem; }
        .alert-type { font-weight: bold; }
        .alert-time { font-size: 0.8rem; color: #6b7280; }
        .alert-message { margin: 0.5rem 0; }
        .alert-item button { padding: 0.25rem 0.5rem; background: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer; }
        
        .filter-section { margin-top: 1rem; }
        .filter-row { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .filter-row select { padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 6px; }
        .filter-row button { padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; }
        
        .event-table { background: #1e1e2e; border-radius: 8px; overflow: hidden; }
        .event-row { display: grid; grid-template-columns: 80px 150px 100px 80px 120px; gap: 1rem; padding: 0.75rem 1rem; color: #a6e3a1; font-size: 0.85rem; }
        .event-row.header { background: rgba(255,255,255,0.1); font-weight: bold; color: white; }
        .event-row:not(.header):hover { background: rgba(255,255,255,0.05); }
        .event-row.warning { color: #fde047; }
        .event-row.error { color: #fca5a5; }
        .event-row.critical { color: #ef4444; background: rgba(239, 68, 68, 0.1); }
        .severity-badge { padding: 0.125rem 0.5rem; border-radius: 3px; font-size: 0.7rem; text-transform: uppercase; }
        .severity-badge.info { background: rgba(59, 130, 246, 0.2); }
        .severity-badge.warning { background: rgba(245, 158, 11, 0.2); }
        .severity-badge.error { background: rgba(239, 68, 68, 0.2); }
        .severity-badge.critical { background: rgba(239, 68, 68, 0.4); }
        .empty { padding: 2rem; text-align: center; color: #6b7280; }
    `]
})
export class ScenarioAuditLoggerComponent {
    private auditService = inject(SecurityAuditService);

    events = this.auditService.getEvents();
    alerts = this.auditService.getAlerts();
    stats: AuditStats = this.auditService.getStats();

    filterEventType = '';
    filterSeverity = '';

    get filteredEvents(): AuditEvent[] {
        return this.auditService.filterEvents({
            eventType: this.filterEventType as EventType || undefined,
            severity: this.filterSeverity as Severity || undefined
        });
    }

    simulateEvent(eventType: EventType): void {
        const users = ['alice', 'bob', 'charlie', 'admin'];
        const randomUser = users[Math.floor(Math.random() * users.length)];

        this.auditService.logEvent(eventType, randomUser, {
            browser: navigator.userAgent.includes('Chrome') ? 'Chrome' : 'Other'
        });

        this.stats = this.auditService.getStats();
    }

    simulateBruteForce(): void {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.auditService.logEvent('LOGIN_FAILED', 'victim_user', {
                    attempt: i + 1,
                    password: '********'
                });
                this.stats = this.auditService.getStats();
            }, i * 200);
        }
    }

    acknowledgeAlert(alertId: string): void {
        this.auditService.acknowledgeAlert(alertId);
        this.stats = this.auditService.getStats();
    }

    exportEvents(): void {
        const json = this.auditService.exportToJson(this.events());
        console.log('Exported JSON:', json);

        // Create download
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'audit-log-' + new Date().toISOString().split('T')[0] + '.json';
        a.click();
    }
}
