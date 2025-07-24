import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Target, 
  Clock, 
  Brain, 
  Code, 
  BookOpen,
  Play,
  RotateCcw,
  Star
} from 'lucide-react';

interface QuizStats {
  totalQuestions: number;
  correctAnswers: number;
  totalTime: number;
  averageTime: number;
  streak: number;
  bestStreak: number;
}

interface QuizDashboardProps {
  stats: QuizStats;
  onStartQuiz: (type: 'mixed' | 'programming' | 'puzzles') => void;
  onResetStats: () => void;
}

const QuizDashboard = ({ stats, onStartQuiz, onResetStats }: QuizDashboardProps) => {
  const [timeDisplay, setTimeDisplay] = useState('');

  useEffect(() => {
    const formatTime = (seconds: number) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      
      if (hours > 0) {
        return `${hours}h ${minutes}m ${secs}s`;
      } else if (minutes > 0) {
        return `${minutes}m ${secs}s`;
      } else {
        return `${secs}s`;
      }
    };

    setTimeDisplay(formatTime(stats.totalTime));
  }, [stats.totalTime]);

  const accuracy = stats.totalQuestions > 0 
    ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100) 
    : 0;

  const getAccuracyColor = () => {
    if (accuracy >= 80) return 'text-success';
    if (accuracy >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const achievements = [
    { 
      name: 'First Steps', 
      description: 'Answer your first question', 
      achieved: stats.totalQuestions > 0,
      icon: <Play className="w-4 h-4" />
    },
    { 
      name: 'Streak Master', 
      description: 'Get 5 questions right in a row', 
      achieved: stats.bestStreak >= 5,
      icon: <Star className="w-4 h-4" />
    },
    { 
      name: 'Code Warrior', 
      description: 'Complete 10 programming questions', 
      achieved: stats.correctAnswers >= 10,
      icon: <Code className="w-4 h-4" />
    },
    { 
      name: 'Perfect Score', 
      description: 'Achieve 100% accuracy on 5+ questions', 
      achieved: accuracy === 100 && stats.totalQuestions >= 5,
      icon: <Trophy className="w-4 h-4" />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-text">
          CodeGlamour Quest
        </h1>
        <p className="text-xl text-muted-foreground">
          Master programming through interactive challenges
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-strong p-4 float">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Questions</p>
              <p className="text-2xl font-bold">{stats.totalQuestions}</p>
            </div>
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
        </Card>

        <Card className="glass-strong p-4 float-delayed">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Accuracy</p>
              <p className={`text-2xl font-bold ${getAccuracyColor()}`}>
                {accuracy}%
              </p>
            </div>
            <Target className="w-8 h-8 text-accent" />
          </div>
        </Card>

        <Card className="glass-strong p-4 float">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-2xl font-bold text-warning">{stats.streak}</p>
            </div>
            <Star className="w-8 h-8 text-warning" />
          </div>
        </Card>

        <Card className="glass-strong p-4 float-delayed">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Time</p>
              <p className="text-2xl font-bold">{timeDisplay}</p>
            </div>
            <Clock className="w-8 h-8 text-neon-pink" />
          </div>
        </Card>
      </div>

      {/* Progress Bar */}
      {stats.totalQuestions > 0 && (
        <Card className="glass-strong p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Overall Progress</h3>
              <Badge className="bg-primary/20 text-primary border-primary/30">
                {stats.correctAnswers}/{stats.totalQuestions} Correct
              </Badge>
            </div>
            <Progress value={accuracy} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Beginner</span>
              <span>Expert</span>
            </div>
          </div>
        </Card>
      )}

      {/* Quiz Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-strong p-6 interactive-hover cursor-pointer"
              onClick={() => onStartQuiz('programming')}>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
              <Code className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Programming</h3>
            <p className="text-muted-foreground">
              Test your coding skills with algorithm and syntax challenges
            </p>
            <Button className="w-full glow-primary">Start Coding</Button>
          </div>
        </Card>

        <Card className="glass-strong p-6 interactive-hover cursor-pointer"
              onClick={() => onStartQuiz('puzzles')}>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
              <Brain className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold">Brain Puzzles</h3>
            <p className="text-muted-foreground">
              Sharpen your logical thinking with mind-bending puzzles
            </p>
            <Button className="w-full glow-primary">Start Puzzles</Button>
          </div>
        </Card>

        <Card className="glass-strong p-6 interactive-hover cursor-pointer"
              onClick={() => onStartQuiz('mixed')}>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-warning/20 rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-warning" />
            </div>
            <h3 className="text-xl font-semibold">Mixed Challenge</h3>
            <p className="text-muted-foreground">
              Ultimate test with programming, logic, and aptitude questions
            </p>
            <Button className="w-full glow-primary">Start Challenge</Button>
          </div>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="glass-strong p-6">
        <h3 className="text-lg font-semibold mb-4">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${
              achievement.achieved 
                ? 'bg-success/20 border border-success/30' 
                : 'bg-muted/10 border border-muted/20'
            }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                achievement.achieved 
                  ? 'bg-success text-success-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {achievement.icon}
              </div>
              <div>
                <p className={`font-medium ${achievement.achieved ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {achievement.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Reset Stats */}
      {stats.totalQuestions > 0 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={onResetStats}
            className="text-muted-foreground hover:text-destructive"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset All Stats
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuizDashboard;