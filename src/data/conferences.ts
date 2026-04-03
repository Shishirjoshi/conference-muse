export interface Speaker {
  name: string;
  role: string;
  avatar: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  speaker?: string;
}

export interface Conference {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  mode: "Online" | "Offline" | "Hybrid";
  description: string;
  longDescription: string;
  image: string;
  speakers: Speaker[];
  schedule: ScheduleItem[];
}

export const conferences: Conference[] = [
  {
    id: "1",
    title: "Future of AI Summit 2026",
    date: "May 15–16, 2026",
    location: "San Francisco, CA",
    category: "Technology",
    mode: "Hybrid",
    description: "Explore the cutting-edge advancements in artificial intelligence with world-class researchers.",
    longDescription: "Join 2,000+ innovators, researchers, and industry leaders for two days of deep-dive sessions into generative AI, machine learning infrastructure, and ethical AI governance. Featuring hands-on workshops, live demos, and networking events.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
    speakers: [
      { name: "Dr. Sarah Chen", role: "AI Research Lead, DeepMind", avatar: "SC" },
      { name: "James Mitchell", role: "CTO, NeuralPath", avatar: "JM" },
      { name: "Priya Sharma", role: "ML Engineer, OpenAI", avatar: "PS" },
    ],
    schedule: [
      { time: "9:00 AM", title: "Registration & Breakfast" },
      { time: "10:00 AM", title: "Opening Keynote: The State of AI", speaker: "Dr. Sarah Chen" },
      { time: "11:30 AM", title: "Workshop: Building with LLMs", speaker: "Priya Sharma" },
      { time: "1:00 PM", title: "Lunch Break" },
      { time: "2:00 PM", title: "Panel: Ethics in AI" },
      { time: "3:30 PM", title: "Networking Session" },
      { time: "4:30 PM", title: "Closing Remarks", speaker: "James Mitchell" },
    ],
  },
  {
    id: "2",
    title: "Design Systems Conference",
    date: "June 8–9, 2026",
    location: "New York, NY",
    category: "Design",
    mode: "Offline",
    description: "Learn how top companies build and scale design systems for consistency and speed.",
    longDescription: "A two-day immersive experience into the world of design systems. Learn from teams at Spotify, Airbnb, and Google as they share practical strategies for building, maintaining, and evolving design systems at scale.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
    speakers: [
      { name: "Emma Liu", role: "Design Lead, Spotify", avatar: "EL" },
      { name: "Marcus Johnson", role: "Sr. Designer, Airbnb", avatar: "MJ" },
    ],
    schedule: [
      { time: "9:30 AM", title: "Doors Open" },
      { time: "10:00 AM", title: "Keynote: Why Design Systems Matter", speaker: "Emma Liu" },
      { time: "11:30 AM", title: "Case Study: Airbnb's Design Language", speaker: "Marcus Johnson" },
      { time: "1:00 PM", title: "Lunch" },
      { time: "2:30 PM", title: "Workshop: Tokens & Theming" },
      { time: "4:00 PM", title: "Q&A Panel" },
    ],
  },
  {
    id: "3",
    title: "Cloud Native Days",
    date: "July 20–22, 2026",
    location: "Austin, TX",
    category: "Technology",
    mode: "Online",
    description: "Deep dive into Kubernetes, microservices, and cloud-native architecture patterns.",
    longDescription: "Three days of intensive learning about cloud-native technologies. From Kubernetes operators to service mesh, from CI/CD pipelines to observability — everything you need to build resilient, scalable systems.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
    speakers: [
      { name: "Alex Rivera", role: "Platform Eng, Google", avatar: "AR" },
      { name: "Nina Kowalski", role: "DevOps Lead, HashiCorp", avatar: "NK" },
      { name: "Raj Patel", role: "SRE, Netflix", avatar: "RP" },
    ],
    schedule: [
      { time: "10:00 AM", title: "Welcome & Intro" },
      { time: "10:30 AM", title: "Kubernetes at Scale", speaker: "Alex Rivera" },
      { time: "12:00 PM", title: "Break" },
      { time: "1:00 PM", title: "Service Mesh Deep Dive", speaker: "Nina Kowalski" },
      { time: "2:30 PM", title: "Observability Workshop", speaker: "Raj Patel" },
      { time: "4:00 PM", title: "Lightning Talks" },
    ],
  },
  {
    id: "4",
    title: "Product Leadership Forum",
    date: "August 5, 2026",
    location: "London, UK",
    category: "Business",
    mode: "Offline",
    description: "Strategies for product managers to drive growth, innovation, and team alignment.",
    longDescription: "A one-day intensive forum for senior product managers and directors. Learn frameworks for prioritization, stakeholder alignment, and data-driven decision making from leaders at top tech companies.",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=400&fit=crop",
    speakers: [
      { name: "Laura Kim", role: "VP Product, Stripe", avatar: "LK" },
      { name: "David Osei", role: "CPO, Notion", avatar: "DO" },
    ],
    schedule: [
      { time: "9:00 AM", title: "Registration" },
      { time: "9:30 AM", title: "Keynote: Product-Led Growth", speaker: "Laura Kim" },
      { time: "11:00 AM", title: "Workshop: OKR Alignment" },
      { time: "12:30 PM", title: "Lunch & Networking" },
      { time: "2:00 PM", title: "Fireside Chat", speaker: "David Osei" },
      { time: "3:30 PM", title: "Closing Panel" },
    ],
  },
  {
    id: "5",
    title: "HealthTech Innovation Summit",
    date: "September 12–13, 2026",
    location: "Boston, MA",
    category: "Healthcare",
    mode: "Hybrid",
    description: "Where technology meets healthcare — exploring digital health, AI diagnostics, and telemedicine.",
    longDescription: "Bringing together healthcare professionals, technologists, and researchers to discuss the future of digital health. Topics include AI-powered diagnostics, remote patient monitoring, health data interoperability, and regulatory frameworks.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop",
    speakers: [
      { name: "Dr. Amy Foster", role: "CMO, HealthAI", avatar: "AF" },
      { name: "Tom Nguyen", role: "CEO, MedConnect", avatar: "TN" },
    ],
    schedule: [
      { time: "8:30 AM", title: "Breakfast & Networking" },
      { time: "9:30 AM", title: "Keynote: AI in Diagnostics", speaker: "Dr. Amy Foster" },
      { time: "11:00 AM", title: "Panel: Telemedicine Post-Pandemic" },
      { time: "12:30 PM", title: "Lunch" },
      { time: "2:00 PM", title: "Demo: Remote Monitoring Platform", speaker: "Tom Nguyen" },
      { time: "3:30 PM", title: "Regulatory Roundtable" },
    ],
  },
  {
    id: "6",
    title: "Creative Code Festival",
    date: "October 1–3, 2026",
    location: "Berlin, Germany",
    category: "Design",
    mode: "Offline",
    description: "Art, code, and everything in between — a festival celebrating creative technology.",
    longDescription: "Three days of installations, performances, workshops, and talks at the intersection of art and technology. Experience generative art, creative coding with p5.js, interactive installations, and more.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=400&fit=crop",
    speakers: [
      { name: "Zara Ahmed", role: "Creative Technologist", avatar: "ZA" },
      { name: "Felix Braun", role: "Generative Artist", avatar: "FB" },
    ],
    schedule: [
      { time: "11:00 AM", title: "Festival Opens" },
      { time: "12:00 PM", title: "Talk: The Art of Algorithms", speaker: "Felix Braun" },
      { time: "2:00 PM", title: "Workshop: Creative Coding with p5.js", speaker: "Zara Ahmed" },
      { time: "4:00 PM", title: "Live Coding Performance" },
      { time: "6:00 PM", title: "Gallery Opening & Drinks" },
    ],
  },
];

export const categories = ["All", "Technology", "Design", "Business", "Healthcare"];
