import { Calendar, MapPin, Users, Plus, Edit, Trash2, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { conferences } from "@/data/conferences";

const myConferences = conferences.slice(0, 3);

const OrganizerDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-6 py-10">
        {/* Profile header */}
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary font-heading text-xl font-bold">
              ORG
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold text-foreground">Organizer Panel</h1>
              <p className="text-sm text-muted-foreground">admin@conferencehub.com</p>
            </div>
          </div>
          <Button className="rounded-full gap-2">
            <Plus size={16} /> Add Conference
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="rounded-xl border border-border bg-card p-4 shadow-card text-center">
            <p className="font-heading text-2xl font-bold text-foreground">{myConferences.length}</p>
            <p className="text-xs text-muted-foreground">My Conferences</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-card text-center">
            <p className="font-heading text-2xl font-bold text-primary">248</p>
            <p className="text-xs text-muted-foreground">Total Registrations</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-card text-center">
            <p className="font-heading text-2xl font-bold text-accent">12</p>
            <p className="text-xs text-muted-foreground">Speakers</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-card text-center">
            <p className="font-heading text-2xl font-bold text-foreground">$4,500</p>
            <p className="text-xs text-muted-foreground">Revenue</p>
          </div>
        </div>

        {/* Managed Conferences */}
        <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Managed Conferences</h2>
        <div className="space-y-4">
          {myConferences.map((conference) => (
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
                    <span className="flex items-center gap-1"><Users size={12} /> {conference.speakers.length} speakers</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link to={`/conference/${conference.id}`}>
                  <Button variant="outline" size="sm" className="rounded-full gap-1 text-xs">
                    <Eye size={12} /> View
                  </Button>
                </Link>
                <Button variant="outline" size="sm" className="rounded-full gap-1 text-xs">
                  <Edit size={12} /> Edit
                </Button>
                <Button variant="outline" size="sm" className="rounded-full gap-1 text-xs text-destructive hover:text-destructive">
                  <Trash2 size={12} /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Registrations */}
        <h2 className="font-heading text-xl font-semibold text-foreground mt-12 mb-4">Recent Registrations</h2>
        <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">User</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">Conference</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">Date</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Alice Johnson", conf: myConferences[0].title, date: "Jan 15, 2025", status: "Confirmed" },
                { name: "Bob Smith", conf: myConferences[1].title, date: "Jan 14, 2025", status: "Pending" },
                { name: "Clara Lee", conf: myConferences[0].title, date: "Jan 13, 2025", status: "Confirmed" },
                { name: "David Kim", conf: myConferences[2].title, date: "Jan 12, 2025", status: "Confirmed" },
              ].map((reg, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 font-medium text-foreground">{reg.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{reg.conf}</td>
                  <td className="px-5 py-3 text-muted-foreground">{reg.date}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      reg.status === "Confirmed"
                        ? "bg-primary/10 text-primary"
                        : "bg-accent/10 text-accent"
                    }`}>
                      {reg.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrganizerDashboard;
