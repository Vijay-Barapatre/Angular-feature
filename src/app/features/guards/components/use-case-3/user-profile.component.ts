
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserProfile } from './user.resolver';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="profile-container">
      <div class="header">
        <h1>👤 User Profile (Resolved)</h1>
        <span class="badge">Data Pre-fetched</span>
      </div>

      <div class="card">
        <div class="avatar">JD</div>
        <div class="details">
          <h2>{{ user.name }}</h2>
          <p class="role">{{ user.role }}</p>
          <p class="email">📧 {{ user.email }}</p>
          <p class="id">ID: #{{ user.id }}</p>
        </div>
      </div>

      <div class="info-box">
        <h3>💡 How it worked:</h3>
        <p>
          The <code>userResolver</code> fetched this data <strong>before</strong> 
          the component was created. That's why you saw a delay (if you noticed it) 
          or the page didn't transition immediately.
        </p>
      </div>

      <a routerLink="/guards" class="btn-back">← Back to Overview</a>
    </div>
  `,
  styles: [`
    .profile-container {
      padding: 30px;
      max-width: 600px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }

    .badge {
      background: #8b5cf6;
      color: white;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 0.8rem;
    }

    .card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 30px;
      display: flex;
      align-items: center;
      gap: 30px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .avatar {
      width: 80px;
      height: 80px;
      background: #3b82f6;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: bold;
    }

    .details h2 {
      margin: 0 0 5px 0;
      color: #1e293b;
    }

    .role {
      color: #64748b;
      margin: 0 0 15px 0;
      font-weight: 500;
    }

    .email, .id {
      margin: 5px 0;
      font-size: 0.9rem;
      color: #475569;
    }

    .info-box {
      margin-top: 30px;
      background: #f1f5f9;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #8b5cf6;
    }

    .btn-back {
      display: inline-block;
      margin-top: 30px;
      text-decoration: none;
      color: #3b82f6;
      font-weight: 500;
    }
  `]
})
export class UserProfileComponent implements OnInit {
  // 1. Inject the provider
  //    We need ActivatedRoute to listen for the data coming from the Resolver
  activatedRoute = inject(ActivatedRoute);
  user!: UserProfile;

  ngOnInit() {
    // 2. Subscribe to the data
    //    The Resolver has ALREADY run at this point.
    //    'userData' matches the key we used in route config: resolve: { userData: UserResolver }
    this.activatedRoute.data.subscribe(({ userData }) => {
      this.user = userData;
      console.log('✅ Component received resolved data:', this.user);
    });
  }
}
