import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, Globe, ArrowLeft, Clock, User, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageWithFallback from "@/components/ImageWithFallback";
import { events } from "@/data/events";

const EventDetail = () => {
  const { id } = useParams();
  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-2xl font-bold text-foreground">Event not found</h1>
            <Link to="/events" className="mt-4 inline-block">
              <Button variant="outline" className="rounded-full gap-2">
                <ArrowLeft size={14} /> Back to Events
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
      <div className="relative h-80 md:h-96 overflow-hidden">
        <ImageWithFallback
          src={event.bannerImage || event.image}
          alt={event.title}
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-8 left-6 right-6">
          <Link to="/events" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white mb-4 transition-colors">
            <ArrowLeft size={16} /> Back to Events
          </Link>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white leading-tight">
            {event.title}
          </h1>
          <div className="flex flex-wrap gap-4 mt-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-medium text-white">
              <Calendar size={14} /> {event.date}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-medium text-white">
              <MapPin size={14} /> {event.location}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-medium text-white">
              <Globe size={14} /> {event.mode}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {/* About */}
            <div>
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">About</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">{event.longDescription}</p>
            </div>

            {/* Speakers */}
            <div>
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">Speakers</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {event.speakers.map((speaker) => (
                  <div key={speaker.name} className="flex items-center gap-6 rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-card-hover transition-shadow duration-200">
                    <div className="relative">
                      {speaker.image ? (
                        <ImageWithFallback
                          src={speaker.image}
                          alt={speaker.name}
                          className="h-16 w-16 rounded-full object-cover border-2 border-primary/20"
                          fallbackClassName="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20"
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                          <span className="font-heading font-semibold text-primary text-lg">{speaker.avatar}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-lg">{speaker.name}</p>
                      <p className="text-muted-foreground">{speaker.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Gallery */}
            {event.galleryImages && event.galleryImages.length > 0 && (
              <div>
                <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">Gallery</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {event.galleryImages.map((image, index) => (
                    <div key={index} className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-card shadow-card">
                      <ImageWithFallback
                        src={image}
                        alt={`${event.title} - Image ${index + 1}`}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <ImageIcon size={24} className="text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Schedule */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Schedule</h2>
              <div className="relative space-y-0">
                {event.schedule.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    {/* Timeline line */}
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-card">
                        <Clock size={12} className="text-primary" />
                      </div>
                      {i < event.schedule.length - 1 && (
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
              <p className="text-sm text-muted-foreground">Secure your spot at {event.title}.</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium text-foreground">{event.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Format</span>
                  <span className="font-medium text-foreground">{event.mode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium text-foreground">{event.category}</span>
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

export default EventDetail;
