import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

declare global {
  interface Window {
    mermaid?: {
      initialize: (config: Record<string, unknown>) => void;
      run: (options?: { querySelector?: string; nodes?: NodeListOf<Element> }) => Promise<void>;
    };
  }
}

const diagrams = [
  {
    title: "Component Diagram",
    description: "Frontend, backend, authentication, and data layers.",
    code: `
flowchart TB
  Browser[Browser]
  FE[React SPA\nApp + Pages + Router]
  Auth[AuthContext\nProtectedRoute]
  Static[events.ts\nStatic Event Catalog]

  API[Express REST API]
  Jwt[JWT Service]
  DB[(SQLite Database)]
  Contact[Contact Messages]

  Browser --> FE
  FE --> Auth
  FE --> Static
  FE --> API
  API --> Jwt
  API --> DB
  API --> Contact
`,
  },
  {
    title: "Class Diagram",
    description: "Core project entities and relationships.",
    code: `
classDiagram
  class User {
    +int id
    +string email
    +string username
    +string password
    +string full_name
    +string role
  }

  class Booking {
    +int id
    +int user_id
    +string conference_id
    +string status
  }

  class ContactMessage {
    +int id
    +string name
    +string email
    +string message
    +datetime created_at
  }

  class Event {
    +string id
    +string title
    +string date
    +string location
    +string category
    +string mode
  }

  class AuthContext {
    +User user
    +string token
    +login(email, password)
    +logout()
    +verifyToken(token)
  }

  User "1" --> "*" Booking : owns
  Booking "*" --> "1" Event : references by conference_id
  AuthContext --> User : stores current user
`,
  },
  {
    title: "Login Sequence",
    description: "Authentication flow from UI to token storage.",
    code: `
sequenceDiagram
  participant U as User
  participant L as Login Page
  participant A as AuthContext
  participant R as /api/auth/login
  participant D as userQueries (DB)

  U->>L: Submit email/password
  L->>A: login(email, password)
  A->>R: POST /auth/login
  R->>D: findByEmail(email)
  D-->>R: user row
  R-->>A: token + user
  A-->>L: success
  A->>A: save token in localStorage
  L-->>U: Navigate to /dashboard
`,
  },
  {
    title: "Booking Sequence",
    description: "How user bookings are loaded in the dashboard.",
    code: `
sequenceDiagram
  participant U as User
  participant D as Dashboard Page
  participant API as /api/bookings
  participant MW as authMiddleware
  participant BQ as bookingQueries
  participant DB as SQLite

  U->>D: Open dashboard
  D->>API: GET /bookings (Bearer token)
  API->>MW: verify JWT
  MW-->>API: user payload
  API->>BQ: getByUserId(user.id)
  BQ->>DB: SELECT bookings
  DB-->>BQ: bookings rows
  BQ-->>API: bookings
  API-->>D: 200 { bookings }
  D-->>U: Render booking cards
`,
  },
];

const ensureMermaidLoaded = async () => {
  if (window.mermaid) return;

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Mermaid"));
    document.body.appendChild(script);
  });
};

const UmlDiagram = () => {
  useEffect(() => {
    let mounted = true;

    const renderDiagrams = async () => {
      try {
        await ensureMermaidLoaded();
        if (!mounted || !window.mermaid) return;

        window.mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose",
          theme: "base",
          themeVariables: {
            primaryColor: "#171f3a",
            primaryTextColor: "#e5e7eb",
            primaryBorderColor: "#5eead4",
            lineColor: "#6b7280",
            secondaryColor: "#0f172a",
            tertiaryColor: "#111827",
            noteBkgColor: "#0f172a",
            noteTextColor: "#d1d5db",
            actorBkg: "#172554",
            actorBorder: "#38bdf8",
            actorTextColor: "#e2e8f0",
          },
          flowchart: {
            useMaxWidth: true,
            curve: "basis",
            nodeSpacing: 50,
            rankSpacing: 55,
          },
          sequence: {
            useMaxWidth: true,
            actorMargin: 48,
            boxMargin: 12,
            messageMargin: 20,
          },
          class: {
            useMaxWidth: true,
          },
        });

        await window.mermaid.run({ querySelector: ".mermaid-diagram" });
      } catch (error) {
        console.error("Mermaid render failed:", error);
      }
    };

    renderDiagrams();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="container mx-auto px-6 py-16 flex-1">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Project UML Diagrams
          </h1>
          <p className="text-muted-foreground text-lg mb-10">
            Visual architecture and behavior diagrams for Conference Muse.
          </p>

          <div className="space-y-8">
            {diagrams.map((diagram) => (
              <section key={diagram.title} className="rounded-2xl border border-border bg-card p-6 shadow-card overflow-hidden">
                <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">{diagram.title}</h2>
                <p className="text-muted-foreground mb-6">{diagram.description}</p>
                <div className="uml-surface rounded-xl border border-border bg-background p-4 md:p-6">
                  <div className="mermaid-diagram">{diagram.code}</div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UmlDiagram;
