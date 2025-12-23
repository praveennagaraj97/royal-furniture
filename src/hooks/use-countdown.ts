import { useCallback, useEffect, useState } from 'react';

interface UseCountdownOptions {
  initialSeconds?: number;
  autoStart?: boolean;
}

interface UseCountdownReturn {
  secondsLeft: number;
  isActive: boolean;
  isExpired: boolean;
  start: () => void;
  reset: () => void;
  stop: () => void;
}

export const useCountdown = (
  options: UseCountdownOptions = {}
): UseCountdownReturn => {
  const { initialSeconds = 60, autoStart = true } = options;

  const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds);
  const [isActive, setIsActive] = useState<boolean>(autoStart);

  useEffect(() => {
    if (!isActive || secondsLeft <= 0) {
      return;
    }

    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isActive, secondsLeft]);

  const start = useCallback(() => {
    if (secondsLeft <= 0) {
      setSecondsLeft(initialSeconds);
    }
    setIsActive(true);
  }, [initialSeconds, secondsLeft]);

  const reset = useCallback(() => {
    setSecondsLeft(initialSeconds);
    setIsActive(true);
  }, [initialSeconds]);

  const stop = useCallback(() => {
    setIsActive(false);
  }, []);

  return {
    secondsLeft,
    isActive,
    isExpired: secondsLeft === 0,
    start,
    reset,
    stop,
  };
};
