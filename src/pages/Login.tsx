import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, AlertCircle, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();
  const { login, isLoading, error: authError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    if (!email || !password) {
      setLocalError("Please enter both email and password");
      return;
    }

    const success = await login(email, password);
    if (success) {
      // Navigation happens automatically based on user role
      navigate("/dashboard");
    }
  };

  const displayError = localError || authError;

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>

          <div className="rounded-xl border border-border bg-card p-8 shadow-card sm:p-10">
            {/* Header */}
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-primary">
                <span className="font-heading text-2xl font-bold text-primary-foreground">CH</span>
              </div>
              <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
                Welcome Back
              </h1>
              <p className="text-muted-foreground mb-8">
                Sign in to your Eventix account
              </p>
            </div>

            {/* Info Message */}
            <div className="mb-8 rounded-lg bg-muted/50 border border-muted p-4">
              <p className="text-sm text-muted-foreground text-center">
                🔐 Login credentials are provided by the organizer. Please contact them if you need access.
              </p>
            </div>

            {/* Error Alert */}
            {displayError && (
              <Alert variant="destructive" className="mb-8">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{displayError}</AlertDescription>
              </Alert>
            )}

            {/* Login Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    className="pl-9 rounded-lg h-11"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    className="pl-9 rounded-lg h-11"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full rounded-full gap-2 mt-8 h-11 hover:bg-primary/90 transition-colors duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={16} />
                  </>
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground text-center mb-4 font-medium">
                Demo Administrator Account
              </p>
              <div className="space-y-2 p-4 rounded bg-muted/30 text-xs">
                <p className="text-muted-foreground">
                  <span className="font-medium">Email:</span> admin@conference.com
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium">Password:</span> admin123
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
