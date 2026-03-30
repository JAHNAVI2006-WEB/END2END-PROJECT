const axios = require("axios");

exports.handleInterview = async (req,res)=>{
  try {
    const response = await axios.post("http://localhost:8000/analyze", req.body);
    res.json({
      sentiment: response.data.sentiment,
      aiResponse: response.data.ai_response,
      feedback: response.data.feedback,
      score: response.data.score,
      nextQuestion: response.data.nextQuestion
    });
  } catch (err) {
    res.status(500).json({ error: "AI Service returned an error." });
  }
};

const INTERVIEW_QUESTIONS = {
  // Frontend Technologies
  javascript: [
    {
      question: "Explain how you would implement a debouncing function for a search input in a React application. What are the performance benefits?",
      difficulty: "medium",
      category: "performance",
      expectedAnswer: "Implement a debouncing function that delays the execution of the search function until the user stops typing for a specified time (e.g., 300ms). This reduces API calls, improves performance, and provides better UX. Use useCallback and useEffect hooks in React to properly handle the debounced function and cleanup."
    },
    {
      question: "Describe a situation where you had to optimize a slow-loading web application. What tools did you use and what specific optimizations did you implement?",
      difficulty: "hard",
      category: "performance",
      expectedAnswer: "I would use Chrome DevTools Performance tab, Lighthouse, and WebPageTest to identify bottlenecks. Common optimizations include: code splitting, lazy loading images/components, optimizing images (WebP format), implementing service workers for caching, reducing bundle size with tree shaking, minimizing re-renders with React.memo, and using CDN for static assets."
    },
    {
      question: "How would you implement a real-time collaborative editing feature like Google Docs? What technologies and patterns would you use?",
      difficulty: "hard",
      category: "architecture",
      expectedAnswer: "Use WebSockets or Socket.IO for real-time communication, implement Operational Transformation (OT) or Conflict-free Replicated Data Types (CRDTs) for conflict resolution, use a pub/sub pattern for broadcasting changes, implement optimistic UI updates, handle offline scenarios with local storage, and use React Context or Redux for state management."
    },
    {
      question: "Explain the difference between controlled and uncontrolled components in React. When would you choose one over the other?",
      difficulty: "easy",
      category: "react",
      expectedAnswer: "Controlled components have their form data handled by React state, while uncontrolled components store their own state internally. Use controlled components for validation, dynamic behavior, and when you need to control the input's value. Use uncontrolled components for simple forms, when you need to integrate with non-React code, or for performance in large forms."
    },
    {
      question: "How would you implement a custom hook for data fetching with loading states, error handling, and caching?",
      difficulty: "medium",
      category: "hooks",
      expectedAnswer: "Create a custom hook using useState for loading/error/data states, useEffect for API calls, implement caching with useRef or a cache object, handle cleanup, support retry functionality, and consider using SWR or React Query patterns for more advanced features."
    },
    {
      question: "Describe your approach to building a responsive design system from scratch. What tools and methodologies would you use?",
      difficulty: "medium",
      category: "css",
      expectedAnswer: "Use CSS Grid and Flexbox for layouts, implement mobile-first design with media queries, create a design token system for colors/spacing/typography, use CSS custom properties for theming, implement component-based styling with CSS modules or styled-components, and ensure accessibility with semantic HTML and ARIA attributes."
    },
    {
      question: "How would you handle state management in a large-scale React application? Compare different approaches and their trade-offs.",
      difficulty: "hard",
      category: "state-management",
      expectedAnswer: "For large apps, consider Redux Toolkit for complex state, Zustand for simpler state management, React Query for server state, and Context API for local component state. Each has trade-offs: Redux has boilerplate but great dev tools, Zustand is lightweight, React Query handles caching and synchronization, and Context is built-in but can cause re-renders."
    },
    {
      question: "Explain how you would implement a virtual scrolling list for handling thousands of items efficiently.",
      difficulty: "medium",
      category: "performance",
      expectedAnswer: "Implement a container with fixed height, calculate visible items based on scroll position, render only visible items plus a buffer, use absolute positioning for items, handle scroll events efficiently with requestAnimationFrame, and consider using libraries like react-window or react-virtualized for production use."
    },
    {
      question: "Describe your testing strategy for a React application. What types of tests would you write and what tools would you use?",
      difficulty: "medium",
      category: "testing",
      expectedAnswer: "Write unit tests with Jest and React Testing Library for component logic, integration tests for component interactions, E2E tests with Cypress or Playwright for user flows, visual regression tests with Chromatic or Percy, and use mocking for API calls. Aim for high coverage of business logic and critical user paths."
    },
    {
      question: "How would you implement a progressive web app (PWA) with offline capabilities? What are the key features and challenges?",
      difficulty: "hard",
      category: "pwa",
      expectedAnswer: "Implement a service worker for caching strategies, create a web app manifest for installability, use App Shell architecture for instant loading, implement background sync for offline actions, handle push notifications, and address challenges like cache invalidation, background update strategies, and ensuring consistent offline experience."
    },
    {
      question: "Can you explain the concept of Event Delegation in JavaScript? Why is it useful?",
      difficulty: "medium",
      category: "dom-manipulation",
      expectedAnswer: "Event delegation is a technique involving adding a single event listener to a parent element rather than multiple listeners to individual child elements. It leverages the event bubbling phase. It saves memory and handles dynamically added children automatically."
    },
    {
      question: "What are JavaScript Promises, and how do they differ from callbacks?",
      difficulty: "medium",
      category: "async",
      expectedAnswer: "Promises represent the eventual completion or failure of an async operation. They provide a cleaner syntax compared to callbacks, avoid callback hell (pyramid of doom), and are chainable using .then() and .catch()."
    }
  ],
  react: [
    {
      question: "You're building a complex dashboard with multiple real-time charts. How would you optimize performance and handle data synchronization?",
      difficulty: "hard",
      category: "performance",
      expectedAnswer: "Use React.memo for chart components, implement virtual scrolling for data tables, use WebSockets for real-time updates, implement debouncing for rapid data changes, use useCallback and useMemo to prevent unnecessary re-renders, consider using libraries like D3.js or Chart.js with proper optimization, and implement data pagination and caching strategies."
    },
    {
      question: "Describe how you would implement a feature flag system in React to enable gradual rollouts and A/B testing.",
      difficulty: "medium",
      category: "architecture",
      expectedAnswer: "Create a FeatureFlagProvider using React Context, implement a hook (useFeatureFlag) to check flags, store flag configurations in a remote service, implement fallback mechanisms for offline scenarios, use segment-based targeting for different user groups, and ensure proper cleanup and re-initialization when flags change."
    },
    {
      question: "How would you handle complex form validation with dynamic fields and conditional logic in a React application?",
      difficulty: "medium",
      category: "forms",
      expectedAnswer: "Use form libraries like Formik or React Hook Form for complex validation, implement Yup or Zod schemas for validation rules, create custom validation hooks for conditional logic, handle dynamic field arrays with proper key management, implement real-time validation feedback, and ensure accessibility with proper ARIA attributes."
    },
    {
      question: "Explain how you would implement a micro-frontend architecture using React. What are the benefits and challenges?",
      difficulty: "hard",
      category: "architecture",
      expectedAnswer: "Use module federation or single-spa for micro-frontend implementation, create independent deployable units with their own React instances, implement shared dependencies to avoid duplication, handle routing and navigation between micro-frontends, manage state sharing between applications, and address challenges like consistent styling, shared utilities, and testing strategies."
    },
    {
      question: "How would you implement a drag-and-drop interface for a project management tool like Trello? What libraries and patterns would you use?",
      difficulty: "medium",
      category: "interactions",
      expectedAnswer: "Use libraries like react-beautiful-dnd or dnd-kit for drag-and-drop functionality, implement custom drag handles and drop zones, handle complex state updates for reordering items, implement optimistic updates for better UX, add keyboard navigation for accessibility, and handle edge cases like dragging between different containers and nested drag operations."
    },
    {
      question: "Describe your approach to implementing a real-time notification system in a React application.",
      difficulty: "medium",
      category: "real-time",
      expectedAnswer: "Use WebSockets or Server-Sent Events for real-time communication, implement a notification context provider, create different notification types (toast, modal, badge), handle notification persistence and dismissal, implement notification grouping and batching, and ensure proper cleanup and memory management."
    },
    {
      question: "How would you optimize a React application for SEO while maintaining dynamic content?",
      difficulty: "hard",
      category: "seo",
      expectedAnswer: "Use Next.js or Gatsby for server-side rendering, implement dynamic meta tags for each page, use structured data with JSON-LD, handle client-side routing with proper meta updates, implement lazy loading for heavy components, and ensure proper sitemap generation and robots.txt configuration."
    },
    {
      question: "Explain how you would implement a comprehensive error boundary system in a large React application.",
      difficulty: "medium",
      category: "error-handling",
      expectedAnswer: "Create multiple error boundaries for different sections, implement error logging services like Sentry, provide fallback UIs for different error types, implement error recovery mechanisms, track error metrics and user flows, and ensure proper error reporting for debugging and monitoring."
    },
    {
      question: "How would you implement a theme system that supports light/dark mode and custom branding in React?",
      difficulty: "medium",
      category: "styling",
      expectedAnswer: "Use CSS custom properties with React Context for theme management, implement theme provider with multiple theme options, handle system preference detection with prefers-color-scheme, implement theme persistence in localStorage, create theme-aware components, and ensure proper contrast ratios for accessibility."
    },
    {
      question: "Describe how you would build a real-time collaborative whiteboard application using React and WebSockets.",
      difficulty: "hard",
      category: "real-time",
      expectedAnswer: "Use Canvas API or SVG for drawing surface, implement WebSockets for real-time synchronization, handle concurrent editing with Operational Transformation, implement undo/redo functionality, add user presence indicators, handle offline scenarios with local storage, and optimize performance with canvas optimization techniques."
    },
    {
      question: "What is Redux and how does it compare to Context API?",
      difficulty: "medium",
      category: "state",
      expectedAnswer: "Redux is a predictable state management library with store, actions, reducers. Context is React's built-in solution. Redux is more powerful but complex, Context is simpler for basic needs."
    },
    {
      question: "Explain the useMemo and useCallback hooks. What problem do they solve?",
      difficulty: "medium",
      category: "hooks",
      expectedAnswer: "useMemo memoizes a computed value, while useCallback memoizes a function reference. They prevent unnecessary re-renders in child components by keeping reference equality between renders unless their dependencies change."
    },
    {
      question: "How do React Server Components (RSC) differ from traditional Client Components?",
      difficulty: "hard",
      category: "architecture",
      expectedAnswer: "Server Components execute exclusively on the server, resulting in zero bundle size for those components, direct backend access, and faster page loads. Client Components run on the browser and handle interactivity/state."
    }
  ],
  nodejs: [
    {
      question: "You're building a high-traffic API that needs to handle 10,000 concurrent requests. How would you design the Node.js architecture?",
      difficulty: "hard",
      category: "scalability",
      expectedAnswer: "Use clustering with PM2 or built-in cluster module to utilize all CPU cores, implement load balancing with Nginx, use connection pooling for databases, implement caching with Redis, use compression middleware, optimize database queries, implement rate limiting, and consider microservices architecture for better scalability."
    },
    {
      question: "How would you implement a real-time chat application with Node.js? What technologies and patterns would you use?",
      difficulty: "medium",
      category: "real-time",
      expectedAnswer: "Use Socket.IO for WebSocket communication, implement rooms for different chat channels, handle connection management and disconnections, implement message persistence with MongoDB or Redis, scale horizontally with Redis adapter, handle authentication and authorization, and implement proper error handling and reconnection logic."
    },
    {
      question: "Describe how you would build a file upload service that handles large files and provides progress tracking.",
      difficulty: "medium",
      category: "file-handling",
      expectedAnswer: "Use multer for multipart file uploads, implement chunked uploads for large files, use streams to handle file processing efficiently, implement progress tracking with events, store files in cloud storage (AWS S3), validate file types and sizes, implement virus scanning, and provide resumable upload capabilities."
    },
    {
      question: "How would you implement a distributed caching strategy in a Node.js microservices architecture?",
      difficulty: "hard",
      category: "caching",
      expectedAnswer: "Use Redis for distributed caching, implement cache invalidation strategies, handle cache warming for frequently accessed data, implement cache-aside pattern, use consistent hashing for cache distribution, handle cache failures gracefully, implement monitoring and metrics for cache performance."
    },
    {
      question: "Explain how you would implement a robust logging system for a production Node.js application.",
      difficulty: "medium",
      category: "logging",
      expectedAnswer: "Use Winston or Pino for structured logging, implement log levels (error, warn, info, debug), use log rotation to manage file sizes, implement centralized logging with ELK stack, add correlation IDs for request tracing, implement performance metrics, and ensure sensitive data is not logged."
    },
    {
      question: "How would you handle database connection pooling and optimization in a Node.js application?",
      difficulty: "medium",
      category: "database",
      expectedAnswer: "Use connection pooling with appropriate pool size, implement connection timeout and retry logic, use prepared statements for query optimization, implement query caching, monitor connection metrics, handle connection leaks properly, and consider read replicas for read-heavy applications."
    },
    {
      question: "Describe your approach to implementing a job queue system for background task processing.",
      difficulty: "hard",
      category: "background-jobs",
      expectedAnswer: "Use Bull or Agenda for job queuing, implement Redis as job store, handle job priorities and delays, implement job retries with exponential backoff, add job monitoring and metrics, handle failed jobs with dead letter queue, implement job concurrency control, and ensure job processing is idempotent."
    },
    {
      question: "How would you implement API rate limiting and throttling in a Node.js application?",
      difficulty: "medium",
      category: "security",
      expectedAnswer: "Use express-rate-limit middleware, implement different strategies (fixed window, sliding window, token bucket), store rate limit data in Redis for distributed applications, implement IP-based and user-based limiting, handle burst traffic gracefully, and provide clear error responses for rate-limited requests."
    },
    {
      question: "Explain how you would implement a health monitoring and alerting system for Node.js microservices.",
      difficulty: "hard",
      category: "monitoring",
      expectedAnswer: "Implement health check endpoints for each service, use Prometheus for metrics collection, implement Grafana for visualization, set up alerting rules for critical metrics, monitor CPU, memory, and response times, implement distributed tracing with Jaeger or Zipkin, and set up log aggregation and analysis."
    },
    {
      question: "How would you implement secure authentication and authorization in a Node.js API?",
      difficulty: "medium",
      category: "security",
      expectedAnswer: "Use JWT for stateless authentication, implement refresh tokens for security, use bcrypt for password hashing, implement role-based access control (RBAC), add rate limiting for auth endpoints, implement CSRF protection, use HTTPS only, and implement proper session management and logout."
    },
    {
      question: "Explain the concept of the Event Loop in Node.js.",
      difficulty: "hard",
      category: "architecture",
      expectedAnswer: "The Event Loop allows Node.js to perform non-blocking I/O operations despite being single-threaded by offloading operations to the system kernel. It operates in phases: timers, pending callbacks, idle/prepare, poll, check, and close callbacks."
    },
    {
      question: "What are Node.js streams, and what are their benefits?",
      difficulty: "medium",
      category: "performance",
      expectedAnswer: "Streams are collections of data that might not be available all at once and don't have to fit in memory. Benefits include memory efficiency and time efficiency. Types include Readable, Writable, Duplex, and Transform."
    }
  ],
  express: [
    {
      question: "You're building a RESTful API with Express that needs to handle different response formats (JSON, XML, CSV). How would you implement this?",
      difficulty: "medium",
      category: "api-design",
      expectedAnswer: "Implement content negotiation using Accept headers, create middleware to detect requested format, use response formatting functions for each type, implement proper error handling for each format, add content-type headers accordingly, and consider using libraries like express-xml or csv-writer for serialization."
    },
    {
      question: "How would you implement API versioning in an Express application? What are the different approaches?",
      difficulty: "medium",
      category: "api-design",
      expectedAnswer: "Use URL path versioning (/api/v1/users), header versioning (Accept: application/vnd.api+json;version=1), query parameter versioning (/api/users?version=1), or subdomain versioning (v1.api.example.com). URL versioning is most common and clear, header versioning is cleaner but less discoverable."
    },
    {
      question: "Describe how you would implement comprehensive input validation and sanitization in Express.",
      difficulty: "medium",
      category: "security",
      expectedAnswer: "Use libraries like Joi or Yup for validation, create validation middleware for different endpoints, implement input sanitization to prevent XSS, use parameterized queries to prevent SQL injection, validate file uploads with multer, implement rate limiting for form submissions, and provide clear error messages for invalid inputs."
    },
    {
      question: "How would you implement a middleware pipeline for authentication, authorization, and logging in Express?",
      difficulty: "medium",
      category: "middleware",
      expectedAnswer: "Create separate middleware functions for each concern, implement authentication middleware that verifies JWT tokens, create authorization middleware that checks user roles, implement request logging middleware with correlation IDs, use middleware composition to chain functions, handle errors properly with error middleware, and ensure proper order of middleware execution."
    },
    {
      question: "Explain how you would implement file upload handling with progress tracking and multiple file types in Express.",
      difficulty: "medium",
      category: "file-handling",
      expectedAnswer: "Use multer for multipart form data handling, implement file filtering for allowed types, add file size limits and validation, implement progress tracking using events or custom middleware, store files in cloud storage with proper naming, create thumbnails for images, and implement virus scanning for security."
    },
    {
      question: "How would you implement rate limiting and request throttling for an Express API?",
      difficulty: "hard",
      category: "performance",
      expectedAnswer: "Use express-rate-limit with Redis for distributed rate limiting, implement different limits for different endpoints, use sliding window algorithm for accurate limiting, implement burst handling with token bucket, add rate limit headers to responses, implement user-based and IP-based limiting, and provide clear error responses for exceeded limits."
    },
    {
      question: "Describe how you would implement caching strategies in an Express application.",
      difficulty: "medium",
      category: "caching",
      expectedAnswer: "Implement HTTP caching with ETags and Cache-Control headers, use Redis for application-level caching, implement query result caching for database queries, use CDN for static assets, implement cache invalidation strategies, add cache warming for frequently accessed data, and monitor cache hit rates and performance."
    },
    {
      question: "How would you implement real-time features in an Express application?",
      difficulty: "hard",
      category: "real-time",
      expectedAnswer: "Integrate Socket.IO for WebSocket communication, implement rooms for different real-time features, handle connection management and disconnections, implement event broadcasting with proper authentication, scale horizontally with Redis adapter, implement message persistence and offline handling, and add proper error handling and reconnection logic."
    },
    {
      question: "Explain how you would implement comprehensive error handling and logging in Express.",
      difficulty: "medium",
      category: "error-handling",
      expectedAnswer: "Create custom error classes for different error types, implement error handling middleware at the end of middleware chain, use structured logging with Winston or Pino, implement error correlation IDs for request tracing, send errors to monitoring services like Sentry, provide user-friendly error responses, and implement proper HTTP status codes."
    },
    {
      question: "How would you implement API documentation and testing in an Express application?",
      difficulty: "medium",
      category: "testing",
      expectedAnswer: "Use Swagger/OpenAPI for API documentation, implement automated testing with Jest and Supertest, create integration tests for API endpoints, implement API versioning and backward compatibility, add request/response examples in documentation, implement continuous testing in CI/CD pipeline, and use Postman collections for manual testing."
    },
    {
      question: "What is an Express middleware, and how does next() work?",
      difficulty: "easy",
      category: "middleware",
      expectedAnswer: "Middleware are functions that have access to the request, response, and the next middleware function. Calling next() passes control to the next middleware. If next() is not called, the request hangs."
    },
    {
      question: "How can you handle global uncaught exceptions and unhandled promise rejections in Express?",
      difficulty: "medium",
      category: "error-handling",
      expectedAnswer: "Use a global error-handling middleware (4 parameters: err, req, res, next). For unhandled promise rejections, utilize process.on('unhandledRejection') and process.on('uncaughtException') to log errors and gracefully shut down."
    }
  ],
  java: [
    {
      question: "You're designing a microservices architecture for an e-commerce platform. How would you handle inter-service communication and data consistency?",
      difficulty: "hard",
      category: "architecture",
      expectedAnswer: "Use REST APIs for synchronous communication and message queues (Kafka/RabbitMQ) for asynchronous events, implement saga pattern for distributed transactions, use API gateways for routing and load balancing, implement circuit breakers with Hystrix, use service discovery with Eureka/Consul, and implement proper monitoring and tracing."
    },
    {
      question: "How would you implement a high-performance caching layer in a Java application? What caching strategies would you use?",
      difficulty: "medium",
      category: "performance",
      expectedAnswer: "Use Caffeine or Guava Cache for local caching, implement Redis for distributed caching, use multi-level caching (L1: local, L2: distributed), implement cache-aside pattern, handle cache invalidation and warming, use appropriate eviction policies (LRU, LFU), and monitor cache hit rates and performance metrics."
    },
    {
      question: "Describe how you would implement a secure authentication and authorization system using Spring Security.",
      difficulty: "medium",
      category: "security",
      expectedAnswer: "Configure Spring Security with JWT tokens, implement role-based access control (RBAC), use OAuth2 for third-party authentication, implement password hashing with BCrypt, configure CORS and CSRF protection, implement session management, and add security headers and input validation."
    },
    {
      question: "How would you optimize database performance in a Java application? What techniques would you use?",
      difficulty: "hard",
      category: "database",
      expectedAnswer: "Use connection pooling with HikariCP, implement proper indexing strategies, use JPA/Hibernate optimization (batch processing, lazy loading), implement query optimization and caching, use database partitioning for large tables, implement read replicas for scaling reads, and monitor slow queries and performance metrics."
    },
    {
      question: "Explain how you would implement a concurrent processing system in Java for handling millions of requests.",
      difficulty: "hard",
      category: "concurrency",
      expectedAnswer: "Use thread pools with ExecutorService, implement reactive programming with Project Reactor/WebFlux, use CompletableFuture for async operations, implement proper synchronization with locks and semaphores, use concurrent collections, handle thread safety properly, and implement proper error handling and resource cleanup."
    },
    {
      question: "Explain the difference between == and .equals() in Java.",
      difficulty: "easy",
      category: "basics",
      expectedAnswer: "== compares object references, .equals() compares object content. For primitives, == compares values."
    },
    {
      question: "What is the final keyword used for?",
      difficulty: "easy",
      class: "modifiers",
      expectedAnswer: "final makes variables constant, methods unoverridable, classes uninheritable. Ensures immutability and prevents modification."
    },
    {
      question: "How do Streams work in Java 8?",
      difficulty: "medium",
      category: "streams",
      expectedAnswer: "Streams process collections of data functionally. Support filter, map, reduce, collect. Enable parallel processing and method chaining."
    },
    {
      question: "What is the difference between an Interface and an Abstract Class in Java?",
      difficulty: "medium",
      category: "oop",
      expectedAnswer: "Abstract classes can have state (instance variables) and constructors, while interfaces cannot. A class can implement multiple interfaces but extend only one abstract class. Interfaces default to public abstract methods."
    },
    {
      question: "Explain the concept of Garbage Collection in Java.",
      difficulty: "hard",
      category: "memory",
      expectedAnswer: "Garbage collection automatically reclaims memory by deleting objects that are no longer reachable. Major algorithms include Mark-and-Sweep, G1, and ZGC. The JVM handles it automatically, but developers can hint using System.gc()."
    }
  ],
  python: [
    {
      question: "What are lists and tuples? What is the key difference?",
      difficulty: "easy",
      category: "data-structures",
      expectedAnswer: "Both are sequence data types. Lists are mutable (can be modified), tuples are immutable (cannot be modified after creation)."
    },
    {
      question: "How does memory management work in Python?",
      difficulty: "medium",
      category: "memory",
      expectedAnswer: "Python uses reference counting and garbage collection. Objects are deallocated when reference count reaches zero. GC handles circular references."
    },
    {
      question: "What is the Global Interpreter Lock (GIL)?",
      difficulty: "medium",
      category: "concurrency",
      expectedAnswer: "GIL is a mutex that allows only one thread to execute Python bytecode at a time. Limits CPU-bound parallelism but helps with memory management."
    },
    {
      question: "Explain decorators in Python with examples.",
      difficulty: "medium",
      category: "functions",
      expectedAnswer: "Decorators modify functions or methods. Syntax: @decorator. Used for logging, timing, authentication, caching. They are functions that wrap other functions."
    },
    {
      question: "What is the difference between shallow copy and deep copy?",
      difficulty: "medium",
      category: "data-structures",
      expectedAnswer: "Shallow copy copies object references, deep copy copies nested objects. Use copy.deepcopy() for deep copy, copy.copy() for shallow copy."
    },
    {
      question: "How do you handle exceptions in Python?",
      difficulty: "easy",
      category: "error-handling",
      expectedAnswer: "Use try-except blocks. Can specify exception types, use else for no exceptions, finally for cleanup. Use raise to throw exceptions."
    },
    {
      question: "What are list comprehensions and provide examples?",
      difficulty: "easy",
      category: "data-structures",
      expectedAnswer: "List comprehensions create lists concisely. Syntax: [expression for item in iterable if condition]. Example: [x**2 for x in range(10) if x % 2 == 0]."
    },
    {
      question: "Explain the difference between *args and **kwargs.",
      difficulty: "easy",
      category: "functions",
      expectedAnswer: "*args passes variable number of positional arguments as tuple, **kwargs passes variable number of keyword arguments as dictionary."
    },
    {
      question: "What are generators in Python?",
      difficulty: "medium",
      category: "functions",
      expectedAnswer: "Generators are functions that yield values lazily. Use yield keyword. Memory efficient for large sequences. Support iteration with next()."
    },
    {
      question: "How does multiple inheritance work in Python?",
      difficulty: "hard",
      category: "oop",
      expectedAnswer: "Python supports multiple inheritance using MRO (Method Resolution Order). Uses C3 linearization to determine method lookup order. Can cause diamond problem."
    },
    {
      question: "What are Python Magic Methods (Dunder methods)?",
      difficulty: "medium",
      category: "oop",
      expectedAnswer: "Magic methods have double underscores (e.g., __init__, __str__). They allow developers to define how objects behave with operator overloading and built-in Python functions."
    },
    {
      question: "How do you manage dependencies and virtual environments in Python?",
      difficulty: "easy",
      category: "tools",
      expectedAnswer: "Virtual environments isolate project dependencies. Tools include venv, virtualenv, or conda. Dependencies are typically managed by a requirements.txt file, or using Pipenv/Poetry."
    }
  ],

  // Databases
  sql: [
    {
      question: "What is the difference between INNER JOIN and OUTER JOIN?",
      difficulty: "easy",
      category: "joins",
      expectedAnswer: "INNER JOIN returns only matching rows from both tables. OUTER JOIN returns all rows from one table and matching from other, with NULL for non-matches."
    },
    {
      question: "Explain the different types of SQL joins.",
      difficulty: "medium",
      category: "joins",
      expectedAnswer: "INNER JOIN (matching rows), LEFT JOIN (all left, matching right), RIGHT JOIN (all right, matching left), FULL OUTER JOIN (all rows from both)."
    },
    {
      question: "What is normalization and why is it important?",
      difficulty: "medium",
      category: "design",
      expectedAnswer: "Normalization organizes data to reduce redundancy. Normal forms (1NF, 2NF, 3NF) eliminate anomalies and improve data integrity."
    },
    {
      question: "What are indexes and how do they improve performance?",
      difficulty: "medium",
      category: "performance",
      expectedAnswer: "Indexes are data structures that improve query speed. Create B-tree indexes on frequently queried columns. Trade-off: slower writes, more storage."
    },
    {
      question: "Explain the difference between WHERE and HAVING clauses.",
      difficulty: "easy",
      category: "clauses",
      expectedAnswer: "WHERE filters rows before grouping, HAVING filters groups after aggregation. WHERE works on individual rows, HAVING on aggregate results."
    },
    {
      question: "What are transactions and ACID properties?",
      difficulty: "medium",
      category: "transactions",
      expectedAnswer: "Transactions are units of work. ACID: Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent transactions don't interfere), Durability (permanent changes)."
    },
    {
      question: "How do you prevent SQL injection attacks?",
      difficulty: "medium",
      category: "security",
      expectedAnswer: "Use parameterized queries/prepared statements, input validation, stored procedures, ORM frameworks. Never concatenate user input directly into SQL."
    },
    {
      question: "What is the difference between DELETE and TRUNCATE?",
      difficulty: "easy",
      category: "operations",
      expectedAnswer: "DELETE removes rows one by one, can use WHERE clause, logs individual deletions, can be rolled back. TRUNCATE removes all rows, minimal logging, cannot be rolled back."
    },
    {
      question: "Explain the difference between UNION and UNION ALL.",
      difficulty: "easy",
      category: "operations",
      expectedAnswer: "UNION combines and removes duplicate rows, UNION ALL includes all rows including duplicates. UNION ALL is faster because it doesn't check for duplicates."
    },
    {
      question: "What are stored procedures and when would you use them?",
      difficulty: "medium",
      category: "procedures",
      expectedAnswer: "Stored procedures are precompiled SQL statements stored in database. Used for complex business logic, security, performance optimization."
    },
    {
      question: "Explain the difference between a Clustered and a Non-Clustered Index.",
      difficulty: "hard",
      category: "performance",
      expectedAnswer: "A Clustered index determines the physical order of data in a table (only one allowed). A Non-Clustered index stores a logical ordering and points to the physical data rows (multiple allowed)."
    },
    {
      question: "What are window functions in SQL?",
      difficulty: "hard",
      category: "operations",
      expectedAnswer: "Window functions perform calculations across a set of table rows related to the current row, unlike aggregate functions which group them into a single output. Examples include ROW_NUMBER(), RANK(), OVER()."
    }
  ],

  // Development Roles
  frontend: [
    {
      question: "What are the key responsibilities of a frontend developer?",
      difficulty: "easy",
      category: "role",
      expectedAnswer: "Implementing UI/UX designs, ensuring responsive design, optimizing performance, handling user interactions, integrating with APIs, accessibility, cross-browser compatibility."
    },
    {
      question: "How do you ensure web accessibility in your applications?",
      difficulty: "medium",
      category: "accessibility",
      expectedAnswer: "Use semantic HTML, ARIA labels, keyboard navigation, color contrast, alt text for images, screen reader compatibility, WCAG guidelines."
    },
    {
      question: "What is responsive design and how do you implement it?",
      difficulty: "medium",
      category: "design",
      expectedAnswer: "Design that adapts to different screen sizes. Use media queries, flexible grids, flexible images, mobile-first approach, CSS Grid, Flexbox."
    },
    {
      question: "How do you optimize frontend performance?",
      difficulty: "hard",
      category: "performance",
      expectedAnswer: "Code splitting, lazy loading, image optimization, caching, minification, compression, CDN usage, reducing HTTP requests, critical CSS."
    },
    {
      question: "What are the differences between CSS Grid and Flexbox?",
      difficulty: "medium",
      category: "css",
      expectedAnswer: "Grid is 2D layout system for rows and columns, Flexbox is 1D for row or column. Grid for overall layout, Flexbox for component alignment."
    },
    {
      question: "How do you handle state management in large frontend applications?",
      difficulty: "hard",
      category: "state",
      expectedAnswer: "Use state management libraries like Redux, MobX, Zustand. Local state for components, global state for app-wide data. Context API for medium complexity."
    },
    {
      question: "What are Progressive Web Apps (PWAs)?",
      difficulty: "medium",
      category: "pwa",
      expectedAnswer: "Web apps that provide native-like experience. Features: offline support, push notifications, app icons, installable. Use service workers and web app manifest."
    },
    {
      question: "How do you implement cross-browser compatibility?",
      difficulty: "medium",
      category: "compatibility",
      expectedAnswer: "Use feature detection, polyfills, vendor prefixes, testing tools, progressive enhancement, graceful degradation."
    },
    {
      question: "What is the difference between cookies, localStorage, and sessionStorage?",
      difficulty: "easy",
      category: "storage",
      expectedAnswer: "Cookies: sent with HTTP requests, limited size, expiration. localStorage: persistent, larger, client-side only. sessionStorage: per session, cleared on tab close."
    },
    {
      question: "How do you implement SEO best practices?",
      difficulty: "medium",
      category: "seo",
      expectedAnswer: "Semantic HTML, meta tags, structured data, clean URLs, fast loading, mobile-friendly, sitemaps, robots.txt, open graph tags."
    },
    {
      question: "Explain the Critical Rendering Path. How do you optimize it?",
      difficulty: "hard",
      category: "performance",
      expectedAnswer: "It's the sequence of steps the browser takes to convert HTML, CSS, and JS into a rendered pixel. Optimization involves minimizing render-blocking resources, inline critical CSS, and deferring non-critical JS."
    },
    {
      question: "What is the Shadow DOM, and how does it relate to Web Components?",
      difficulty: "medium",
      category: "dom-manipulation",
      expectedAnswer: "The Shadow DOM allows hidden, separated DOM trees to be attached to elements. It ensures styles and scripts are encapsulated, forming a core part of building reusable Web Components."
    }
  ],
  backend: [
    {
      question: "What are the key responsibilities of a backend developer?",
      difficulty: "easy",
      category: "role",
      expectedAnswer: "Server-side logic, database design, API development, security, performance optimization, authentication, data processing, system integration."
    },
    {
      question: "How do you design RESTful APIs?",
      difficulty: "medium",
      category: "api",
      expectedAnswer: "Use HTTP methods correctly (GET, POST, PUT, DELETE), resource-based URLs, proper status codes, stateless communication, versioning, documentation."
    },
    {
      question: "What is the difference between REST and GraphQL?",
      difficulty: "medium",
      category: "api",
      expectedAnswer: "REST uses multiple endpoints, fixed data structure, over/under-fetching. GraphQL uses single endpoint, flexible queries, exact data requested."
    },
    {
      question: "How do you handle database connections efficiently?",
      difficulty: "medium",
      category: "database",
      expectedAnswer: "Use connection pooling, limit connections, proper closing, retry logic, connection timeouts, monitoring. Pool reduces overhead of creating connections."
    },
    {
      question: "What are microservices and their advantages?",
      difficulty: "medium",
      category: "architecture",
      expectedAnswer: "Small, independent services that communicate via APIs. Advantages: scalability, independent deployment, technology diversity, fault isolation."
    },
    {
      question: "How do you implement authentication and authorization?",
      difficulty: "hard",
      category: "security",
      expectedAnswer: "Authentication: JWT tokens, OAuth, sessions. Authorization: role-based access, permissions, middleware. Use HTTPS, password hashing, token expiration."
    },
    {
      question: "What is caching and what are common caching strategies?",
      difficulty: "medium",
      category: "performance",
      expectedAnswer: "Storing frequently accessed data for faster retrieval. Strategies: write-through, write-behind, cache-aside, read-through. Use Redis, Memcached."
    },
    {
      question: "How do you handle scalability in backend systems?",
      difficulty: "hard",
      category: "scalability",
      expectedAnswer: "Horizontal scaling (add servers), vertical scaling (upgrade resources), load balancing, database sharding, caching, CDNs, asynchronous processing."
    },
    {
      question: "What are the best practices for API security?",
      difficulty: "hard",
      category: "security",
      expectedAnswer: "HTTPS, authentication, rate limiting, input validation, SQL injection prevention, XSS protection, CORS configuration, API keys, security headers."
    },
    {
      question: "How do you monitor and log backend applications?",
      difficulty: "medium",
      category: "monitoring",
      expectedAnswer: "Structured logging, log levels, centralized logging (ELK stack), metrics collection, error tracking, performance monitoring, alerting systems."
    },
    {
      question: "What is the CQRS pattern? When would you use it?",
      difficulty: "hard",
      category: "architecture",
      expectedAnswer: "Command Query Responsibility Segregation (CQRS) separates read and write operations into different models. Use it in complex domains where reads vastly outnumber writes or require different scaling/security."
    },
    {
      question: "Explain the difference between Long Polling, WebSockets, and Server-Sent Events (SSE).",
      difficulty: "hard",
      category: "real-time",
      expectedAnswer: "Long Polling keeps a request open until data is ready. WebSockets provide full-duplex bi-directional communication. SSE is a unidirectional stream from server to client over a single HTTP connection."
    }
  ],
  devops: [
    {
      question: "What is Continuous Integration and Continuous Deployment (CI/CD)?",
      difficulty: "medium",
      category: "cicd",
      expectedAnswer: "CI: automatically build and test code on commits. CD: automatically deploy successful builds. Tools: Jenkins, GitHub Actions, GitLab CI."
    },
    {
      question: "Can you explain how Docker containers differ from Virtual Machines?",
      difficulty: "easy",
      category: "containers",
      expectedAnswer: "Containers share host OS kernel, lightweight, start faster. VMs have full OS, isolated, heavier. Containers for app isolation, VMs for full environment isolation."
    },
    {
      question: "What is infrastructure as code (IaC)?",
      difficulty: "medium",
      category: "iac",
      expectedAnswer: "Managing infrastructure through code and automation. Tools: Terraform, CloudFormation, Ansible. Benefits: version control, reproducibility, automation."
    },
    {
      question: "How do you handle securely storing secrets in a CI/CD pipeline?",
      difficulty: "hard",
      category: "security",
      expectedAnswer: "Use secret management tools (HashiCorp Vault, AWS Secrets Manager), environment variables, encrypted files, limited access, audit logs, rotation."
    },
    {
      question: "What is Kubernetes and why is it used?",
      difficulty: "medium",
      category: "orchestration",
      expectedAnswer: "Container orchestration platform. Manages deployment, scaling, networking of containers. Features: auto-scaling, service discovery, load balancing."
    },
    {
      question: "Explain blue/green deployment strategy.",
      difficulty: "medium",
      category: "deployment",
      expectedAnswer: "Maintain two identical production environments. Route traffic to blue, deploy to green, test, then switch traffic. Zero downtime, instant rollback."
    },
    {
      question: "What are some key metrics you monitor in a production environment?",
      difficulty: "medium",
      category: "monitoring",
      expectedAnswer: "CPU usage, memory usage, disk I/O, network traffic, response times, error rates, request volume, availability, queue lengths."
    },
    {
      question: "How do you ensure high availability in an architecture?",
      difficulty: "hard",
      category: "availability",
      expectedAnswer: "Redundancy, load balancing, failover mechanisms, multi-zone deployment, health checks, disaster recovery, monitoring, auto-scaling."
    },
    {
      question: "What is the difference between Ansible and Terraform?",
      difficulty: "medium",
      category: "tools",
      expectedAnswer: "Ansible: configuration management tool, imperative, agentless. Terraform: infrastructure provisioning, declarative, state management. Often used together."
    },
    {
      question: "How do you troubleshoot a microservice that is intermittently failing?",
      difficulty: "hard",
      category: "troubleshooting",
      expectedAnswer: "Check logs, monitor metrics, test dependencies, examine network issues, check resource limits, use distributed tracing, replicate in staging."
    },
    {
      question: "What is Docker Swarm and how does it compare to Kubernetes?",
      difficulty: "medium",
      category: "orchestration",
      expectedAnswer: "Docker Swarm is Docker's native clustering tool. It is simpler to set up and use compared to Kubernetes, but lacks Kubernetes' extensive ecosystem, advanced auto-scaling, and granular control features."
    },
    {
      question: "Explain the concept of Immutable Infrastructure.",
      difficulty: "medium",
      category: "iac",
      expectedAnswer: "Immutable infrastructure means that servers are never modified after they're deployed. If an update is needed, a new server is built and deployed to replace the old one, preventing configuration drift."
    }
  ],
  c: [
    {
      question: "Explain the difference between malloc() and calloc() in C.",
      difficulty: "medium",
      category: "memory-management",
      expectedAnswer: "malloc() allocates uninitialized memory block, while calloc() allocates memory and initializes it to zero. calloc() takes two arguments (number of elements, size of each element)."
    },
    {
      question: "What is a pointer in C and how do you use it?",
      difficulty: "easy",
      category: "pointers",
      expectedAnswer: "A pointer is a variable that stores the memory address of another variable. It is declared using the * operator and the address of a variable is accessed using the & operator."
    },
    {
      question: "Explain the concept of memory leaks in C.",
      difficulty: "hard",
      category: "memory-management",
      expectedAnswer: "A memory leak occurs when programmers create a memory in heap and forget to delete it. Memory leaks are particularly serious issues for programs that run for extended periods."
    }
  ],
  cpp: [
    {
      question: "What are the four pillars of Object-Oriented Programming?",
      difficulty: "easy",
      category: "oop",
      expectedAnswer: "Encapsulation, Abstraction, Inheritance, and Polymorphism. They allow for code reuse, data hiding, and creating hierarchical classifications."
    },
    {
      question: "Explain virtual functions and runtime polymorphism in C++.",
      difficulty: "hard",
      category: "polymorphism",
      expectedAnswer: "Virtual functions are declared in a base class and overridden by a derived class. They are used to implement runtime polymorphism, resolving method calls at runtime rather than compile time."
    },
    {
      question: "What is a memory leak and how do smart pointers prevent it?",
      difficulty: "medium",
      category: "memory-management",
      expectedAnswer: "A memory leak happens when allocated memory is not freed. Smart pointers (like std::unique_ptr, std::shared_ptr) automatically manage memory, deallocating objects when they go out of scope using RAII."
    }
  ],
  css: [
    {
      question: "Explain the CSS Box Model.",
      difficulty: "easy",
      category: "layout",
      expectedAnswer: "The CSS box model is a box that wraps around every HTML element. It consists of: margins, borders, padding, and the actual content."
    },
    {
      question: "What is the difference between relative, absolute, fixed and sticky positioning?",
      difficulty: "medium",
      category: "layout",
      expectedAnswer: "Relative is relative to its normal position. Absolute is positioned relative to its closest positioned ancestor. Fixed is positioned relative to the viewport. Sticky toggles between relative and fixed depending on scroll position."
    },
    {
      question: "How do CSS preprocessors like Sass benefit developers?",
      difficulty: "medium",
      category: "tools",
      expectedAnswer: "Sass allows for variables, nested rules, mixins, and functions, making CSS more maintainable, modular, and easier to read for large projects."
    }
  ],
  html: [
    {
      question: "What are semantic HTML tags and why are they important?",
      difficulty: "easy",
      category: "accessibility",
      expectedAnswer: "Semantic tags accurately describe the purpose of the element and its content (e.g., <header>, <article>, <nav>). They improve SEO and accessibility for screen readers."
    },
    {
      question: "Explain the difference between a div and a span.",
      difficulty: "easy",
      category: "basics",
      expectedAnswer: "A <div> is a block-level element used for grouping larger chunks of code, while a <span> is an inline element used for grouping small chunks of inline text or elements."
    },
    {
      question: "What is the purpose of the alt attribute on an image tag?",
      difficulty: "easy",
      category: "accessibility",
      expectedAnswer: "The alt attribute provides alternative text for an image if it cannot be displayed. It's crucial for screen readers and SEO."
    }
  ],
  hotelManagement: [
    {
      question: "How do you handle an overbooked hotel situation?",
      difficulty: "hard",
      category: "guest-relations",
      expectedAnswer: "Apologize sincerely, explain the situation calmly, and offer a 'walk'—relocating the guest to a comparable or better nearby hotel at your property's expense, plus compensation like a future free stay."
    },
    {
      question: "What is RevPAR and how is it calculated?",
      difficulty: "medium",
      category: "finance",
      expectedAnswer: "Revenue Per Available Room. It's calculated by multiplying a hotel's average daily room rate (ADR) by its occupancy rate, or by dividing total room revenue by the total number of available rooms."
    },
    {
      question: "Describe your strategy for ensuring high standards in housekeeping.",
      difficulty: "medium",
      category: "operations",
      expectedAnswer: "Implement a rigorous checklist, perform random room inspections, ensure ongoing staff training, use quality cleaning products, and enforce a supportive but accountable culture."
    }
  ],
  business: [
    {
      question: "What is a SWOT analysis and how do you use it?",
      difficulty: "easy",
      category: "strategy",
      expectedAnswer: "SWOT stands for Strengths, Weaknesses, Opportunities, and Threats. It's a strategic planning technique used to identify internal variables (S, W) and external forces (O, T) impacting a business."
    },
    {
      question: "How do you calculate ROI (Return on Investment)?",
      difficulty: "easy",
      category: "finance",
      expectedAnswer: "ROI is calculated by subtracting the initial value of the investment from the final value, dividing that net profit by the cost of the investment, and multiplying by 100 to get a percentage."
    },
    {
      question: "Explain the difference between B2B and B2C models.",
      difficulty: "easy",
      category: "sales",
      expectedAnswer: "B2B (Business-to-Business) involves selling products or services to organizations. B2C (Business-to-Consumer) involves selling directly to individual customers for personal use."
    }
  ],
  marketing: [
    {
      question: "What is the marketing funnel?",
      difficulty: "medium",
      category: "strategy",
      expectedAnswer: "The marketing funnel is a model illustrating the customer journey from initial awareness to final purchase. Typical stages are Awareness, Interest, Consideration, Intent, Evaluation, and Purchase."
    },
    {
      question: "How do you measure a successful digital marketing campaign?",
      difficulty: "medium",
      category: "analytics",
      expectedAnswer: "By tracking Key Performance Indicators (KPIs) like Conversion Rate, Cost Per Acquisition (CPA), Return on Ad Spend (ROAS), click-through rate (CTR), and overall engagement."
    },
    {
      question: "Explain the difference between SEO and SEM.",
      difficulty: "easy",
      category: "strategy",
      expectedAnswer: "SEO (Search Engine Optimization) focuses on optimizing a site to get organic, unpaid traffic. SEM (Search Engine Marketing) involves paying search engines to display ads (e.g., Google Ads)."
    }
  ],
  finance: [
    {
      question: "Explain the three main financial statements.",
      difficulty: "medium",
      category: "accounting",
      expectedAnswer: "The Income Statement (profit and loss over a period), the Balance Sheet (assets, liabilities, and equity at a specific point in time), and the Cash Flow Statement (cash generated and used)."
    },
    {
      question: "What is working capital?",
      difficulty: "easy",
      category: "accounting",
      expectedAnswer: "Working capital is a measure of a company's operational liquidity, calculated as Current Assets minus Current Liabilities."
    },
    {
      question: "Explain the concept of EBITDA.",
      difficulty: "medium",
      category: "accounting",
      expectedAnswer: "EBITDA stands for Earnings Before Interest, Taxes, Depreciation, and Amortization. It provides a view of a company's operational profitability by stripping out non-operating expenses."
    }
  ],
  php: [
    {
      question: "What is the difference between == and === in PHP?",
      difficulty: "easy",
      category: "basics",
      expectedAnswer: "== checks if the values are equal after type juggling, while === checks if both the values and the types are identical."
    },
    {
      question: "Explain what Composer is used for in PHP.",
      difficulty: "medium",
      category: "tools",
      expectedAnswer: "Composer is a dependency management tool for PHP. It allows you to declare the libraries your project depends on and it will manage (install/update) them for you."
    },
    {
      question: "What are traits in PHP?",
      difficulty: "hard",
      category: "oop",
      expectedAnswer: "Traits are a mechanism for code reuse in single inheritance languages like PHP. A Trait allows developers to reuse sets of methods freely in several independent classes living in different class hierarchies."
    }
  ],
  go: [
    {
      question: "What are Goroutines in Golang?",
      difficulty: "easy",
      category: "concurrency",
      expectedAnswer: "A Goroutine is a lightweight thread managed by the Go runtime. They are used to perform tasks concurrently with minimal overhead."
    },
    {
      question: "Explain the purpose of Channels in Go.",
      difficulty: "medium",
      category: "concurrency",
      expectedAnswer: "Channels consist of typed conduits through which you can send and receive values. They are used to safely pass data between Goroutines and synchronize their execution."
    },
    {
      question: "What is a slice in Go and how does it differ from an array?",
      difficulty: "medium",
      category: "data-structures",
      expectedAnswer: "An array has a fixed size determined at compile time. A slice is a dynamically-sized, flexible view into the elements of an array. Slices are much more commonly used in Go."
    }
  ]
};

exports.getQuestions = (req, res) => {
  const unnormalizedCourseStr = (req.query.course || "").toLowerCase();
  const courseStr = unnormalizedCourseStr.replace(/[^a-z0-9]/g, '');
  let count = parseInt(req.query.count) || 5;
  const difficulty = req.query.difficulty || null;
  const category = req.query.category || null;
  
  // Find a matching course key
  let match = "javascript"; // default fallback
  const exactMatches = {
    'cplusplus': 'cpp',
    'c++': 'cpp',
    'node': 'nodejs',
    'reactjs': 'react',
    'hotel': 'hotelManagement'
  };

  if (exactMatches[unnormalizedCourseStr] || exactMatches[courseStr]) {
    match = exactMatches[unnormalizedCourseStr] || exactMatches[courseStr];
  } else {
    for (const key of Object.keys(INTERVIEW_QUESTIONS)) {
      const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
      
      // Exact match
      if (courseStr === normalizedKey) {
        match = key;
        break;
      }
      // Partial match (ensure we don't partial match single letters like 'c')
      if (normalizedKey.length > 2 && courseStr.includes(normalizedKey)) {
        match = key;
        break;
      }
      if (courseStr.length > 2 && normalizedKey.includes(courseStr)) {
        match = key;
        break;
      }
    }
  }

  const pool = INTERVIEW_QUESTIONS[match];
  
  // Filter by difficulty and category if specified
  let filteredPool = pool;
  
  if (difficulty) {
    filteredPool = filteredPool.filter(q => q.difficulty === difficulty);
  }
  
  if (category) {
    filteredPool = filteredPool.filter(q => q.category === category);
  }
  
  // Shuffle questions for variety
  const shuffled = [...filteredPool].sort(() => 0.5 - Math.random());
  
  // Return the first `count` questions, bounded by pool size
  const selectedQuestions = shuffled.slice(0, Math.min(count, shuffled.length));
  
  // Return questions with metadata
  const questionsWithMetadata = selectedQuestions.map((q, index) => ({
    id: index + 1,
    question: q.question,
    difficulty: q.difficulty,
    category: q.category,
    expectedAnswer: q.expectedAnswer
  }));
  
  res.json({ 
    questions: questionsWithMetadata, 
    courseMatched: match,
    totalAvailable: filteredPool.length,
    requestedCount: count,
    actualCount: questionsWithMetadata.length
  });
};

// Additional endpoints for enhanced functionality
exports.getDomains = (req, res) => {
  const domains = Object.keys(INTERVIEW_QUESTIONS).map(key => ({
    name: key,
    displayName: key.charAt(0).toUpperCase() + key.slice(1),
    questionCount: INTERVIEW_QUESTIONS[key].length
  }));
  
  res.json({
    domains: [
      {
        category: "Frontend Technologies",
        technologies: ["javascript", "react", "nodejs", "express", "frontend", "css", "html"]
      },
      {
        category: "Backend Technologies", 
        technologies: ["java", "python", "backend", "sql", "c", "cpp", "php", "go"]
      },
      {
        category: "Development Roles",
        technologies: ["devops"]
      },
      {
        category: "Business & Management",
        technologies: ["hotelManagement", "business", "marketing", "finance"]
      }
    ]
  });
};

exports.getQuestionById = (req, res) => {
  const { domain, questionId } = req.params;
  const questionNum = parseInt(questionId);
  
  if (!INTERVIEW_QUESTIONS[domain]) {
    return res.status(404).json({ error: "Domain not found" });
  }
  
  const questions = INTERVIEW_QUESTIONS[domain];
  
  if (questionNum < 1 || questionNum > questions.length) {
    return res.status(404).json({ error: "Question not found" });
  }
  
  const question = questions[questionNum - 1];
  
  res.json({
    id: questionNum,
    question: question.question,
    difficulty: question.difficulty,
    category: question.category,
    expectedAnswer: question.expectedAnswer
  });
};

exports.getRandomQuestions = (req, res) => {
  const { domains, count = 5, difficulty } = req.body;
  
  let allQuestions = [];
  
  if (domains && domains.length > 0) {
    domains.forEach(domain => {
      if (INTERVIEW_QUESTIONS[domain]) {
        allQuestions = allQuestions.concat(INTERVIEW_QUESTIONS[domain]);
      }
    });
  } else {
    // Get questions from all domains
    Object.keys(INTERVIEW_QUESTIONS).forEach(domain => {
      allQuestions = allQuestions.concat(INTERVIEW_QUESTIONS[domain]);
    });
  }
  
  // Filter by difficulty if specified
  if (difficulty) {
    allQuestions = allQuestions.filter(q => q.difficulty === difficulty);
  }
  
  // Shuffle and select
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));
  
  const questionsWithMetadata = selected.map((q, index) => ({
    id: index + 1,
    question: q.question,
    difficulty: q.difficulty,
    category: q.category,
    domain: Object.keys(INTERVIEW_QUESTIONS).find(key => 
      INTERVIEW_QUESTIONS[key].includes(q)
    ),
    expectedAnswer: q.expectedAnswer
  }));
  
  res.json({
    questions: questionsWithMetadata,
    totalAvailable: allQuestions.length,
    requestedCount: count,
    actualCount: questionsWithMetadata.length
  });
};
