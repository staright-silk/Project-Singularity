import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

/**
 * Wraps children in a container that animates in with animejs once it enters
 * the viewport. Two modes:
 *   - default: the whole element fades/slides/blurs in as one unit.
 *   - staggerChildren: each direct child animates in sequence, for card
 *     grids and multi-line headings where a cascading entrance reads much
 *     more intentional than everything popping in at once.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  staggerChildren = false,
  delay = 0,
}) {
  const ref = useRef(null);
  const played = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = staggerChildren ? Array.from(el.children) : el;

    if (reduceMotion) {
      // Skip the animation entirely and just show the content.
      if (staggerChildren) {
        Array.from(el.children).forEach((child) => { child.style.opacity = "1"; });
      } else {
        el.style.opacity = "1";
      }
      return;
    }

    // Start hidden via inline style so there's no flash-of-unstyled-content
    // before the IntersectionObserver ever fires.
    if (staggerChildren) {
      Array.from(el.children).forEach((child) => {
        child.style.opacity = "0";
      });
    } else {
      el.style.opacity = "0";
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !played.current) {
            played.current = true;
            animate(targets, {
              opacity: [0, 1],
              translateY: [28, 0],
              filter: ["blur(6px)", "blur(0px)"],
              easing: "easeOutExpo",
              duration: 900,
              delay: staggerChildren ? stagger(90, { start: delay }) : delay,
            });
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [staggerChildren, delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
