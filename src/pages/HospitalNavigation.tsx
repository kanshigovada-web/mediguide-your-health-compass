import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Navigation, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const hospitals = [
  { name: "City General Hospital", distance: "1.2 km", open: true, emergency: true, phone: "+1-555-0101" },
  { name: "St. Mary's Medical Center", distance: "2.8 km", open: true, emergency: true, phone: "+1-555-0102" },
  { name: "Community Health Clinic", distance: "3.5 km", open: true, emergency: false, phone: "+1-555-0103" },
  { name: "Metro Emergency Hospital", distance: "4.1 km", open: true, emergency: true, phone: "+1-555-0104" },
  { name: "Sunrise Family Clinic", distance: "5.7 km", open: false, emergency: false, phone: "+1-555-0105" },
];

const HospitalNavigation = () => (
  <Layout>
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-2">Nearby Hospitals</h1>
      <p className="text-muted-foreground mb-8">Find healthcare facilities near your location</p>

      {/* Map placeholder */}
      <div className="rounded-xl border bg-muted/50 h-48 mb-8 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
        <div className="text-center z-10">
          <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
          <p className="text-sm text-muted-foreground">Map view — Location access required</p>
          <Button variant="outline" size="sm" className="mt-2">Enable Location</Button>
        </div>
      </div>

      <div className="space-y-4">
        {hospitals.map((h, i) => (
          <div
            key={i}
            className={cn(
              "rounded-xl border bg-card p-5 flex flex-col sm:flex-row sm:items-center gap-4 transition-all hover:shadow-md animate-slide-up",
            )}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold truncate">{h.name}</h3>
                {h.emergency && (
                  <span className="flex-shrink-0 inline-flex items-center gap-1 text-xs font-medium bg-emergency/10 text-emergency rounded-full px-2 py-0.5">
                    <AlertTriangle className="h-3 w-3" /> ER
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> {h.distance}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span className={h.open ? "text-primary" : "text-emergency"}>{h.open ? "Open" : "Closed"}</span>
                </span>
              </div>
            </div>

            <div className="flex gap-2 flex-shrink-0">
              <Button variant="outline" size="sm" asChild>
                <a href={`tel:${h.phone}`}>
                  <Phone className="h-4 w-4 mr-1" /> Call
                </a>
              </Button>
              <Button size="sm">
                <Navigation className="h-4 w-4 mr-1" /> Navigate
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Layout>
);

export default HospitalNavigation;
