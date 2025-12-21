import { InjectionToken } from '@angular/core';
import { AppPlugin } from './plugin.model';

/**
 * Injection Token for our Plugin System.
 * We expect an ARRAY of AppPlugin objects.
 */
export const APP_PLUGINS = new InjectionToken<AppPlugin[]>('APP_PLUGINS');
