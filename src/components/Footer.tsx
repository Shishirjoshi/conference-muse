import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Send, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <>
      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary/90 to-accent">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Join our newsletter for event important announcement
            </h2>
            <p className="text-white/90 text-lg mb-8 leading-relaxed">
              Stay informed with instant updates delivered straight to your inbox. Experience a world-class conference designed to inspire innovation, empower professionals, and connect leaders from around the globe.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
              />
              <Button className="bg-white text-primary hover:bg-white/90 gap-2 px-6">
                Subscribe <Send size={16} />
              </Button>
            </div>

            <div className="flex justify-center gap-6">
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-6 py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <span className="font-heading text-sm font-bold text-primary-foreground">CH</span>
                </div>
                <span className="font-heading text-xl font-semibold text-foreground">ConferenceHub</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Experience a powerful gathering of visionaries, creators, and industry experts united by one goal—exchanging ideas that spark growth, innovation, and meaningful change.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-6">Quick Links</h4>
              <div className="flex flex-col gap-3">
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link>
                <Link to="/conferences" className="text-sm text-muted-foreground hover:text-primary transition-colors">Conferences</Link>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">Dashboard</Link>
                <Link to="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">Login</Link>
              </div>
            </div>

            {/* Schedules */}
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-6">Schedules</h4>
              <div className="flex flex-col gap-3">
                <Link to="/conferences" className="text-sm text-muted-foreground hover:text-primary transition-colors">Future Finance</Link>
                <Link to="/conferences" className="text-sm text-muted-foreground hover:text-primary transition-colors">Tech Innovators</Link>
                <Link to="/conferences" className="text-sm text-muted-foreground hover:text-primary transition-colors">Sustainable Business</Link>
                <Link to="/conferences" className="text-sm text-muted-foreground hover:text-primary transition-colors">International Productivity</Link>
                <Link to="/conferences" className="text-sm text-muted-foreground hover:text-primary transition-colors">Creative Entrepreneurship</Link>
              </div>
            </div>

            {/* Get In Touch */}
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-6">Get In Touch</h4>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone size={16} className="text-primary" />
                  <span>+00 123 456 789</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail size={16} className="text-primary" />
                  <span>support@domainname.com</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <MapPin size={16} className="text-primary mt-0.5" />
                  <span>45/2 Central Business Innovation Near International Trade Tower</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-border pt-8 text-center">
            <p className="text-xs text-muted-foreground">
              Copyright © 2026 All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
