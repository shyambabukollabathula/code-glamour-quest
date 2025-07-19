import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Trophy,
  RotateCcw
} from 'lucide-react';
import { Question, getRandomQuestions, getQuestionsByCategory } from '@/data/questions';
import QuizCard from './QuizCard';

interface QuizSessionProps {
  quizType: 'mixed' | 'programming' | 'puzzles';
  onFinish: (results: QuizResults) => void;
  onBack: () => void;
}

interface QuizResults {
  totalQuestions: number;
  correctAnswers: number;
  totalTime: number;
  questions: Array<{
    question: Question;
    userAnswer: string;
    isCorrect: boolean;
    timeSpent: number;
  }>;
}

const QuizSession = ({ quizType, onFinish, onBack }: QuizSessionProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<{
    question: Question;
    userAnswer: string;
    isCorrect: boolean;
    timeSpent: number;
  }>>([]);
  const [showResult, setShowResult] = useState(false);
  const [sessionStartTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    // Initialize questions based on quiz type
    let selectedQuestions: Question[] = [];
    
    switch (quizType) {
      case 'programming':
        selectedQuestions = getRandomQuestions(10).filter(q => 
          ['JavaScript', 'Python', 'Algorithms', 'React', 'CSS', 'Database', 'Data Structures'].includes(q.category)
        );
        break;
      case 'puzzles':
        selectedQuestions = getRandomQuestions(10).filter(q => 
          q.type === 'puzzle' || q.category === 'Logic' || q.category === 'Math'
        );
        break;
      default:
        selectedQuestions = getRandomQuestions(10);
    }

    // Ensure we have enough questions, pad with random ones if needed
    if (selectedQuestions.length < 10) {
      const additionalQuestions = getRandomQuestions(10 - selectedQuestions.length);
      selectedQuestions = [...selectedQuestions, ...additionalQuestions];
    }

    setQuestions(selectedQuestions.slice(0, 10));
    setQuestionStartTime(Date.now());
  }, [quizType]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAnswer = (isCorrect: boolean, userAnswer: string) => {
    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
    const newAnswer = {
      question: questions[currentQuestionIndex],
      userAnswer,
      isCorrect,
      timeSpent
    };

    setAnswers(prev => [...prev, newAnswer]);
    setShowResult(true);

    // Auto-advance after 3 seconds
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setShowResult(false);
        setQuestionStartTime(Date.now());
      } else {
        // Quiz finished
        const totalTime = Math.floor((Date.now() - sessionStartTime) / 1000);
        const results: QuizResults = {
          totalQuestions: questions.length,
          correctAnswers: [...answers, newAnswer].filter(a => a.isCorrect).length,
          totalTime,
          questions: [...answers, newAnswer]
        };
        onFinish(results);
      }
    }, 3000);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowResult(false);
      setQuestionStartTime(Date.now());
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentQuestionIndex + (showResult ? 1 : 0)) / questions.length) * 100;
  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="glass-strong p-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="glass border-primary/30">
              {quizType.charAt(0).toUpperCase() + quizType.slice(1)} Quiz
            </Badge>
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{formatTime(timer)}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Progress */}
      <Card className="glass-strong p-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
          
          {/* Quick Stats */}
          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-success">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">{answers.filter(a => a.isCorrect).length}</span>
              </div>
              <div className="flex items-center gap-1 text-destructive">
                <XCircle className="w-4 h-4" />
                <span className="text-sm">{answers.filter(a => !a.isCorrect).length}</span>
              </div>
            </div>
            
            {showResult && currentQuestionIndex < questions.length - 1 && (
              <Button size="sm" onClick={nextQuestion}>
                Next Question
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Question */}
      <QuizCard
        question={currentQuestion}
        onAnswer={handleAnswer}
        showResult={showResult}
        userAnswer={currentAnswer?.userAnswer}
        isCorrect={currentAnswer?.isCorrect}
      />

      {/* Session Stats Preview */}
      {answers.length > 0 && (
        <Card className="glass p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-success">
                {answers.filter(a => a.isCorrect).length}
              </p>
              <p className="text-sm text-muted-foreground">Correct</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-destructive">
                {answers.filter(a => !a.isCorrect).length}
              </p>
              <p className="text-sm text-muted-foreground">Incorrect</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">
                {answers.length > 0 ? Math.round((answers.filter(a => a.isCorrect).length / answers.length) * 100) : 0}%
              </p>
              <p className="text-sm text-muted-foreground">Accuracy</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default QuizSession;