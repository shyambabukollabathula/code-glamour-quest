
import { useEffect, useState } from 'react';

const NUM_PARTICLES = 60;
const NUM_LINES = 8;

const BackgroundParticles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; left: number; top: number; delay: number; duration: number; size: number }>>([]);
  const [lines, setLines] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const particleArray = Array.from({ length: NUM_PARTICLES }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 12,
      size: 24 + Math.random() * 32,
    }));
    setParticles(particleArray);

    const lineArray = Array.from({ length: NUM_LINES }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 12 + Math.random() * 10,
    }));
    setLines(lineArray);
  }, []);

  return (
    <div
      className="particles-bg"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Animated grid overlay */}
      <svg
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0, opacity: 0.12 }}
      >
        {[...Array(20)].map((_, i) => (
          <line
            key={`h${i}`}
            x1={0}
            y1={(i * 5) + '%'}
            x2={'100%'}
            y2={(i * 5) + '%'}
            stroke="#00F0FF"
            strokeWidth="0.5"
          />
        ))}
        {[...Array(20)].map((_, i) => (
          <line
            key={`v${i}`}
            x1={(i * 5) + '%'}
            y1={0}
            x2={(i * 5) + '%'}
            y2={'100%'}
            stroke="#A259FF"
            strokeWidth="0.5"
          />
        ))}
      </svg>

      {/* Glowing moving lines */}
      {lines.map((line) => (
        <div
          key={line.id}
          style={{
            position: 'absolute',
            left: `${line.left}%`,
            top: 0,
            width: '2px',
            height: '100%',
            background: 'linear-gradient(180deg, #A259FF 0%, #00F0FF 100%)',
            opacity: 0.18,
            filter: 'blur(2px)',
            animation: `moveLine ${line.duration}s linear ${line.delay}s infinite`,
          }}
        />
      ))}

      {/* Keyframes for animation */}
      <style>{`
        @keyframes moveLine {
          0% { opacity: 0.18; }
          50% { opacity: 0.35; }
          100% { opacity: 0.18; }
        }
      `}</style>
    </div>
  );
};

export default BackgroundParticles;