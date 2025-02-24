import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface NewStudent {
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  grade: string;
  courses: string[];
}

interface GradeOption {
  level: number;
  section: string;
  display: string;
}

interface StudentResponse {
  status: "exists" | "created";
  message: string;
  student?: {
    firstName: string;
    lastName: string;
    email: string;
    studentId: string;
    grade: string;
    courses: string[];
  };
}

const StudentManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newStudent, setNewStudent] = useState<NewStudent>({
    firstName: "",
    lastName: "",
    email: "",
    studentId: "",
    grade: "",
    courses: [],
  });

  const gradeOptions: GradeOption[] = [
    { level: 9, section: "A", display: "9A" },
    { level: 9, section: "B", display: "9B" },
    { level: 9, section: "C", display: "9C" },
    { level: 10, section: "A", display: "10A" },
    { level: 10, section: "B", display: "10B" },
    { level: 10, section: "C", display: "10C" },
    { level: 11, section: "A", display: "11A" },
    { level: 11, section: "B", display: "11B" },
    { level: 11, section: "C", display: "11C" },
    { level: 12, section: "A", display: "12A" },
    { level: 12, section: "B", display: "12B" },
    { level: 12, section: "C", display: "12C" },
  ];

  const coursesByGrade: Record<string, string[]> = {
    "9A": ["Mathematics 9", "Science 9", "English 9", "History 9"],
    "9B": ["Mathematics 9", "Science 9", "English 9", "History 9"],
    "9C": ["Mathematics 9", "Science 9", "English 9", "History 9"],
    "10A": ["Mathematics 10", "Science 10", "English 10", "History 10"],
    "10B": ["Mathematics 10", "Science 10", "English 10", "History 10"],
    "10C": ["Mathematics 10", "Science 10", "English 10", "History 10"],
    "11A": ["Mathematics 11", "Physics 11", "English 11", "Chemistry 11"],
    "11B": ["Mathematics 11", "Physics 11", "English 11", "Chemistry 11"],
    "11C": ["Mathematics 11", "Physics 11", "English 11", "Chemistry 11"],
    "12A": ["Mathematics 12", "Physics 12", "English 12", "Chemistry 12"],
    "12B": ["Mathematics 12", "Physics 12", "English 12", "Chemistry 12"],
    "12C": ["Mathematics 12", "Physics 12", "English 12", "Chemistry 12"],
  };

  const handleGradeChange = (value: string) => {
    setNewStudent(prev => ({
      ...prev,
      grade: value,
      courses: coursesByGrade[value] || []
    }));
  };

  const removeCourse = (courseToRemove: string) => {
    setNewStudent(prev => ({
      ...prev,
      courses: prev.courses.filter(course => course !== courseToRemove)
    }));
  };

  const handleInputChange = (field: keyof NewStudent, value: string | string[]) => {
    setNewStudent(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddStudent = async () => {
    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
      });

      const data: StudentResponse = await response.json();

      if (data.status === "exists") {
        toast({
          title: "Student Already Exists",
          description: (
            <div className="mt-2 space-y-2 text-sm">
              <p>{data.message}</p>
              {data.student && (
                <div className="bg-muted p-3 rounded-md">
                  <p><strong>Name:</strong> {data.student.firstName} {data.student.lastName}</p>
                  <p><strong>Email:</strong> {data.student.email}</p>
                  <p><strong>Student ID:</strong> {data.student.studentId}</p>
                  <p><strong>Grade:</strong> {data.student.grade}</p>
                  <p><strong>Courses:</strong> {data.student.courses.join(", ")}</p>
                </div>
              )}
            </div>
          ),
          duration: 5000,
        });
      } else {
        toast({
          title: "Success",
          description: data.message,
        });
      }
      
      setIsDialogOpen(false);
      setNewStudent({
        firstName: "",
        lastName: "",
        email: "",
        studentId: "",
        grade: "",
        courses: [],
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add student. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === "all" || student.grade === selectedGrade;
    const matchesSubject = selectedSubject === "all" || student.subjects.includes(selectedSubject);
    
    return matchesSearch && matchesGrade && matchesSubject;
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Students</h1>
          <p className="text-gray-600">Manage your students</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-mint-600 hover:bg-mint-700">
              <Plus className="mr-2 h-4 w-4" /> Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>
                Enter the student's information below. All fields are required.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={newStudent.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={newStudent.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="student@school.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  value={newStudent.studentId}
                  onChange={(e) => handleInputChange("studentId", e.target.value)}
                  placeholder="STD123"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Grade</Label>
                <Select
                  value={newStudent.grade}
                  onValueChange={handleGradeChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {gradeOptions.map((grade) => (
                      <SelectItem key={`${grade.level}${grade.section}`} value={grade.display}>
                        {grade.display}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Courses</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {newStudent.courses.map((course) => (
                    <span
                      key={course}
                      className="bg-gray-100 px-2 py-1 rounded-md flex items-center gap-1"
                    >
                      {course}
                      <button
                        onClick={() => removeCourse(course)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddStudent}>Add Student</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4 items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                {gradeOptions.map((grade) => (
                  <SelectItem key={`${grade.level}${grade.section}`} value={grade.display}>
                    {grade.display}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {student.subjects.map((subject, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      student.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      {student.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentManagement;
