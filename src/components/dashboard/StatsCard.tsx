
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon?: ReactNode;
  className?: string;
}

export function StatsCard({
  title,
  value,
  change,
  isPositive = true,
  icon,
  className,
}: StatsCardProps) {
  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div className="text-primary">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={cn("text-xs mt-1", isPositive ? "text-green-500" : "text-red-500")}>
            {isPositive ? "↑" : "↓"} {change} from last week
          </p>
        )}
      </CardContent>
    </Card>
  );
}
