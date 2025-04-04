
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Search, UserPlus, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Define the student type based on our view
type Student = {
  id: string;
  full_name: string;
  email: string | null;
  grade_level: string | null;
  last_active: string | null;
  attendance: string;
  performance?: 'excellent' | 'satisfied' | 'confused' | 'struggling';
};

const StudentsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 6;
  const { toast } = useToast();
  
  // Define a function to fetch students from Supabase
  const fetchStudents = async (): Promise<Student[]> => {
    const { data, error } = await supabase
      .from('student_view')
      .select('*');
    
    if (error) {
      console.error("Error fetching students:", error);
      toast({
        title: "Error fetching students",
        description: error.message,
        variant: "destructive",
      });
      return [];
    }

    // Add mock performance data to each student (would be real in a production app)
    const performanceOptions: ('excellent' | 'satisfied' | 'confused' | 'struggling')[] = 
      ['excellent', 'satisfied', 'confused', 'struggling'];
    
    return data.map(student => ({
      ...student,
      performance: performanceOptions[Math.floor(Math.random() * performanceOptions.length)]
    }));
  };

  // Use react-query to fetch and cache the students data
  const { data: students = [], isLoading, isError } = useQuery({
    queryKey: ['students'],
    queryFn: fetchStudents,
  });

  // Filter students based on search query
  const filteredStudents = students.filter(student => 
    student.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    student.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.grade_level?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddStudent = () => {
    toast({
      title: "Feature not implemented",
      description: "Student registration functionality will be available soon.",
    });
  };

  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case "excellent":
        return <Badge className="bg-green-500 hover:bg-green-600">{performance}</Badge>;
      case "satisfied":
        return <Badge className="bg-blue-500 hover:bg-blue-600">{performance}</Badge>;
      case "confused":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">{performance}</Badge>;
      case "struggling":
        return <Badge className="bg-red-500 hover:bg-red-600">{performance}</Badge>;
      default:
        return <Badge>{performance}</Badge>;
    }
  };

  // Format the last active time to be more human readable
  const formatLastActive = (timestamp: string | null) => {
    if (!timestamp) return "Never";
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return `${minutes} ${minutes === 1 ? 'min' : 'mins'} ago`;
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const days = Math.floor(diffInHours / 24);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Students</h1>
      <p className="text-muted-foreground mb-8">
        Manage student profiles, track individual performance, and provide personalized feedback.
      </p>
      
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={handleAddStudent}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Students</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            // Skeleton loading state
            <div className="space-y-4">
              {[...Array(studentsPerPage)].map((_, i) => (
                <div key={i} className="flex space-x-4 items-center">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-8">
              <p className="text-red-500">Failed to load students.</p>
              <p className="text-muted-foreground">Please try refreshing the page.</p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Attendance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentStudents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        No students found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.full_name}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.grade_level || "N/A"}</TableCell>
                        <TableCell>{student.performance && getPerformanceBadge(student.performance)}</TableCell>
                        <TableCell>{formatLastActive(student.last_active)}</TableCell>
                        <TableCell>{student.attendance}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              
              {/* Pagination */}
              {filteredStudents.length > studentsPerPage && (
                <Pagination className="mt-6">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                    
                    {[...Array(totalPages)].map((_, idx) => {
                      // Show first page, last page, and pages around current page
                      const pageNum = idx + 1;
                      if (pageNum === 1 || pageNum === totalPages || 
                          (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                        return (
                          <PaginationItem key={idx}>
                            <PaginationLink 
                              isActive={pageNum === currentPage}
                              onClick={() => handlePageChange(pageNum)}
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                        return <PaginationEllipsis key={idx} />;
                      }
                      return null;
                    })}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </Layout>
  );
};

export default StudentsPage;
