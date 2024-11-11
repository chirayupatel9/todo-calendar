import React from 'react';
import { CheckCircle } from 'lucide-react';

interface CompletionAnimationProps {
  onComplete: () => void;
}

export default function CompletionAnimation({ onComplete }: CompletionAnimationProps) {
  React.useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="animate-bounce">
        <CheckCircle className="w-24 h-24 text-green-500" />
      </div>
    </div>
  );
}