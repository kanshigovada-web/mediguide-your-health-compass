import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Phone, Shield, Flame, AlertTriangle, MapPin, CheckCircle } from "lucide-react";

const emergencyContacts = [
  { icon: Phone, label: "Call Ambulance", number: "911", color: "bg-emergency text-emergency-foreground", desc: "Medical emergency" },
  { icon: Shield, label: "Call Police", number: "911", color: "bg-secondary text-secondary-foreground", desc: "Safety & security" },
  { icon: Flame, label: "Fire Brigade", number: "911", color: "bg-warning text-warning-foreground", desc: "Fire emergency" },
  { icon: AlertTriangle, label: "SOS Alert", number: "", color: "bg-foreground text-background", desc: "Send SOS to contacts" },
];

const emergencySteps = [
  { step: "Stay calm", detail: "Take a deep breath. Panicking makes things worse." },
  { step: "Call for help", detail: "Use the buttons above to contact emergency services." },
  { step: "Share location", detail: "Your location helps responders find you faster." },
  { step: "Follow instructions", detail: "Listen to the operator and follow their guidance." },
  { step: "Stay safe", detail: "Move away from danger if you can do so safely." },
];

const EmergencyPage = () => (
  <Layout>
    <div className="container py-10 max-w-2xl">
      <div className="text-center mb-8">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emergency/10 mb-4">
          <AlertTriangle className="h-8 w-8 text-emergency" />
        </div>
        <h1 className="text-3xl font-bold">Emergency</h1>
        <p className="text-muted-foreground mt-1">One-tap access to emergency services</p>
      </div>

      {/* Emergency Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        {emergencyContacts.map((ec) => (
          <a
            key={ec.label}
            href={ec.number ? `tel:${ec.number}` : "#"}
            className={`${ec.color} rounded-xl p-6 text-center flex flex-col items-center gap-3 shadow-lg hover:opacity-90 transition-all active:scale-95`}
          >
            <ec.icon className="h-8 w-8" />
            <span className="font-bold">{ec.label}</span>
            <span className="text-xs opacity-80">{ec.desc}</span>
          </a>
        ))}
      </div>

      {/* 1-Tap Flow */}
      <div className="rounded-xl border bg-card p-6 mb-8">
        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" /> 1-Tap Emergency Flow
        </h2>
        <div className="flex items-center justify-between text-sm">
          {["Tap", "Call", "Location Shared", "Help Coming"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className="flex flex-col items-center text-center">
                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold mb-1">
                  {i + 1}
                </div>
                <span className="text-xs font-medium">{step}</span>
              </div>
              {i < 3 && <div className="h-px w-4 bg-border hidden sm:block" />}
            </div>
          ))}
        </div>
      </div>

      {/* What to do */}
      <div className="rounded-xl border bg-card p-6">
        <h2 className="font-bold text-lg mb-4">What to Do in an Emergency</h2>
        <div className="space-y-4">
          {emergencySteps.map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">{s.step}</p>
                <p className="text-xs text-muted-foreground">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Layout>
);

export default EmergencyPage;
