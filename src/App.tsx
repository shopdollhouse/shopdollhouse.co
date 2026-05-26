import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import LocalBusiness from "./pages/LocalBusiness.tsx";
import Quiz from "./pages/Quiz.tsx";
import QuizLeads from "./pages/QuizLeads.tsx";
import Onboarding from "./pages/Onboarding.tsx";
import Planner from "./pages/Planner.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/local-business" element={<LocalBusiness />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz/leads" element={<QuizLeads />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/planner" element={<Planner />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
