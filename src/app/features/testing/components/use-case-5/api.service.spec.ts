/**
 * ============================================================================
 * SPEC FILE: HTTP Testing - Complete Guide
 * ============================================================================
 * 
 * Demonstrates testing HTTP requests with:
 * - HttpClientTestingModule
 * - HttpTestingController
 * - Request verification
 * - Response mocking
 * - Error handling
 */

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService, Post, CreatePostDto } from './api.service';

/**
 * ============================================================================
 * UNDERSTANDING HTTP TESTING - Complete Guide
 * ============================================================================
 * 
 * What is HTTP Testing?
 * ---------------------
 * HTTP testing verifies that your services make correct HTTP requests and handle
 * responses properly, WITHOUT making real network calls.
 * 
 * The Problem Without HTTP Testing:
 * ----------------------------------
 * ❌ Real HTTP calls in tests:
 * - Slow (network latency)
 * - Unreliable (API could be down)
 * - Unpredictable (data changes)
 * - Expensive (API rate limits)
 * - Hard to test errors (how do you force a 404?)
 * 
 * The Solution: HttpClientTestingModule
 * --------------------------------------
 * ✅ Angular provides HttpClientTestingModule which:
 * - Intercepts ALL HTTP requests
 * - Prevents real network calls
 * - Lets you control responses
 * - Verifies request details
 * - Simulates errors easily
 * 
 * Core Components:
 * ----------------
 * 
 * 1. HttpClientTestingModule
 *    - Replaces real HttpClient with test version
 *    - Import in TestBed.configureTestingModule()
 *    - MUST import this instead of HttpClientModule
 * 
 * 2. HttpTestingController
 *    - Your tool to intercept and control requests
 *    - Inject via TestBed.inject(HttpTestingController)
 *    - Use to expect, match, and respond to requests
 * 
 * 3. TestRequest  
 *    - Represents a single intercepted HTTP request
 *    - Returned by expectOne() or match()
 *    - Use to verify and respond
 * 
 * Setup Pattern:
 * --------------
 * 
 * beforeEach(() => {
 *     TestBed.configureTestingModule({
 *         imports: [HttpClientTestingModule],  // 1. Import testing module
 *         providers: [YourService]
 *     });
 *     service = TestBed.inject(YourService);
 *     httpMock = TestBed.inject(HttpTestingController);  // 2. Get controller
 * });
 * 
 * afterEach(() => {
 *     httpMock.verify();  // 3. Verify no outstanding requests
 * });
 * 
 * The Complete HTTP Testing Flow:
 * --------------------------------
 * 
 * 1. TRIGGER: Call service method that makes HTTP request
 *    service.getData()
 * 
 * 2. INTERCEPT: Catch the pending request
 *    const req = httpMock.expectOne('/api/data')
 * 
 * 3. VERIFY: Check request details (optional)
 *    expect(req.request.method).toBe('GET')
 *    expect(req.request.headers.get('Auth')).toBe('token')
 * 
 * 4. RESPOND: Send fake response
 *    req.flush({ id: 1, name: 'Test' })
 * 
 * 5. ASSERT: Verify service handled response
 *    expect(service.data).toEqual({ id: 1, name: 'Test' })
 * 
 * HttpTestingController Methods:
 * -------------------------------
 * 
 * 1. expectOne(url) - Expect exactly ONE request
 *    const req = httpMock.expectOne('/api/users')
 *    - Fails if 0 requests: "Expected one, found none"
 *    - Fails if 2+ requests: "Expected one, found multiple"
 * 
 * 2. expectNone(url) - Expect NO requests
 *    httpMock.expectNone('/api/users')
 *    - Verifies method doesn't make unwanted calls
 * 
 * 3. match(predicate) - Get multiple requests
 *    const reqs = httpMock.match(req => req.url.includes('/api'))
 *    - Returns array of all matching requests
 * 
 * 4. verify() - Ensure no pending requests
 *    httpMock.verify()
 *    - Call in afterEach()
 *    - Fails if requests weren't flushed or expected
 * 
 * expectOne() Variants:
 * ---------------------
 * 
 * By URL string:
 * httpMock.expectOne('/api/users')
 * 
 * By URL pattern (regex):
 * httpMock.expectOne(/\/api\/users\/\d+/)
 * 
 * By  match function:
 * httpMock.expectOne(req => 
 *     req.url === '/api/users' && req.method === 'POST'
 * )
 * 
 * By RequestMatch object:
 * httpMock.expectOne({
 *     url: '/api/users',
 *     method: 'GET'
 * })
 * 
 * TestRequest Methods:
 * --------------------
 * 
 * 1. flush(data) - Send success response
 *    req.flush({ id: 1, name: 'John' })
 *    req.flush(data, { status: 200, statusText: 'OK' })
 * 
 * 2. flush(error, options) - Send error response
 *    req.flush('Not found', { status: 404, statusText: 'Not Found' })
 *    req.flush({ error: 'Server error' }, { status: 500 })
 * 
 * 3. error(ErrorEvent) - Network error
 *    req.error(new ErrorEvent('Network error'))
 * 
 * 4. request property - Inspect request
 *    req.request.method        // 'GET', 'POST', etc.
 *    req.request.url           // '/api/users'
 *    req.request.body          // Request payload
 *    req.request.headers       // Request headers
 *    req.request.params        // Query parameters
 * 
 * Testing All HTTP Methods:
 * --------------------------
 * 
 * GET:
 * const req = httpMock.expectOne('/api/users')
 * expect(req.request.method).toBe('GET')
 * req.flush(users)
 * 
 * POST:
 * const req = httpMock.expectOne('/api/users')
 * expect(req.request.method).toBe('POST')
 * expect(req.request.body).toEqual(newUser)
 * req.flush({ id: 1, ...newUser })
 * 
 * PUT:
 * const req = httpMock.expectOne('/api/users/1')
 * expect(req.request.method).toBe('PUT')
 * expect(req.request.body).toEqual(updates)
 * req.flush(updatedUser)
 * 
 * DELETE:
 * const req = httpMock.expectOne('/api/users/1')
 * expect(req.request.method).toBe('DELETE')
 * req.flush(null)
 * 
 * Query Parameters:
 * -----------------
 * 
 * Service:
 * this.http.get('/api/users', { params: { role: 'admin' } })
 * 
 * Test:
 * const req = httpMock.expectOne(req => 
 *     req.url.includes('/api/users') && 
 *     req.params.get('role') === 'admin'
 * )
 * expect(req.request.params.get('role')).toBe('admin')
 * 
 * Headers Testing:
 * ----------------
 * 
 * Service:
 * this.http.get('/api/users', { 
 *     headers: { 'Authorization': 'Bearer token123' }
 * })
 * 
 * Test:
 * const req = httpMock.expectOne('/api/users')
 * expect(req.request.headers.get('Authorization')).toBe('Bearer token123')
 * 
 * Error Handling Patterns:
 * ------------------------
 * 
 * Pattern 1: HTTP Error (404):
 * service.getData().subscribe({
 *     next: () => fail('should have failed'),
 *     error: (error) => expect(error.status).toBe(404)
 * })
 * const req = httpMock.expectOne('/api/data')
 * req.flush('Not found', { status: 404, statusText: 'Not Found' })
 * 
 * Pattern 2: HTTP Error (500):
 * req.flush({ error: 'Server error' }, { 
 *     status: 500, 
 *     statusText: 'Internal Server Error' 
 * })
 * 
 * Pattern 3: Network Error:
 * req.error(new ErrorEvent('Network error', {
 *     message: 'Failed to connect'
 * }))
 * 
 * Multiple Concurrent Requests:
 * ------------------------------
 * 
 * service.getUser(1).subscribe()
 * service.getUser(2).subscribe()
 * 
 * const requests = httpMock.match(req => req.url.includes('/api/users/'))
 * expect(requests.length).toBe(2)
 * requests[0].flush(user1)
 * requests[1].flush(user2)
 * 
 * Best Practices:
 * ---------------
 * 
 * ✅ DO:
 * - Always call httpMock.verify() in afterEach()
 * - Use expectOne() for single requests
 * - Verify request method, URL, headers, body
 * - Test both success and error scenarios
 * - Use match() for multiple concurrent requests
 * 
 * ❌ DON'T:
 * - Forget to flush() or error() requests
 * - Mix HttpClientModule with HttpClientTestingModule
 * - Make real HTTP calls in tests
 * - Forget to check request details
 * - Leave requests unhandled (causes verify() to fail)
 * 
 * Memory Trick 🧠:
 * ----------------
 * HTTP Testing = Phone Switchboard 📞
 * 
 * - HttpTestingController = Switchboard operator
 * - expectOne() = "I'm expecting a call to /api/users"
 * - flush(data) = "Here's the response for that call"
 * - verify() = "Did we handle all calls?"
 * 
 * Quick Decision Tree:
 * --------------------
 * 
 * Testing HTTP call?
 * │
 * ├─ Single request
 * │  └─ Use expectOne(url)
 * │
 * ├─ Multiple requests to same endpoint
 * │  └─ Use match(predicate)
 * │
 * ├─ Verify NO request made
 * │  └─ Use expectNone(url)
 * │
 * ├─ Success response
 * │  └─ req.flush(data)
 * │
 * ├─ HTTP error (404, 500)
 * │  └─ req.flush(error, { status: code })
 * │
 * └─ Network error
 *    └─ req.error(new ErrorEvent('error'))
 */

describe('ApiService (HTTP Testing)', () => {
    let service: ApiService;
    let httpMock: HttpTestingController;

    // Test data
    const mockPosts: Post[] = [
        { id: 1, title: 'Test Post 1', body: 'Body 1', userId: 1 },
        { id: 2, title: 'Test Post 2', body: 'Body 2', userId: 1 }
    ];

    const mockPost: Post = { id: 1, title: 'Test', body: 'Content', userId: 1 };

    beforeEach(() => {
        TestBed.configureTestingModule({
            // =====================================================================
            // IMPORT HttpClientTestingModule instead of HttpClientModule
            // =====================================================================
            imports: [HttpClientTestingModule],
            providers: [ApiService]
        });

        service = TestBed.inject(ApiService);
        // Get the HttpTestingController to mock requests
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        // =====================================================================
        // VERIFY: No outstanding requests
        // =====================================================================
        httpMock.verify();
    });

    // =========================================================================
    // GET REQUESTS
    // =========================================================================

    describe('getPosts()', () => {
        it('should fetch all posts', () => {
            // ACT: Call the service method
            service.getPosts().subscribe(posts => {
                // ASSERT: Response matches mock
                expect(posts.length).toBe(2);
                expect(posts).toEqual(mockPosts);
            });

            // ASSERT: Expect a single GET request
            const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts');
            expect(req.request.method).toBe('GET');

            // RESPOND: Flush with mock data
            req.flush(mockPosts);
        });
    });

    describe('getPost()', () => {
        it('should fetch single post by ID', () => {
            const postId = 1;

            service.getPost(postId).subscribe(post => {
                expect(post).toEqual(mockPost);
            });

            const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            expect(req.request.method).toBe('GET');
            req.flush(mockPost);
        });
    });

    // =========================================================================
    // POST REQUESTS
    // =========================================================================

    describe('createPost()', () => {
        it('should send POST request with body', () => {
            const newPost: CreatePostDto = {
                title: 'New Post',
                body: 'New Body',
                userId: 1
            };

            const createdPost: Post = { ...newPost, id: 101 };

            service.createPost(newPost).subscribe(post => {
                expect(post.id).toBe(101);
                expect(post.title).toBe('New Post');
            });

            const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts');

            // ASSERT: Request method and body
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual(newPost);

            req.flush(createdPost);
        });
    });

    // =========================================================================
    // PUT REQUESTS
    // =========================================================================

    describe('updatePost()', () => {
        it('should send PUT request', () => {
            const updates = { title: 'Updated Title' };
            const updatedPost = { ...mockPost, title: 'Updated Title' };

            service.updatePost(1, updates).subscribe(post => {
                expect(post.title).toBe('Updated Title');
            });

            const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts/1');
            expect(req.request.method).toBe('PUT');
            expect(req.request.body).toEqual(updates);

            req.flush(updatedPost);
        });
    });

    // =========================================================================
    // DELETE REQUESTS
    // =========================================================================

    describe('deletePost()', () => {
        it('should send DELETE request', () => {
            service.deletePost(1).subscribe();

            const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts/1');
            expect(req.request.method).toBe('DELETE');

            req.flush(null);
        });
    });

    // =========================================================================
    // QUERY PARAMETERS
    // =========================================================================

    describe('getPostsByUser()', () => {
        it('should include query params', () => {
            service.getPostsByUser(1).subscribe(posts => {
                expect(posts).toEqual(mockPosts);
            });

            // Use expectOne with a function for complex matching
            const req = httpMock.expectOne(r =>
                r.url.includes('/posts') && r.params.get('userId') === '1'
            );

            expect(req.request.params.get('userId')).toBe('1');
            req.flush(mockPosts);
        });
    });

    // =========================================================================
    // ERROR HANDLING
    // =========================================================================

    describe('error handling', () => {
        it('should handle 404 error', () => {
            service.getPost(999).subscribe({
                next: () => fail('should have failed'),
                error: (error) => {
                    expect(error.message).toContain('404');
                }
            });

            const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts/999');

            // FLUSH: Error response
            req.flush('Not Found', {
                status: 404,
                statusText: 'Not Found'
            });
        });

        it('should handle 500 error', () => {
            service.getPosts().subscribe({
                next: () => fail('should have failed'),
                error: (error) => {
                    expect(error.message).toContain('500');
                }
            });

            const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts');
            req.flush('Server Error', {
                status: 500,
                statusText: 'Internal Server Error'
            });
        });
    });

    // =========================================================================
    // MULTIPLE REQUESTS
    // =========================================================================

    describe('multiple requests', () => {
        it('should handle multiple concurrent requests', () => {
            // Start two requests
            service.getPost(1).subscribe();
            service.getPost(2).subscribe();

            // Match multiple requests
            const requests = httpMock.match(r => r.url.includes('/posts/'));
            expect(requests.length).toBe(2);

            requests[0].flush({ ...mockPost, id: 1 });
            requests[1].flush({ ...mockPost, id: 2 });
        });
    });
});
