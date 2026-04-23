import { Link } from "react-router-dom";
import { ArrowRight, Users, Calendar, Globe, Play, Clock, Sparkles, User, Mail, MessageSquare, Briefcase, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { events } from "@/data/events";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Index = () => {
  const upcoming = events.slice(0, 3);
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState({
    days: 270,
    hours: 8,
    minutes: 43,
    seconds: 4,
  });
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [contactFeedback, setContactFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactFeedback(null);

    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setContactFeedback({
        type: "error",
        message: "Please fill in your name, email, and message.",
      });
      toast({
        title: "Missing fields",
        description: "Please fill in your name, email, and message.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmittingContact(true);

      const response = await fetch(`${API_URL}/contact-messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send message");
      }

      toast({
        title: "Message sent",
        description: "Thanks for contacting us. We will reach out soon.",
      });
      setContactFeedback({
        type: "success",
        message: "Message sent successfully. Our team will contact you soon.",
      });

      setContactForm({ name: "", email: "", message: "" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to send message";
      setContactFeedback({
        type: "error",
        message,
      });
      toast({
        title: "Submission failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmittingContact(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <Navbar />

      <section className="relative overflow-hidden min-h-screen flex items-center bg-background">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 w-[32rem] h-[32rem] -translate-x-1/2 -translate-y-1/2 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute left-1/2 top-1/2 w-[28rem] h-[28rem] -translate-x-1/2 -translate-y-1/2 bg-accent/8 rounded-full blur-3xl animate-pulse" />
          <div className="absolute left-1/2 top-1/2 w-[24rem] h-[24rem] -translate-x-1/2 -translate-y-1/2 bg-secondary/8 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="container mx-auto px-6 py-32 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/8 border border-primary/30 backdrop-blur-sm mb-8">
              <Sparkles size={16} className="text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Professional Conference Platform</span>
            </div>

            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground mb-6 tracking-tight">
              <span className="text-primary">Discover</span> events that inspire and transform
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground font-normal max-w-3xl mx-auto mb-12 leading-relaxed">
              Connect with industry leaders, network with professionals, and attend world-class conferences that shape the future. Your next opportunity awaits.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-20">
              <Link to="/events">
                <Button
                  size="lg"
                  className="rounded-lg px-8 py-6 text-base font-semibold gap-3 bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-white"
                >
                  Explore Events <ArrowRight size={18} />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="rounded-lg px-8 py-6 text-base font-semibold gap-3 border-2 border-primary text-primary hover:bg-primary/5 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Play size={18} /> Learn More
              </Button>
            </div>

            <div className="glass rounded-2xl p-8 mb-12 max-w-2xl mx-auto shadow-lg border border-border/50">
              <h3 className="text-xl font-semibold text-foreground mb-4">Upcoming Major Conference</h3>
              <div className="flex justify-center items-center gap-3 text-lg text-muted-foreground font-semibold mb-2">
                <Clock size={20} className="text-primary" />
                <span className="font-mono text-2xl font-bold text-primary tracking-wide">
                  {timeLeft.days}d {timeLeft.hours.toString().padStart(2, "0")}h {timeLeft.minutes.toString().padStart(2, "0")}m {timeLeft.seconds.toString().padStart(2, "0")}s
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Calendar, label: "Conferences", value: "150+" },
                { icon: Users, label: "Attendees", value: "10K+" },
                { icon: Globe, label: "Countries", value: "30+" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-all duration-300">
                      <stat.icon size={32} className="text-primary" />
                    </div>
                  </div>
                  <p className="font-heading text-4xl font-bold text-foreground mb-2">{stat.value}</p>
                  <p className="text-muted-foreground font-semibold text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">Upcoming Events</h2>
            <p className="text-muted-foreground text-lg">Curated experiences for builders, creators, and leaders.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
            {upcoming.map((event, index) => (
              <div key={event.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-fadeInUp">
                <EventCard event={event} />
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/events">
              <Button
                size="lg"
                className="rounded-lg px-10 py-6 text-base font-semibold gap-3 bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-white"
              >
                View All Events <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">Our Purpose</h2>
            <p className="text-muted-foreground text-lg">Building a platform that connects minds and accelerates innovation.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { title: "Mission", desc: "Build a global community where collaboration fuels innovation.", icon: "🎯" },
              { title: "Vision", desc: "Connect brilliant minds and accelerate meaningful change.", icon: "🌍" },
              { title: "Impact", desc: "Create unforgettable experiences that empower professionals.", icon: "⚡" },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative overflow-hidden p-8 rounded-xl bg-card border border-border shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all duration-300"
              >
                <div className="relative z-10">
                  <div className="text-4xl font-bold text-primary mb-4 transition-transform duration-300 group-hover:scale-110">{item.icon}</div>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-normal">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">Get In Touch</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Questions about conferences? We're here to help.</p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8 items-start">
              <div className="lg:col-span-3 rounded-xl border border-border bg-background shadow-card p-6 md:p-8">
                <h3 className="font-heading text-2xl font-semibold text-foreground mb-6">Send A Message</h3>
                <form className="space-y-5" onSubmit={handleContactSubmit}>
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-2">Name</label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Your full name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                        className="input-field pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                        className="input-field pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <div className="relative">
                      <MessageSquare size={18} className="absolute left-3 top-4 text-muted-foreground" />
                      <textarea
                        id="contact-message"
                        rows={5}
                        required
                        placeholder="Write your message..."
                        value={contactForm.message}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                        className="input-field pl-10 resize-none"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmittingContact}
                    className="w-full md:w-auto px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold shadow-lg disabled:opacity-50"
                  >
                      {isSubmittingContact ? "Sending..." : "Contact Us"}
                  </Button>
                  {contactFeedback && (
                    <p
                      className={`text-sm font-medium ${
                        contactFeedback.type === "success" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {contactFeedback.message}
                    </p>
                  )}
                </form>
              </div>

              <div className="lg:col-span-2 rounded-xl border border-border bg-card shadow-card p-6 md:p-8">
                <h3 className="font-heading text-2xl font-semibold mb-6 text-foreground">Team Members</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  {[
                    { name: "Shishir Joshi", role: "UI/UX Designer & Frontend Developer", github: "https://github.com/ShishirJoshi" },
                    { name: "Nabin Dhakal", role: "Backend Developer", github: "https://github.com/NabinDhakal" },
                    { name: "Amshika Bhushal", role: "Project Manager / Content Strategist", github: "https://github.com/AmshikaBhushal" },
                  ].map((member) => (
                    <a
                      key={member.name}
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-lg border border-border bg-background p-5 shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-all duration-300">
                          <Briefcase size={18} className="text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground text-lg leading-tight group-hover:text-primary transition-colors duration-300">{member.name}</h4>
                          <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{member.role}</p>
                        </div>
                        <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors duration-300 flex-shrink-0 mt-1" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
