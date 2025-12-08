/**
 * ============================================================================
 * SPEC FILE: Mocking Dependencies
 * ============================================================================
 * 
 * Demonstrates testing components with mocked dependencies:
 * - jasmine.createSpyObj for mock services
 * - Controlling return values
 * - Verifying method calls
 * - Testing error scenarios
 */

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';

import { MockingDemoComponent } from './mocking-demo.component';
import { UserService, User } from './user.service';

describe('MockingDemoComponent', () => {
    let component: MockingDemoComponent;
    let fixture: ComponentFixture<MockingDemoComponent>;
    let mockUserService: jasmine.SpyObj<UserService>;

    // Test data
    const mockUser: User = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        role: 'admin'
    };

    beforeEach(async () => {
        // =====================================================================
        // CREATE MOCK SERVICE
        // =====================================================================
        // jasmine.createSpyObj creates a mock object with spy methods
        mockUserService = jasmine.createSpyObj('UserService', [
            'getUser',
            'getUsers',
            'isAdmin'
        ]);

        // Default return value - can be overridden per test
        mockUserService.getUser.and.returnValue(of(mockUser));
        mockUserService.isAdmin.and.returnValue(true);

        await TestBed.configureTestingModule({
            imports: [MockingDemoComponent],
            providers: [
                // =====================================================================
                // PROVIDE MOCK INSTEAD OF REAL SERVICE
                // =====================================================================
                { provide: UserService, useValue: mockUserService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MockingDemoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // =========================================================================
    // BASIC TESTS
    // =========================================================================

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not load user on init', () => {
        // By default, user should be null
        expect(component.user()).toBeNull();
        expect(mockUserService.getUser).not.toHaveBeenCalled();
    });

    // =========================================================================
    // MOCKING SUCCESS SCENARIOS
    // =========================================================================

    it('should load user when button is clicked', fakeAsync(() => {
        // ARRANGE: Button reference
        const loadBtn = fixture.debugElement.query(By.css('[data-testid="load-btn"]'));

        // ACT: Click the button
        loadBtn.triggerEventHandler('click', null);
        tick(); // Process async operations
        fixture.detectChanges();

        // ASSERT: User data is displayed
        expect(component.user()).toEqual(mockUser);
        expect(mockUserService.getUser).toHaveBeenCalledWith(1);
    }));

    it('should display user name in template', fakeAsync(() => {
        // ACT
        component.loadUser(1);
        tick();
        fixture.detectChanges();

        // ASSERT
        const nameEl = fixture.debugElement.query(By.css('[data-testid="user-name"]'));
        expect(nameEl.nativeElement.textContent).toContain('Test User');
    }));

    it('should display user role badge', fakeAsync(() => {
        // ACT
        component.loadUser(1);
        tick();
        fixture.detectChanges();

        // ASSERT
        const roleEl = fixture.debugElement.query(By.css('[data-testid="user-role"]'));
        expect(roleEl.nativeElement.textContent.trim()).toBe('admin');
    }));

    // =========================================================================
    // MOCKING DIFFERENT RETURN VALUES
    // =========================================================================

    it('should handle different user roles', fakeAsync(() => {
        // ARRANGE: Override return value for this test
        const guestUser: User = { ...mockUser, name: 'Guest', role: 'guest' };
        mockUserService.getUser.and.returnValue(of(guestUser));

        // ACT
        component.loadUser(1);
        tick();
        fixture.detectChanges();

        // ASSERT
        expect(component.user()?.role).toBe('guest');
    }));

    // =========================================================================
    // MOCKING ERROR SCENARIOS
    // =========================================================================

    it('should display error when service fails', fakeAsync(() => {
        // ARRANGE: Mock error response
        mockUserService.getUser.and.returnValue(
            throwError(() => new Error('User not found'))
        );

        // ACT
        component.loadUser(999);
        tick();
        fixture.detectChanges();

        // ASSERT
        expect(component.error()).toBe('User not found');
        const errorEl = fixture.debugElement.query(By.css('[data-testid="error"]'));
        expect(errorEl).toBeTruthy();
    }));

    // =========================================================================
    // LOADING STATE TESTS
    // =========================================================================

    it('should show loading state while fetching', () => {
        // ARRANGE: Don't let Observable complete yet
        // ACT
        component.loading.set(true);
        fixture.detectChanges();

        // ASSERT
        const loadingEl = fixture.debugElement.query(By.css('[data-testid="loading"]'));
        expect(loadingEl).toBeTruthy();
    });

    // =========================================================================
    // VERIFYING CALL COUNTS
    // =========================================================================

    it('should call getUser exactly once per click', fakeAsync(() => {
        // ACT
        component.loadUser(1);
        tick();

        // ASSERT
        expect(mockUserService.getUser).toHaveBeenCalledTimes(1);

        // ACT: Click again
        component.loadUser(2);
        tick();

        // ASSERT
        expect(mockUserService.getUser).toHaveBeenCalledTimes(2);
        expect(mockUserService.getUser).toHaveBeenCalledWith(2);
    }));

    // =========================================================================
    // VERIFYING CALL ARGUMENTS
    // =========================================================================

    it('should pass correct ID to service', fakeAsync(() => {
        // ACT
        component.loadUser(42);
        tick();

        // ASSERT
        expect(mockUserService.getUser).toHaveBeenCalledWith(42);
    }));
});
