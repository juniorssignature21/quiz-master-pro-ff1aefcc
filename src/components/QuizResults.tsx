import { type Question } from "@/data/ent211-questions";
import { type QuizAnswer } from "./QuizApp";
import { Button } from "@/components/ui/button";
import { RotateCcw, CheckCircle2, XCircle, Trophy } from "lucide-react";

interface Props {
  username: string;
  courseName: string;
  answers: QuizAnswer[];
  questions: Question[];
  onRestart: () => void;
}

export function QuizResults({ username, courseName, answers, questions, onRestart }: Props) {
  const score = answers.filter((a) => a.selectedIndex === a.correctIndex).length;
  const total = answers.length;
  const percentage = Math.round((score / total) * 100);
  const optionLabels = ["A", "B", "C", "D"];

  const getGrade = () => {
    if (percentage >= 70) return { label: "Excellent!", emoji: "🎉", color: "text-accent" };
    if (percentage >= 50) return { label: "Good job!", emoji: "👍", color: "text-secondary" };
    return { label: "Keep studying!", emoji: "📚", color: "text-destructive" };
  };

  const grade = getGrade();

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Score Card */}
        <div className="bg-card rounded-2xl p-8 border border-border shadow-lg text-center mb-8 animate-slide-up">
          <Trophy className="w-12 h-12 mx-auto text-secondary mb-3" />
          <h1 className="text-2xl font-heading font-bold text-foreground mb-1">Quiz Complete!</h1>
          <p className="text-muted-foreground mb-6">{username} • {courseName}</p>

          <div className="text-6xl font-heading font-bold text-foreground mb-2">
            {score}<span className="text-2xl text-muted-foreground">/{total}</span>
          </div>
          <p className={`text-lg font-semibold ${grade.color}`}>
            {grade.emoji} {percentage}% — {grade.label}
          </p>

          <div className="mt-6">
            <Button onClick={onRestart} size="lg" className="gap-2">
              <RotateCcw className="w-4 h-4" /> Try Another Quiz
            </Button>
          </div>
        </div>

        {/* Review */}
        <h2 className="font-heading font-semibold text-foreground text-lg mb-4">Review Answers</h2>
        <div className="space-y-4 pb-8">
          {questions.map((q, qIdx) => {
            const answer = answers[qIdx];
            const isCorrect = answer.selectedIndex === answer.correctIndex;
            const wasSkipped = answer.selectedIndex === -1;

            return (
              <div key={q.id} className="bg-card rounded-xl border border-border p-5 animate-slide-up">
                <div className="flex items-start gap-3 mb-3">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-quiz-correct shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-quiz-wrong shrink-0 mt-0.5" />
                  )}
                  <p className="font-medium text-foreground text-sm leading-relaxed">
                    <span className="text-muted-foreground mr-1">Q{qIdx + 1}.</span>
                    {q.question}
                  </p>
                </div>

                <div className="ml-8 space-y-1.5">
                  {q.options.map((opt, idx) => {
                    const isCorrectOption = idx === q.correctIndex;
                    const isSelectedWrong = idx === answer.selectedIndex && !isCorrect;

                    let optClasses = "text-sm py-1.5 px-3 rounded-lg ";
                    if (isCorrectOption) optClasses += "bg-quiz-correct/10 text-foreground font-medium";
                    else if (isSelectedWrong) optClasses += "bg-quiz-wrong/10 text-foreground line-through";
                    else optClasses += "text-muted-foreground";

                    return (
                      <div key={idx} className={optClasses}>
                        <span className="font-semibold mr-2">{optionLabels[idx]}.</span>
                        {opt}
                        {isCorrectOption && <span className="ml-2 text-quiz-correct text-xs font-semibold">✓ Correct</span>}
                        {isSelectedWrong && <span className="ml-2 text-quiz-wrong text-xs font-semibold">✗ Your answer</span>}
                      </div>
                    );
                  })}
                  {wasSkipped && (
                    <p className="text-xs text-muted-foreground italic mt-1">Not answered</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
