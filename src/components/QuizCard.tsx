import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, XCircle, Code, Brain, BookOpen } from 'lucide-react';
import { Question } from '@/data/questions';

interface QuizCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean, answer: string) => void;
  showResult?: boolean;
  userAnswer?: string;
  isCorrect?: boolean;
}

const QuizCard = ({ question, onAnswer, showResult, userAnswer, isCorrect }: QuizCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [codeInput, setCodeInput] = useState<string>(question.codeTemplate || '');

  const handleSubmit = () => {
    const answer = question.type === 'code-input' ? codeInput : selectedAnswer;
    if (!answer.trim()) return;

    const correct = question.type === 'code-input' 
      ? codeInput.replace(/\s+/g, ' ').trim().includes(question.correctAnswer.replace(/\s+/g, ' ').trim())
      : answer === question.correctAnswer;
    
    onAnswer(correct, answer);
  };

  const getCategoryIcon = () => {
    switch (question.type) {
      case 'code-input': return <Code className="w-4 h-4" />;
      case 'puzzle': return <Brain className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = () => {
    switch (question.difficulty) {
      case 'easy': return 'bg-success/20 text-success border-success/30';
      case 'medium': return 'bg-warning/20 text-warning border-warning/30';
      case 'hard': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  return (
    <Card className="bg-background/80 backdrop-blur-md border-primary/20 border-2 hover:border-primary/40 transition-all duration-300 p-6 space-y-6 shadow-xl hover:shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {getCategoryIcon()}
          <Badge variant="outline" className="bg-background/50 border-primary/30">
            {question.category}
          </Badge>
        </div>
        <Badge className={getDifficultyColor()}>
          {question.difficulty}
        </Badge>
      </div>

      {/* Question */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold gradient-text leading-relaxed">
          {question.question}
        </h3>

        {/* Answer Interface */}
        {question.type === 'multiple-choice' || question.type === 'puzzle' ? (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <Button
                key={index}
                variant={showResult 
                  ? option === question.correctAnswer
                    ? "default"
                    : option === userAnswer && !isCorrect
                    ? "destructive"
                    : "outline"
                  : selectedAnswer === option
                  ? "default"
                  : "outline"
                }
                className={`w-full text-left justify-start p-4 h-auto transition-all duration-200 ${
                  !showResult ? 'hover:scale-[1.02] hover:shadow-lg' : ''
                } ${showResult && option === question.correctAnswer ? 'shadow-primary/50 shadow-lg' : ''}`}
                onClick={() => !showResult && setSelectedAnswer(option)}
                disabled={showResult}
              >
                <span className="font-mono mr-2">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
                {showResult && option === question.correctAnswer && (
                  <CheckCircle className="w-5 h-5 ml-auto text-success" />
                )}
                {showResult && option === userAnswer && !isCorrect && (
                  <XCircle className="w-5 h-5 ml-auto text-destructive" />
                )}
              </Button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <Textarea
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              placeholder="Write your code here..."
              className="bg-background/50 border-primary/30 font-mono min-h-[200px] text-sm"
              disabled={showResult}
            />
            {question.testCases && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Test Cases:</h4>
                {question.testCases.map((test, index) => (
                  <div key={index} className="bg-background/30 p-3 rounded-lg text-sm font-mono border border-border/50">
                    <div className="text-accent">Input: {test.input}</div>
                    <div className="text-primary">Expected: {test.expectedOutput}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Submit Button */}
        {!showResult && (
          <Button
            onClick={handleSubmit}
            disabled={question.type === 'code-input' ? !codeInput.trim() : !selectedAnswer}
            className="w-full font-semibold py-3 shadow-lg hover:shadow-primary/50"
            size="lg"
          >
            Submit Answer
          </Button>
        )}

        {/* Result and Explanation */}
        {showResult && (
          <div className={`bg-background/60 backdrop-blur-sm p-4 rounded-lg border-l-4 ${
            isCorrect ? 'border-l-green-500' : 'border-l-red-500'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <CheckCircle className="w-5 h-5 text-success" />
              ) : (
                <XCircle className="w-5 h-5 text-destructive" />
              )}
              <span className="font-semibold">
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {question.explanation}
            </p>
            {question.type === 'code-input' && (
              <div className="mt-3 pt-3 border-t border-border">
                <h5 className="text-sm font-medium mb-2">Correct Solution:</h5>
                <pre className="bg-background/30 p-3 rounded text-xs font-mono overflow-x-auto border border-border/50">
                  {question.correctAnswer}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default QuizCard;