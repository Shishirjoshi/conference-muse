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
    <Link to={`/event/${event.id}`} className="block group rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2 overflow-hidden cursor-pointer">
      <div className="aspect-[2/1] overflow-hidden">
        <ImageWithFallback
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary uppercase tracking-wide">
            {event.category}
          </span>
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe size={16} /> {event.mode}
          </span>
        </div>
        <h3 className="font-heading text-2xl font-bold text-foreground mb-4 line-clamp-1 leading-tight">
          {event.title}
        </h3>
        <div className="mb-6 flex flex-col gap-3">
          <div className="flex items-center gap-3 text-base font-medium text-foreground">
            <Calendar size={18} className="shrink-0 text-primary" /> {event.date}
          </div>
          <div className="flex items-center gap-3 text-base font-medium text-foreground">
            <MapPin size={18} className="shrink-0 text-primary" /> {event.location}
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed line-clamp-2 mb-8 text-base">
          {event.description}
        </p>
        <div className="text-center">
          <span className="inline-block rounded-full border border-primary px-6 py-3 text-base font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-105">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
