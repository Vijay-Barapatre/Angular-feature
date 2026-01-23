
import { ResolveFn } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface UserProfile {
    id: number;
    name: string;
    role: string;
    email: string;
}

/**
 * FUNCTIONAL RESOLVER: userResolver
 * 
 * Fetches data *before* the component loads.
 * The router waits for the Observable to complete.
 */
export const userResolver: ResolveFn<UserProfile> = (route, state) => {
    console.log('⏳ Resolver started...');

    // Simulate API call with delay
    const mockUser: UserProfile = {
        id: 123,
        name: 'Jane Doe',
        role: 'Senior Developer',
        email: 'jane.doe@example.com'
    };

    return of(mockUser).pipe(
        delay(2000) // 2 second artificial delay to show "Loading..."
    );
};
