
import { AlertTriangle, AlertCircle, CheckCircle, HelpCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface EmotionItem {
  id: string;
  student: string;
  emotion: "struggling" | "confused" | "satisfied" | "excellent";
  subject: string;
  time: string;
}

interface EmotionAnalysisProps {
  emotions: EmotionItem[];
}

export function EmotionAnalysis({ emotions }: EmotionAnalysisProps) {
  const getEmotionIcon = (emotion: EmotionItem["emotion"]) => {
    switch (emotion) {
      case "struggling":
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case "confused":
        return <HelpCircle className="h-5 w-5 text-amber-500" />;
      case "satisfied":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "excellent":
        return <CheckCircle className="h-5 w-5 text-primary" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  const getEmotionLabel = (emotion: EmotionItem["emotion"]) => {
    switch (emotion) {
      case "struggling":
        return "Struggling";
      case "confused":
        return "Confused";
      case "satisfied":
        return "Satisfied";
      case "excellent":
        return "Excellent";
      default:
        return "Unknown";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Emotional State</CardTitle>
        <CardDescription>Recent emotional analysis from student submissions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {emotions.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-lg border p-3 text-sm"
            >
              {getEmotionIcon(item.emotion)}
              <div className="flex-1 space-y-1">
                <p className="font-medium">{item.student}</p>
                <p className="text-muted-foreground">
                  {item.subject} · {item.time}
                </p>
              </div>
              <div className={`text-xs font-medium ${
                item.emotion === "struggling" ? "text-destructive" :
                item.emotion === "confused" ? "text-amber-500" :
                item.emotion === "satisfied" ? "text-green-500" :
                "text-primary"
              }`}>
                {getEmotionLabel(item.emotion)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
