
import { useState } from "react";
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
import { Search, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useToast } from "@/hooks/use-toast";

// Define the student type
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
  
  // Mock student data (would come from API in production)
  const mockStudents: Student[] = [
    {
      id: "1",
      full_name: "Emma Thompson",
      email: "emma.t@example.edu",
      grade_level: "10",
      last_active: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 minutes ago
      attendance: "95%",
      performance: "excellent"
    },
    {
      id: "2",
      full_name: "Michael Johnson",
      email: "michael.j@example.edu",
      grade_level: "11",
      last_active: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
      attendance: "87%",
      performance: "satisfied"
    },
    {
      id: "3",
      full_name: "Sophia Williams",
      email: "sophia.w@example.edu",
      grade_level: "9",
      last_active: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      attendance: "92%",
      performance: "confused"
    },
    {
      id: "4",
      full_name: "David Brown",
      email: "david.b@example.edu",
      grade_level: "10",
      last_active: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
      attendance: "98%",
      performance: "satisfied"
    },
    {
      id: "5",
      full_name: "Olivia Davis",
      email: "olivia.d@example.edu",
      grade_level: "12",
      last_active: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      attendance: "78%",
      performance: "struggling"
    },
    {
      id: "6",
      full_name: "Ethan Miller",
      email: "ethan.m@example.edu",
      grade_level: "11",
      last_active: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
      attendance: "85%",
      performance: "excellent"
    },
    {
      id: "7",
      full_name: "Ava Wilson",
      email: "ava.w@example.edu",
      grade_level: "9",
      last_active: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
      attendance: "90%",
      performance: "confused"
    },
    {
      id: "8",
      full_name: "Noah Moore",
      email: "noah.m@example.edu",
      grade_level: "10",
      last_active: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(), // 4 days ago
      attendance: "94%",
      performance: "satisfied"
    }
  ];

  // Filter students based on search query
  const filteredStudents = mockStudents.filter(student => 
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
        </CardContent>
      </Card>
    </Layout>
  );
};

export default StudentsPage;
