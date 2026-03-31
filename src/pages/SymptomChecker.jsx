import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertTriangle, Phone, MapPin, ArrowRight, Brain, ChevronDown } from "lucide-react";
const mockAnalyze = (symptoms, age, duration) => {
  const lower = symptoms.toLowerCase();
  const isEmergency = ["chest pain", "breathing", "unconscious", "seizure", "stroke", "heart"].some((k) => lower.includes(k));
  const isMedium = ["fever", "vomiting", "headache", "dizzy", "pain"].some((k) => lower.includes(k));
  if (isEmergency) {
    return {
      issue: "Potential Cardiac or Respiratory Emergency",
      urgency: "high",
      steps: [
        "Stay calm and sit or lie down immediately",
        "Call emergency services (911) right away",
        "Do not eat or drink anything",
        "If available, chew an aspirin (adults only)",
        "Keep airways clear"
      ],
      nextStep: "Go to hospital immediately",
      followUp: [
        "Are you experiencing numbness on one side?",
        "Is the pain spreading to your arm or jaw?",
        "Have you taken any medication recently?"
      ]
    };
  }
  if (isMedium || duration === ">3days") {
    return {
      issue: age === "child" ? "Possible Infection (Pediatric)" : "Possible Infection or Inflammatory Condition",
      urgency: "medium",
      steps: [
        "Rest and stay hydrated",
        "Monitor your temperature regularly",
        "Take over-the-counter pain relief if appropriate",
        age === "elderly" ? "Ensure someone is with you to monitor" : "Note any changes in symptoms"
      ],
      nextStep: "Visit a doctor within 24 hours",
      followUp: [
        "Do you have a rash or skin changes?",
        "Have you traveled recently?",
        "Are you on any current medications?"
      ]
    };
  }
  return {
    issue: "Minor Symptoms \u2014 Likely Self-Manageable",
    urgency: "low",
    steps: [
      "Rest and drink plenty of fluids",
      "Monitor your symptoms over the next 24 hours",
      "Use home remedies as appropriate",
      "Get adequate sleep"
    ],
    nextStep: "Stay home and monitor. Visit a doctor if symptoms worsen.",
    followUp: [
      "Is this the first time you've experienced this?",
      "Do you have any known allergies?"
    ]
  };
};
const urgencyConfig = {
  low: { label: "Low", bg: "bg-primary/10", text: "text-primary", border: "border-primary/30" },
  medium: { label: "Medium", bg: "bg-warning/10", text: "text-warning", border: "border-warning/30" },
  high: { label: "High", bg: "bg-emergency/10", text: "text-emergency", border: "border-emergency/30" }
};
const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState("adult");
  const [duration, setDuration] = useState("<1day");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleAnalyze = () => {
    if (!symptoms.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult(mockAnalyze(symptoms, age, duration));
      setLoading(false);
    }, 1500);
  };
  const uc = result ? urgencyConfig[result.urgency] : null;
  return <Layout>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-2">Symptom Checker</h1>
        <p className="text-muted-foreground mb-8">Describe your symptoms to get instant guidance</p>

        <div className="grid lg:grid-cols-2 gap-8">
          {
    /* Input */
  }
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Describe your symptoms</label>
              <textarea
    value={symptoms}
    onChange={(e) => setSymptoms(e.target.value)}
    placeholder="e.g., I have a headache and mild fever since yesterday..."
    className="w-full min-h-[120px] rounded-lg border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
  />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Age Group</label>
              <div className="flex gap-2">
                {["child", "adult", "elderly"].map((a) => <button
    key={a}
    onClick={() => setAge(a)}
    className={cn(
      "flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors capitalize",
      age === a ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-muted"
    )}
  >
                    {a === "child" ? "\u{1F476} Child" : a === "adult" ? "\u{1F9D1} Adult" : "\u{1F474} Elderly"}
                  </button>)}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Duration</label>
              <div className="flex gap-2">
                {[["<1day", "< 1 day"], ["1-3days", "1\u20133 days"], [">3days", "> 3 days"]].map(([val, label]) => <button
    key={val}
    onClick={() => setDuration(val)}
    className={cn(
      "flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors",
      duration === val ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-muted"
    )}
  >
                    {label}
                  </button>)}
              </div>
            </div>

            <Button onClick={handleAnalyze} className="w-full" size="lg" disabled={!symptoms.trim() || loading}>
              {loading ? "Analyzing..." : "Analyze Symptoms"}
              {!loading && <ArrowRight className="h-4 w-4 ml-1" />}
            </Button>
          </div>

          {
    /* Result */
  }
          <div>
            {!result && !loading && <div className="rounded-xl border-2 border-dashed p-12 text-center text-muted-foreground">
                <Brain className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p className="font-medium">Results will appear here</p>
                <p className="text-sm mt-1">Enter your symptoms and click Analyze</p>
              </div>}

            {loading && <div className="rounded-xl border p-12 text-center animate-pulse">
                <div className="h-8 w-48 bg-muted rounded mx-auto mb-4" />
                <div className="h-4 w-64 bg-muted rounded mx-auto mb-2" />
                <div className="h-4 w-56 bg-muted rounded mx-auto" />
              </div>}

            {result && uc && <div className={cn("rounded-xl border-2 p-6 space-y-5 animate-slide-up", uc.border, result.urgency === "high" && "bg-emergency/5")}>
                {result.urgency === "high" && <div className="flex items-center gap-2 bg-emergency text-emergency-foreground rounded-lg p-3 font-semibold animate-pulse-emergency">
                    <AlertTriangle className="h-5 w-5" />
                    🚨 This may be an emergency
                  </div>}

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">🧠 Possible Issue</p>
                  <p className="font-semibold text-lg">{result.issue}</p>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">🚨 Urgency Level</p>
                  <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold", uc.bg, uc.text)}>
                    {uc.label}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">⚡ What To Do NOW</p>
                  <ol className="space-y-2">
                    {result.steps.map((s, i) => <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">{i + 1}</span>
                        {s}
                      </li>)}
                  </ol>
                </div>

                <div className="rounded-lg bg-muted p-3">
                  <p className="text-xs font-medium text-muted-foreground mb-1">📍 Next Step</p>
                  <p className="text-sm font-medium">{result.nextStep}</p>
                </div>

                {result.urgency === "high" && <div className="flex gap-2">
                    <Button variant="emergency" className="flex-1 animate-none">
                      <Phone className="h-4 w-4 mr-1" /> Call Ambulance
                    </Button>
                    <Button variant="hero-outline" className="flex-1" asChild>
                      <a href="/hospitals"><MapPin className="h-4 w-4 mr-1" /> Find Hospital</a>
                    </Button>
                  </div>}

                {
    /* Follow-up */
  }
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                    <ChevronDown className="h-3 w-3" /> Follow-up Questions
                  </p>
                  <div className="space-y-2">
                    {result.followUp.map((q, i) => <div key={i} className="rounded-lg border p-3 text-sm hover:bg-muted/50 cursor-pointer transition-colors">
                        {q}
                      </div>)}
                  </div>
                </div>
              </div>}
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-8">
          ⚠️ This tool provides guidance only. Always consult a healthcare professional.
        </p>
      </div>
    </Layout>;
};
export default SymptomChecker;
