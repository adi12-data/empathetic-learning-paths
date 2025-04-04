
import { useState } from "react";
import { Link } from "react-router-dom";
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

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { toast } = useToast();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleNotImplemented = () => {
    toast({
      title: "Feature not implemented",
      description: "This feature will be available in a future update.",
    });
  };

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home, current: true },
    { name: "Students", href: "#", icon: Users, current: false, onClick: handleNotImplemented },
    { name: "Analytics", href: "#", icon: BarChart2, current: false, onClick: handleNotImplemented },
    { name: "Grades", href: "#", icon: GraduationCap, current: false, onClick: handleNotImplemented },
    { name: "Courses", href: "#", icon: BookOpen, current: false, onClick: handleNotImplemented },
    { name: "Calendar", href: "#", icon: Calendar, current: false, onClick: handleNotImplemented },
    { name: "Alerts", href: "#", icon: AlertCircle, current: false, onClick: handleNotImplemented },
  ];

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
            const Component = item.href === "#" ? "button" : Link;
            return (
              <Component
                key={item.name}
                to={item.href === "#" ? undefined : item.href}
                onClick={item.onClick}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  item.current
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  collapsed ? "justify-center" : ""
                )}
              >
                <item.icon className="h-5 w-5" />
                {!collapsed && <span>{item.name}</span>}
              </Component>
            );
          })}
        </nav>
      </div>
      <div className="p-4">
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
