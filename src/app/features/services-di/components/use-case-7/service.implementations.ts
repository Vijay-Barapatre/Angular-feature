import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from './service.model';

@Injectable()
export class ProdService implements AppService {
    constructor(private http: HttpClient) { }

    getData(): void {
        console.log('[ProdService] 🔴 Fetching production data...');
        // In real app: this.http.get(...)
    }
}

@Injectable()
export class DebugService implements AppService {
    constructor(private http: HttpClient) { }

    getData(): void {
        console.log('[DebugService] 🟢 Fetching debug data...');
        // In real app: this.http.get(...)
    }
}
