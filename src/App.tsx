import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { QueueProvider } from "@/contexts/QueueContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import QueueManagement from "./pages/QueueManagement";
import CalledTickets from "./pages/CalledTickets";
import TVPanel from "./pages/TVPanel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <QueueProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/filas" replace />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute requiredRole="gerente">
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/filas"
                element={
                  <ProtectedRoute>
                    <QueueManagement />
                  </ProtectedRoute>
                }
              />
              <Route path="/painel-senhas" element={<CalledTickets />} />
              <Route path="/tv" element={<TVPanel />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </QueueProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
