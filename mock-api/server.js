/**
 * MOCK API SERVER FOR ANGULAR FEATURES
 * 
 * This Express server provides mock API endpoints for the Angular learning platform.
 * It demonstrates how Angular applications interact with backend services.
 * 
 * FEATURES:
 * - CORS enabled for Angular development server
 * - JSON response format
 * - RESTful API endpoints
 * - Mock data for realistic examples
 * 
 * PORT: 3000
 * Base URL: http://localhost:3000/api
 */

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// ============================================
// MIDDLEWARE
// ============================================

/**
 * CORS (Cross-Origin Resource Sharing)
 * Allows Angular app (http://localhost:4200) to make requests to this API
 */
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

/**
 * JSON Parser
 * Parses incoming JSON request bodies
 */
app.use(express.json());

/**
 * Request Logger
 * Logs all incoming requests for debugging
 */
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

// ============================================
// MOCK DATA
// ============================================

// Users data for Input/Output examples
let users = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        age: 28,
        isActive: true,
        avatar: '👨',
        roles: ['user', 'admin'],
        favoriteColors: ['Blue', 'Green', 'Purple']
    },
    {
        id: 2,
        name: 'Alice Johnson',
        email: 'alice@example.com',
        age: 32,
        isActive: true,
        avatar: '👩',
        roles: ['user'],
        favoriteColors: ['Pink', 'Yellow']
    },
    {
        id: 3,
        name: 'Bob Smith',
        email: 'bob@example.com',
        age: 45,
        isActive: false,
        avatar: '👴',
        roles: ['user', 'moderator'],
        favoriteColors: ['Red', 'Black']
    }
];

// Products data for shopping cart examples
let products = [
    { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics', inStock: true },
    { id: 2, name: 'Keyboard', price: 79.99, category: 'Electronics', inStock: true },
    { id: 3, name: 'Mouse', price: 29.99, category: 'Electronics', inStock: true },
    { id: 4, name: 'Monitor', price: 299.99, category: 'Electronics', inStock: false }
];

// Todos data for directive examples
let todos = [
    { id: 1, title: 'Learn @Input()', completed: true },
    { id: 2, title: 'Learn @Output()', completed: true },
    { id: 3, title: 'Build a project', completed: false }
];

// ============================================
// API ROUTES
// ============================================

/**
 * Root endpoint
 * Returns API information
 */
app.get('/api', (req, res) => {
    res.json({
        message: 'Angular Features Mock API',
        version: '1.0.0',
        endpoints: {
            users: '/api/users',
            products: '/api/products',
            todos: '/api/todos'
        }
    });
});

// ---------- USER ENDPOINTS ----------

/**
 * GET /api/users
 * Returns all users
 */
app.get('/api/users', (req, res) => {
    res.json(users);
});

/**
 * GET /api/users/:id
 * Returns a single user by ID
 */
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});

/**
 * POST /api/users
 * Creates a new user
 */
app.post('/api/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        ...req.body
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

/**
 * PUT /api/users/:id
 * Updates an existing user
 */
app.put('/api/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    users[userIndex] = { ...users[userIndex], ...req.body };
    res.json(users[userIndex]);
});

/**
 * DELETE /api/users/:id
 * Deletes a user
 */
app.delete('/api/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    users.splice(userIndex, 1);
    res.status(204).send();
});

// ---------- PRODUCT ENDPOINTS ----------

app.get('/api/products', (req, res) => res.json(products));
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
});

// ---------- TODO ENDPOINTS ----------

app.get('/api/todos', (req, res) => res.json(todos));
app.post('/api/todos', (req, res) => {
    const newTodo = { id: todos.length + 1, ...req.body };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});
app.put('/api/todos/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) return res.status(404).json({ error: 'Todo not found' });
    todos[todoIndex] = { ...todos[todoIndex], ...req.body };
    res.json(todos[todoIndex]);
});

// ============================================
// HTTP CLIENT TESTING ENDPOINTS
// ============================================

/**
 * GET /api/slow
 * Returns response after configurable delay (for loading state testing)
 * Query params: ?delay=2000 (milliseconds, default 2000)
 */
app.get('/api/slow', (req, res) => {
    const delay = parseInt(req.query.delay) || 2000;
    console.log(`⏳ Slow endpoint: waiting ${delay}ms...`);
    setTimeout(() => {
        res.json({
            message: 'This response was delayed!',
            delay: delay,
            timestamp: new Date().toISOString()
        });
    }, delay);
});

/**
 * GET /api/error
 * Always returns an error (for error handling testing)
 * Query params: ?code=500 (status code, default 500)
 */
app.get('/api/error', (req, res) => {
    const code = parseInt(req.query.code) || 500;
    const errors = {
        400: 'Bad Request - Invalid parameters',
        401: 'Unauthorized - Please login',
        403: 'Forbidden - Access denied',
        404: 'Not Found - Resource does not exist',
        500: 'Internal Server Error - Something went wrong',
        503: 'Service Unavailable - Try again later'
    };
    res.status(code).json({
        error: errors[code] || 'Unknown error',
        code: code,
        timestamp: new Date().toISOString()
    });
});

/**
 * GET /api/random-fail
 * Randomly fails (for retry logic testing)
 * Fails ~50% of the time
 */
let failCount = 0;
app.get('/api/random-fail', (req, res) => {
    failCount++;
    if (failCount % 2 === 0) {
        res.json({ message: 'Success!', attempt: failCount });
    } else {
        res.status(500).json({ error: 'Random failure', attempt: failCount });
    }
});

/**
 * GET /api/search
 * Search endpoint with query parameter (for debounce/switchMap testing)
 * Query params: ?q=searchterm
 */
app.get('/api/search', (req, res) => {
    const query = req.query.q || '';
    const results = [...users, ...products].filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );
    // Add small delay to simulate real search
    setTimeout(() => {
        res.json({
            query: query,
            count: results.length,
            results: results
        });
    }, 300);
});

/**
 * POST /api/upload
 * File upload simulation (for file upload testing)
 */
app.post('/api/upload', (req, res) => {
    // Simulate file processing
    setTimeout(() => {
        res.json({
            message: 'File uploaded successfully',
            filename: 'uploaded_file.txt',
            size: Math.floor(Math.random() * 1000000),
            timestamp: new Date().toISOString()
        });
    }, 1000);
});

/**
 * GET /api/posts
 * Returns paginated posts (for pagination testing)
 */
const posts = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `Post ${i + 1}`,
    body: `This is the content of post ${i + 1}`,
    author: users[i % users.length]?.name || 'Anonymous'
}));

app.get('/api/posts', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const start = (page - 1) * limit;
    const end = start + limit;

    res.json({
        data: posts.slice(start, end),
        pagination: {
            page,
            limit,
            total: posts.length,
            totalPages: Math.ceil(posts.length / limit)
        }
    });
});

/**
 * GET /api/combined
 * Returns combined data (for forkJoin testing)
 */
app.get('/api/combined', (req, res) => {
    res.json({
        users: users,
        products: products,
        todos: todos,
        timestamp: new Date().toISOString()
    });
});

// ============================================
// ERROR HANDLING
// ============================================

/**
 * 404 Handler
 * Catches all undefined routes
 */
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

/**
 * Error Handler
 * Catches all server errors
 */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
    console.log('╔════════════════════════════════════════╗');
    console.log('║   Angular Features Mock API Server    ║');
    console.log('╠════════════════════════════════════════╣');
    console.log(`║   Running on: http://localhost:${PORT}   ║`);
    console.log(`║   API Base:   http://localhost:${PORT}/api║`);
    console.log('╚════════════════════════════════════════╝');
    console.log('\n📡 Available endpoints:');
    console.log('   GET    /api/users');
    console.log('   GET    /api/users/:id');
    console.log('   POST   /api/users');
    console.log('   PUT    /api/users/:id');
    console.log('   DELETE /api/users/:id');
    console.log('   GET    /api/products');
    console.log('   GET    /api/todos\n');
    console.log('✅ Server ready! Press Ctrl+C to stop.\n');
});
