import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Activity, Pill, MapPin, AlertTriangle, Zap, Brain, Shield } from "lucide-react";
const features = [
  {
    icon: Activity,
    title: "Symptom Checker",
    description: "Describe your symptoms and get instant guidance on what to do next.",
    link: "/symptoms",
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    icon: Pill,
    title: "Medicine Scanner",
    description: "Upload a medicine image to learn its uses, side effects, and warnings.",
    link: "/medicine",
    color: "text-secondary",
    bg: "bg-secondary/10"
  },
  {
    icon: MapPin,
    title: "Nearby Hospitals",
    description: "Find hospitals near you with emergency availability and navigation.",
    link: "/hospitals",
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    icon: AlertTriangle,
    title: "Emergency Assistance",
    description: "One-tap access to ambulance, police, and fire brigade services.",
    link: "/emergency",
    color: "text-emergency",
    bg: "bg-emergency/10"
  }
];
const trustItems = [
  { icon: Brain, label: "AI-powered" },
  { icon: Zap, label: "Fast response" },
  { icon: Shield, label: "Emergency ready" }
];
const Index = () => <Layout>
    {
  /* Hero */
}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="container relative py-20 md:py-32 text-center">
        <div className="mx-auto max-w-2xl space-y-6 animate-slide-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance">
            Your Real-Time Health{" "}
            <span className="text-primary">Decision Assistant</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-balance">
            Know what to do, when it matters most
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Button asChild variant="hero" size="lg">
              <Link to="/symptoms">Check Symptoms</Link>
            </Button>
            <Button asChild variant="emergency" size="lg" className="animate-none">
              <Link to="/emergency">🚨 Emergency Help</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>

    {
  /* Features */
}
    <section className="container py-16">
      <h2 className="text-2xl font-bold text-center mb-10">How MediGuide Helps You</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f) => <Link
  key={f.title}
  to={f.link}
  className="group rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
>
            <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${f.bg} mb-4`}>
              <f.icon className={`h-6 w-6 ${f.color}`} />
            </div>
            <h3 className="font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.description}</p>
          </Link>)}
      </div>
    </section>

    {
  /* Trust */
}
    <section className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          {trustItems.map((t) => <div key={t.label} className="flex items-center gap-2 text-muted-foreground">
              <t.icon className="h-5 w-5 text-primary" />
              <span className="font-medium">{t.label}</span>
            </div>)}
        </div>
      </div>
    </section>

    {
  /* Disclaimer */
}
    <section className="container py-8 text-center">
      <p className="text-xs text-muted-foreground">
        ⚠️ MediGuide is not a medical diagnosis tool. It provides guidance only. Always consult a healthcare professional for serious conditions.
      </p>
    </section>
  </Layout>;
export default Index;
