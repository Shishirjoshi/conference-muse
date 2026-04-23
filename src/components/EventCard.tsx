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
    <Link to={`/event/${event.id}`} className="block group rounded-xl border border-border bg-card shadow-card card-hover overflow-hidden cursor-pointer transition-all duration-300">
      <div className="relative aspect-[2/1] overflow-hidden bg-muted">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 z-10" />
        <ImageWithFallback
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-6 relative">
        <div className="mb-4 flex items-center gap-2 flex-wrap">
          <span className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider border border-primary/20">
            {event.category}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-semibold px-2 py-1 bg-muted rounded-lg">
            <Globe size={12} /> {event.mode}
          </span>
        </div>
        <h3 className="font-heading text-xl font-bold text-foreground mb-3 line-clamp-2 leading-tight">
          {event.title}
        </h3>
        <div className="mb-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar size={16} className="text-primary flex-shrink-0" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin size={16} className="text-accent flex-shrink-0" />
            <span>{event.location}</span>
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed line-clamp-2 mb-4 text-sm">
          {event.description}
        </p>
        <div className="pt-4 border-t border-border/50">
          <span className="inline-block group/btn bg-primary hover:bg-primary/90 text-white rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
            View Details <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-0.5 ml-1">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
