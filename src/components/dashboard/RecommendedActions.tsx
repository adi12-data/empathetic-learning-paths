
import { AlertTriangle, Book, Calendar, MessageCircle, PenTool } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Action {
  id: string;
  title: string;
  description: string;
  icon: "alert" | "message" | "calendar" | "book" | "pen";
  priority: "high" | "medium" | "low";
}

interface RecommendedActionsProps {
  actions: Action[];
}

export function RecommendedActions({ actions }: RecommendedActionsProps) {
  const { toast } = useToast();
  
  const handleAction = () => {
    toast({
      title: "Action triggered",
      description: "This feature will be fully implemented in a future update.",
    });
  };
  
  const getIcon = (type: Action["icon"]) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case "message":
        return <MessageCircle className="h-5 w-5 text-primary" />;
      case "calendar":
        return <Calendar className="h-5 w-5 text-secondary" />;
      case "book":
        return <Book className="h-5 w-5 text-accent" />;
      case "pen":
        return <PenTool className="h-5 w-5 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getPriorityClass = (priority: Action["priority"]) => {
    switch (priority) {
      case "high":
        return "text-destructive";
      case "medium":
        return "text-amber-500";
      case "low":
        return "text-green-500";
      default:
        return "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Recommendations</CardTitle>
        <CardDescription>Suggested actions based on student data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {actions.map((action) => (
            <div
              key={action.id}
              className="flex flex-col gap-2 rounded-lg border p-4 text-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getIcon(action.icon)}
                  <span className="font-medium">{action.title}</span>
                </div>
                <span className={`text-xs font-medium ${getPriorityClass(action.priority)}`}>
                  {action.priority.charAt(0).toUpperCase() + action.priority.slice(1)} Priority
                </span>
              </div>
              <p className="text-muted-foreground">{action.description}</p>
              <Button size="sm" className="self-end mt-2" onClick={handleAction}>
                Take Action
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
