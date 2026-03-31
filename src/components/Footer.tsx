import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="border-t bg-muted/50 mt-auto">
    <div className="container py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-semibold">
          <Heart className="h-4 w-4 text-primary" />
          <span>MediGuide</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground text-center">
          <p>⚠️ This is not a medical diagnosis tool. For guidance only.</p>
          <p>Consult a doctor for serious conditions.</p>
        </div>
        <p className="text-xs text-muted-foreground">© 2026 MediGuide</p>
      </div>
    </div>
  </footer>
);

export default Footer;
