
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CalendarPage = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Calendar</h1>
      <p className="text-muted-foreground mb-8">
        Schedule classes, assignments, and events with automated reminders.
      </p>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="p-4 text-center">
              <p className="text-muted-foreground">Calendar functionality coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default CalendarPage;
