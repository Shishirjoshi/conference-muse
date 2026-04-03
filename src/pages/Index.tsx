import { Link } from "react-router-dom";
import { ArrowRight, Users, Calendar, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConferenceCard from "@/components/ConferenceCard";
import { conferences } from "@/data/conferences";

const Index = () => {
  const upcoming = conferences.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
              <Globe size={14} className="text-primary" />
              <span className="text-xs font-medium text-primary">Trusted by 10,000+ attendees</span>
            </div>
            <h1 className="font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              Discover & Book{" "}
              <span className="text-primary">Conferences</span>{" "}
              Easily
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-lg">
              Find the best tech, design, and business conferences. Register in seconds and never miss an event.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/conferences">
                <Button size="lg" className="rounded-full px-8 gap-2">
                  Explore Conferences <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  Sign Up Free
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="container mx-auto px-6 pb-16">
          <div className="grid grid-cols-3 gap-6 max-w-md">
            <div className="text-center">
              <div className="flex justify-center mb-1"><Calendar size={20} className="text-primary" /></div>
              <p className="font-heading text-2xl font-bold text-foreground">150+</p>
              <p className="text-xs text-muted-foreground">Events</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-1"><Users size={20} className="text-primary" /></div>
              <p className="font-heading text-2xl font-bold text-foreground">10K+</p>
              <p className="text-xs text-muted-foreground">Attendees</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-1"><Globe size={20} className="text-primary" /></div>
              <p className="font-heading text-2xl font-bold text-foreground">30+</p>
              <p className="text-xs text-muted-foreground">Countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming */}
      <section className="container mx-auto px-6 py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
              Upcoming Conferences
            </h2>
            <p className="mt-2 text-muted-foreground">Don't miss out on these top events</p>
          </div>
          <Link to="/conferences" className="hidden md:block">
            <Button variant="ghost" className="gap-1 text-primary">
              View All <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((conf) => (
            <ConferenceCard key={conf.id} conference={conf} />
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link to="/conferences">
            <Button variant="outline" className="rounded-full gap-1">
              View All Conferences <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
