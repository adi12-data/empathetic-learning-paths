
import { BarChart3, BookOpen, GraduationCap, Users } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Header } from "@/components/dashboard/Header";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ProgressTracker } from "@/components/dashboard/ProgressTracker";
import { EmotionAnalysis } from "@/components/dashboard/EmotionAnalysis";
import { GradingStatus } from "@/components/dashboard/GradingStatus";
import { RecommendedActions } from "@/components/dashboard/RecommendedActions";

const Index = () => {
  // Mock data for demonstration purposes
  const classProgress = [
    { id: "1", name: "English 101", progress: 78 },
    { id: "2", name: "Mathematics", progress: 65 },
    { id: "3", name: "Chemistry", progress: 92 },
    { id: "4", name: "History", progress: 45 },
  ];
  
  const emotionData = [
    { id: "1", student: "Emma Thompson", emotion: "struggling" as const, subject: "Mathematics", time: "10 mins ago" },
    { id: "2", student: "Michael Johnson", emotion: "excellent" as const, subject: "English", time: "1 hour ago" },
    { id: "3", student: "Sophia Williams", emotion: "confused" as const, subject: "Chemistry", time: "2 hours ago" },
    { id: "4", student: "David Brown", emotion: "satisfied" as const, subject: "History", time: "3 hours ago" },
  ];
  
  const assignmentData = [
    { id: "1", title: "Literary Analysis", course: "English 101", status: "graded" as const },
    { id: "2", title: "Algebraic Equations", course: "Mathematics", status: "pending" as const },
    { id: "3", title: "Chemical Reactions", course: "Chemistry", status: "pending" as const },
    { id: "4", title: "World War II Essay", course: "History", status: "draft" as const, dueDate: "Feb 15" },
  ];
  
  const recommendedActions = [
    { 
      id: "1", 
      title: "Student Needs Attention", 
      description: "Emma Thompson is struggling with Mathematics concepts. Consider scheduling a one-on-one session.", 
      icon: "alert" as const, 
      priority: "high" as const 
    },
    { 
      id: "2", 
      title: "Create Study Group", 
      description: "5 students are having similar difficulties with Chemistry. A study group could help them collaborate.", 
      icon: "message" as const, 
      priority: "medium" as const 
    },
    { 
      id: "3", 
      title: "Schedule Review Session", 
      description: "History class average is below 60%. Consider scheduling a review session before the next exam.", 
      icon: "calendar" as const, 
      priority: "medium" as const 
    },
    { 
      id: "4", 
      title: "Provide Additional Resources", 
      description: "Based on recent submissions, students would benefit from additional examples of literary analysis.", 
      icon: "book" as const, 
      priority: "low" as const 
    },
  ];

  return (
    <Layout>
      <Header />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard 
          title="Total Students" 
          value="124" 
          change="4%" 
          isPositive={true} 
          icon={<Users className="h-5 w-5" />} 
        />
        <StatsCard 
          title="Assignments" 
          value="38" 
          change="12%" 
          isPositive={true} 
          icon={<BookOpen className="h-5 w-5" />} 
        />
        <StatsCard 
          title="Class Average" 
          value="72%" 
          change="3%" 
          isPositive={false} 
          icon={<GraduationCap className="h-5 w-5" />} 
        />
        <StatsCard 
          title="Engagement" 
          value="89%" 
          change="5%" 
          isPositive={true} 
          icon={<BarChart3 className="h-5 w-5" />} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <EmotionAnalysis emotions={emotionData} />
        <GradingStatus assignments={assignmentData} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressTracker 
          title="Class Progress" 
          description="Current progress of classes based on completed assignments" 
          items={classProgress} 
        />
        <RecommendedActions actions={recommendedActions} />
      </div>
    </Layout>
  );
};

export default Index;
