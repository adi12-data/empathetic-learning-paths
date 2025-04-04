
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CoursesPage = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Courses</h1>
      <p className="text-muted-foreground mb-8">
        Manage course materials, curricula, and student enrollment.
      </p>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Active Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="p-4 text-center">
              <p className="text-muted-foreground">Course management functionality coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default CoursesPage;
