
import { Layout } from "@/components/layout/Layout";

const StudentsPage = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Students</h1>
      <p className="text-muted-foreground">
        Manage student profiles, track individual performance, and provide personalized feedback.
      </p>
      
      <div className="mt-8 bg-card border rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
        <p>
          The student management features are under development. Check back soon for updates.
        </p>
      </div>
    </Layout>
  );
};

export default StudentsPage;
