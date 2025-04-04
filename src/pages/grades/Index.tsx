
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GradesPage = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Grades</h1>
      <p className="text-muted-foreground mb-8">
        Automated grading system with detailed feedback and performance analytics.
      </p>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Recent Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="p-4 text-center">
              <p className="text-muted-foreground">Grading functionality coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default GradesPage;
