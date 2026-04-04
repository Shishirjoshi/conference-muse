import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, Globe, ArrowLeft, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { conferences } from "@/data/conferences";

const ConferenceDetail = () => {
  const { id } = useParams();
  const conference = conferences.find((c) => c.id === id);

  if (!conference) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-2xl font-bold text-foreground">Conference not found</h1>
            <Link to="/conferences" className="mt-4 inline-block">
              <Button variant="outline" className="rounded-full gap-2">
                <ArrowLeft size={14} /> Back to Conferences
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={conference.image} alt={conference.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <Link to="/conferences" className="inline-flex items-center gap-1 text-sm text-primary-foreground/80 hover:text-primary-foreground mb-3 transition-colors">
            <ArrowLeft size={14} /> Back
          </Link>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground">
            {conference.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Meta */}
            <div className="flex flex-wrap gap-4">
              <span className="inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary shadow-sm">
                <Calendar size={14} /> {conference.date}
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary shadow-sm">
                <MapPin size={14} /> {conference.location}
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm shadow-card">
                <Globe size={14} className="text-primary" /> {conference.mode}
              </span>
            </div>

            {/* About */}
            <div>
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">About</h2>
              <p className="text-muted-foreground leading-relaxed">{conference.longDescription}</p>
            </div>

            {/* Speakers */}
            <div>
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">Speakers</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {conference.speakers.map((speaker) => (
                  <div key={speaker.name} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-card">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-heading font-semibold">
                      {speaker.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{speaker.name}</p>
                      <p className="text-sm text-muted-foreground">{speaker.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Schedule</h2>
              <div className="relative space-y-0">
                {conference.schedule.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    {/* Timeline line */}
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-card">
                        <Clock size={12} className="text-primary" />
                      </div>
                      {i < conference.schedule.length - 1 && (
                        <div className="w-0.5 flex-1 bg-border" />
                      )}
                    </div>
                    <div className="pb-8">
                      <p className="text-xs font-medium text-primary">{item.time}</p>
                      <p className="font-medium text-foreground">{item.title}</p>
                      {item.speaker && (
                        <p className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                          <User size={12} /> {item.speaker}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-24 rounded-xl border border-border bg-card p-6 shadow-card space-y-4">
              <h3 className="font-heading text-lg font-semibold text-foreground">Register Now</h3>
              <p className="text-sm text-muted-foreground">Secure your spot at {conference.title}.</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium text-foreground">{conference.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Format</span>
                  <span className="font-medium text-foreground">{conference.mode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium text-foreground">{conference.category}</span>
                </div>
              </div>
              <Button className="w-full rounded-full hover:bg-primary/90 transition-colors duration-200" size="lg">
                Register Now
              </Button>
              <p className="text-xs text-center text-muted-foreground">Free registration • Limited spots</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ConferenceDetail;
