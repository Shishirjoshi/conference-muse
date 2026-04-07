export interface Speaker {
  name: string;
  role: string;
  avatar: string;
  image?: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  speaker?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  mode: "Online" | "Offline" | "Hybrid";
  description: string;
  longDescription: string;
  image: string;
  bannerImage?: string;
  galleryImages?: string[];
  speakers: Speaker[];
  schedule: ScheduleItem[];
}

export const events: Event[] = [
  {
    id: "1",
    title: "Nepal AI and Data Summit 2026",
    date: "May 22–23, 2026",
    location: "Kathmandu, Nepal",
    category: "Technology",
    mode: "Hybrid",
    description: "Explore practical AI adoption in Nepal with researchers, startups, and public-sector innovators.",
    longDescription: "Join technologists, researchers, and founders from across Nepal for two days of deep-dive sessions on generative AI, machine learning operations, and responsible AI policy. The summit includes live demos, hands-on workshops, and high-impact networking tailored for the Nepali tech ecosystem.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop"
    ],
    speakers: [
      { name: "Dr. Suman Adhikari", role: "AI Research Director, NAAMII", avatar: "SA", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" },
      { name: "Riya Shrestha", role: "CTO, Yarsa Labs", avatar: "RS", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
      { name: "Prabesh Karki", role: "ML Engineer, Deerwalk", avatar: "PK", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
    ],
    schedule: [
      { time: "8:30 AM", title: "Registration and Tea" },
      { time: "9:30 AM", title: "Opening Keynote: AI in Nepal", speaker: "Dr. Suman Adhikari" },
      { time: "11:00 AM", title: "Workshop: Building Nepali Language Assistants", speaker: "Prabesh Karki" },
      { time: "12:30 PM", title: "Lunch Break" },
      { time: "1:30 PM", title: "Panel: Responsible AI for Public Services" },
      { time: "3:00 PM", title: "Startup Demo Session" },
      { time: "4:15 PM", title: "Closing Remarks", speaker: "Riya Shrestha" },
    ],
  },
  {
    id: "2",
    title: "Himalayan Design Systems Conference",
    date: "June 14–15, 2026",
    location: "Lalitpur, Nepal",
    category: "Design",
    mode: "Offline",
    description: "Learn how Nepali product teams build scalable design systems for local and global users.",
    longDescription: "A two-day immersive conference focused on design systems, accessibility, and UX consistency for fast-growing teams in Nepal. Product designers, frontend developers, and design leaders share practical methods for creating and scaling design foundations.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=600&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop"
    ],
    speakers: [
      { name: "Anisha Maharjan", role: "Design Lead, F1Soft", avatar: "AM", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face" },
      { name: "Bikash Shakya", role: "Senior Product Designer, Leapfrog", avatar: "BS", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
    ],
    schedule: [
      { time: "9:00 AM", title: "Doors Open" },
      { time: "9:45 AM", title: "Keynote: Why Design Systems Matter", speaker: "Anisha Maharjan" },
      { time: "11:15 AM", title: "Case Study: Building for Fintech in Nepal", speaker: "Bikash Shakya" },
      { time: "12:45 PM", title: "Lunch" },
      { time: "2:00 PM", title: "Workshop: Tokens and Theming" },
      { time: "3:45 PM", title: "Q&A Panel" },
    ],
  },
  {
    id: "3",
    title: "Nepal Cloud Native Days",
    date: "July 19–21, 2026",
    location: "Online from Kathmandu",
    category: "Technology",
    mode: "Online",
    description: "Deep dive into Kubernetes, DevOps, and cloud-native architecture with Nepal-based engineering teams.",
    longDescription: "Three days of practical cloud-native learning for developers and SRE teams in Nepal. Sessions cover Kubernetes operations, CI/CD workflows, observability, and platform engineering with examples from local startups and enterprise systems.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop"
    ],
    speakers: [
      { name: "Aayush Regmi", role: "Platform Engineer, Cotiviti Nepal", avatar: "AR", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
      { name: "Nisha Gautam", role: "DevOps Lead, Logpoint Nepal", avatar: "NG", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face" },
      { name: "Ritesh Poudel", role: "SRE, CloudFactory", avatar: "RP", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face" },
    ],
    schedule: [
      { time: "10:00 AM", title: "Welcome and Intro" },
      { time: "10:30 AM", title: "Kubernetes at Scale", speaker: "Aayush Regmi" },
      { time: "12:00 PM", title: "Break" },
      { time: "1:00 PM", title: "Service Mesh Deep Dive", speaker: "Nisha Gautam" },
      { time: "2:30 PM", title: "Observability Workshop", speaker: "Ritesh Poudel" },
      { time: "4:00 PM", title: "Lightning Talks" },
    ],
  },
  {
    id: "4",
    title: "Product Leadership Nepal Forum",
    date: "August 9, 2026",
    location: "Pokhara, Nepal",
    category: "Business",
    mode: "Offline",
    description: "Strategies for product managers in Nepal to drive growth, innovation, and team alignment.",
    longDescription: "A one-day intensive forum for product managers and startup leaders from across Nepal. Learn practical frameworks for prioritization, stakeholder management, and data-informed decisions in local and regional markets.",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=400&fit=crop",
    speakers: [
      { name: "Laxmi K.C.", role: "VP Product, Khalti", avatar: "LK" },
      { name: "Dipesh Ojha", role: "Chief Product Officer, eSewa", avatar: "DO" },
    ],
    schedule: [
      { time: "8:45 AM", title: "Registration" },
      { time: "9:30 AM", title: "Keynote: Product-Led Growth in Nepal", speaker: "Laxmi K.C." },
      { time: "11:00 AM", title: "Workshop: OKR Alignment" },
      { time: "12:30 PM", title: "Lunch and Networking" },
      { time: "2:00 PM", title: "Fireside Chat", speaker: "Dipesh Ojha" },
      { time: "3:30 PM", title: "Closing Panel" },
    ],
  },
  {
    id: "5",
    title: "Nepal HealthTech Innovation Summit",
    date: "September 18–19, 2026",
    location: "Bharatpur, Nepal",
    category: "Healthcare",
    mode: "Hybrid",
    description: "Where technology meets healthcare in Nepal, with focus on digital health and telemedicine access.",
    longDescription: "Bringing together hospitals, health startups, and policy makers to discuss Nepal's digital health future. Topics include AI-assisted diagnostics, remote patient monitoring for rural communities, and interoperable health records.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop",
    speakers: [
      { name: "Dr. Aakriti Basnet", role: "CMO, Nepal Digital Health Hub", avatar: "AB" },
      { name: "Tenzin Nyima", role: "CEO, MedConnect Nepal", avatar: "TN" },
    ],
    schedule: [
      { time: "8:30 AM", title: "Breakfast and Networking" },
      { time: "9:30 AM", title: "Keynote: AI in Diagnostics for Nepal", speaker: "Dr. Aakriti Basnet" },
      { time: "11:00 AM", title: "Panel: Telemedicine for Rural Communities" },
      { time: "12:30 PM", title: "Lunch" },
      { time: "2:00 PM", title: "Demo: Remote Monitoring Platform", speaker: "Tenzin Nyima" },
      { time: "3:30 PM", title: "Regulatory Roundtable" },
    ],
  },
  {
    id: "6",
    title: "Creative Code Nepal Festival",
    date: "October 4–6, 2026",
    location: "Bhaktapur, Nepal",
    category: "Design",
    mode: "Offline",
    description: "Art, code, and culture in one place, celebrating creative technology in Nepal.",
    longDescription: "Three days of installations, performances, workshops, and talks at the intersection of art and technology. Experience generative art, live coding, and interactive exhibits inspired by Nepali culture and design.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=400&fit=crop",
    speakers: [
      { name: "Zoya Adhikari", role: "Creative Technologist", avatar: "ZA" },
      { name: "Furba Bhutia", role: "Generative Artist", avatar: "FB" },
    ],
    schedule: [
      { time: "11:00 AM", title: "Festival Opens" },
      { time: "12:00 PM", title: "Talk: The Art of Algorithms", speaker: "Furba Bhutia" },
      { time: "2:00 PM", title: "Workshop: Creative Coding with p5.js", speaker: "Zoya Adhikari" },
      { time: "4:00 PM", title: "Live Coding Performance" },
      { time: "6:00 PM", title: "Gallery Opening and Music" },
    ],
  },
];

export const categories = ["All", "Technology", "Design", "Business", "Healthcare"];
