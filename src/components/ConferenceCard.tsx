import { Link } from "react-router-dom";
import { Calendar, MapPin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Conference } from "@/data/conferences";

interface ConferenceCardProps {
  conference: Conference;
}

const ConferenceCard = ({ conference }: ConferenceCardProps) => {
  return (
    <div className="group rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2 overflow-hidden">
      <div className="aspect-[2/1] overflow-hidden">
        <img
          src={conference.image}
          alt={conference.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary uppercase tracking-wide">
            {conference.category}
          </span>
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe size={16} /> {conference.mode}
          </span>
        </div>
        <h3 className="font-heading text-2xl font-bold text-foreground mb-4 line-clamp-1 leading-tight">
          {conference.title}
        </h3>
        <div className="mb-6 flex flex-col gap-3">
          <div className="flex items-center gap-3 text-base font-medium text-foreground">
            <Calendar size={18} className="shrink-0 text-primary" /> {conference.date}
          </div>
          <div className="flex items-center gap-3 text-base font-medium text-foreground">
            <MapPin size={18} className="shrink-0 text-primary" /> {conference.location}
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed line-clamp-2 mb-8 text-base">
          {conference.description}
        </p>
        <Link to={`/conference/${conference.id}`}>
          <Button variant="outline" size="lg" className="w-full rounded-full py-3 text-base font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-105">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ConferenceCard;
