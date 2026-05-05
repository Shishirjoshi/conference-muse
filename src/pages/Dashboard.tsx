import { useCallback, useEffect, useState } from "react";
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  ChevronRight,
  ExternalLink,
  Loader2,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { events } from "@/data/events";
import { useAuth } from "@/hooks/useAuth";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface Booking {
  id: number;
  user_id: number;
  conference_id: string;
  status: "pending" | "confirmed" | "cancelled";
  created_at?: string;
}

const Dashboard = () => {
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/bookings`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setBookings(data.bookings || []);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetchBookings();
  }, [token, fetchBookings]);

  const userBookings = bookings.map(booking => {
    const event = events.find(c => c.id.toString() === booking.conference_id);
    return event ? { conference: event, status: booking.status } : null;
  }).filter(Boolean);

  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const profileInitials = user?.fullName
    ? user.fullName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((name) => name[0])
        .join("")
        .toUpperCase()
    : "U";

  const statusMeta = {
    confirmed: {
      label: "Confirmed",
      className: "bg-emerald-500/12 text-emerald-300 ring-1 ring-emerald-500/20",
      icon: <CheckCircle size={14} />,
    },
    pending: {
      label: "Pending",
      className: "bg-amber-500/12 text-amber-300 ring-1 ring-amber-500/20",
      icon: <Clock size={14} />,
    },
    cancelled: {
      label: "Cancelled",
      className: "bg-rose-500/12 text-rose-300 ring-1 ring-rose-500/20",
      icon: <Clock size={14} />,
    },
  } as const;

  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.14),transparent_32%),radial-gradient(circle_at_right_top,hsl(var(--accent)/0.1),transparent_26%),linear-gradient(180deg,hsl(var(--background))_0%,hsl(var(--background))_100%)]">
      <Navbar />

      <div className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-card/70 p-6 shadow-card backdrop-blur-xl sm:p-8 lg:p-10 animate-fadeInUp">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.16),transparent_28%),radial-gradient(circle_at_bottom_right,hsl(var(--accent)/0.12),transparent_32%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.5fr_0.9fr] lg:items-start">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-background/40 px-3 py-1.5 text-foreground/80 tracking-[0.22em]">
                  <Sparkles size={12} className="text-accent" />
                  Your workspace
                </span>
                <span>Premium event studio</span>
              </div>

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-primary/20 via-card to-accent/20 text-2xl font-bold text-foreground shadow-soft ring-1 ring-white/10">
                  {profileInitials}
                </div>
                <div className="space-y-2">
                  <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                    {user?.fullName}
                  </h1>
                  <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
                    Keep track of confirmed seats, pending registrations, and the next events worth your attention.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Bookings", value: bookings.length, tone: "text-foreground" },
                  { label: "Confirmed", value: confirmedCount, tone: "text-emerald-300" },
                  { label: "Pending", value: pendingCount, tone: "text-amber-300" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="group rounded-2xl border border-white/10 bg-background/45 p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-background/60 hover:shadow-card-hover active:scale-[0.99]"
                  >
                    <p className={`font-heading text-3xl font-semibold tracking-tight ${stat.tone}`}>
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm font-medium text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-background/55 p-5 shadow-soft backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-background/70 hover:shadow-card-hover">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    Quick Actions
                  </p>
                  <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground">
                    Move smoother
                  </h2>
                </div>
                <div className="rounded-2xl bg-primary/10 p-3 text-primary ring-1 ring-primary/15">
                  <ArrowRight size={18} />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link to="/events" className="group block">
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-card/60 px-4 py-4 transition-all duration-300 hover:border-primary/30 hover:bg-card hover:shadow-soft active:scale-[0.99]">
                    <div>
                      <p className="font-semibold text-foreground">Browse events</p>
                      <p className="text-sm text-muted-foreground">Discover conferences curated for you.</p>
                    </div>
                    <ChevronRight className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground" size={18} />
                  </div>
                </Link>

                <Link to="/dashboard" className="group block">
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-card/60 px-4 py-4 transition-all duration-300 hover:border-accent/30 hover:bg-card hover:shadow-soft active:scale-[0.99]">
                    <div>
                      <p className="font-semibold text-foreground">Refresh bookings</p>
                      <p className="text-sm text-muted-foreground">See the latest status updates instantly.</p>
                    </div>
                    <ExternalLink className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:text-foreground" size={18} />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-[2rem] border border-white/10 bg-card/70 p-6 shadow-card backdrop-blur-xl animate-fadeInUp sm:p-8" style={{ animationDelay: "80ms" }}>
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  Bookings
                </p>
                <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground sm:text-3xl">
                  My Bookings
                </h2>
              </div>
              <Link to="/events" className="hidden text-sm font-medium text-primary transition-colors hover:text-primary/80 sm:inline-flex sm:items-center sm:gap-1">
                Explore more <ArrowRight size={16} />
              </Link>
            </div>

        {loading ? (
          <div className="flex min-h-[220px] items-center justify-center py-8">
            <Loader2 size={20} className="animate-spin text-muted-foreground" />
          </div>
        ) : userBookings.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 bg-background/45 p-10 text-center shadow-soft">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
              <Calendar size={28} />
            </div>
            <p className="text-2xl font-semibold tracking-tight text-foreground">No bookings yet</p>
            <p className="mx-auto mt-3 max-w-md text-base text-muted-foreground">
              Explore events to get started and keep your next conference at your fingertips.
            </p>
            <Link to="/events" className="mt-8 inline-flex">
              <Button className="rounded-full px-6 py-3 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover active:scale-[0.98]">
                Browse Events
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {userBookings.map(item => {
              if (!item) return null;
              const { conference, status } = item;
              const meta = statusMeta[status];
              return (
                <div
                  key={conference.id}
                  className="group flex flex-col gap-4 rounded-3xl border border-white/10 bg-background/45 p-4 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-background/65 hover:shadow-card-hover active:scale-[0.995] sm:flex-row sm:items-center sm:justify-between sm:p-5"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={conference.image}
                      alt={conference.title}
                      className="h-20 w-28 shrink-0 rounded-2xl object-cover ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="min-w-0">
                      <h3 className="truncate font-heading text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                        {conference.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5"><Calendar size={12} /> {conference.date}</span>
                        <span className="flex items-center gap-1.5"><MapPin size={12} /> {conference.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${meta.className}`}
                    >
                      {meta.icon}
                      {meta.label}
                    </span>
                    <Link to={`/event/${conference.id}`}>
                      <Button variant="outline" size="sm" className="rounded-full border-white/10 bg-background/40 text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-background/70 hover:text-foreground active:scale-[0.98]">
                        View details
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
          </div>

          <aside className="space-y-6 animate-fadeInUp" style={{ animationDelay: "140ms" }}>
            <div className="rounded-[2rem] border border-white/10 bg-card/70 p-6 shadow-card backdrop-blur-xl sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    Status
                  </p>
                  <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground">
                    Booking health
                  </h2>
                </div>
                <div className="rounded-2xl bg-accent/10 p-3 text-accent ring-1 ring-accent/15">
                  <Sparkles size={18} />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {[
                  { label: "Confirmed", value: confirmedCount, tone: "text-emerald-300" },
                  { label: "Pending", value: pendingCount, tone: "text-amber-300" },
                  { label: "Total", value: bookings.length, tone: "text-foreground" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-background/45 px-4 py-3 transition-all duration-300 hover:border-white/20 hover:bg-background/60"
                  >
                    <span className="text-sm font-medium text-muted-foreground">{row.label}</span>
                    <span className={`font-heading text-lg font-semibold ${row.tone}`}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-card/70 p-6 shadow-card backdrop-blur-xl sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    Discovery
                  </p>
                  <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground">
                    Explore more events
                  </h2>
                </div>
                <Link to="/events" className="text-sm font-medium text-primary transition-colors hover:text-primary/80">
                  View all
                </Link>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {events.slice(0, 4).map((conf) => (
                  <Link
                    key={conf.id}
                    to={`/event/${conf.id}`}
                    className="group rounded-2xl border border-white/10 bg-background/45 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-background/65 hover:shadow-card-hover active:scale-[0.99]"
                  >
                    <div className="flex gap-4 lg:flex-col">
                      <img
                        src={conf.image}
                        alt={conf.title}
                        className="h-24 w-28 shrink-0 rounded-2xl object-cover ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-[1.04] lg:h-40 lg:w-full"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-heading text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                          {conf.title}
                        </h3>
                        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Calendar size={12} /> {conf.date}
                        </p>
                        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin size={12} /> {conf.location}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                          Open event <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
