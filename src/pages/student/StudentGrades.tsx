
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const grades = [
  {
    id: 1,
    subject: "Mathematics",
    assessment: "Chapter 5 Quiz",
    score: 85,
    grade: "A",
    date: "March 15, 2024",
  },
  {
    id: 2,
    subject: "Science",
    assessment: "Lab Test 1",
    score: 92,
    grade: "A+",
    date: "March 10, 2024",
  },
  {
    id: 3,
    subject: "English",
    assessment: "Literature Quiz",
    score: 78,
    grade: "B+",
    date: "March 5, 2024",
  },
];

const StudentGrades = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Grades</h1>
        <p className="text-gray-600">View your academic performance</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Grade Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Assessment</TableHead>
                <TableHead>Score (%)</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grades.map((grade) => (
                <TableRow key={grade.id}>
                  <TableCell className="font-medium">{grade.subject}</TableCell>
                  <TableCell>{grade.assessment}</TableCell>
                  <TableCell>{grade.score}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-mint-100 text-mint-800">
                      {grade.grade}
                    </span>
                  </TableCell>
                  <TableCell>{grade.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentGrades;
