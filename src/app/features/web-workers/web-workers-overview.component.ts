import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-web-workers-overview',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="container mx-auto p-6 max-w-4xl">
      <div class="mb-8 text-center">
        <h1 class="text-4xl font-bold mb-4 text-slate-800 dark:text-slate-100">
          👷 Web Workers in Angular
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Offload heavy computations to background threads to keep your UI responsive.
          Web Workers run JavaScript in parallel, preventing the main thread from blocking.
        </p>
        <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg inline-block text-left">
          <p class="text-sm text-blue-800 dark:text-blue-300 font-medium flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            Important: Web Workers do NOT have access to the DOM
          </p>
          <p class="text-xs text-blue-700 dark:text-blue-400 mt-1">
            Use Web Workers for CPU-intensive tasks like image processing, data parsing, cryptography, and complex calculations.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Image Processing -->
        <a [routerLink]="['image-processing']" 
           class="group block p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-700 hover:border-purple-500 dark:hover:border-purple-400">
          <div class="flex items-start gap-4">
            <div class="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg group-hover:bg-purple-100 dark:group-hover:bg-purple-900/50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-semibold mb-2 text-slate-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Image Processing
              </h2>
              <p class="text-slate-600 dark:text-slate-400 text-sm">
                Apply filters (grayscale, blur, brightness) to images without blocking the UI. See real-time progress updates.
              </p>
            </div>
          </div>
        </a>

        <!-- Data Processing -->
        <a [routerLink]="['data-processing']" 
           class="group block p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-400">
          <div class="flex items-start gap-4">
            <div class="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-semibold mb-2 text-slate-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Data Processing
              </h2>
              <p class="text-slate-600 dark:text-slate-400 text-sm">
                Parse and analyze large CSV/JSON files in the background with chunked processing and progress reporting.
              </p>
            </div>
          </div>
        </a>

        <!-- Prime Calculation -->
        <a [routerLink]="['prime-calculation']" 
           class="group block p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-700 hover:border-orange-500 dark:hover:border-orange-400">
          <div class="flex items-start gap-4">
            <div class="p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg group-hover:bg-orange-100 dark:group-hover:bg-orange-900/50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-semibold mb-2 text-slate-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                Prime Calculation
              </h2>
              <p class="text-slate-600 dark:text-slate-400 text-sm">
                Generate prime numbers with CPU-intensive algorithms. Compare UI responsiveness: main thread vs worker.
              </p>
            </div>
          </div>
        </a>

        <!-- File Encryption -->
        <a [routerLink]="['file-encryption']" 
           class="group block p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-700 hover:border-rose-500 dark:hover:border-rose-400">
          <div class="flex items-start gap-4">
            <div class="p-3 bg-rose-50 dark:bg-rose-900/30 rounded-lg group-hover:bg-rose-100 dark:group-hover:bg-rose-900/50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-semibold mb-2 text-slate-800 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                File Encryption
              </h2>
              <p class="text-slate-600 dark:text-slate-400 text-sm">
                Encrypt and hash files using Web Crypto API in workers. Uses transferable objects for zero-copy transfer.
              </p>
            </div>
          </div>
        </a>

        <!-- Worker Pool -->
        <a [routerLink]="['worker-pool']" 
           class="group block p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-700 hover:border-sky-500 dark:hover:border-sky-400 md:col-span-2">
          <div class="flex items-start gap-4">
            <div class="p-3 bg-sky-50 dark:bg-sky-900/30 rounded-lg group-hover:bg-sky-100 dark:group-hover:bg-sky-900/50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-sky-600 dark:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-semibold mb-2 text-slate-800 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                Worker Pool Pattern
              </h2>
              <p class="text-slate-600 dark:text-slate-400 text-sm">
                Manage multiple workers for parallel task execution. Learn task queue distribution, load balancing, and worker lifecycle management.
              </p>
            </div>
          </div>
        </a>
      </div>

      <!-- Quick Reference Section -->
      <div class="mt-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
        <h3 class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">⚡ Quick Reference</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg">
            <code class="text-purple-600 dark:text-purple-400">new Worker(new URL('./my.worker', import.meta.url))</code>
            <p class="text-slate-600 dark:text-slate-400 mt-1">Create a worker using Angular CLI bundling</p>
          </div>
          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg">
            <code class="text-emerald-600 dark:text-emerald-400">worker.postMessage(data)</code>
            <p class="text-slate-600 dark:text-slate-400 mt-1">Send data to worker</p>
          </div>
          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg">
            <code class="text-orange-600 dark:text-orange-400">worker.onmessage = (e) => ...</code>
            <p class="text-slate-600 dark:text-slate-400 mt-1">Receive messages from worker</p>
          </div>
          <div class="p-3 bg-white dark:bg-slate-800 rounded-lg">
            <code class="text-rose-600 dark:text-rose-400">worker.terminate()</code>
            <p class="text-slate-600 dark:text-slate-400 mt-1">Clean up worker when done</p>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    :host {
      display: block;
    }
  `]
})
export class WebWorkersOverviewComponent { }
