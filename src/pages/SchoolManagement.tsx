import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserManagement from "@/components/admin/UserManagement";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Layout, Users, GraduationCap, BookOpen, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SchoolManagement = () => {
  const [activeTab, setActiveTab] = useState("grades");
  const { toast } = useToast();
  const [isAddGradeOpen, setIsAddGradeOpen] = useState(false);
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [sections, setSections] = useState<string[]>([]);
  const [newSection, setNewSection] = useState("");
  const [gradeForm, setGradeForm] = useState({
    level: "",
    sections: [] as string[]
  });
  const [subjectForm, setSubjectForm] = useState({
    name: "",
    classes: [] as string[]
  });

  const [grades, setGrades] = useState([
    { level: 9, sections: ["A", "B", "C"] },
    { level: 10, sections: ["A", "B"] }
  ]);

  const [subjects, setSubjects] = useState([
    { name: "Mathematics", classes: ["9A", "9B", "10A"] },
    { name: "Science", classes: ["9A", "10A", "10B"] }
  ]);

  const handleAddSection = () => {
    if (newSection && !sections.includes(newSection)) {
      setSections([...sections, newSection.toUpperCase()]);
      setNewSection("");
    }
  };

  const removeSection = (section: string) => {
    setSections(sections.filter(s => s !== section));
  };

  const handleAddGrade = () => {
    if (!gradeForm.level || sections.length === 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newGrade = {
      level: parseInt(gradeForm.level),
      sections: sections
    };
    setGrades([...grades, newGrade]);
    
    toast({
      title: "Success",
      description: `Grade ${gradeForm.level} with sections ${sections.join(", ")} has been added`
    });
    
    setGradeForm({ level: "", sections: [] });
    setSections([]);
    setIsAddGradeOpen(false);
  };

  const handleAddSubject = () => {
    if (!subjectForm.name || subjectForm.classes.length === 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newSubject = {
      name: subjectForm.name,
      classes: subjectForm.classes
    };
    setSubjects([...subjects, newSubject]);
    
    toast({
      title: "Success",
      description: `Subject ${subjectForm.name} has been added to selected classes`
    });
    
    setSubjectForm({ name: "", classes: [] });
    setIsAddSubjectOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Manage grades, courses, and users</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-blue-50 border-blue-100">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="font-medium">Total Grades</h3>
              <p className="text-2xl font-bold text-blue-600">{grades.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-green-50 border-green-100">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="font-medium">Total Subjects</h3>
              <p className="text-2xl font-bold text-green-600">{subjects.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-purple-50 border-purple-100">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-purple-500" />
            <div>
              <h3 className="font-medium">Total Users</h3>
              <p className="text-2xl font-bold text-purple-600">250</p>
            </div>
          </div>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="grades" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Grades
          </TabsTrigger>
          <TabsTrigger value="subjects" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Subjects
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
        </TabsList>

        <TabsContent value="grades" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Grade Management</h2>
            <Dialog open={isAddGradeOpen} onOpenChange={setIsAddGradeOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Grade
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Grade</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="gradeLevel">Grade Level</Label>
                    <Input
                      id="gradeLevel"
                      type="number"
                      placeholder="Enter grade level (e.g., 9)"
                      value={gradeForm.level}
                      onChange={(e) => setGradeForm({ ...gradeForm, level: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Sections</Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        placeholder="Add section (e.g., A)"
                        value={newSection}
                        onChange={(e) => setNewSection(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddSection()}
                      />
                      <Button type="button" onClick={handleAddSection}>Add</Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {sections.map((section) => (
                        <span
                          key={section}
                          className="bg-gray-100 px-2 py-1 rounded-md flex items-center gap-1"
                        >
                          {section}
                          <button
                            onClick={() => removeSection(section)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button onClick={handleAddGrade} className="w-full">
                    Create Grade
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {grades.map((grade) => (
              <Card key={grade.level} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">Grade {grade.level}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {grade.sections.map((section) => (
                        <span
                          key={section}
                          className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm"
                        >
                          Section {section}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Subject Management</h2>
            <Dialog open={isAddSubjectOpen} onOpenChange={setIsAddSubjectOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Subject
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Subject</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="subjectName">Subject Name</Label>
                    <Input
                      id="subjectName"
                      placeholder="Enter subject name"
                      value={subjectForm.name}
                      onChange={(e) => setSubjectForm({ ...subjectForm, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Classes</Label>
                    <Select
                      value={subjectForm.classes.join(",")}
                      onValueChange={(value) => setSubjectForm({ ...subjectForm, classes: value.split(",") })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select classes" />
                      </SelectTrigger>
                      <SelectContent>
                        {grades.flatMap(grade =>
                          grade.sections.map(section => (
                            <SelectItem key={`${grade.level}${section}`} value={`${grade.level}${section}`}>
                              Grade {grade.level}-{section}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAddSubject} className="w-full">
                    Create Subject
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {subjects.map((subject) => (
              <Card key={subject.name} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{subject.name}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {subject.classes.map((className) => (
                        <span
                          key={className}
                          className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-sm"
                        >
                          Grade {className}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SchoolManagement;
