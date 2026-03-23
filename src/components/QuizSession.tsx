import { useState, useEffect, useCallback } from "react";
import { type Question } from "@/data/ent211-questions";
import { type QuizAnswer } from "./QuizApp";
import { Button } from "@/components/ui/button";
import { Clock, ChevronLeft, ChevronRight, Flag } from "lucide-react";

interface Props {
  questions: Question[];
  courseName: string;
  onEnd: (answers: QuizAnswer[]) => void;
}

const QUIZ_DURATION = 30 * 60; // 30 minutes in seconds

export function QuizSession({ questions, courseName, onEnd }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<number, number>>(new Map());
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION);

  const handleSubmit = useCallback(() => {
    const quizAnswers: QuizAnswer[] = questions.map((q) => ({
      questionId: q.id,
      selectedIndex: answers.get(q.id) ?? -1,
      correctIndex: q.correctIndex,
    }));
    onEnd(quizAnswers);
  }, [questions, answers, onEnd]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [handleSubmit]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isLowTime = timeLeft < 300; // less than 5 min
  const question = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const answeredCount = answers.size;

  const selectOption = (optIndex: number) => {
    setAnswers((prev) => new Map(prev).set(question.id, optIndex));
  };

  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-muted-foreground">{courseName}</span>
            <div className="text-sm font-heading font-semibold text-foreground">
              Q {currentIndex + 1}/{questions.length}
            </div>
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${isLowTime ? 'bg-destructive/10 text-destructive timer-pulse' : 'bg-muted text-foreground'}`}>
            <Clock className="w-4 h-4" />
            <span className="font-mono text-sm font-semibold">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="max-w-2xl mx-auto mt-2">
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-start justify-center p-4 pt-8">
        <div className="w-full max-w-2xl animate-slide-up" key={currentIndex}>
          <h2 className="text-lg font-heading font-semibold text-foreground mb-6 leading-relaxed">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((opt, idx) => {
              const isSelected = answers.get(question.id) === idx;
              return (
                <button
                  key={idx}
                  onClick={() => selectOption(idx)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? "border-primary bg-quiz-selected"
                      : "border-border bg-quiz-option hover:bg-quiz-option-hover hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold shrink-0 ${
                      isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                      {optionLabels[idx]}
                    </span>
                    <span className="text-foreground">{opt}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-card border-t border-border px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </Button>

          <span className="text-xs text-muted-foreground">
            {answeredCount}/{questions.length} answered
          </span>

          {currentIndex < questions.length - 1 ? (
            <Button onClick={() => setCurrentIndex((i) => i + 1)}>
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Flag className="w-4 h-4" /> Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
