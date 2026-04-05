import { useMemo } from "react";

type Star = {
  left: number;
  top: number;
  size: number;
  opacity: number;
  twinkleDuration: number;
  floatDuration: number;
  delay: number;
};

const HERO_STAR_COUNT = 30;
const AMBIENT_STAR_COUNT = 18;

const Starfield = () => {
  const heroStars = useMemo<Star[]>(() => {
    return Array.from({ length: HERO_STAR_COUNT }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 55,
      size: Math.random() > 0.8 ? 3 : Math.random() > 0.45 ? 2 : 1,
      opacity: 0.26 + Math.random() * 0.28,
      twinkleDuration: 3 + Math.random() * 6,
      floatDuration: 12 + Math.random() * 16,
      delay: Math.random() * 10,
    }));
  }, []);

  const ambientStars = useMemo<Star[]>(() => {
    return Array.from({ length: AMBIENT_STAR_COUNT }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() > 0.7 ? 2 : 1,
      opacity: 0.08 + Math.random() * 0.16,
      twinkleDuration: 7 + Math.random() * 10,
      floatDuration: 20 + Math.random() * 22,
      delay: Math.random() * 12,
    }));
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {ambientStars.map((star, index) => (
        <span
          key={`ambient-${index}-${star.left.toFixed(2)}-${star.top.toFixed(2)}`}
          className="star-dot absolute rounded-full bg-white"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.twinkleDuration}s, ${star.floatDuration}s`,
            animationDelay: `${star.delay}s, ${star.delay / 2}s`,
          }}
        />
      ))}

      {heroStars.map((star, index) => (
        <span
          key={`hero-${index}-${star.left.toFixed(2)}-${star.top.toFixed(2)}`}
          className="star-dot absolute rounded-full bg-white"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.twinkleDuration}s, ${star.floatDuration}s`,
            animationDelay: `${star.delay}s, ${star.delay / 2}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Starfield;
