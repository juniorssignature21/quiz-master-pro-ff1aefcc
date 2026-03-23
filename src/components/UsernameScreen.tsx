import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen } from "lucide-react";

interface Props {
  onSubmit: (name: string) => void;
}

export function UsernameScreen({ onSubmit }: Props) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) onSubmit(name.trim());
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-slide-up">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-foreground">QuizMaster</h1>
          <p className="text-muted-foreground mt-2 text-center">
            Test your knowledge across multiple courses
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 shadow-lg border border-border space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
              Enter your name to start
            </label>
            <Input
              id="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="h-12 text-base"
              autoFocus
            />
          </div>
          <Button type="submit" disabled={!name.trim()} className="w-full h-12 text-base font-semibold">
            Start Quiz
          </Button>
        </form>
      </div>
    </div>
  );
}
