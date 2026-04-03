import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="font-heading text-sm font-bold text-primary-foreground">CH</span>
              </div>
              <span className="font-heading text-lg font-semibold text-foreground">ConferenceHub</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discover, explore, and register for the best conferences around the world.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link>
              <Link to="/conferences" className="text-sm text-muted-foreground hover:text-primary transition-colors">Conferences</Link>
              <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">Dashboard</Link>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail size={14} /> hello@conferencehub.com
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone size={14} /> +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={14} /> San Francisco, CA
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 ConferenceHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
