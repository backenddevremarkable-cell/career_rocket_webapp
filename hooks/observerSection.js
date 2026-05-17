import { useEffect, useState } from "react";

const useScrollSpy = (sectionIds = []) => {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id);
          } else {
            // 👇 jab section viewport se bahar jaye
            setActive((prev) => (prev === id ? null : prev));
          }
        },
        {
          rootMargin: "-50% 0px -50% 0px",
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [sectionIds]);

  return active;
};

export default useScrollSpy;