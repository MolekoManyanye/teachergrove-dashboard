
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

const Assessments = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Assessments</h1>
          <p className="text-gray-600">Manage your quizzes and tests</p>
        </div>
        <Button className="bg-mint-600 hover:bg-mint-700">
          <Plus className="mr-2 h-4 w-4" /> Create Assessment
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Mathematics Quiz {i}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">30 questions</p>
                <p className="text-sm text-gray-600">Duration: 45 minutes</p>
                <p className="text-sm text-gray-600">Due: March {i + 14}, 2024</p>
              </div>
              <div className="mt-4 space-x-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Assessments;
