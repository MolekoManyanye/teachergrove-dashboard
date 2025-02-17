
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

const SchoolManagement = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-lg w-full text-center">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-4">
            <Clock className="h-12 w-12 text-mint-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Coming Soon!</h2>
            <p className="text-gray-600">
              The School Management System is currently under development. We're working hard to bring you powerful tools for managing your educational institution.
            </p>
            <p className="text-sm text-mint-600">
              Stay tuned for updates!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchoolManagement;
