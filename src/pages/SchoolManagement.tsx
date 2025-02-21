
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserManagement from "@/components/admin/UserManagement";
import { Card } from "@/components/ui/card";
import { Layout, Users, ShieldCheck, KeyRound } from "lucide-react";

const SchoolManagement = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">School Management Dashboard</h1>
        <p className="text-gray-600">Manage users, roles, and system settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-blue-50 border-blue-100">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="font-medium">Total Users</h3>
              <p className="text-2xl font-bold text-blue-600">250</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-green-50 border-green-100">
          <div className="flex items-center gap-3">
            <Layout className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="font-medium">Active Classes</h3>
              <p className="text-2xl font-bold text-green-600">12</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-purple-50 border-purple-100">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-purple-500" />
            <div>
              <h3 className="font-medium">Pending Approvals</h3>
              <p className="text-2xl font-bold text-purple-600">5</p>
            </div>
          </div>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            Roles & Permissions
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <KeyRound className="h-4 w-4" />
            Security Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <UserManagement />
        </TabsContent>

        <TabsContent value="roles">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Role Management</h2>
            <p className="text-gray-600">
              Configure roles and permissions for different user types.
              This feature is coming soon.
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
            <p className="text-gray-600">
              Configure password policies and security settings.
              This feature is coming soon.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SchoolManagement;
