import { useEffect, useRef, useState } from "react";

/**
 * Wraps children in a div that fades/slides in once it enters the viewport.
 * Used throughout the marketing pages instead of a global scroll listener.
 */
export default function Reveal({ children, as: Tag = "div", className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${visible ? "in" : ""} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
