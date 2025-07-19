import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Target, 
  Clock, 
  Star,
  CheckCircle,
  XCircle,
  RotateCcw,
  Home,
  Share
} from 'lucide-react';
import { Question } from '@/data/questions';

interface QuizResultsProps {
  results: {
    totalQuestions: number;
    correctAnswers: number;
    totalTime: number;
    questions: Array<{
      question: Question;
      userAnswer: string;
      isCorrect: boolean;
      timeSpent: number;
    }>;
  };
  onPlayAgain: () => void;
  onBackToDashboard: () => void;
}

const QuizResults = ({ results, onPlayAgain, onBackToDashboard }: QuizResultsProps) => {
  const accuracy = Math.round((results.correctAnswers / results.totalQuestions) * 100);
  const averageTime = Math.round(results.totalTime / results.totalQuestions);
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getPerformanceMessage = () => {
    if (accuracy >= 90) return { message: "Outstanding! You're a coding genius! 🎉", color: "text-success" };
    if (accuracy >= 80) return { message: "Excellent work! Keep it up! 🌟", color: "text-success" };
    if (accuracy >= 70) return { message: "Good job! You're on the right track! 👍", color: "text-warning" };
    if (accuracy >= 60) return { message: "Not bad! Keep practicing! 💪", color: "text-warning" };
    return { message: "Keep learning! Every expert was once a beginner! 📚", color: "text-destructive" };
  };

  const performance = getPerformanceMessage();

  const getGrade = () => {
    if (accuracy >= 90) return "A+";
    if (accuracy >= 80) return "A";
    if (accuracy >= 70) return "B";
    if (accuracy >= 60) return "C";
    return "D";
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-24 h-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center glow-primary">
          <Trophy className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold gradient-text">Quiz Complete!</h1>
        <p className={`text-xl ${performance.color}`}>{performance.message}</p>
      </div>

      {/* Main Stats */}
      <Card className="glass-strong p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">{getGrade()}</div>
            <p className="text-sm text-muted-foreground">Grade</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">{accuracy}%</div>
            <p className="text-sm text-muted-foreground">Accuracy</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">
              {results.correctAnswers}/{results.totalQuestions}
            </div>
            <p className="text-sm text-muted-foreground">Correct</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-warning mb-2">{formatTime(results.totalTime)}</div>
            <p className="text-sm text-muted-foreground">Total Time</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <Progress value={accuracy} className="h-4" />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </Card>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Average Time</p>
              <p className="text-2xl font-bold">{formatTime(averageTime)}</p>
            </div>
            <Clock className="w-8 h-8 text-primary" />
          </div>
        </Card>

        <Card className="glass p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Fastest Answer</p>
              <p className="text-2xl font-bold">
                {formatTime(Math.min(...results.questions.map(q => q.timeSpent)))}
              </p>
            </div>
            <Target className="w-8 h-8 text-accent" />
          </div>
        </Card>

        <Card className="glass p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Perfect Streak</p>
              <p className="text-2xl font-bold text-warning">
                {Math.max(...results.questions.reduce((streaks, q, i) => {
                  if (q.isCorrect) {
                    streaks[streaks.length - 1] = (streaks[streaks.length - 1] || 0) + 1;
                  } else {
                    streaks.push(0);
                  }
                  return streaks;
                }, [0]))}
              </p>
            </div>
            <Star className="w-8 h-8 text-warning" />
          </div>
        </Card>
      </div>

      {/* Question Review */}
      <Card className="glass-strong p-6">
        <h3 className="text-xl font-semibold mb-4">Question Review</h3>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {results.questions.map((result, index) => (
            <div key={index} className="glass p-4 rounded-lg">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      Q{index + 1}
                    </Badge>
                    <Badge className={result.question.difficulty === 'easy' ? 'bg-success/20 text-success' : 
                                   result.question.difficulty === 'medium' ? 'bg-warning/20 text-warning' : 
                                   'bg-destructive/20 text-destructive'}>
                      {result.question.difficulty}
                    </Badge>
                    <Badge variant="outline">{result.question.category}</Badge>
                  </div>
                  <p className="text-sm font-medium mb-1">
                    {result.question.question}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Time: {formatTime(result.timeSpent)}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  {result.isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-success" />
                  ) : (
                    <XCircle className="w-6 h-6 text-destructive" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={onPlayAgain}
          className="glow-primary"
          size="lg"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Play Again
        </Button>
        
        <Button
          variant="outline"
          onClick={onBackToDashboard}
          size="lg"
        >
          <Home className="w-4 h-4 mr-2" />
          Dashboard
        </Button>
        
        <Button
          variant="outline"
          onClick={() => {
            const text = `Just completed a quiz on CodeGlamour Quest! 🎯\n\nScore: ${accuracy}% (${results.correctAnswers}/${results.totalQuestions})\nTime: ${formatTime(results.totalTime)}\nGrade: ${getGrade()}\n\n${performance.message}`;
            
            if (navigator.share) {
              navigator.share({
                title: 'CodeGlamour Quest Results',
                text: text
              });
            } else {
              navigator.clipboard.writeText(text);
            }
          }}
          size="lg"
        >
          <Share className="w-4 h-4 mr-2" />
          Share Results
        </Button>
      </div>
    </div>
  );
};

export default QuizResults;