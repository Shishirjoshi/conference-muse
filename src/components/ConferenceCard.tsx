import { Link } from "react-router-dom";
import { Calendar, MapPin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Conference } from "@/data/conferences";

interface ConferenceCardProps {
  conference: Conference;
}

const ConferenceCard = ({ conference }: ConferenceCardProps) => {
  return (
    <div className="group rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 overflow-hidden">
      <div className="aspect-[2/1] overflow-hidden">
        <img
          src={conference.image}
          alt={conference.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="mb-3 flex items-center gap-3">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {conference.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Globe size={12} /> {conference.mode}
          </span>
        </div>
        <h3 className="font-heading text-lg font-semibold text-foreground mb-2 line-clamp-1">
          {conference.title}
        </h3>
        <div className="mb-3 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar size={14} className="shrink-0" /> {conference.date}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin size={14} className="shrink-0" /> {conference.location}
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
          {conference.description}
        </p>
        <Link to={`/conference/${conference.id}`}>
          <Button variant="outline" size="sm" className="w-full rounded-full">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ConferenceCard;
