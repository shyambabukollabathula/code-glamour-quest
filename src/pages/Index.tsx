import { useState, useEffect } from 'react';
import QuizDashboard from '@/components/QuizDashboard';
import QuizSession from '@/components/QuizSession';
import QuizResults from '@/components/QuizResults';
import BackgroundParticles from '@/components/BackgroundParticles';
import { useToast } from '@/hooks/use-toast';

interface QuizStats {
  totalQuestions: number;
  correctAnswers: number;
  totalTime: number;
  averageTime: number;
  streak: number;
  bestStreak: number;
}

interface QuizResults {
  totalQuestions: number;
  correctAnswers: number;
  totalTime: number;
  questions: Array<{
    question: any;
    userAnswer: string;
    isCorrect: boolean;
    timeSpent: number;
  }>;
}

type GameState = 'dashboard' | 'quiz' | 'results';
type QuizType = 'mixed' | 'programming' | 'puzzles';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('dashboard');
  const [currentQuizType, setCurrentQuizType] = useState<QuizType>('mixed');
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
  const [stats, setStats] = useState<QuizStats>({
    totalQuestions: 0,
    correctAnswers: 0,
    totalTime: 0,
    averageTime: 0,
    streak: 0,
    bestStreak: 0
  });
  const { toast } = useToast();

  // Load stats from localStorage on mount
  useEffect(() => {
    const savedStats = localStorage.getItem('codeGlamourStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  // Save stats to localStorage whenever stats change
  useEffect(() => {
    localStorage.setItem('codeGlamourStats', JSON.stringify(stats));
  }, [stats]);

  const handleStartQuiz = (type: QuizType) => {
    setCurrentQuizType(type);
    setGameState('quiz');
    toast({
      title: "Quiz Started!",
      description: `Good luck with your ${type} challenge!`,
    });
  };

  const handleQuizFinish = (results: QuizResults) => {
    setQuizResults(results);
    
    // Update stats
    const newStreak = results.questions[results.questions.length - 1]?.isCorrect 
      ? (results.questions.reduceRight((streak, q) => q.isCorrect ? streak + 1 : 0, 0))
      : 0;
    
    setStats(prevStats => {
      const newStats = {
        totalQuestions: prevStats.totalQuestions + results.totalQuestions,
        correctAnswers: prevStats.correctAnswers + results.correctAnswers,
        totalTime: prevStats.totalTime + results.totalTime,
        averageTime: Math.round((prevStats.totalTime + results.totalTime) / (prevStats.totalQuestions + results.totalQuestions)),
        streak: newStreak,
        bestStreak: Math.max(prevStats.bestStreak, newStreak)
      };
      return newStats;
    });

    setGameState('results');

    // Show completion toast
    const accuracy = Math.round((results.correctAnswers / results.totalQuestions) * 100);
    toast({
      title: "Quiz Complete!",
      description: `You scored ${accuracy}% (${results.correctAnswers}/${results.totalQuestions})`,
      duration: 5000,
    });
  };

  const handlePlayAgain = () => {
    setGameState('quiz');
  };

  const handleBackToDashboard = () => {
    setGameState('dashboard');
    setQuizResults(null);
  };

  const handleResetStats = () => {
    setStats({
      totalQuestions: 0,
      correctAnswers: 0,
      totalTime: 0,
      averageTime: 0,
      streak: 0,
      bestStreak: 0
    });
    localStorage.removeItem('codeGlamourStats');
    toast({
      title: "Stats Reset",
      description: "All your quiz statistics have been reset.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BackgroundParticles />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {gameState === 'dashboard' && (
          <QuizDashboard
            stats={stats}
            onStartQuiz={handleStartQuiz}
            onResetStats={handleResetStats}
          />
        )}
        
        {gameState === 'quiz' && (
          <QuizSession
            quizType={currentQuizType}
            onFinish={handleQuizFinish}
            onBack={handleBackToDashboard}
          />
        )}
        
        {gameState === 'results' && quizResults && (
          <QuizResults
            results={quizResults}
            onPlayAgain={handlePlayAgain}
            onBackToDashboard={handleBackToDashboard}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
