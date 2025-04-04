
import { Layout } from "@/components/layout/Layout";
import { BarChart, LineChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AnalyticsPage = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Analytics</h1>
      <p className="text-muted-foreground mb-8">
        View comprehensive data analysis on student performance, engagement metrics, and learning trends.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Performance Trends</CardTitle>
            <LineChart className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[200px] flex items-center justify-center border-2 border-dashed rounded-md">
              <p className="text-muted-foreground">Analytics visualization coming soon</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Subject Distribution</CardTitle>
            <BarChart className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[200px] flex items-center justify-center border-2 border-dashed rounded-md">
              <p className="text-muted-foreground">Analytics visualization coming soon</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AnalyticsPage;
