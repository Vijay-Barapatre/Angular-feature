/**
 * ============================================================================
 * SPEC FILE: HTTP Testing
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
