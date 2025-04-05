
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GraduationCap, BookOpen, School } from "lucide-react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = loginSchema.extend({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  role: z.enum(["teacher", "student"]),
});

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"teacher" | "student">("student");
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const navigate = useNavigate();
  const { signIn, signUp, user } = useAuth();

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/" replace />;
  }

  const validateForm = () => {
    try {
      if (isLogin) {
        loginSchema.parse({ email, password });
      } else {
        signupSchema.parse({ email, password, fullName, role });
      }
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (isLogin) {
      await signIn(email, password);
    } else {
      await signUp(email, password, fullName, role);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };

  return (
    <div className="flex min-h-screen items-center justify-center auth-page-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="auth-decoration auth-decoration-1"></div>
      <div className="auth-decoration auth-decoration-2"></div>
      <div className="auth-decoration auth-decoration-3"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
          <div className="flex justify-center items-center">
            <div className="bg-gradient-to-br from-primary to-secondary rounded-full p-4 shadow-lg">
              <School className="h-10 w-10 text-white" />
            </div>
          </div>
        </div>
        
        <Card className="auth-card mt-10">
          <CardHeader className="space-y-2 text-center pb-2">
            <CardTitle className="text-2xl font-bold">
              {isLogin ? "Welcome Back" : "Join TeachAssist"}
            </CardTitle>
            <CardDescription>
              {isLogin
                ? "Enter your credentials to access your account"
                : "Create an account to get started"
              }
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-2">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-white/50"
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive">{errors.fullName}</p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/50"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/50"
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label>I am a:</Label>
                  <RadioGroup 
                    value={role} 
                    onValueChange={(value) => setRole(value as "teacher" | "student")}
                    className="flex gap-6"
                  >
                    <div className="flex flex-col items-center space-y-2 bg-white/50 p-3 rounded-lg border border-border transition-all hover:border-primary">
                      <RadioGroupItem value="student" id="student" className="sr-only" />
                      <BookOpen className="h-6 w-6 text-muted-foreground" />
                      <Label htmlFor="student" className="cursor-pointer">Student</Label>
                    </div>
                    
                    <div className="flex flex-col items-center space-y-2 bg-white/50 p-3 rounded-lg border border-border transition-all hover:border-primary">
                      <RadioGroupItem value="teacher" id="teacher" className="sr-only" />
                      <GraduationCap className="h-6 w-6 text-muted-foreground" />
                      <Label htmlFor="teacher" className="cursor-pointer">Teacher</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4 border-t pt-4">
              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
              <Button type="button" variant="link" onClick={toggleMode} className="w-full">
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
