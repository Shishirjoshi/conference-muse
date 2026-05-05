import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { events, categories } from "@/data/events";

const modes = ["All", "Online", "Offline", "Hybrid"];

const Events = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMode, setSelectedMode] = useState("All");

  const filtered = events.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || e.category === selectedCategory;
    const matchesMode = selectedMode === "All" || e.mode === selectedMode;
    return matchesSearch && matchesCategory && matchesMode;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-6 py-20">
        <div className="mb-16 text-center">
          <h1 className="font-heading text-4xl font-bold text-foreground mb-4 md:text-5xl">
            All Sessions
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse and filter sessions that match your interests
          </p>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Filters sidebar */}
          <aside className="w-full shrink-0 lg:w-72">
            <div className="rounded-xl border border-border bg-card p-8 shadow-card space-y-10 sticky top-24">
              {/* Search */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-4 block">Search Sessions</label>
                <div className="relative">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by title or location..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-12 rounded-full h-12 text-base"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-6 block">Filter by Topic</label>
                <div className="flex flex-wrap gap-3">
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      size="sm"
                      variant={selectedCategory === cat ? "default" : "outline"}
                      className="rounded-full text-sm px-6 py-2 hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-105"
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Mode */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-6 block">Event Mode</label>
                <div className="flex flex-wrap gap-3">
                  {modes.map((mode) => (
                    <Button
                      key={mode}
                      size="sm"
                      variant={selectedMode === mode ? "default" : "outline"}
                      className="rounded-full text-sm px-6 py-2 hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-105"
                      onClick={() => setSelectedMode(mode)}
                    >
                      {mode}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <Search size={64} className="text-muted-foreground/30 mb-6" />
                <p className="text-2xl font-semibold text-foreground mb-2">No events found</p>
                <p className="text-lg text-muted-foreground">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Events;
