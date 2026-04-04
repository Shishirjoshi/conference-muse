import { useState, useEffect } from "react";
import { Calendar, MapPin, CheckCircle, Clock, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { conferences } from "@/data/conferences";
import { useAuth } from "@/hooks/useAuth";

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
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
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
  };

  const userBookings = bookings.map(booking => {
    const conference = conferences.find(c => c.id.toString() === booking.conference_id);
    return conference ? { conference, status: booking.status } : null;
  }).filter(Boolean);

  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const pendingCount = bookings.filter(b => b.status === 'pending').length;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-6 py-10">
        {/* Profile header */}
        <div className="mb-10 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary font-heading text-xl font-bold">
            {user?.fullName.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">{user?.fullName}</h1>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10 max-w-lg">
          <div className="rounded-xl border border-border bg-card p-4 shadow-card text-center">
            <p className="font-heading text-2xl font-bold text-foreground">{bookings.length}</p>
            <p className="text-xs text-muted-foreground">Bookings</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-card text-center">
            <p className="font-heading text-2xl font-bold text-primary">{confirmedCount}</p>
            <p className="text-xs text-muted-foreground">Confirmed</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-card text-center">
            <p className="font-heading text-2xl font-bold text-accent">{pendingCount}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
        </div>

        {/* My Bookings */}
        <h2 className="font-heading text-xl font-semibold text-foreground mb-4">My Bookings</h2>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 size={20} className="animate-spin text-muted-foreground" />
          </div>
        ) : userBookings.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground mb-4">No bookings yet. Explore conferences to get started!</p>
            <Link to="/conferences">
              <Button className="rounded-full">Browse Conferences</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {userBookings.map(item => {
              if (!item) return null;
              const { conference, status } = item;
              return (
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
                        status === "confirmed"
                          ? "bg-primary/10 text-primary"
                          : "bg-accent/10 text-accent"
                      }`}
                    >
                      {status === "confirmed" ? <CheckCircle size={12} /> : <Clock size={12} />}
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                    <Link to={`/conference/${conference.id}`}>
                      <Button variant="outline" size="sm" className="rounded-full text-xs">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Recommended */}
        <h2 className="font-heading text-xl font-semibold text-foreground mt-12 mb-4">
          Explore More Conferences
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {conferences.slice(0, 6).map((conf) => (
            <Link
              key={conf.id}
              to={`/conference/${conf.id}`}
              className="group rounded-xl border border-border bg-card p-4 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-0.5"
            >
              <img
                src={conf.image}
                alt={conf.title}
                className="w-full h-24 rounded-lg object-cover mb-3"
              />
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
