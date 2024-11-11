import React, { useEffect } from 'react';

interface FireworksAnimationProps {
  onComplete: () => void;
}

export default function FireworksAnimation({ onComplete }: FireworksAnimationProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="firework" />
        <div className="firework" />
        <div className="firework" />
      </div>
      <style jsx>{`
        .firework {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 0.5rem;
          aspect-ratio: 1;
          background: radial-gradient(circle, #ff0 0%, transparent 100%);
          animation: firework 3s ease-out infinite;
        }
        
        .firework:nth-child(2) {
          animation-delay: 0.5s;
        }
        
        .firework:nth-child(3) {
          animation-delay: 1s;
        }
        
        @keyframes firework {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(30);
            opacity: 0.5;
          }
          100% {
            transform: translate(-50%, -50%) scale(60);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}