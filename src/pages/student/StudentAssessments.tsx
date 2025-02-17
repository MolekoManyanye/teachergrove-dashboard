
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

const assessments = [
  {
    id: 1,
    title: "Mathematics Chapter 5 Quiz",
    subject: "Mathematics",
    duration: "45 minutes",
    questions: 20,
    dueDate: "March 20, 2024",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Science Lab Test",
    subject: "Science",
    duration: "60 minutes",
    questions: 25,
    dueDate: "March 22, 2024",
    status: "upcoming",
  },
  {
    id: 3,
    title: "English Literature Quiz",
    subject: "English",
    duration: "30 minutes",
    questions: 15,
    dueDate: "March 18, 2024",
    status: "completed",
    score: 85,
  },
];

const StudentAssessments = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Assessments</h1>
        <p className="text-gray-600">View and attempt your quizzes and tests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assessments.map((assessment) => (
          <Card key={assessment.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{assessment.title}</CardTitle>
              <p className="text-sm text-gray-600">{assessment.subject}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-mint-600" />
                    <span className="text-sm text-gray-600">{assessment.duration}</span>
                  </div>
                  <span className="text-sm text-gray-600">{assessment.questions} questions</span>
                </div>
                <div className="text-sm text-gray-600">Due: {assessment.dueDate}</div>
                {assessment.status === "completed" ? (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Score: {assessment.score}%</span>
                    <Button variant="outline" size="sm">View Results</Button>
                  </div>
                ) : (
                  <Button className="w-full bg-mint-600 hover:bg-mint-700">Start Quiz</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentAssessments;
