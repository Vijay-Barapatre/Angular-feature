import { InjectionToken } from '@angular/core';

export interface AppConfig {
    isProduction: boolean;
    apiUrl: string;
}

// 🔑 Create unique token for configuration
export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

// Example configurations
export const PROD_CONFIG: AppConfig = {
    isProduction: true,
    apiUrl: 'https://api.myapp.com'
};

export const DEBUG_CONFIG: AppConfig = {
    isProduction: false,
    apiUrl: 'http://localhost:3000'
};
