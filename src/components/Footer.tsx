import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mail, MapPin, Phone, Send, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate("/#contact");
      return;
    }

    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Newsletter Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl -mb-36" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Stay Informed
            </h2>
            <p className="text-white/90 text-lg mb-10 leading-relaxed font-normal">
              Subscribe to get notified about upcoming conferences, exclusive announcements, and industry insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-10">
              <Input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white/15 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 focus:bg-white/20 rounded-lg backdrop-blur-sm text-base py-3"
              />
              <Button className="bg-white text-primary hover:bg-white/90 gap-2 px-6 rounded-lg font-semibold text-base py-3 shadow-lg hover:shadow-xl transition-all duration-300">
                Subscribe <Send size={16} />
              </Button>
            </div>

            <div className="flex justify-center gap-4">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-300 border border-white/20 backdrop-blur-sm"
                  title={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-6 py-20">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5 mb-16">
            {/* Brand */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg">
                  <span className="font-heading text-base font-bold text-white leading-none">E</span>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-heading text-xl font-bold text-primary">EventHub</span>
                  <span className="text-xs font-semibold text-muted-foreground">Professional Events</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-normal">
                Connecting professionals through world-class conferences, seminars, and networking events that drive innovation and meaningful business relationships.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-bold text-foreground mb-6 text-lg">Useful Links</h4>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Home", to: "/" },
                  { label: "Events", to: "/events" },
                  { label: "Dashboard", to: "/dashboard" },
                  { label: "Login", to: "/login" },
                ].map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 font-medium flex items-center gap-2 group"
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary transition-all duration-300" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Featured Events */}
            <div>
              <h4 className="font-heading font-bold text-foreground mb-6 text-lg">Featured Events</h4>
              <div className="flex flex-col gap-3">
                {[
                  "Future Finance Forum",
                  "Tech Innovators Summit",
                  "Sustainable Business",
                  "Digital Leadership",
                ].map((event) => (
                  <Link
                    key={event}
                    to="/events"
                    className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 font-medium flex items-center gap-2 group"
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary transition-all duration-300" />
                    {event}
                  </Link>
                ))}
              </div>
            </div>

            {/* Get In Touch */}
            <div>
              <h4 className="font-heading font-bold text-foreground mb-6 text-lg">Get In Touch</h4>
              <div className="flex flex-col gap-5">
                <a
                  href="tel:+9770000000000"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-all duration-300 font-medium group"
                >
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/30 group-hover:bg-primary/20 transition-all duration-300">
                    <Phone size={16} className="text-primary" />
                  </div>
                  <span>+977**********</span>
                </a>
                <div className="flex items-start gap-3 text-sm text-muted-foreground font-medium group">
                  <div className="p-2 rounded-lg bg-accent/10 border border-accent/30 group-hover:bg-accent/20 transition-all duration-300 mt-0.5">
                    <Mail size={16} className="text-accent" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <a href="mailto:shishirjoshi65@gmail.com" className="hover:text-primary transition-all duration-300">shishirjoshi65@gmail.com</a>
                    <a href="mailto:nabindakal@gmail.com" className="hover:text-primary transition-all duration-300">nabindakal@gmail.com</a>
                    <a href="mailto:amshika@gmail.com" className="hover:text-primary transition-all duration-300">amshika@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium group">
                  <div className="p-2 rounded-lg bg-accent/10 border border-accent/30 group-hover:bg-accent/20 transition-all duration-300">
                    <MapPin size={16} className="text-accent" />
                  </div>
                  <span>Kathmandu, Nepal</span>
                </div>
              </div>
            </div>

            {/* UML Diagram */}
            <div>
              <h4 className="font-heading font-bold text-foreground mb-6 text-lg">Project Docs</h4>
              <div className="rounded-xl border border-border/50 bg-muted/20 p-4 space-y-3">
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  Explore architecture diagrams for this project including component, class, and sequence UML views.
                </p>
                <Link to="/uml-diagram" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                  Open UML Diagram Page
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-border/30 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-xs text-muted-foreground font-medium">
              Copyright © 2026 EventHub. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="#" className="text-xs text-muted-foreground hover:text-primary transition-colors font-medium">
                Privacy Policy
              </Link>
              <span className="text-border">•</span>
              <Link to="#" className="text-xs text-muted-foreground hover:text-primary transition-colors font-medium">
                Terms of Service
              </Link>
              <span className="text-border">•</span>
              <a href="/#contact" onClick={handleContactClick} className="text-xs text-muted-foreground hover:text-primary transition-colors font-medium">
                Contact Us
              </a>
              <span className="text-border">•</span>
              <Link to="/uml-diagram" className="text-xs text-muted-foreground hover:text-primary transition-colors font-medium">
                UML Diagram
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
