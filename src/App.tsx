import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import SymptomChecker from "./pages/SymptomChecker.tsx";
import MedicineScanner from "./pages/MedicineScanner.tsx";
import HospitalNavigation from "./pages/HospitalNavigation.tsx";
import EmergencyPage from "./pages/EmergencyPage.tsx";
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
          <Route path="/symptoms" element={<SymptomChecker />} />
          <Route path="/medicine" element={<MedicineScanner />} />
          <Route path="/hospitals" element={<HospitalNavigation />} />
          <Route path="/emergency" element={<EmergencyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
