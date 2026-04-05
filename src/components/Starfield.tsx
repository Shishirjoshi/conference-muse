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

const HERO_STAR_COUNT = 36;
const AMBIENT_STAR_COUNT = 24;

const Starfield = () => {
  const heroStars = useMemo<Star[]>(() => {
    return Array.from({ length: HERO_STAR_COUNT }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 55,
      size: Math.random() > 0.8 ? 3 : Math.random() > 0.45 ? 2 : 1,
      opacity: 0.26 + Math.random() * 0.28,
      twinkleDuration: 6 + Math.random() * 10,
      floatDuration: 22 + Math.random() * 24,
      delay: Math.random() * 10,
    }));
  }, []);

  const ambientStars = useMemo<Star[]>(() => {
    return Array.from({ length: AMBIENT_STAR_COUNT }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() > 0.7 ? 2 : 1,
      opacity: 0.08 + Math.random() * 0.16,
      twinkleDuration: 10 + Math.random() * 14,
      floatDuration: 30 + Math.random() * 30,
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
            animation: `star-twinkle ${star.twinkleDuration}s ease-in-out ${star.delay}s infinite, star-float ${star.floatDuration}s ease-in-out ${star.delay / 2}s infinite`,
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
            animation: `star-twinkle ${star.twinkleDuration}s ease-in-out ${star.delay}s infinite, star-float ${star.floatDuration}s ease-in-out ${star.delay / 2}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default Starfield;
