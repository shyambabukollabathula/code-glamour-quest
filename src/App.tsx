import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BackgroundParticles from "./components/BackgroundParticles";

const queryClient = new QueryClient();

const App = () => (
  <div style={{ position: "relative", minHeight: "100vh", width: "100vw", overflow: "hidden" }}>
    {/* App background animation and gradient, scrolls with content */}
    <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>
      <BackgroundParticles />
      <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "linear-gradient(135deg, #0f2027 0%, #2c5364 100%)", opacity: 0.85 }} />
    </div>
    {/* App content */}
    <div style={{ position: "relative", zIndex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  </div>
);

export default App;
