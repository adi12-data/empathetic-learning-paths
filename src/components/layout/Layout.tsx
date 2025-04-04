
import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <main className={cn("flex-1 overflow-auto p-6", className)}>
        {children}
      </main>
    </div>
  );
}
