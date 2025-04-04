
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressItem {
  id: string;
  name: string;
  progress: number;
}

interface ProgressTrackerProps {
  title: string;
  description?: string;
  items: ProgressItem[];
}

export function ProgressTracker({ title, description, items }: ProgressTrackerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-muted-foreground">{item.progress}%</div>
            </div>
            <Progress value={item.progress} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
