import { Link } from "react-router-dom";
import { ArrowRight, Users, Calendar, Globe, Play, Clock, Bell, MapPin } from "lucide-react";
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
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 min-h-screen flex items-center">
        <div className="container mx-auto px-6 py-32">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground mb-8 tracking-normal">
              Connecting minds to shape tomorrow's big ideas
            </h1>

            <div className="flex flex-wrap justify-center gap-6 mb-16">
              <Link to="/conferences">
                <Button size="lg" className="rounded-full px-10 py-5 text-xl font-semibold gap-3 bg-primary hover:bg-primary/90 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105">
                  Explore Schedule <ArrowRight size={20} />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-full px-10 py-5 text-xl font-semibold gap-3 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <Play size={20} /> Watch Video
              </Button>
            </div>

            {/* Countdown Timer */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 mb-12 max-w-3xl mx-auto border border-white/20 shadow-2xl">
              <div className="text-center mb-8">
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-wide">Upcoming Big Event - Don't Miss Out</h3>
                <div className="flex justify-center items-center gap-3 text-lg text-muted-foreground font-medium">
                  <Clock size={20} />
                  <span className="font-mono text-xl">{timeLeft.days} Days {timeLeft.hours.toString().padStart(2, '0')} Hours {timeLeft.minutes.toString().padStart(2, '0')} Minutes {timeLeft.seconds.toString().padStart(2, '0')} Seconds</span>
                </div>
              </div>

              {/* Notification Categories */}
              <div className="flex flex-wrap justify-center gap-4 text-base font-medium">
                <span className="bg-primary/20 text-primary px-4 py-2 rounded-full border border-primary/30">Latest Updates</span>
                <span className="bg-accent/20 text-accent-foreground px-4 py-2 rounded-full border border-accent/30">New Announcements</span>
                <span className="bg-orange-500/20 text-orange-600 px-4 py-2 rounded-full border border-orange-500/30">Workshop Alerts</span>
                <span className="bg-blue-500/20 text-blue-600 px-4 py-2 rounded-full border border-blue-500/30">Live Notices</span>
                <span className="bg-green-500/20 text-green-600 px-4 py-2 rounded-full border border-green-500/30">Event Countdown</span>
                <span className="bg-purple-500/20 text-purple-600 px-4 py-2 rounded-full border border-purple-500/30">Workshop Alerts</span>
                <span className="bg-pink-500/20 text-pink-600 px-4 py-2 rounded-full border border-pink-500/30">Quick Updates</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-lg">
                <div className="flex justify-center mb-4"><Calendar size={40} className="text-primary" /></div>
                <p className="font-heading text-5xl font-black text-foreground mb-2">150+</p>
                <p className="text-lg text-muted-foreground font-medium">Events</p>
              </div>
              <div className="text-center bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-lg">
                <div className="flex justify-center mb-4"><Users size={40} className="text-primary" /></div>
                <p className="font-heading text-5xl font-black text-foreground mb-2">10K+</p>
                <p className="text-lg text-muted-foreground font-medium">Attendees</p>
              </div>
              <div className="text-center bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-lg">
                <div className="flex justify-center mb-4"><Globe size={40} className="text-primary" /></div>
                <p className="font-heading text-5xl font-black text-foreground mb-2">30+</p>
                <p className="text-lg text-muted-foreground font-medium">Countries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming */}
      <section className="py-40 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight text-foreground mb-6 tracking-normal">
              Explore the complete schedule for our events
            </h2>
          </div>

          {/* Day Tabs */}
          <div className="flex justify-center mb-16">
            <div className="flex bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20 shadow-lg">
              <button className="px-8 py-4 rounded-full bg-primary text-white font-bold text-lg transition-all duration-300 shadow-lg">Day 01</button>
              <button className="px-8 py-4 rounded-full text-muted-foreground hover:text-foreground font-semibold text-lg transition-all duration-300">Day 02</button>
              <button className="px-8 py-4 rounded-full text-muted-foreground hover:text-foreground font-semibold text-lg transition-all duration-300">Day 03</button>
            </div>
          </div>

          {/* Schedule Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {upcoming.map((event) => (
              <Link key={event.id} to={`/event/${event.id}`} className="block group bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden border border-white/30 hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 cursor-pointer">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-10">
                  <div className="flex items-center gap-3 text-lg text-primary font-bold mb-4">
                    <Clock size={20} />
                    <span className="font-mono">9:00 AM - 5:30 PM</span>
                  </div>
                  <h3 className="font-heading text-2xl md:text-3xl font-black text-foreground mb-4 group-hover:text-primary transition-colors duration-300 leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base font-medium mb-6">
                    {event.description}
                  </p>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin size={18} />
                    <span className="font-medium text-lg">{event.location}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/conferences">
              <Button size="lg" className="rounded-full px-12 py-6 text-xl font-bold gap-3 bg-primary hover:bg-primary/90 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105">
                View All Events <ArrowRight size={22} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-40 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight text-foreground mb-6 tracking-normal">
              Discover the mission and purpose behind our event
            </h2>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 mb-16">
              <div className="text-center p-12 rounded-3xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                <h3 className="font-heading text-3xl md:text-4xl font-black text-foreground mb-6 tracking-wide">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                  Our Mission is to build a global community where collaboration fuels innovation. We aim to encourage fresh thinking, spark inspiring dialogues, and create a space where ideas flourish and connections thrive.
                </p>
              </div>
              <div className="text-center p-12 rounded-3xl bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                <h3 className="font-heading text-3xl md:text-4xl font-black text-foreground mb-6 tracking-wide">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                  To be the premier platform connecting minds from around the world, fostering innovation and driving meaningful change through transformative conferences and events.
                </p>
              </div>
              <div className="text-center p-12 rounded-3xl bg-gradient-to-br from-green-500/5 to-green-500/10 border border-green-500/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                <h3 className="font-heading text-3xl md:text-4xl font-black text-foreground mb-6 tracking-wide">Our Goal</h3>
                <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                  Create unparalleled experiences that empower professionals, inspire innovation, and build lasting connections that shape the future of industries worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-40 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-6">
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
