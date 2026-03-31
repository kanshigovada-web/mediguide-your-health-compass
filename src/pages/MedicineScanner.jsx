import { useState, useRef } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Upload, Camera, AlertTriangle, Pill, Info } from "lucide-react";
const mockMedicine = {
  name: "Ibuprofen 400mg",
  use: "Used for pain relief, reducing inflammation, and lowering fever. Common for headaches, muscle pain, arthritis, and menstrual cramps.",
  sideEffects: ["Stomach upset or nausea", "Dizziness or headache", "Mild heartburn", "Drowsiness"],
  warnings: ["Do not exceed recommended dosage", "Take with food to reduce stomach irritation", "Avoid alcohol while taking this medication"],
  avoid: "Avoid if you have kidney disease, are pregnant (3rd trimester), or are allergic to NSAIDs."
};
const MedicineScanner = () => {
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);
  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result);
    reader.readAsDataURL(file);
    setLoading(true);
    setTimeout(() => {
      setResult(mockMedicine);
      setLoading(false);
    }, 2e3);
  };
  return <Layout>
      <div className="container py-10 max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">Medicine Scanner</h1>
        <p className="text-muted-foreground mb-8">Upload a medicine image to learn about it</p>

        {!preview && <div
    onClick={() => fileRef.current?.click()}
    className="border-2 border-dashed rounded-xl p-16 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
  >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="font-medium mb-1">Click to upload an image</p>
            <p className="text-sm text-muted-foreground">or use your camera</p>
            <div className="flex justify-center gap-3 mt-4">
              <Button variant="outline" size="sm" onClick={(e) => {
    e.stopPropagation();
    fileRef.current?.click();
  }}>
                <Upload className="h-4 w-4 mr-1" /> Upload
              </Button>
              <Button variant="outline" size="sm" onClick={(e) => {
    e.stopPropagation();
    fileRef.current?.click();
  }}>
                <Camera className="h-4 w-4 mr-1" /> Camera
              </Button>
            </div>
          </div>}

        <input
    ref={fileRef}
    type="file"
    accept="image/*"
    capture="environment"
    className="hidden"
    onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
  />

        {preview && <div className="space-y-6 animate-slide-up">
            <div className="rounded-xl overflow-hidden border">
              <img src={preview} alt="Medicine" className="w-full max-h-64 object-contain bg-muted" />
            </div>

            {loading && <div className="rounded-xl border p-8 text-center animate-pulse">
                <Pill className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
                <p className="font-medium">Analyzing medicine...</p>
              </div>}

            {result && <div className="space-y-4">
                <div className="rounded-xl border bg-card p-5">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Pill className="h-5 w-5 text-secondary" /> {result.name}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-2">{result.use}</p>
                </div>

                <div className="rounded-xl border bg-card p-5">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Info className="h-4 w-4 text-secondary" /> Side Effects
                  </h3>
                  <ul className="space-y-2">
                    {result.sideEffects.map((s, i) => <li key={i} className="text-sm flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-warning flex-shrink-0" />
                        {s}
                      </li>)}
                  </ul>
                </div>

                <div className="rounded-xl border bg-card p-5">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-warning" /> Warnings
                  </h3>
                  <ul className="space-y-2">
                    {result.warnings.map((w, i) => <li key={i} className="text-sm flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emergency flex-shrink-0" />
                        {w}
                      </li>)}
                  </ul>
                </div>

                <div className="rounded-xl border-2 border-emergency/30 bg-emergency/5 p-5">
                  <h3 className="font-semibold text-emergency flex items-center gap-2">
                    ⚠️ Avoid if…
                  </h3>
                  <p className="text-sm mt-2">{result.avoid}</p>
                </div>

                <Button variant="outline" className="w-full" onClick={() => {
    setPreview(null);
    setResult(null);
  }}>
                  Scan Another Medicine
                </Button>
              </div>}
          </div>}

        <p className="text-xs text-muted-foreground text-center mt-8">
          ⚠️ Always verify medicine information with a pharmacist or doctor.
        </p>
      </div>
    </Layout>;
};
export default MedicineScanner;
