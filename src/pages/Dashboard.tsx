import { Calendar, MapPin, CheckCircle, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { conferences } from "@/data/conferences";

const bookings = [
  { conference: conferences[0], status: "Confirmed" as const },
  { conference: conferences[2], status: "Confirmed" as const },
  { conference: conferences[4], status: "Pending" as const },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-6 py-10">
        {/* Profile header */}
        <div className="mb-10 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary font-heading text-xl font-bold">
            JD
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">John Doe</h1>
            <p className="text-sm text-muted-foreground">john@example.com</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10 max-w-lg">
          <div className="rounded-xl border border-border bg-card p-4 shadow-card text-center">
            <p className="font-heading text-2xl font-bold text-foreground">{bookings.length}</p>
            <p className="text-xs text-muted-foreground">Bookings</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-card text-center">
            <p className="font-heading text-2xl font-bold text-primary">2</p>
            <p className="text-xs text-muted-foreground">Confirmed</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-card text-center">
            <p className="font-heading text-2xl font-bold text-accent">1</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
        </div>

        {/* My Bookings */}
        <h2 className="font-heading text-xl font-semibold text-foreground mb-4">My Bookings</h2>
        <div className="space-y-4">
          {bookings.map(({ conference, status }) => (
            <div
              key={conference.id}
              className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-card-hover sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={conference.image}
                  alt={conference.title}
                  className="h-16 w-24 rounded-lg object-cover shrink-0"
                />
                <div>
                  <h3 className="font-heading font-semibold text-foreground">{conference.title}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {conference.date}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {conference.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                    status === "Confirmed"
                      ? "bg-primary/10 text-primary"
                      : "bg-accent/10 text-accent"
                  }`}
                >
                  {status === "Confirmed" ? <CheckCircle size={12} /> : <Clock size={12} />}
                  {status}
                </span>
                <Link to={`/conference/${conference.id}`}>
                  <Button variant="outline" size="sm" className="rounded-full text-xs">
                    View
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming */}
        <h2 className="font-heading text-xl font-semibold text-foreground mt-12 mb-4">
          Recommended for You
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {conferences.slice(3, 6).map((conf) => (
            <Link
              key={conf.id}
              to={`/conference/${conf.id}`}
              className="group rounded-xl border border-border bg-card p-4 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-0.5"
            >
              <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                {conf.title}
              </h3>
              <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar size={12} /> {conf.date}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
