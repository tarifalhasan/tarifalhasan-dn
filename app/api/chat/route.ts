import { franc } from "franc-min";
import { type NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const DEFAULT_MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
type SupportedLanguage = "en" | "de" | "es" | "fr" | "bn";
type TranslationKey =
  | "greeting"
  | "projects"
  | "aiExpertise"
  | "techStack"
  | "experience"
  | "collaboration"
  | "reactExpertise"
  | "pythonExpertise"
  | "cloudExpertise"
  | "general";

const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  en: "English",
  de: "German",
  es: "Spanish",
  fr: "French",
  bn: "Bengali",
};

const fallbackTranslations: Record<
  TranslationKey,
  Record<SupportedLanguage, string>
> = {
  greeting: {
    en: "Good day! I'm Tarif’s AI assistant, powered by advanced language processing capabilities. I have comprehensive knowledge about his expertise in artificial intelligence, full-stack development, and enterprise solutions. I can provide detailed information about his technical skills, project portfolio, professional experience, and collaboration opportunities. What specific aspect would you like to explore?",
    de: "Guten Tag! Ich bin Tarif’s KI-Assistent mit erweiterten Sprachfähigkeiten. Ich kenne seine Expertise in künstlicher Intelligenz, Full-Stack-Entwicklung und Enterprise-Lösungen im Detail und kann dir präzise Informationen zu seinen technischen Fähigkeiten, Projektreferenzen, Berufserfahrungen und Kooperationsmöglichkeiten geben. Welcher Bereich interessiert dich am meisten?",
    es: "¡Buen día! Soy el asistente de IA de Tarif, equipado con capacidades avanzadas de lenguaje. Conozco a fondo su experiencia en inteligencia artificial, desarrollo full-stack y soluciones empresariales. Puedo brindarte información detallada sobre sus habilidades técnicas, proyectos, trayectoria profesional y opciones de colaboración. ¿Qué tema te gustaría explorar?",
    fr: "Bonjour ! Je suis l’assistant IA de Tarif, doté d’avancées en traitement du langage. Je connais en profondeur son expertise en intelligence artificielle, développement full-stack et solutions d’entreprise. Je peux fournir des informations détaillées sur ses compétences techniques, ses projets, son expérience professionnelle et ses opportunités de collaboration. Quel aspect souhaites-tu explorer ?",
    bn: "শুভেচ্ছা! আমি তারিফের এআই সহকারী। কৃত্রিম বুদ্ধিমত্তা, ফুল-স্ট্যাক ডেভেলপমেন্ট ও এন্টারপ্রাইজ সমাধানে তার সমগ্র জ্ঞান আমার কাছে রয়েছে। তার প্রযুক্তিগত দক্ষতা, প্রজেক্ট পোর্টফোলিও, পেশাগত অভিজ্ঞতা এবং সহযোগিতার সুযোগ নিয়ে বিস্তারিত জানাতে পারি। আপনি কোন বিষয়টি জানতে চান?",
  },
  projects: {
    en: "Tarif has architected numerous enterprise-grade solutions across the full technology stack. Key highlights include a multi-tenant SaaS platform with integrated machine learning serving thousands of users, recommendation engines processing millions of interactions daily, predictive analytics dashboards for decision-makers, automated data pipelines that cut manual effort by 85%, and fintech fraud-detection systems. Each project showcases his ability to merge cutting-edge AI with robust engineering.",
    de: "Tarif hat zahlreiche Enterprise-Lösungen über den gesamten Technologie-Stack entworfen. Zu den Highlights zählen eine Multi-Tenant-SaaS-Plattform mit integrierten ML-Funktionen, Empfehlungssysteme mit Millionen täglicher Interaktionen, prädiktive Analytics-Dashboards für Entscheider, automatisierte Datenpipelines mit 85 % weniger manueller Arbeit sowie Betrugserkennungssysteme für FinTech. Jedes Projekt zeigt, wie er moderne KI mit solider Softwarearchitektur kombiniert.",
    es: "Tarif ha diseñado múltiples soluciones empresariales de extremo a extremo. Destacan una plataforma SaaS multiinquilino con machine learning integrado, motores de recomendación que procesan millones de interacciones al día, paneles de analítica predictiva para directivos, canalizaciones de datos automatizadas que reducen el trabajo manual en un 85 %, y sistemas antifraude para fintech. Cada proyecto demuestra su capacidad para combinar IA avanzada con ingeniería robusta.",
    fr: "Tarif a conçu de nombreuses solutions d’entreprise couvrant tout le stack technologique. Parmi les points forts : une plateforme SaaS multi-locataires avec apprentissage automatique intégré, des moteurs de recommandation traitant des millions d’interactions par jour, des tableaux de bord prédictifs pour les décideurs, des pipelines de données automatisés réduisant de 85 % le travail manuel, et des systèmes anti-fraude pour la fintech. Chaque projet illustre sa capacité à marier IA de pointe et ingénierie fiable.",
    bn: "তারিফ সম্পূর্ণ টেক স্ট্যাক জুড়ে অসংখ্য এন্টারপ্রাইজ সমাধান ডিজাইন করেছেন। উল্লেখযোগ্য উদাহরণ হলো এমএল-সমৃদ্ধ মাল্টি-টেন্যান্ট SaaS প্ল্যাটফর্ম, প্রতিদিন লক্ষ লক্ষ ইন্টারঅ্যাকশন সামলানো রেকমেন্ডেশন ইঞ্জিন, সিদ্ধান্ত গ্রহণকারীদের জন্য প্রেডিক্টিভ অ্যানালিটিক্স ড্যাশবোর্ড, ৮৫% পর্যন্ত ম্যানুয়াল কাজ কমানো স্বয়ংক্রিয় ডেটা পাইপলাইন এবং ফিনটেক ফ্রড ডিটেকশন সিস্টেম। প্রতিটি প্রকল্প তার সর্বাধুনিক এআই ও মজবুত ইঞ্জিনিয়ারিং দক্ষতার সমন্বয়কে প্রমাণ করে।",
  },
  aiExpertise: {
    en: "Tarif specializes in practical AI implementations that deliver measurable business value. His expertise spans natural language processing, computer vision, recommendation systems, predictive modeling, and automated decision-making. He is proficient with TensorFlow, PyTorch, scikit-learn, and modern ML frameworks, ensuring seamless integration of AI capabilities from prototype to production.",
    de: "Tarif spezialisiert sich auf praxisnahe KI-Lösungen mit messbarem Geschäftsnutzen. Seine Expertise deckt NLP, Computer Vision, Empfehlungssysteme, Predictive Modeling und automatisierte Entscheidungsfindung ab. Er beherrscht TensorFlow, PyTorch, scikit-learn und moderne ML-Frameworks und integriert KI-Funktionen nahtlos vom Prototyp bis zur Produktion.",
    es: "Tarif se especializa en implementar IA práctica con impacto comercial cuantificable. Domina el procesamiento del lenguaje natural, la visión por computadora, los sistemas de recomendación, la modelización predictiva y la toma de decisiones automatizada. Maneja TensorFlow, PyTorch, scikit-learn y otros frameworks modernos para llevar la IA del prototipo a producción sin fricciones.",
    fr: "Tarif est spécialisé dans l’implémentation d’IA pragmatique apportant une valeur métier mesurable. Son expertise couvre le NLP, la vision par ordinateur, les systèmes de recommandation, la modélisation prédictive et la décision automatique. Il maîtrise TensorFlow, PyTorch, scikit-learn et les frameworks ML modernes pour intégrer l’IA du prototype à la production sans rupture.",
    bn: "ব্যবসায়িক ফল measurable করতে পারে এমন ব্যবহারিক এআই সমাধান তৈরি করাই তারিফের দক্ষতা। তিনি ন্যাচারাল ল্যাঙ্গুয়েজ প্রসেসিং, কম্পিউটার ভিশন, রেকমেন্ডেশন সিস্টেম, প্রেডিক্টিভ মডেলিং এবং অটোমেটেড ডিসিশন মেকিংয়ে অভিজ্ঞ। TensorFlow, PyTorch, scikit-learn সহ আধুনিক এমএল ফ্রেমওয়ার্কে তার দক্ষতা প্রোটোটাইপ থেকে প্রোডাকশন পর্যন্ত এআই ইন্টেগ্রেশনকে নিরবচ্ছিন্ন করে।",
  },
  techStack: {
    en: "Tarif’s technical expertise covers the full development lifecycle: frontend with React, Next.js, and TypeScript for performant UI; backend architecture with Node.js and Python for scalable APIs; AI/ML with TensorFlow, PyTorch, and modern frameworks; databases such as PostgreSQL, MongoDB, and vector stores; and cloud deployment on AWS/Azure with Docker, Kubernetes, and CI/CD automation.",
    de: "Tarif deckt den gesamten Entwicklungszyklus ab: Frontend mit React, Next.js und TypeScript für performante Interfaces; Backend-Architekturen mit Node.js und Python für skalierbare APIs; KI/ML mit TensorFlow, PyTorch und modernen Frameworks; Datenbanken wie PostgreSQL, MongoDB und Vector Stores; sowie Cloud-Deployments auf AWS/Azure mit Docker, Kubernetes und CI/CD-Automatisierung.",
    es: "La pericia técnica de Tarif cubre todo el ciclo de desarrollo: frontend con React, Next.js y TypeScript para interfaces de alto rendimiento; arquitectura backend con Node.js y Python para API escalables; IA/ML con TensorFlow, PyTorch y frameworks modernos; bases de datos como PostgreSQL, MongoDB y almacenes vectoriales; y despliegues en la nube (AWS/Azure) con Docker, Kubernetes y pipelines CI/CD.",
    fr: "L’expertise de Tarif couvre l’ensemble du cycle de développement : frontend avec React, Next.js et TypeScript pour des interfaces performantes ; architectures backend avec Node.js et Python pour des API évolutives ; IA/ML avec TensorFlow, PyTorch et frameworks modernes ; bases de données comme PostgreSQL, MongoDB et vecteurs ; et déploiement cloud sur AWS/Azure avec Docker, Kubernetes et automatisation CI/CD.",
    bn: "ডেভেলপমেন্ট লাইফসাইকের প্রতিটি ধাপেই তারিফ দক্ষ: React, Next.js ও TypeScript দিয়ে পারফরম্যান্ট ফ্রন্টএন্ড; Node.js ও Python দিয়ে স্কেলেবল ব্যাকএন্ড/API আর্কিটেকচার; TensorFlow, PyTorch সহ এআই/এমএল; PostgreSQL, MongoDB ও ভেক্টর স্টোরের মতো ডাটাবেস; এবং AWS/Azure-এ Docker, Kubernetes ও CI/CD অটোমেশনসহ ক্লাউড ডিপ্লয়মেন্ট।",
  },
  experience: {
    en: "As a Senior AI Engineer with 5+ years of experience, Tarif has delivered solutions across fintech, healthcare, and e-commerce. He has led cross-functional teams, mentored developers, architected systems serving millions of users, and implemented AI capabilities that directly impact business outcomes while maintaining security, scalability, and performance.",
    de: "Als Senior-AI-Engineer mit über fünf Jahren Erfahrung hat Tarif Projekte in FinTech, Healthcare und E-Commerce umgesetzt. Er leitete interdisziplinäre Teams, coachte Entwickler, konzipierte Systeme für Millionen Nutzer und implementierte KI-Funktionen mit nachweisbarem Geschäftsnutzen – stets mit Fokus auf Sicherheit, Skalierbarkeit und Performance.",
    es: "Como ingeniero sénior de IA con más de cinco años de experiencia, Tarif ha entregado soluciones en fintech, salud y comercio electrónico. Ha liderado equipos multidisciplinarios, mentorizado desarrolladores, diseñado sistemas que atienden a millones de usuarios e incorporado capacidades de IA que impactan directamente en el negocio, con énfasis en seguridad y escalabilidad.",
    fr: "En tant qu’ingénieur IA senior avec plus de cinq ans d’expérience, Tarif a livré des solutions dans la fintech, la santé et l’e-commerce. Il a dirigé des équipes pluridisciplinaires, mentoré des développeurs, architecturé des systèmes pour des millions d’utilisateurs et intégré des capacités d’IA à fort impact métier, tout en garantissant sécurité et scalabilité.",
    bn: "৫ বছরের বেশি অভিজ্ঞতা সম্পন্ন সিনিয়র এআই ইঞ্জিনিয়ার হিসেবে তারিফ ফিনটেক, হেলথকেয়ার ও ই-কমার্সে সফল সমাধান দিয়েছেন। তিনি ক্রস-ফাংশনাল টিম লিড করেছেন, ডেভেলপারদের মেন্টর করেছেন, লক্ষ লক্ষ ব্যবহারকারী পরিবেশন করা সিস্টেম ডিজাইন করেছেন এবং এআই কার্যকারিতা যুক্ত করে ব্যবসায়িক ফল উন্নত করেছেন—সবই নিরাপত্তা, স্কেলেবিলিটি ও পারফরম্যান্স বজায় রেখে।",
  },
  collaboration: {
    en: "Tarif is open to AI product development, technical leadership roles, and innovative collaborations. He’s available for AI strategy consultations, architecture reviews, and project delivery, typically responding within 24 hours. Feel free to reach out through the contact form to discuss opportunities.",
    de: "Tarif ist offen für AI-Produktentwicklung, technische Führungsrollen und innovative Kooperationen. Er bietet Beratungen zu AI-Strategie, Architektur-Reviews und Projektumsetzung an und antwortet in der Regel innerhalb von 24 Stunden. Melde dich gern über das Kontaktformular.",
    es: "Tarif está abierto a desarrollar productos de IA, asumir roles de liderazgo técnico y colaborar en proyectos innovadores. Ofrece consultorías de estrategia de IA, revisiones de arquitectura y ejecución de proyectos, y suele responder en menos de 24 horas. Contáctalo mediante el formulario para tratar nuevas oportunidades.",
    fr: "Tarif est disponible pour le développement de produits IA, des rôles de leadership technique et des collaborations innovantes. Il propose des consultations stratégiques, des revues d’architecture et le pilotage de projets, avec une réponse en moins de 24 h. Contactez-le via le formulaire pour discuter d’opportunités.",
    bn: "তারিফ এআই প্রোডাক্ট ডেভেলপমেন্ট, টেকনিক্যাল লিডারশিপ ও নতুন সহযোগিতার জন্য উন্মুক্ত। এআই স্ট্র্যাটেজি পরামর্শ, আর্কিটেকচার রিভিউ এবং প্রকল্প বাস্তবায়নের জন্য তিনি ২৪ ঘণ্টার মধ্যেই সাধারণত সাড়া দেন। সুযোগ নিয়ে কথা বলতে চাইলে যোগাযোগ ফর্ম ব্যবহার করুন।",
  },
  reactExpertise: {
    en: "Tarif has extensive experience in modern JavaScript and the React ecosystem. He delivers production-grade applications with React and Next.js, leveraging SSR, SSG, progressive enhancement, and TypeScript for maintainability. His mastery of state management and performance tuning ensures sophisticated interfaces that scale cleanly.",
    de: "Tarif verfügt über umfassende Erfahrung im modernen JavaScript- und React-Ökosystem. Er entwickelt produktionsreife Anwendungen mit React und Next.js inklusive SSR, SSG, Progressive Enhancement und sauberem TypeScript. Dank fundiertem State-Management und Performance-Tuning entstehen skalierbare, anspruchsvolle Interfaces.",
    es: "Tarif posee amplia experiencia en JavaScript moderno y el ecosistema React. Entrega aplicaciones productivas con React y Next.js, aprovechando SSR, SSG, mejoras progresivas y TypeScript para mantener el código limpio. Su manejo del estado y la optimización del rendimiento garantiza interfaces sofisticadas y escalables.",
    fr: "Tarif dispose d’une solide expérience de JavaScript moderne et de l’écosystème React. Il livre des applications prêtes pour la production avec React et Next.js en exploitant SSR, SSG, amélioration progressive et TypeScript pour un code maintenable. Sa maîtrise de la gestion d’état et de l’optimisation assure des interfaces sophistiquées et évolutives.",
    bn: "আধুনিক জাভাস্ক্রিপ্ট ও React ইকোসিস্টেমে তারিফের বিশাল অভিজ্ঞতা রয়েছে। তিনি React ও Next.js দিয়ে প্রোডাকশন-গ্রেড অ্যাপ্লিকেশন তৈরি করেন—SSR, SSG, প্রগ্রেসিভ এনহান্সমেন্ট এবং মেইনটেনেবল টাইপস্ক্রিপ্ট প্যাটার্ন ব্যবহার করে। স্টেট ম্যানেজমেন্ট ও পারফরম্যান্স টিউনিংয়ে তার দক্ষতা জটিল অথচ স্কেলযোগ্য ইন্টারফেস নিশ্চিত করে।",
  },
  pythonExpertise: {
    en: "Python is Tarif’s primary language for AI/ML and backend services. He is highly proficient with TensorFlow, PyTorch, scikit-learn, data-processing pipelines, FastAPI/Flask APIs, automated testing, and deploying ML models into production environments.",
    de: "Python ist Tarif’s wichtigste Sprache für AI/ML und Backend-Services. Er beherrscht TensorFlow, PyTorch, scikit-learn, Datenpipelines, APIs mit FastAPI/Flask, automatisiertes Testing sowie den produktiven Rollout von ML-Modellen.",
    es: "Python es el lenguaje principal de Tarif para IA/ML y servicios backend. Domina TensorFlow, PyTorch, scikit-learn, canalizaciones de datos, APIs con FastAPI o Flask, pruebas automatizadas y despliegues productivos de modelos.",
    fr: "Python est le langage principal de Tarif pour l’IA/ML et les services backend. Il maîtrise TensorFlow, PyTorch, scikit-learn, les pipelines de données, les API FastAPI/Flask, les tests automatisés et le déploiement de modèles en production.",
    bn: "এআই/এমএল ও ব্যাকএন্ড সেবার জন্য Python তারিফের প্রধান ভাষা। TensorFlow, PyTorch, scikit-learn, ডেটা প্রসেসিং পাইপলাইন, FastAPI/Flask ভিত্তিক API, স্বয়ংক্রিয় টেস্টিং এবং প্রোডাকশনে এমএল মডেল ডিপ্লয়মেন্টে তিনি বিশেষজ্ঞ।",
  },
  cloudExpertise: {
    en: "Tarif has deep experience with cloud platforms (AWS and Azure) for deploying scalable AI and web solutions. He implements Docker/Kubernetes orchestration, CI/CD pipelines, monitoring, logging, serverless patterns, microservices, and security best practices to keep systems performant and cost-efficient.",
    de: "Tarif verfügt über weitreichende Cloud-Erfahrung (AWS, Azure) für skalierbare AI- und Web-Lösungen. Er setzt Docker/Kubernetes, CI/CD-Pipelines, Monitoring, Logging, Serverless-Patterns, Microservices und Security-Best-Practices ein, um Systeme performant und kosteneffizient zu betreiben.",
    es: "Tarif domina los entornos cloud (AWS y Azure) para desplegar soluciones de IA y web escalables. Implementa orquestación con Docker/Kubernetes, pipelines CI/CD, monitoreo, registro centralizado, arquitecturas serverless, microservicios y buenas prácticas de seguridad para maximizar rendimiento y costos.",
    fr: "Tarif possède une grande expérience des plateformes cloud (AWS, Azure) pour déployer des solutions IA et web à grande échelle. Il met en œuvre Docker/Kubernetes, pipelines CI/CD, monitoring, journalisation, architectures serverless, microservices et bonnes pratiques de sécurité pour optimiser performance et coûts.",
    bn: "স্কেলযোগ্য এআই ও ওয়েব সমাধান ক্লাউডে ডিপ্লয় করার জন্য (AWS, Azure) তারিফের গভীর অভিজ্ঞতা রয়েছে। তিনি Docker/Kubernetes অর্কেস্ট্রেশন, CI/CD পাইপলাইন, মনিটরিং, লগিং, সার্ভারলেস প্যাটার্ন, মাইক্রোসার্ভিস এবং সিকিউরিটি বেস্ট প্র্যাকটিস ব্যবহার করে সিস্টেমকে দ্রুত ও ব্যয়-সাশ্রয়ী রাখেন।",
  },
  general: {
    en: "I’d be happy to provide more specific information about Tarif’s expertise. You can ask about his AI and machine-learning projects, technical skills, professional experience across industries, specific technologies such as React, Python, or cloud platforms, or how to collaborate with him. Which aspect interests you most?",
    de: "Gerne liefere ich dir noch konkretere Informationen über Tarif’s Expertise. Frag einfach nach seinen AI/ML-Projekten, technischen Skills, Branchenerfahrungen oder bestimmten Technologien wie React, Python oder Cloud-Plattformen – oder wie eine Zusammenarbeit aussehen kann. Welches Thema interessiert dich am meisten?",
    es: "Con gusto puedo brindarte información más específica sobre la experiencia de Tarif. Pregunta sobre sus proyectos de IA/ML, habilidades técnicas, experiencia sectorial o tecnologías concretas como React, Python o plataformas cloud, además de oportunidades de colaboración. ¿Qué aspecto te interesa más?",
    fr: "Je peux te donner davantage de détails sur l’expertise de Tarif : projets IA/ML, compétences techniques, expériences sectorielles ou technologies spécifiques (React, Python, plateformes cloud), ainsi que les modalités de collaboration. Quel aspect t’intéresse le plus ?",
    bn: "তারিফের অভিজ্ঞতা সম্পর্কে আরও বিস্তারিত জানতে চাইলে আমাকে বলুন। আপনি তার এআই/এমএল প্রজেক্ট, প্রযুক্তিগত দক্ষতা, বিভিন্ন শিল্পে কাজ বা React, Python, ক্লাউড প্ল্যাটফর্মের মতো নির্দিষ্ট প্রযুক্তি এবং সহযোগিতার উপায় সম্পর্কে জিজ্ঞেস করতে পারেন। কোন দিকটি আপনার বেশি আগ্রহের?",
  },
};

const quotaExceededNotice: Record<SupportedLanguage, string> = {
  en: "I’m currently hitting the OpenAI usage limit, so I’ll reply with my local knowledge instead:\n\n",
  de: "Ich erreiche gerade das OpenAI-Nutzungslimit und antworte dir daher mit meinem lokalen Wissensstand:\n\n",
  es: "En este momento el límite de uso de OpenAI está completo; responderé con mi conocimiento local:\n\n",
  fr: "Je viens d’atteindre la limite d’utilisation d’OpenAI, je réponds donc avec mes connaissances locales :\n\n",
  bn: "এই মুহূর্তে OpenAI ব্যবহারের সীমা পূর্ণ, তাই আমি এখন নিজের সংগ্রহ করা তথ্য দিয়ে উত্তর দিচ্ছি:\n\n",
};

const isoToSupportedLanguage: Record<string, SupportedLanguage> = {
  eng: "en",
  deu: "de",
  ger: "de",
  spa: "es",
  fra: "fr",
  fre: "fr",
  ben: "bn",
};

const characterHeuristics: { regex: RegExp; language: SupportedLanguage }[] = [
  { regex: /[äöüß]/i, language: "de" },
  { regex: /[áéíóúñ¡¿]/i, language: "es" },
  { regex: /[àâçéèêëîïôùûüœ]/i, language: "fr" },
  { regex: /[\u0980-\u09FF]/, language: "bn" },
];

const MIN_DETECTION_LENGTH = 10;

function detectLanguage(text: string): SupportedLanguage {
  if (!text) {
    return "en";
  }

  for (const heuristic of characterHeuristics) {
    if (heuristic.regex.test(text)) {
      return heuristic.language;
    }
  }

  const trimmed = text.trim();
  if (trimmed.length < MIN_DETECTION_LENGTH) {
    return "en";
  }

  const isoCode = franc(trimmed, { minLength: MIN_DETECTION_LENGTH });
  return isoToSupportedLanguage[isoCode] ?? "en";
}

function getLanguageInstruction(language: SupportedLanguage): string {
  if (language === "en") {
    return "Default to English, but if the user clearly writes in another language you must immediately mirror their language while keeping responses concise, professional, and friendly.";
  }

  return `The user prefers ${LANGUAGE_LABELS[language]}. Respond entirely in ${LANGUAGE_LABELS[language]} unless the user switches languages. Maintain clarity, professionalism, and approachability.`;
}

function translate(key: TranslationKey, language: SupportedLanguage): string {
  return fallbackTranslations[key][language] ?? fallbackTranslations[key].en;
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json();
    const preferredLanguage = detectLanguage(message);

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
    `;

    // Try OpenAI first for powered responses
    const response = await generateOpenAIResponse(
      message,
      conversationHistory,
      professionalContext,
      preferredLanguage
    );

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}

async function generateOpenAIResponse(
  userMessage: string,
  conversationHistory: any[],
  context: string,
  language: SupportedLanguage
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.warn(
      "OPENAI_API_KEY is missing. Falling back to rule-based responses."
    );
    return generateFallbackResponse(
      userMessage,
      conversationHistory,
      context,
      language
    );
  }

  try {
    const openai = new OpenAI({ apiKey });
    const languageInstruction = getLanguageInstruction(language);

    const chatMessages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: `${context}

Language policy: ${languageInstruction}`,
      },
      ...conversationHistory.map(
        (msg: {
          sender: string;
          text: string;
        }): ChatCompletionMessageParam => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        })
      ),
      {
        role: "user",
        content: userMessage,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: chatMessages,
      temperature: 0.4,
      max_tokens: 600,
      presence_penalty: 0,
      frequency_penalty: 0.2,
    });

    const aiResponse = completion.choices[0]?.message?.content?.trim();
    if (aiResponse) {
      return aiResponse;
    }

    console.warn("OpenAI returned empty response, using fallback.");
    return generateFallbackResponse(
      userMessage,
      conversationHistory,
      context,
      language
    );
  } catch (error: any) {
    if (error?.status === 429 || error?.code === "insufficient_quota") {
      console.warn("OpenAI quota exceeded. Falling back to local response.");
      return (
        quotaExceededNotice[language] +
        generateFallbackResponse(
          userMessage,
          conversationHistory,
          context,
          language
        )
      );
    }

    if (error?.code === "ENOTFOUND" || error?.errno === "ENOTFOUND") {
      console.warn("OpenAI Netzwerkfehler, verwende Fallback.", error);
      return generateFallbackResponse(
        userMessage,
        conversationHistory,
        context,
        language
      );
    }

    console.error("OpenAI API error:", error);
    return generateFallbackResponse(
      userMessage,
      conversationHistory,
      context,
      language
    );
  }
}

function generateFallbackResponse(
  userMessage: string,
  conversationHistory: any[],
  _context: string,
  language: SupportedLanguage
): string {
  const message = userMessage.toLowerCase();

  // Advanced pattern matching with context awareness
  if (
    message.includes("hello") ||
    message.includes("hi") ||
    message.includes("hey") ||
    conversationHistory.length <= 1
  ) {
    return translate("greeting", language);
  }

  if (
    message.includes("project") ||
    message.includes("portfolio") ||
    message.includes("work") ||
    message.includes("built")
  ) {
    return translate("projects", language);
  }

  if (
    message.includes("ai") ||
    message.includes("artificial intelligence") ||
    message.includes("machine learning") ||
    message.includes("ml")
  ) {
    return translate("aiExpertise", language);
  }

  if (
    message.includes("skill") ||
    message.includes("technology") ||
    message.includes("tech") ||
    message.includes("stack")
  ) {
    return translate("techStack", language);
  }

  if (
    message.includes("experience") ||
    message.includes("background") ||
    message.includes("career")
  ) {
    return translate("experience", language);
  }

  if (
    message.includes("contact") ||
    message.includes("hire") ||
    message.includes("collaborate") ||
    message.includes("opportunity")
  ) {
    return translate("collaboration", language);
  }

  if (
    message.includes("react") ||
    message.includes("next") ||
    message.includes("javascript") ||
    message.includes("typescript")
  ) {
    return translate("reactExpertise", language);
  }

  if (
    message.includes("python") ||
    message.includes("tensorflow") ||
    message.includes("pytorch")
  ) {
    return translate("pythonExpertise", language);
  }

  if (
    message.includes("cloud") ||
    message.includes("aws") ||
    message.includes("azure") ||
    message.includes("deployment")
  ) {
    return translate("cloudExpertise", language);
  }

  // Default comprehensive response
  return translate("general", language);
}
