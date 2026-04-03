import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConferenceCard from "@/components/ConferenceCard";
import { conferences, categories } from "@/data/conferences";

const modes = ["All", "Online", "Offline", "Hybrid"];

const Conferences = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMode, setSelectedMode] = useState("All");

  const filtered = conferences.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;
    const matchesMode = selectedMode === "All" || c.mode === selectedMode;
    return matchesSearch && matchesCategory && matchesMode;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-6 py-10">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
          All Conferences
        </h1>
        <p className="text-muted-foreground mb-8">
          Browse and filter events that match your interests
        </p>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Filters sidebar */}
          <aside className="w-full shrink-0 lg:w-64">
            <div className="rounded-xl border border-border bg-card p-5 shadow-card space-y-6">
              {/* Search */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Search</label>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search events..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 rounded-full"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      size="sm"
                      variant={selectedCategory === cat ? "default" : "outline"}
                      className="rounded-full text-xs"
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Mode */}
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Format</label>
                <div className="flex flex-wrap gap-2">
                  {modes.map((mode) => (
                    <Button
                      key={mode}
                      size="sm"
                      variant={selectedMode === mode ? "default" : "outline"}
                      className="rounded-full text-xs"
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
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Search size={48} className="text-muted-foreground/30 mb-4" />
                <p className="text-lg font-medium text-foreground">No conferences found</p>
                <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {filtered.map((conf) => (
                  <ConferenceCard key={conf.id} conference={conf} />
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

export default Conferences;
