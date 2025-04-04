
import { CheckCircle, Clock, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Assignment {
  id: string;
  title: string;
  course: string;
  status: "graded" | "pending" | "draft";
  dueDate?: string;
}

interface GradingStatusProps {
  assignments: Assignment[];
}

export function GradingStatus({ assignments }: GradingStatusProps) {
  const { toast } = useToast();
  
  const handleGradeNow = () => {
    toast({
      title: "Feature not implemented",
      description: "Automatic grading will be available soon.",
    });
  };
  
  const getStatusIcon = (status: Assignment["status"]) => {
    switch (status) {
      case "graded":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "draft":
        return <FileText className="h-5 w-5 text-muted-foreground" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assignment Status</CardTitle>
        <CardDescription>Track grading progress for current assignments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="flex items-center justify-between gap-4 rounded-lg border p-3 text-sm"
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(assignment.status)}
                <div>
                  <p className="font-medium">{assignment.title}</p>
                  <p className="text-muted-foreground">{assignment.course}</p>
                </div>
              </div>
              
              {assignment.status === "pending" ? (
                <Button size="sm" onClick={handleGradeNow}>
                  Grade Now
                </Button>
              ) : assignment.status === "draft" ? (
                <span className="text-muted-foreground">
                  {assignment.dueDate ? `Due ${assignment.dueDate}` : "No due date"}
                </span>
              ) : (
                <span className="text-green-500 font-medium">Completed</span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
