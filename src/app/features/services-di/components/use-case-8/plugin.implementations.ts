import { Injectable } from '@angular/core';
import { AppPlugin } from './plugin.model';

@Injectable()
export class AnalyticsPlugin implements AppPlugin {
    name = 'Analytics';
    init() {
        console.log('📊 [AnalyticsPlugin] Initialized! Tracking events...');
    }
}

@Injectable()
export class LoggerPlugin implements AppPlugin {
    name = 'Logger';
    init() {
        console.log('📝 [LoggerPlugin] Initialized! Ready to log...');
    }
}

@Injectable()
export class ThemePlugin implements AppPlugin {
    name = 'Theme';
    init() {
        console.log('🎨 [ThemePlugin] Initialized! Dark mode applied.');
    }
}
