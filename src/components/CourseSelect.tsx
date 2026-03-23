import { type Course } from "@/data/ent211-questions";
import { BookOpen, ArrowRight } from "lucide-react";

interface Props {
  courses: Course[];
  username: string;
  onSelect: (course: Course) => void;
}

export function CourseSelect({ courses, username, onSelect }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg animate-slide-up">
        <div className="mb-8">
          <p className="text-muted-foreground text-sm">Welcome back,</p>
          <h1 className="text-2xl font-heading font-bold text-foreground">{username} 👋</h1>
          <p className="text-muted-foreground mt-1">Choose a course to begin your quiz session</p>
        </div>

        <div className="space-y-3">
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => onSelect(course)}
              className="w-full bg-card rounded-2xl p-5 border border-border hover:border-primary/50 hover:shadow-md transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-semibold text-foreground">{course.code}</h3>
                  <p className="text-sm text-muted-foreground truncate">{course.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{course.totalQuestions} questions • 50 per session • 30 min</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
