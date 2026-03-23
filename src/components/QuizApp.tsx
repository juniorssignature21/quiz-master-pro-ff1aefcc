import { useState } from "react";
import { COURSES, type Course } from "@/data/ent211-questions";
import { UsernameScreen } from "./UsernameScreen";
import { CourseSelect } from "./CourseSelect";
import { QuizSession } from "./QuizSession";
import { QuizResults } from "./QuizResults";

export type QuizState = "username" | "course-select" | "quiz" | "results";

export interface QuizAnswer {
  questionId: number;
  selectedIndex: number;
  correctIndex: number;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function QuizApp() {
  const [state, setState] = useState<QuizState>("username");
  const [username, setUsername] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [sessionQuestions, setSessionQuestions] = useState<typeof COURSES[0]["questions"]>([]);

  const handleUsernameSubmit = (name: string) => {
    setUsername(name);
    setState("course-select");
  };

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    const shuffled = shuffleArray(course.questions).slice(0, 50);
    setSessionQuestions(shuffled);
    setAnswers([]);
    setState("quiz");
  };

  const handleQuizEnd = (quizAnswers: QuizAnswer[]) => {
    setAnswers(quizAnswers);
    setState("results");
  };

  const handleRestart = () => {
    setState("course-select");
    setAnswers([]);
    setSessionQuestions([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {state === "username" && <UsernameScreen onSubmit={handleUsernameSubmit} />}
      {state === "course-select" && <CourseSelect courses={COURSES} username={username} onSelect={handleCourseSelect} />}
      {state === "quiz" && selectedCourse && (
        <QuizSession
          questions={sessionQuestions}
          courseName={selectedCourse.code}
          onEnd={handleQuizEnd}
        />
      )}
      {state === "results" && selectedCourse && (
        <QuizResults
          username={username}
          courseName={selectedCourse.code}
          answers={answers}
          questions={sessionQuestions}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
