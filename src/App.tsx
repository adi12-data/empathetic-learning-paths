
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StudentsPage from "./pages/students/Index";
import AnalyticsPage from "./pages/analytics/Index";
import GradesPage from "./pages/grades/Index";
import CoursesPage from "./pages/courses/Index";
import CalendarPage from "./pages/calendar/Index";
import AlertsPage from "./pages/alerts/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/grades" element={<GradesPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
