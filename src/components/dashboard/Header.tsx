
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  const { toast } = useToast();
  
  const handleNotImplemented = () => {
    toast({
      title: "Feature not implemented",
      description: "This feature will be available in a future update.",
    });
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, Professor Smith
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-10 w-[200px]"
            onClick={handleNotImplemented}
          />
        </div>
        
        <Button 
          size="icon" 
          variant="ghost"
          onClick={handleNotImplemented}
          className="relative"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-destructive"></span>
        </Button>
        
        <Avatar className="h-9 w-9 cursor-pointer" onClick={handleNotImplemented}>
          <AvatarImage src="" alt="User" />
          <AvatarFallback className="bg-primary text-primary-foreground">PS</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
