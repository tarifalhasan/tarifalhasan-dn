"use client"

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  category: string
  author: string
  tags: string[]
}

export const blogPosts: BlogPost[] = [
  {
    id: "scalable-react-applications",
    title: "Building Scalable React Applications",
    excerpt: "Best practices for architecting large-scale React applications with performance optimization techniques.",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    category: "React",
    author: "Tarif Al Hasan",
    tags: ["react", "performance", "architecture", "scalability"],
    content: `
      <h2>Introduction</h2>
      <p>Building scalable React applications requires careful planning and adherence to best practices. In this comprehensive guide, we'll explore the key strategies for creating maintainable and performant React applications that can grow with your business needs.</p>
      
      <h2>Component Architecture</h2>
      <p>The foundation of any scalable React application lies in its component architecture. Here are the key principles:</p>
      
      <h3>1. Component Composition</h3>
      <p>Instead of creating monolithic components, break them down into smaller, reusable pieces. This approach promotes code reusability and makes testing easier.</p>
      
      <pre><code>// Good: Composed components
const UserProfile = ({ user }) => (
  &lt;div&gt;
    &lt;UserAvatar user={user} /&gt;
    &lt;UserInfo user={user} /&gt;
    &lt;UserActions user={user} /&gt;
  &lt;/div&gt;
)</code></pre>
      
      <h3>2. Custom Hooks</h3>
      <p>Extract complex logic into custom hooks to promote reusability and separation of concerns.</p>
      
      <pre><code>// Custom hook for API calls
const useUserData = (userId) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchUser(userId).then(setUser).finally(() => setLoading(false))
  }, [userId])
  
  return { user, loading }
}</code></pre>
      
      <h2>State Management</h2>
      <p>For large applications, proper state management is crucial. Consider these approaches:</p>
      
      <h3>Context API for Global State</h3>
      <p>Use React's Context API for sharing state across components without prop drilling.</p>
      
      <h3>State Colocation</h3>
      <p>Keep state as close to where it's used as possible. This improves performance and makes components more predictable.</p>
      
      <h2>Performance Optimization</h2>
      <p>Performance is critical for user experience. Here are key optimization techniques:</p>
      
      <h3>1. Code Splitting</h3>
      <p>Use React.lazy() and Suspense to split your code and load components on demand.</p>
      
      <pre><code>const LazyComponent = React.lazy(() => import('./LazyComponent'))

function App() {
  return (
    &lt;Suspense fallback={&lt;div&gt;Loading...&lt;/div&gt;}&gt;
      &lt;LazyComponent /&gt;
    &lt;/Suspense&gt;
  )
}</code></pre>
      
      <h3>2. Memoization</h3>
      <p>Use React.memo, useMemo, and useCallback to prevent unnecessary re-renders.</p>
      
      <h2>Testing Strategy</h2>
      <p>A robust testing strategy ensures your application remains stable as it grows:</p>
      
      <ul>
        <li><strong>Unit Tests:</strong> Test individual components and functions</li>
        <li><strong>Integration Tests:</strong> Test component interactions</li>
        <li><strong>E2E Tests:</strong> Test complete user workflows</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Building scalable React applications requires discipline and adherence to best practices. By focusing on component architecture, state management, performance optimization, and testing, you can create applications that are maintainable, performant, and ready to scale.</p>
    `,
  },
  {
    id: "modern-api-design-patterns",
    title: "Modern API Design Patterns",
    excerpt: "Exploring RESTful and GraphQL API design patterns for building robust backend services.",
    date: "Dec 10, 2024",
    readTime: "12 min read",
    category: "Backend",
    author: "Tarif Al Hasan",
    tags: ["api", "rest", "graphql", "backend", "design-patterns"],
    content: `
      <h2>Introduction</h2>
      <p>API design is a critical aspect of modern software development. Well-designed APIs are intuitive, consistent, and scalable. In this article, we'll explore modern API design patterns and best practices for both RESTful and GraphQL APIs.</p>
      
      <h2>RESTful API Design</h2>
      <p>REST (Representational State Transfer) remains one of the most popular architectural styles for web APIs.</p>
      
      <h3>Resource-Based URLs</h3>
      <p>Design URLs around resources, not actions:</p>
      
      <pre><code>// Good
GET /api/users/123
POST /api/users
PUT /api/users/123
DELETE /api/users/123

// Bad
GET /api/getUser/123
POST /api/createUser
PUT /api/updateUser/123</code></pre>
      
      <h3>HTTP Status Codes</h3>
      <p>Use appropriate HTTP status codes to indicate the result of API operations:</p>
      
      <ul>
        <li><strong>200 OK:</strong> Successful GET, PUT, PATCH</li>
        <li><strong>201 Created:</strong> Successful POST</li>
        <li><strong>204 No Content:</strong> Successful DELETE</li>
        <li><strong>400 Bad Request:</strong> Invalid request data</li>
        <li><strong>401 Unauthorized:</strong> Authentication required</li>
        <li><strong>404 Not Found:</strong> Resource not found</li>
        <li><strong>500 Internal Server Error:</strong> Server error</li>
      </ul>
      
      <h3>Pagination and Filtering</h3>
      <p>Implement pagination and filtering for large datasets:</p>
      
      <pre><code>GET /api/users?page=2&limit=20&sort=created_at&order=desc&filter=active</code></pre>
      
      <h2>GraphQL API Design</h2>
      <p>GraphQL provides a more flexible approach to API design, allowing clients to request exactly the data they need.</p>
      
      <h3>Schema Design</h3>
      <p>Design your GraphQL schema with clear types and relationships:</p>
      
      <pre><code>type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
  createdAt: DateTime!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
  publishedAt: DateTime
}</code></pre>
      
      <h3>Query Optimization</h3>
      <p>Implement DataLoader to solve the N+1 query problem:</p>
      
      <pre><code>const userLoader = new DataLoader(async (userIds) => {
  const users = await User.findByIds(userIds)
  return userIds.map(id => users.find(user => user.id === id))
})</code></pre>
      
      <h2>API Security</h2>
      <p>Security should be built into your API from the ground up:</p>
      
      <h3>Authentication and Authorization</h3>
      <ul>
        <li><strong>JWT Tokens:</strong> For stateless authentication</li>
        <li><strong>OAuth 2.0:</strong> For third-party integrations</li>
        <li><strong>API Keys:</strong> For service-to-service communication</li>
      </ul>
      
      <h3>Rate Limiting</h3>
      <p>Implement rate limiting to prevent abuse:</p>
      
      <pre><code>const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})</code></pre>
      
      <h2>API Documentation</h2>
      <p>Good documentation is essential for API adoption:</p>
      
      <h3>OpenAPI/Swagger</h3>
      <p>Use OpenAPI specification for REST APIs to generate interactive documentation.</p>
      
      <h3>GraphQL Playground</h3>
      <p>GraphQL provides built-in introspection and playground for exploring the API.</p>
      
      <h2>Versioning Strategies</h2>
      <p>Plan for API evolution with proper versioning:</p>
      
      <h3>URL Versioning</h3>
      <pre><code>GET /api/v1/users
GET /api/v2/users</code></pre>
      
      <h3>Header Versioning</h3>
      <pre><code>GET /api/users
Accept: application/vnd.api+json;version=1</code></pre>
      
      <h2>Conclusion</h2>
      <p>Modern API design requires careful consideration of architecture, security, performance, and developer experience. Whether you choose REST or GraphQL, following these patterns and best practices will help you build APIs that are robust, scalable, and easy to use.</p>
    `,
  },
  {
    id: "devops-for-fullstack-developers",
    title: "DevOps for Full-Stack Developers",
    excerpt: "Essential DevOps practices every full-stack developer should know for efficient deployment.",
    date: "Dec 5, 2024",
    readTime: "10 min read",
    category: "DevOps",
    author: "Tarif Al Hasan",
    tags: ["devops", "deployment", "ci-cd", "docker", "kubernetes"],
    content: `
      <h2>Introduction</h2>
      <p>As a full-stack developer, understanding DevOps practices is crucial for building and deploying applications efficiently. This guide covers essential DevOps concepts and tools that every full-stack developer should master.</p>
      
      <h2>Containerization with Docker</h2>
      <p>Docker revolutionizes how we package and deploy applications by providing consistent environments across development, testing, and production.</p>
      
      <h3>Creating a Dockerfile</h3>
      <p>Here's a basic Dockerfile for a Node.js application:</p>
      
      <pre><code># Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Define startup command
CMD ["npm", "start"]</code></pre>
      
      <h3>Docker Compose for Multi-Service Applications</h3>
      <p>Use Docker Compose to orchestrate multiple services:</p>
      
      <pre><code>version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
      
  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:</code></pre>
      
      <h2>Continuous Integration/Continuous Deployment (CI/CD)</h2>
      <p>CI/CD pipelines automate testing, building, and deployment processes.</p>
      
      <h3>GitHub Actions Workflow</h3>
      <p>Example CI/CD pipeline using GitHub Actions:</p>
      
      <pre><code>name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        run: |
          # Deployment commands here
          echo "Deploying to production..."</code></pre>
      
      <h2>Infrastructure as Code</h2>
      <p>Manage infrastructure using code for consistency and reproducibility.</p>
      
      <h3>Terraform Example</h3>
      <p>Define AWS infrastructure with Terraform:</p>
      
      <pre><code>provider "aws" {
  region = "us-west-2"
}

resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1d0"
  instance_type = "t2.micro"
  
  tags = {
    Name = "WebServer"
  }
}

resource "aws_security_group" "web_sg" {
  name_prefix = "web-"
  
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}</code></pre>
      
      <h2>Monitoring and Logging</h2>
      <p>Implement comprehensive monitoring and logging for production applications.</p>
      
      <h3>Application Monitoring</h3>
      <p>Use tools like Prometheus and Grafana for metrics collection and visualization:</p>
      
      <pre><code>const prometheus = require('prom-client')

// Create metrics
const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status']
})

// Middleware to collect metrics
app.use((req, res, next) => {
  const start = Date.now()
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000
    httpRequestDuration
      .labels(req.method, req.route?.path || req.path, res.statusCode)
      .observe(duration)
  })
  
  next()
})</code></pre>
      
      <h3>Centralized Logging</h3>
      <p>Implement structured logging with tools like Winston:</p>
      
      <pre><code>const winston = require('winston')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }))
}</code></pre>
      
      <h2>Security Best Practices</h2>
      <p>Security should be integrated throughout the DevOps pipeline:</p>
      
      <h3>Container Security</h3>
      <ul>
        <li>Use minimal base images (Alpine Linux)</li>
        <li>Scan images for vulnerabilities</li>
        <li>Run containers as non-root users</li>
        <li>Keep images updated</li>
      </ul>
      
      <h3>Secrets Management</h3>
      <p>Never store secrets in code. Use environment variables or dedicated secret management tools:</p>
      
      <pre><code># Using environment variables
DATABASE_URL=postgresql://user:password@localhost:5432/mydb

# Using Docker secrets
echo "mypassword" | docker secret create db_password -</code></pre>
      
      <h2>Performance Optimization</h2>
      <p>Optimize your deployment pipeline and application performance:</p>
      
      <h3>Build Optimization</h3>
      <ul>
        <li>Use multi-stage Docker builds</li>
        <li>Implement build caching</li>
        <li>Minimize image layers</li>
        <li>Use .dockerignore files</li>
      </ul>
      
      <h3>Deployment Strategies</h3>
      <ul>
        <li><strong>Blue-Green Deployment:</strong> Zero-downtime deployments</li>
        <li><strong>Rolling Updates:</strong> Gradual replacement of instances</li>
        <li><strong>Canary Releases:</strong> Test with a subset of users</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>DevOps practices are essential for modern full-stack development. By mastering containerization, CI/CD, infrastructure as code, monitoring, and security, you can build robust, scalable, and maintainable applications. Start with the basics and gradually incorporate more advanced practices as your applications grow in complexity.</p>
    `,
  },
]
