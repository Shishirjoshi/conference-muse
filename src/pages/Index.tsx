import { Link } from "react-router-dom";
import { ArrowRight, Users, Calendar, Globe, Play, Clock, Bell, MapPin, Sparkles } from "lucide-react";
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
    seconds: 4
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
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

      {/* Hero */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="container mx-auto px-6 py-32 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm mb-8">
              <Sparkles size={18} className="text-primary" />
              <span className="text-sm font-semibold text-primary">Welcome to Conference Muse</span>
            </div>

            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-foreground mb-8 tracking-tight">
              <span className="gradient-text">Connecting minds</span> to shape tomorrow's big ideas
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-3xl mx-auto mb-12 leading-relaxed">
              Join thousands of innovators, leaders, and visionaries at inspiring conferences that spark transformation and create lasting connections.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-20">
              <Link to="/events">
                <Button size="lg" className="rounded-full px-10 py-6 text-lg font-bold gap-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 btn-shine text-white">
                  Explore Events <ArrowRight size={20} />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-full px-10 py-6 text-lg font-bold gap-3 border-2 border-primary text-primary hover:bg-primary/10 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                <Play size={20} /> Watch Video
              </Button>
            </div>

            {/* Countdown Timer */}
            <div className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl rounded-3xl p-10 mb-12 max-w-3xl mx-auto border border-border/50 shadow-2xl">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 tracking-tight">Next Major Event In</h3>
                <div className="flex justify-center items-center gap-3 text-lg text-muted-foreground font-semibold mb-4">
                  <Clock size={22} className="text-primary" />
                  <span className="font-mono text-2xl font-bold text-foreground tracking-wide">{timeLeft.days}d {timeLeft.hours.toString().padStart(2, '0')}h {timeLeft.minutes.toString().padStart(2, '0')}m {timeLeft.seconds.toString().padStart(2, '0')}s</span>
                </div>
              </div>

              {/* Notification Categories */}
              <div className="flex flex-wrap justify-center gap-3 text-sm font-semibold">
                <span className="bg-gradient-to-r from-primary/20 to-primary/10 text-primary px-4 py-2 rounded-full border border-primary/30 backdrop-blur-sm">Updates</span>
                <span className="bg-gradient-to-r from-accent/20 to-accent/10 text-accent px-4 py-2 rounded-full border border-accent/30 backdrop-blur-sm">Announcements</span>
                <span className="bg-gradient-to-r from-green-500/20 to-green-500/10 text-green-600 px-4 py-2 rounded-full border border-green-500/30 backdrop-blur-sm">Workshops</span>
                <span className="bg-gradient-to-r from-blue-500/20 to-blue-500/10 text-blue-600 px-4 py-2 rounded-full border border-blue-500/30 backdrop-blur-sm">Live</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { icon: Calendar, label: "Events", value: "150+" },
                { icon: Users, label: "Attendees", value: "10K+" },
                { icon: Globe, label: "Countries", value: "30+" },
              ].map((stat, i) => (
                <div key={i} className="p-8 rounded-2xl bg-gradient-to-br from-card to-card/80 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                      <stat.icon size={36} className="text-primary" />
                    </div>
                  </div>
                  <p className="font-heading text-5xl font-black text-foreground mb-2">{stat.value}</p>
                  <p className="text-muted-foreground font-semibold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-40 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-5xl font-black leading-tight text-foreground mb-6 tracking-tight">
              Upcoming Events You Won't Want to Miss
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
              Discover our carefully curated selection of transformative conferences and seminars.
            </p>
          </div>

          {/* Schedule Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
            {upcoming.map((event, index) => (
              <div key={event.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-fadeInUp">
                <EventCard event={event} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/events">
              <Button size="lg" className="rounded-full px-12 py-6 text-lg font-bold gap-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 text-white">
                View All Events <ArrowRight size={22} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-40 bg-gradient-to-b from-primary/5 to-background relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-5xl font-black leading-tight text-foreground mb-6 tracking-tight">
              Our Story & Mission
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
              Driving innovation and fostering global connections through world-class events.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Our Mission",
                  desc: "Build a global community where collaboration fuels innovation. We encourage fresh thinking, spark inspiring dialogues, and create a space where ideas flourish.",
                  icon: "🎯"
                },
                {
                  title: "Our Vision",
                  desc: "Be the premier platform connecting minds worldwide, fostering innovation and driving meaningful change through transformative conferences.",
                  icon: "🌟"
                },
                {
                  title: "Our Goal",
                  desc: "Create unparalleled experiences empowering professionals, inspiring innovation, and building lasting connections that shape future industries.",
                  icon: "🚀"
                }
              ].map((item, i) => (
                <div key={i} className="p-10 rounded-2xl bg-gradient-to-br from-card to-card/80 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <div className="text-5xl mb-6">{item.icon}</div>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight text-foreground mb-6 tracking-normal">
              Core features that power our exceptional services
            </h2>
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="flex text-yellow-400 text-2xl">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="drop-shadow-lg">★</span>
                ))}
              </div>
              <span className="text-lg text-muted-foreground font-semibold tracking-wide">Our 4200 Review</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="text-center p-10 rounded-3xl bg-white/60 backdrop-blur-md border border-white/30 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <div className="w-20 h-20 bg-primary/15 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users size={40} className="text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4 tracking-wide">Expert Speakers</h3>
              <p className="text-muted-foreground leading-relaxed text-base font-medium">World-class industry leaders and innovators sharing cutting-edge insights and expertise.</p>
            </div>
            <div className="text-center p-10 rounded-3xl bg-white/60 backdrop-blur-md border border-white/30 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <div className="w-20 h-20 bg-accent/15 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Calendar size={40} className="text-accent" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4 tracking-wide">Diverse Schedule</h3>
              <p className="text-muted-foreground leading-relaxed text-base font-medium">Comprehensive programs covering multiple tracks and learning formats for all attendees.</p>
            </div>
            <div className="text-center p-10 rounded-3xl bg-white/60 backdrop-blur-md border border-white/30 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <div className="w-20 h-20 bg-green-500/15 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Globe size={40} className="text-green-500" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4 tracking-wide">Global Network</h3>
              <p className="text-muted-foreground leading-relaxed text-base font-medium">Connect with professionals from 30+ countries worldwide in our international community.</p>
            </div>
            <div className="text-center p-10 rounded-3xl bg-white/60 backdrop-blur-md border border-white/30 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <div className="w-20 h-20 bg-purple-500/15 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Bell size={40} className="text-purple-500" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4 tracking-wide">Live Updates</h3>
              <p className="text-muted-foreground leading-relaxed text-base font-medium">Real-time notifications and instant event announcements keep you informed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Advantages */}
      <section className="py-40 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight text-foreground mb-6 tracking-normal">
              Key advantages that ensure your events stand out
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="p-12 rounded-3xl bg-gradient-to-br from-blue-500/5 to-blue-500/10 border border-blue-500/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <h3 className="font-heading text-2xl md:text-3xl font-black text-foreground mb-6 tracking-wide">Premium Networking</h3>
              <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                Connect with industry leaders, potential partners, and like-minded professionals in curated networking sessions designed for meaningful connections.
              </p>
            </div>
            <div className="p-12 rounded-3xl bg-gradient-to-br from-green-500/5 to-green-500/10 border border-green-500/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <h3 className="font-heading text-2xl md:text-3xl font-black text-foreground mb-6 tracking-wide">Cutting-Edge Content</h3>
              <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                Access exclusive insights, research findings, and industry trends that aren't available anywhere else, delivered by world-renowned experts.
              </p>
            </div>
            <div className="p-12 rounded-3xl bg-gradient-to-br from-purple-500/5 to-purple-500/10 border border-purple-500/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <h3 className="font-heading text-2xl md:text-3xl font-black text-foreground mb-6 tracking-wide">Interactive Experience</h3>
              <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                Engage in hands-on workshops, live demonstrations, and interactive sessions that transform learning into actionable knowledge.
              </p>
            </div>
            <div className="p-12 rounded-3xl bg-gradient-to-br from-orange-500/5 to-orange-500/10 border border-orange-500/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <h3 className="font-heading text-2xl md:text-3xl font-black text-foreground mb-6 tracking-wide">Global Reach</h3>
              <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                Join attendees from around the world, bringing diverse perspectives and creating opportunities for international collaboration.
              </p>
            </div>
            <div className="p-12 rounded-3xl bg-gradient-to-br from-pink-500/5 to-pink-500/10 border border-pink-500/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <h3 className="font-heading text-2xl md:text-3xl font-black text-foreground mb-6 tracking-wide">Lifetime Access</h3>
              <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                Get permanent access to all presentations, recordings, and materials, allowing you to revisit and share the knowledge indefinitely.
              </p>
            </div>
            <div className="p-12 rounded-3xl bg-gradient-to-br from-teal-500/5 to-teal-500/10 border border-teal-500/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <h3 className="font-heading text-2xl md:text-3xl font-black text-foreground mb-6 tracking-wide">Professional Growth</h3>
              <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                Accelerate your career with industry-recognized certifications, skill validations, and networking opportunities that open new doors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section className="py-40 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight text-foreground mb-6 tracking-normal">
              Introducing the expert speakers joining our event
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 mb-20">
            <div className="space-y-10">
              <div className="flex gap-6 p-8 rounded-3xl bg-gradient-to-r from-blue-500/5 to-blue-500/10 border border-blue-500/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                <div className="w-16 h-16 bg-blue-500/15 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Users size={32} className="text-blue-500" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-black text-foreground mb-3 tracking-wide">Interactive Panel Discussions</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg font-medium">Build meaningful relationships with industry leaders, innovators, and thought leaders in our exclusive panel discussions.</p>
                </div>
              </div>

              <div className="flex gap-6 p-8 rounded-3xl bg-gradient-to-r from-green-500/5 to-green-500/10 border border-green-500/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                <div className="w-16 h-16 bg-green-500/15 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Globe size={32} className="text-green-500" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-black text-foreground mb-3 tracking-wide">Connect With Top Professionals</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg font-medium">Build meaningful relationships with industry leaders, innovators, and establish valuable connections that advance your career.</p>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <div className="flex gap-6 p-8 rounded-3xl bg-gradient-to-r from-purple-500/5 to-purple-500/10 border border-purple-500/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                <div className="w-16 h-16 bg-purple-500/15 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Bell size={32} className="text-purple-500" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-black text-foreground mb-3 tracking-wide">Exclusive Access Event Material</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg font-medium">Build meaningful relationships with industry leaders, innovators, and gain access to exclusive event materials and resources.</p>
                </div>
              </div>

              <div className="flex gap-6 p-8 rounded-3xl bg-gradient-to-r from-orange-500/5 to-orange-500/10 border border-orange-500/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                <div className="w-16 h-16 bg-orange-500/15 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Clock size={32} className="text-orange-500" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-black text-foreground mb-3 tracking-wide">Real-Time Event Announcement</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg font-medium">Build meaningful relationships with industry leaders, innovators, and stay updated with real-time event announcements.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Speaker Images Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/30 flex items-center justify-center hover:scale-110 transition-transform duration-500 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face" alt="Speaker" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-accent/20 to-accent/30 flex items-center justify-center hover:scale-110 transition-transform duration-500 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" alt="Speaker" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-green-500/20 to-green-500/30 flex items-center justify-center hover:scale-110 transition-transform duration-500 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" alt="Speaker" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-purple-500/30 flex items-center justify-center hover:scale-110 transition-transform duration-500 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face" alt="Speaker" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-40 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight text-foreground mb-6 tracking-normal">
              What our customers say about their experience
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-10 border border-white/30 hover:shadow-3xl transition-all duration-500 hover:scale-105 group">
              <div className="flex items-center gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-2xl drop-shadow-lg">★</span>
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-8 text-lg font-medium">
                "Truly outstanding service! The team exceeded our expectations with their professionalism, creativity, and quick turnaround time. Highly recommended for anyone seeking quality and reliability."
              </p>
              <div className="flex items-center gap-6">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face" alt="Kristin Watson" className="w-16 h-16 rounded-full object-cover shadow-lg" />
                <div>
                  <p className="font-heading font-black text-foreground text-xl">Kristin Watson</p>
                  <p className="text-base text-muted-foreground font-semibold">Global Marketing Director</p>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-10 border border-white/30 hover:shadow-3xl transition-all duration-500 hover:scale-105 group">
              <div className="flex items-center gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-2xl drop-shadow-lg">★</span>
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-8 text-lg font-medium">
                "Truly outstanding service! The team exceeded our expectations with their professionalism, creativity, and quick turnaround time. Highly recommended for anyone seeking quality and reliability."
              </p>
              <div className="flex items-center gap-6">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" alt="Sophia Rodrigues" className="w-16 h-16 rounded-full object-cover shadow-lg" />
                <div>
                  <p className="font-heading font-black text-foreground text-xl">Sophia Rodrigues</p>
                  <p className="text-base text-muted-foreground font-semibold">Global Marketing Director</p>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-10 border border-white/30 hover:shadow-3xl transition-all duration-500 hover:scale-105 group">
              <div className="flex items-center gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-2xl drop-shadow-lg">★</span>
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-8 text-lg font-medium">
                "Truly outstanding service! The team exceeded our expectations with their professionalism, creativity, and quick turnaround time. Highly recommended for anyone seeking quality and reliability."
              </p>
              <div className="flex items-center gap-6">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" alt="Ralph Edwards" className="w-16 h-16 rounded-full object-cover shadow-lg" />
                <div>
                  <p className="font-heading font-black text-foreground text-xl">Ralph Edwards</p>
                  <p className="text-base text-muted-foreground font-semibold">Global Marketing Director</p>
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
