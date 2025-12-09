import { useEffect, useRef } from 'react';

export function useScrollReveal() {
  const elementsRef = useRef<HTMLElement[]>([]);

  const register = (el: HTMLElement | null) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          entry.target.classList.remove('opacity-0', 'translate-y-5'); // Tailwind utility removal for manual animation class
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px'
    });

    elementsRef.current.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return { register };
}