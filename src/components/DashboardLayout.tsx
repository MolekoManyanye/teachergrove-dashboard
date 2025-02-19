
import React, { useState } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarMenuSub } from "@/components/ui/sidebar";
import { BookOpen, Users, BarChart, LogOut, Menu, GraduationCap, ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  const [isSubjectsExpanded, setIsSubjectsExpanded] = useState(true);
  
  // Determine if we're in student or teacher section
  const isStudentSection = location.pathname.startsWith("/student");

  const teacherMenuItems = [
    { icon: BookOpen, label: "Dashboard", path: "/teacher" },
    { icon: BookOpen, label: "Assessments", path: "/teacher/assessments" },
    { icon: Users, label: "Users", path: "/teacher/users" },
    { icon: BarChart, label: "Analytics", path: "/teacher/analytics" },
  ];

  const studentSubjects = [
    {
      name: "Mathematics",
      path: "/student/assessments/math",
      assessments: [
        { name: "Algebra Quiz", path: "/student/assessments/math/algebra" },
        { name: "Geometry Test", path: "/student/assessments/math/geometry" },
      ],
    },
    {
      name: "Science",
      path: "/student/assessments/science",
      assessments: [
        { name: "Biology Assessment", path: "/student/assessments/science/biology" },
        { name: "Chemistry Lab", path: "/student/assessments/science/chemistry" },
      ],
    },
    {
      name: "English",
      path: "/student/assessments/english",
      assessments: [
        { name: "Literature Review", path: "/student/assessments/english/literature" },
        { name: "Grammar Test", path: "/student/assessments/english/grammar" },
      ],
    },
  ];

  const studentMenuItems = [
    { icon: BookOpen, label: "Dashboard", path: "/student" },
    { 
      icon: GraduationCap, 
      label: "Subjects", 
      items: studentSubjects,
    },
    { icon: BarChart, label: "Grades", path: "/student/grades" },
  ];

  const menuItems = isStudentSection ? studentMenuItems : teacherMenuItems;

  const toggleSubject = (subjectName: string, event: React.MouseEvent) => {
    event.preventDefault();
    setExpandedSubject(expandedSubject === subjectName ? null : subjectName);
  };

  const toggleSubjects = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsSubjectsExpanded(!isSubjectsExpanded);
    // When closing subjects menu, also close any open subject
    if (isSubjectsExpanded) {
      setExpandedSubject(null);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar className="border-r border-gray-200">
          <SidebarContent>
            <div className="flex items-center justify-between px-4 py-6">
              <h1 className="text-xl font-semibold text-mint-600">
                {isStudentSection ? "StudentHub" : "TeacherGrove"}
              </h1>
              {/* Mobile menu trigger */}
              <div className="md:hidden">
                <SidebarTrigger />
              </div>
            </div>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      {item.items ? (
                        <div className="space-y-1">
                          <SidebarMenuButton
                            onClick={toggleSubjects}
                            className={`flex items-center justify-between w-full px-4 py-2 text-gray-700 hover:bg-mint-50 hover:text-mint-600 rounded-lg transition-colors`}
                          >
                            <div className="flex items-center gap-3">
                              <item.icon className="w-5 h-5" />
                              <span>{item.label}</span>
                            </div>
                            <ChevronRight className={`w-4 h-4 transition-transform ${
                              isSubjectsExpanded ? "rotate-90" : ""
                            }`} />
                          </SidebarMenuButton>
                          {isSubjectsExpanded && (
                            <SidebarMenuSub>
                              <div className="animate-in slide-in-from-left-1">
                                {item.items.map((subject) => (
                                  <div key={subject.name} className="space-y-1">
                                    <SidebarMenuButton
                                      onClick={(e) => toggleSubject(subject.name, e)}
                                      className={`flex items-center justify-between w-full px-4 py-2 text-gray-700 hover:bg-mint-50 hover:text-mint-600 rounded-lg transition-colors ${
                                        location.pathname.startsWith(subject.path) ? "bg-mint-50 text-mint-600" : ""
                                      }`}
                                    >
                                      <span className="pl-8">{subject.name}</span>
                                      <ChevronRight className={`w-4 h-4 transition-transform ${
                                        expandedSubject === subject.name ? "rotate-90" : ""
                                      }`} />
                                    </SidebarMenuButton>
                                    {expandedSubject === subject.name && (
                                      <div className="animate-in slide-in-from-left-1">
                                        {subject.assessments.map((assessment) => (
                                          <SidebarMenuButton
                                            key={assessment.name}
                                            onClick={() => navigate(assessment.path)}
                                            className={`flex items-center w-full pl-12 pr-4 py-1.5 text-sm text-gray-600 hover:bg-mint-50 hover:text-mint-600 rounded-lg transition-colors ${
                                              location.pathname === assessment.path ? "bg-mint-50 text-mint-600" : ""
                                            }`}
                                          >
                                            {assessment.name}
                                          </SidebarMenuButton>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </SidebarMenuSub>
                          )}
                        </div>
                      ) : (
                        <SidebarMenuButton
                          onClick={() => navigate(item.path)}
                          className={`flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-mint-50 hover:text-mint-600 rounded-lg transition-colors ${
                            location.pathname === item.path ? "bg-mint-50 text-mint-600" : ""
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <div className="absolute bottom-4 w-full px-4">
              <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 min-h-screen p-8 animate-fadeIn">
          {/* Desktop menu trigger */}
          <div className="hidden md:block mb-4">
            <SidebarTrigger className="hover:bg-mint-50" />
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};
