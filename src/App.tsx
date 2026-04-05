import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Starfield from "./components/Starfield";
import Index from "./pages/Index.tsx";
import Events from "./pages/Events.tsx";
import EventDetail from "./pages/EventDetail.tsx";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import OrganizerDashboard from "./pages/OrganizerDashboard.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <div className="relative min-h-screen overflow-x-hidden bg-background">
          <Starfield />
          <div className="relative z-10">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/events" element={<Events />} />
                <Route path="/event/:id" element={<EventDetail />} />
                <Route path="/login" element={<Login />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/organizer-dashboard" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <OrganizerDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
