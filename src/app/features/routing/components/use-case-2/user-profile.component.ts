import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';

interface User {
    id: number;
    name: string;
    role: string;
    bio: string;
    avatarColor: string;
}

@Component({
    selector: 'app-user-profile',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="p-6">
      <div class="mb-6">
        <a routerLink="../.." class="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to User List
        </a>
      </div>

      <ng-container *ngIf="user$ | async as user; else notFound">
        <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden max-w-2xl">
          <div class="h-32 bg-gradient-to-r" [ngClass]="user.avatarColor"></div>
          <div class="px-8 pb-8">
            <div class="-mt-12 mb-6">
              <div class="w-24 h-24 rounded-full border-4 border-white dark:border-slate-800 bg-slate-100 flex items-center justify-center text-3xl shadow-md">
                {{ user.name.charAt(0) }}
              </div>
            </div>
            
            <div class="flex justify-between items-start mb-4">
              <div>
                <h1 class="text-3xl font-bold text-slate-800 dark:text-white mb-1">{{ user.name }}</h1>
                <p class="text-slate-500 dark:text-slate-400 font-medium">{{ user.role }}</p>
              </div>
              <span class="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs font-mono text-slate-600 dark:text-slate-300">
                ID: {{ user.id }}
              </span>
            </div>
            
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {{ user.bio }}
            </p>

            <div class="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700">
              <h4 class="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">How it works:</h4>
              <code class="text-xs text-indigo-600 dark:text-indigo-400 font-mono block mb-2">
                this.route.paramMap.subscribe(params => params.get('id'))
              </code>
              <p class="text-xs text-slate-500 dark:text-slate-400">
                The User ID ({{ user.id }}) was extracted from the URL using ActivatedRoute.
              </p>
            </div>
          </div>
        </div>
      </ng-container>

      <ng-template #notFound>
        <div class="text-center p-12 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
          <p class="text-slate-500 dark:text-slate-400 text-lg">User not found</p>
          <p class="text-sm text-slate-400 dark:text-slate-500 mt-2">Try ID 1, 2, 3, or 4</p>
        </div>
      </ng-template>
    </div>
  `
})
export class UserProfileComponent implements OnInit {
    user$: Observable<User | undefined>;

    private users: User[] = [
        {
            id: 1,
            name: 'Alice Johnson',
            role: 'Frontend Engineer',
            bio: 'Alice is a UI/UX expert with a passion for accessible design and performant web applications.',
            avatarColor: 'from-pink-500 to-rose-500'
        },
        {
            id: 2,
            name: 'Bob Smith',
            role: 'Product Designer',
            bio: 'Bob bridges the gap between design and engineering, ensuring pixel-perfect implementations.',
            avatarColor: 'from-blue-500 to-cyan-500'
        },
        {
            id: 3,
            name: 'Charlie Brown',
            role: 'Project Manager',
            bio: 'Charlie keeps the team on track and ensures clear communication across all stakeholders.',
            avatarColor: 'from-green-500 to-emerald-500'
        },
        {
            id: 4,
            name: 'Diana Prince',
            role: 'DevOps Specialist',
            bio: 'Diana orchestrates our cloud infrastructure and CI/CD pipelines for seamless deployments.',
            avatarColor: 'from-purple-500 to-violet-500'
        }
    ];

    constructor(private route: ActivatedRoute) {
        // Observable approach handles route changes within the same component
        this.user$ = this.route.paramMap.pipe(
            map(params => {
                const id = Number(params.get('id')); // 🛡️ CRITICAL: Convert string to number
                return this.users.find(u => u.id === id);
            })
        );
    }

    ngOnInit() {
        // Alternative: Snapshot (only good if component is recreated)
        // const id = this.route.snapshot.paramMap.get('id');
    }
}
