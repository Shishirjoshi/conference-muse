import { Link } from "react-router-dom";
import { Calendar, MapPin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Event } from "@/data/events";
import ImageWithFallback from "./ImageWithFallback";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Link to={`/event/${event.id}`} className="block group rounded-2xl border border-border/50 bg-gradient-to-br from-card via-card/95 to-card/90 shadow-card card-hover overflow-hidden cursor-pointer backdrop-blur-sm">
      <div className="relative aspect-[2/1] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 z-10" />
        <ImageWithFallback
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="p-8 relative">
        <div className="mb-6 flex items-center gap-3 flex-wrap">
          <span className="inline-block rounded-full bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 px-4 py-1.5 text-sm font-semibold text-primary uppercase tracking-wider border border-primary/30 backdrop-blur-sm">
            {event.category}
          </span>
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground font-medium px-3 py-1.5 bg-secondary/10 rounded-full border border-border/50">
            <Globe size={14} /> {event.mode}
          </span>
        </div>
        <h3 className="font-heading text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent mb-4 line-clamp-2 leading-tight">
          {event.title}
        </h3>
        <div className="mb-6 flex flex-col gap-3">
          <div className="flex items-center gap-3 text-base font-medium text-foreground/90">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Calendar size={18} className="text-primary" />
            </div>
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-3 text-base font-medium text-foreground/90">
            <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
              <MapPin size={18} className="text-accent" />
            </div>
            <span>{event.location}</span>
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed line-clamp-2 mb-8 text-sm">
          {event.description}
        </p>
        <div className="pt-4 border-t border-border/30">
          <span className="inline-block group/btn bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground rounded-full px-6 py-3 text-base font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
            View Details <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
