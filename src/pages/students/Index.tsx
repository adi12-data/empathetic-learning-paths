
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

// Mock student data
const mockStudents = [
  {
    id: "1",
    name: "Emma Thompson",
    email: "emma.t@school.edu",
    grade: "10th",
    performance: "struggling",
    lastActive: "2 hours ago",
    attendance: "92%"
  },
  {
    id: "2",
    name: "Michael Johnson",
    email: "michael.j@school.edu",
    grade: "9th",
    performance: "excellent",
    lastActive: "1 hour ago",
    attendance: "98%"
  },
  {
    id: "3",
    name: "Sophia Williams",
    email: "sophia.w@school.edu",
    grade: "10th",
    performance: "confused",
    lastActive: "3 hours ago",
    attendance: "85%"
  },
  {
    id: "4",
    name: "David Brown",
    email: "david.b@school.edu",
    grade: "11th",
    performance: "satisfied",
    lastActive: "30 mins ago",
    attendance: "90%"
  },
  {
    id: "5",
    name: "Olivia Davis",
    email: "olivia.d@school.edu",
    grade: "9th",
    performance: "excellent",
    lastActive: "5 hours ago",
    attendance: "96%"
  },
  {
    id: "6",
    name: "James Miller",
    email: "james.m@school.edu",
    grade: "11th",
    performance: "struggling",
    lastActive: "1 day ago",
    attendance: "78%"
  },
];

const StudentsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState(mockStudents);

  // Filter students based on search query
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <Button>
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
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No students found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.grade}</TableCell>
                    <TableCell>{getPerformanceBadge(student.performance)}</TableCell>
                    <TableCell>{student.lastActive}</TableCell>
                    <TableCell>{student.attendance}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default StudentsPage;
