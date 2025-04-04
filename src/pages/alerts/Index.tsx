
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AlertsPage = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Alerts</h1>
      <p className="text-muted-foreground mb-8">
        Get notified when students need additional support or attention.
      </p>
      
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Alerts</CardTitle>
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> 3 New
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="p-4 text-center">
              <p className="text-muted-foreground">Alert system functionality coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default AlertsPage;
