import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json()

    // Professional knowledge base about Tarif Al Hasan
    const professionalContext = `
    You are Tarif Al Hasan's professional AI assistant. You have comprehensive knowledge about:

    PROFESSIONAL BACKGROUND:
    - Senior AI Engineer & Full-Stack Architect with 5+ years experience
    - Specializes in enterprise AI solutions, machine learning, and scalable web applications
    - Expert in React/Next.js, Node.js, Python, TypeScript, and cloud platforms
    - Experience in fintech, healthcare, and e-commerce industries

    TECHNICAL EXPERTISE:
    - Frontend: React, Next.js, TypeScript, Tailwind CSS, responsive design
    - Backend: Node.js, Python, RESTful APIs, GraphQL, microservices
    - AI/ML: TensorFlow, PyTorch, scikit-learn, NLP, computer vision
    - Databases: PostgreSQL, MongoDB, Redis, vector databases
    - Cloud: AWS, Azure, Docker, Kubernetes, CI/CD pipelines
    - Tools: Git, Jest, Cypress, monitoring and analytics

    KEY PROJECTS:
    - Multi-tenant SaaS platform with integrated ML capabilities
    - Intelligent recommendation engines serving millions of users
    - Real-time analytics dashboards with predictive modeling
    - Automated data processing pipelines reducing manual work by 85%
    - Fraud detection systems for fintech applications
    - Healthcare AI solutions for predictive analytics

    PROFESSIONAL APPROACH:
    - Focus on practical AI implementation with measurable business value
    - Combines cutting-edge ML techniques with robust software engineering
    - Experienced in leading cross-functional teams and mentoring developers
    - Strong emphasis on scalable, maintainable, and secure solutions

    CONTACT & COLLABORATION:
    - Available for AI strategy consultations and technical architecture reviews
    - Seeking opportunities in AI product development and technical leadership
    - Responds to professional inquiries within 24 hours
    - Open to innovative projects pushing AI boundaries

    Respond professionally and knowledgeably about Tarif's expertise. Be specific about technical capabilities and provide detailed, helpful information. Maintain a professional tone while being approachable and informative.
    `

    // Simple but intelligent response generation
    const response = await generateIntelligentResponse(message, conversationHistory, professionalContext)

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Failed to process chat message" }, { status: 500 })
  }
}

async function generateIntelligentResponse(
  userMessage: string,
  conversationHistory: any[],
  context: string,
): Promise<string> {
  const message = userMessage.toLowerCase()

  // Advanced pattern matching with context awareness
  if (
    message.includes("hello") ||
    message.includes("hi") ||
    message.includes("hey") ||
    conversationHistory.length <= 1
  ) {
    return "Good day! I'm Tarif's AI assistant, powered by advanced language processing capabilities. I have comprehensive knowledge about his expertise in artificial intelligence, full-stack development, and enterprise solutions. I can provide detailed information about his technical skills, project portfolio, professional experience, and collaboration opportunities. What specific aspect would you like to explore?"
  }

  if (
    message.includes("project") ||
    message.includes("portfolio") ||
    message.includes("work") ||
    message.includes("built")
  ) {
    return "Tarif has architected numerous enterprise-grade solutions that demonstrate his expertise across the full technology stack. Notable projects include: a multi-tenant SaaS platform with integrated machine learning capabilities serving thousands of users, intelligent recommendation engines processing millions of interactions daily, real-time analytics dashboards with predictive modeling for business intelligence, automated data processing pipelines that reduced manual operations by 85%, and fraud detection systems for fintech applications. Each project showcases his ability to combine cutting-edge AI techniques with robust software engineering practices."
  }

  if (
    message.includes("ai") ||
    message.includes("artificial intelligence") ||
    message.includes("machine learning") ||
    message.includes("ml")
  ) {
    return "Tarif specializes in practical AI implementation that delivers measurable business value. His AI expertise spans natural language processing, computer vision, recommendation systems, predictive modeling, and automated decision-making. He's proficient with TensorFlow, PyTorch, scikit-learn, and modern ML frameworks. His approach focuses on integrating AI capabilities seamlessly into existing business workflows, ensuring scalable deployment from prototype to production. Recent AI projects include intelligent automation systems, personalization engines, and predictive analytics solutions across various industries."
  }

  if (
    message.includes("skill") ||
    message.includes("technology") ||
    message.includes("tech") ||
    message.includes("stack")
  ) {
    return "Tarif's technical expertise covers the complete development lifecycle: Frontend development with React, Next.js, and TypeScript for responsive, performant user interfaces; Backend architecture using Node.js and Python for scalable APIs and microservices; AI/ML development with TensorFlow, PyTorch, and modern frameworks; Database design and optimization with PostgreSQL, MongoDB, and vector databases; Cloud deployment on AWS and Azure with Docker and Kubernetes; DevOps practices including CI/CD pipelines, monitoring, and automated testing. This comprehensive skill set enables him to architect end-to-end solutions that seamlessly integrate AI capabilities with traditional web applications."
  }

  if (message.includes("experience") || message.includes("background") || message.includes("career")) {
    return "As a Senior AI Engineer with 5+ years of professional experience, Tarif has successfully delivered solutions across fintech, healthcare, and e-commerce industries. His career highlights include leading cross-functional teams on complex AI initiatives, mentoring junior developers in modern development practices, architecting scalable systems handling millions of users, and implementing AI solutions that directly impact business outcomes. He's experienced in the complete project lifecycle from initial concept and technical architecture to deployment and maintenance, with a strong focus on creating maintainable, secure, and performant applications."
  }

  if (
    message.includes("contact") ||
    message.includes("hire") ||
    message.includes("collaborate") ||
    message.includes("opportunity")
  ) {
    return "Tarif is actively seeking opportunities in AI product development, technical leadership roles, and innovative projects that push the boundaries of artificial intelligence. He's available for consultations on AI strategy, technical architecture reviews, and project development. You can reach him through the contact form on this website, and he typically responds to professional inquiries within 24 hours. He's particularly interested in collaborations involving cutting-edge AI applications, scalable system architecture, and projects that combine technical innovation with real-world business impact."
  }

  if (
    message.includes("react") ||
    message.includes("next") ||
    message.includes("javascript") ||
    message.includes("typescript")
  ) {
    return "Tarif has extensive expertise in modern JavaScript and React ecosystem. He's built numerous production applications using React and Next.js, implementing advanced patterns like server-side rendering, static site generation, and progressive web app features. His TypeScript proficiency ensures type-safe, maintainable codebases, while his experience with state management, performance optimization, and modern development tools enables him to create sophisticated user interfaces that scale effectively."
  }

  if (message.includes("python") || message.includes("tensorflow") || message.includes("pytorch")) {
    return "Python is Tarif's primary language for AI/ML development and backend services. He's highly proficient with TensorFlow and PyTorch for deep learning, scikit-learn for traditional ML algorithms, and various Python frameworks for web development. His Python expertise extends to data processing pipelines, API development with FastAPI and Flask, automated testing, and deployment of ML models in production environments. This combination allows him to build complete AI-powered applications from data processing to user-facing interfaces."
  }

  if (
    message.includes("cloud") ||
    message.includes("aws") ||
    message.includes("azure") ||
    message.includes("deployment")
  ) {
    return "Tarif has extensive experience with cloud platforms, particularly AWS and Azure, for deploying scalable AI and web applications. His cloud expertise includes containerization with Docker, orchestration with Kubernetes, setting up CI/CD pipelines, implementing monitoring and logging solutions, and optimizing for performance and cost. He's skilled in serverless architectures, microservices deployment, database management in the cloud, and ensuring security best practices for enterprise-grade applications."
  }

  // Default comprehensive response
  return "I'd be happy to provide more specific information about Tarif's expertise. You can ask me about his AI and machine learning projects, technical skills in various programming languages and frameworks, professional experience across different industries, specific technologies like React, Python, or cloud platforms, or how to connect with him for collaboration opportunities. What particular aspect interests you most?"
}
