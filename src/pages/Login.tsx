import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState<"user" | "organizer">("user");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "organizer") {
      navigate("/organizer-dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
            <div className="text-center mb-6">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                <span className="font-heading text-lg font-bold text-primary-foreground">CH</span>
              </div>
              <h1 className="font-heading text-2xl font-bold text-foreground">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {isSignUp
                  ? "Sign up to start booking conferences"
                  : "Sign in to your ConferenceHub account"}
              </p>
            </div>

            {/* Role toggle */}
            <div className="flex rounded-full border border-border bg-muted p-1 mb-6">
              <button
                type="button"
                onClick={() => setRole("user")}
                className={`flex-1 flex items-center justify-center gap-2 rounded-full py-2 text-sm font-medium transition-all ${
                  role === "user"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <User size={14} />
                Attendee
              </button>
              <button
                type="button"
                onClick={() => setRole("organizer")}
                className={`flex-1 flex items-center justify-center gap-2 rounded-full py-2 text-sm font-medium transition-all ${
                  role === "organizer"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Shield size={14} />
                Organizer
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {isSignUp && (
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                  <Input placeholder="John Doe" className="rounded-lg" />
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="you@example.com" type="email" className="pl-9 rounded-lg" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="••••••••" type="password" className="pl-9 rounded-lg" />
                </div>
              </div>

              {role === "organizer" && !isSignUp && (
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Organizer Code</label>
                  <Input placeholder="Enter organizer access code" className="rounded-lg" />
                </div>
              )}

              <Button type="submit" className="w-full rounded-full gap-2 mt-2" size="lg">
                {isSignUp ? "Create Account" : `Sign In as ${role === "organizer" ? "Organizer" : "Attendee"}`}
                <ArrowRight size={16} />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-primary hover:underline"
              >
                {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Create one"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
