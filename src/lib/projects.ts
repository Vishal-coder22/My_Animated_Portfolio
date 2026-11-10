export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  category: string;
  link?: string;
  github?: string;
  videoUrl?: string;
  color: string;
}

export const projects: Project[] = [
  {
    slug: "cinemine",
    title: "CineMine",
    description: "Movie analytics & recommendation platform that cleans watch history and explains every suggestion",
    longDescription:
      "A full-stack platform that ingests movie watch history (CSV/PDF), cleans it, and fuzzy-matches titles against a 4,800-movie catalogue before a one-click import. Implemented K-Means clustering, Apriori association rules, and Naive Bayes genre prediction with scikit-learn, feeding a recommendation engine that explains every suggestion in plain language. Wrote 78 pytest tests with isolated temporary databases; deployed frontend and backend on Vercel with Turso (serverless SQLite).",
    image: "/images/projects/cinemine.svg",
    tags: ["Python", "FastAPI", "React", "scikit-learn", "SQLite", "Tailwind CSS"],
    category: "AI/ML",
    link: "",
    github: "https://github.com/Vishal-coder22/movies_history_based_recommendation_system",
    videoUrl: "",
    color: "#E50914",
  },
  {
    slug: "stream-icu",
    title: "StreamICU",
    description: "Real-time ICU telemetry streaming data warehouse with Isolation Forest anomaly detection",
    longDescription:
      "Contributing ML and data-pipeline work to a 4-member final-year platform that converts simulated ICU telemetry into a real-time streaming data warehouse with anomaly detection. Own the Kafka producer/consumer pipeline and the Isolation Forest anomaly-detection component in Python; built the Docker Compose infrastructure (Kafka, ClickHouse, Grafana) that runs the stack locally. Ongoing.",
    image: "/images/projects/stream-icu.svg",
    tags: ["Python", "Apache Kafka", "Docker", "scikit-learn", "ClickHouse", "Grafana"],
    category: "Data Engineering",
    link: "",
    github: "https://github.com/Vishal-coder22/Real-Time-Streaming-Data-Warehouse-and-Anomaly-Detection-Platform-for-ICU-Patient-Telemetry",
    videoUrl: "",
    color: "#06B6D4",
  },
  {
    slug: "ai-report-agent",
    title: "AI Report Agent",
    description: "AI-powered document platform that extracts, chunks, and summarizes complex PDF reports",
    longDescription:
      "An AI-powered platform that extracts, chunks, and summarizes complex PDF reports with Google Gemini 1.5 Flash. Implemented a dual extraction engine (PyMuPDF primary, pdfplumber fallback) and overlapping ~200-word text chunking; Flask backend with session state, rate limiting, JSON API endpoints, and a Dockerfile.",
    image: "/images/projects/ai-report-agent.svg",
    tags: ["Python", "Flask", "Gemini API", "PyMuPDF", "pdfplumber", "python-docx"],
    category: "AI/ML",
    link: "",
    github: "https://github.com/Vishal-coder22/pdf-summarizer",
    videoUrl: "",
    color: "#A855F7",
  },
  {
    slug: "ncrp",
    title: "NCRP",
    description: "Victim-first cyber-fraud reporting experience with crash-proof draft recovery (solo hackathon build)",
    longDescription:
      "Built solo for the Build What Moves India hackathon: a victim-first cyber-fraud reporting experience with auto-save draft recovery that survives browser crashes. Implemented incident classification with confidence scores and a 1930 emergency-intervention path; 67 passing Playwright tests across Chromium and mobile; deployed to Vercel.",
    image: "/images/projects/ncrp.svg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Zod", "Playwright"],
    category: "Web App",
    link: "",
    github: "https://github.com/Vishal-coder22/Cybercrime_Reporting_system",
    videoUrl: "",
    color: "#3B82F6",
  },
  {
    slug: "vxr-gaming",
    title: "VXR Gaming",
    description: "Premium gaming hardware e-commerce platform with 3D product visualization",
    longDescription:
      "A full-featured gaming hardware e-commerce platform built with Next.js and Three.js. Features a real-time 3D PC builder where users can assemble custom rigs, holographic product cards with dynamic lighting, and a fluid shopping experience powered by GSAP animations.",
    image: "/images/projects/vxr-gaming.svg",
    tags: ["Next.js", "Three.js", "GSAP", "Tailwind", "React"],
    category: "E-Commerce",
    link: "https://vxr-gaming.vercel.app",
    github: "https://github.com/Vishal-coder22/vxr-gaming-website",
    videoUrl: "https://drive.google.com/file/d/1XMGDNy7pfkEySsuTTBN9BVQF-Ywkj7Yq/preview",
    color: "#00D4FF",
  },
  {
    slug: "tadka-restaurant",
    title: "Tadka Restaurant",
    description: "Modern restaurant landing page with immersive menu browsing",
    longDescription:
      "A visually rich restaurant landing page featuring a curated menu showcase, branch locations with interactive maps, customer testimonials, and a seamless reservation flow. Built with Next.js and Framer Motion.",
    image: "/images/projects/tadka-restaurant.svg",
    tags: ["Next.js", "Framer Motion", "Tailwind", "Maps API"],
    category: "Landing Page",
    link: "https://tadka.vercel.app",
    github: "",
    videoUrl: "https://drive.google.com/file/d/1vdgeNplzmEmVF6w_2znalYVBim9HJEW-/preview",
    color: "#FF6B35",
  },
  {
    slug: "agency-landing",
    title: "Apex Agency",
    description: "Creative agency portfolio with bold typography and scroll animations",
    longDescription:
      "A high-impact agency landing page showcasing services through cinematic scroll animations, marquee text effects, and a bold typographic system. Features GSAP-powered scroll-triggered reveals and a dynamic testimonial carousel.",
    image: "/images/projects/agency-landing.svg",
    tags: ["React", "GSAP", "Tailwind", "ScrollTrigger"],
    category: "Landing Page",
    link: "",
    github: "",
    videoUrl: "https://drive.google.com/file/d/1RDLmi86PF3onwKMVh7sSigWE_cCcW0lI/preview",
    color: "#F59E0B",
  },
  {
    slug: "cafe-landing",
    title: "Brew & Co",
    description: "Minimal cafe landing page with smooth scroll experience",
    longDescription:
      "A warm, inviting cafe landing page built with Vite and React. Features Lenis smooth scrolling, parallax sections, and a carefully crafted color palette that evokes the cozy atmosphere of a neighborhood coffee shop.",
    image: "/images/projects/cafe-landing.svg",
    tags: ["React", "Vite", "Lenis", "Tailwind"],
    category: "Landing Page",
    link: "",
    github: "",
    videoUrl: "https://drive.google.com/file/d/1sE9T7fSKWFqfQaZxvQGUsK8Z_sIQpFip/preview",
    color: "#D4A574",
  },
  {
    slug: "luxury-realty",
    title: "Luxury Realty",
    description: "Premium real estate platform with immersive property showcases",
    longDescription:
      "A luxury real estate listing platform featuring high-resolution property galleries, neighborhood analytics, and GSAP-powered scroll animations. Built to feel as premium as the properties it showcases.",
    image: "/images/projects/luxury-realty.svg",
    tags: ["React", "GSAP", "Lenis", "Tailwind"],
    category: "Landing Page",
    link: "",
    github: "",
    videoUrl: "https://drive.google.com/file/d/1SwV0VWyISmY1FHcoCoX__qwrCjaG4Baj/preview",
    color: "#C9A96E",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
