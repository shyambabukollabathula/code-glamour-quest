import { useEffect, useState } from 'react';

const BackgroundParticles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const particleArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 10,
    }));
    setParticles(particleArray);
  }, []);

  return (
    <div className="particles" style={{ background: 'rgba(0,240,255,0.05)' }}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            width: '32px',
            height: '32px',
            background: 'radial-gradient(circle at 30% 30%, #00F0FF 70%, #A259FF 100%)',
            boxShadow: '0 0 32px 12px #00F0FFCC, 0 0 64px 0 #A259FF99',
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundParticles;