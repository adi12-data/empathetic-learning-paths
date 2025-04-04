
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Home,
  BarChart2,
  Settings,
  Users,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UserMenu } from "./UserMenu";
import { useAuth } from "@/context/AuthContext";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const { isTeacher } = useAuth();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleNotImplemented = () => {
    toast({
      title: "Feature not implemented",
      description: "This feature will be available in a future update.",
    });
  };

  // Define navigation based on user role
  const commonNavigation = [
    { name: "Dashboard", href: "/", icon: Home, forRoles: ['teacher', 'student'] },
    { name: "Grades", href: "/grades", icon: GraduationCap, forRoles: ['teacher', 'student'] },
    { name: "Courses", href: "/courses", icon: BookOpen, forRoles: ['teacher', 'student'] },
    { name: "Calendar", href: "/calendar", icon: Calendar, forRoles: ['teacher', 'student'] },
    { name: "Alerts", href: "/alerts", icon: AlertCircle, forRoles: ['teacher', 'student'] },
  ];
  
  const teacherOnlyNavigation = [
    { name: "Students", href: "/students", icon: Users, forRoles: ['teacher'] },
    { name: "Analytics", href: "/analytics", icon: BarChart2, forRoles: ['teacher'] },
  ];

  // Combine based on user role
  const navigation = isTeacher 
    ? [...commonNavigation, ...teacherOnlyNavigation] 
    : commonNavigation;

  return (
    <div
      className={cn(
        "flex flex-col h-full border-r bg-card transition-all duration-300",
        collapsed ? "w-[80px]" : "w-[250px]",
        className
      )}
    >
      <div className="flex items-center justify-between px-4 py-6">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h2 className="font-semibold text-lg">TeachAssist</h2>
          </div>
        )}
        {collapsed && <GraduationCap className="h-6 w-6 text-primary mx-auto" />}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={toggleSidebar}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className="px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  collapsed ? "justify-center" : ""
                )}
              >
                <item.icon className="h-5 w-5" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4">
        {!collapsed && (
          <div className="mb-4">
            <UserMenu />
          </div>
        )}
        <Button
          variant="ghost"
          size={collapsed ? "icon" : "default"}
          className={cn("w-full", collapsed ? "h-10 w-10" : "")}
          onClick={handleNotImplemented}
        >
          <Settings className="h-5 w-5" />
          {!collapsed && <span className="ml-2">Settings</span>}
        </Button>
      </div>
    </div>
  );
}
