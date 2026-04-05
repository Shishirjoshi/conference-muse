import { Link } from "react-router-dom";
import { ArrowRight, Users, Calendar, Globe, Play, Clock, Sparkles, User, Mail, MessageSquare, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { events } from "@/data/events";
import { useState, useEffect } from "react";

const Index = () => {
  const upcoming = events.slice(0, 3);
  const [timeLeft, setTimeLeft] = useState({
    days: 270,
    hours: 8,
    minutes: 43,
    seconds: 4,
  });

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="container mx-auto px-6 py-32 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm mb-8">
              <Sparkles size={18} className="text-primary" />
              <span className="text-sm font-semibold text-primary">Welcome to EventHub</span>
            </div>

            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground mb-8 tracking-tight">
              <span className="gradient-text">Connecting minds</span> to shape tomorrow's big ideas
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-3xl mx-auto mb-12 leading-relaxed">
              Join thousands of innovators, leaders, and visionaries at inspiring conferences that spark transformation and create lasting connections.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-20">
              <Link to="/events">
                <Button
                  size="lg"
                  className="rounded-full px-10 py-6 text-lg font-bold gap-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 btn-shine text-white"
                >
                  Explore Events <ArrowRight size={20} />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-10 py-6 text-lg font-bold gap-3 border-2 border-primary text-primary hover:bg-primary/10 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <Play size={20} /> Watch Video
              </Button>
            </div>

            <div className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl rounded-3xl p-10 mb-12 max-w-3xl mx-auto border border-border/50 shadow-2xl">
              <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 tracking-tight">Next Major Event In</h3>
              <div className="flex justify-center items-center gap-3 text-lg text-muted-foreground font-semibold mb-4">
                <Clock size={22} className="text-primary" />
                <span className="font-mono text-2xl font-bold text-foreground tracking-wide">
                  {timeLeft.days}d {timeLeft.hours.toString().padStart(2, "0")}h {timeLeft.minutes.toString().padStart(2, "0")}m {timeLeft.seconds.toString().padStart(2, "0")}s
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { icon: Calendar, label: "Events", value: "150+" },
                { icon: Users, label: "Attendees", value: "10K+" },
                { icon: Globe, label: "Countries", value: "30+" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-8 rounded-2xl bg-gradient-to-br from-card to-card/80 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                      <stat.icon size={36} className="text-primary" />
                    </div>
                  </div>
                  <p className="font-heading text-5xl font-bold text-foreground mb-2">{stat.value}</p>
                  <p className="text-muted-foreground font-semibold">{stat.label}</p>
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
                className="rounded-full px-12 py-6 text-lg font-bold gap-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 text-white"
              >
                View All Events <ArrowRight size={22} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">Mission, Vission and Goal</h2>
            <p className="text-muted-foreground text-lg">Driving innovation and global connection through impactful events.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { title: "Mission", desc: "Build a global community where collaboration fuels innovation.", icon: "Mission" },
              { title: "Vission", desc: "Connect brilliant minds and accelerate meaningful change.", icon: "Vission" },
              { title: "Goal", desc: "Create unforgettable experiences that empower professionals.", icon: "Goal" },
            ].map((item, i) => (
              <div key={i} className="p-10 rounded-2xl bg-gradient-to-br from-card to-card/80 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold text-primary mb-6">{item.icon}</div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-950 text-slate-100">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">Contact Us</h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">Let&apos;s discuss your next conference collaboration and build something remarkable together.</p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8 items-start">
              <div className="lg:col-span-3 rounded-2xl border border-slate-800 bg-slate-900/70 shadow-2xl p-6 md:p-8">
                <h3 className="font-heading text-2xl font-semibold mb-6">Send A Message</h3>
                <form className="space-y-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="Your full name"
                        className="w-full rounded-xl border border-slate-700 bg-slate-950/80 pl-10 pr-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="you@company.com"
                        className="w-full rounded-xl border border-slate-700 bg-slate-950/80 pl-10 pr-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                    <div className="relative">
                      <MessageSquare size={18} className="absolute left-3 top-4 text-slate-500" />
                      <textarea
                        id="contact-message"
                        rows={5}
                        placeholder="Write your message..."
                        className="w-full rounded-xl border border-slate-700 bg-slate-950/80 pl-10 pr-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-primary transition-all resize-none"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full md:w-auto px-8 py-3 text-white bg-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20">
                    Submit Message
                  </Button>
                </form>
              </div>

              <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-2xl p-6 md:p-8">
                <h3 className="font-heading text-2xl font-semibold mb-6">Team Members</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  {[
                    { name: "Shishir Joshi", role: "UI/UX Designer & Frontend Developer" },
                    { name: "Nabin Dhakal", role: "Backend Developer" },
                    { name: "Amshika Bhushal", role: "Project Manager / Content Strategist" },
                  ].map((member) => (
                    <article
                      key={member.name}
                      className="rounded-xl border border-slate-700/80 bg-slate-950/60 p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/15 border border-primary/20">
                          <Briefcase size={18} className="text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-100 text-lg leading-tight">{member.name}</h4>
                          <p className="text-slate-400 mt-1 text-sm leading-relaxed">{member.role}</p>
                        </div>
                      </div>
                    </article>
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
