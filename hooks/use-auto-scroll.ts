import { useEffect, useRef } from "react";

export function useAutoScroll<T extends HTMLElement>(dependencies: any[]) {
  const containerRef = useRef<T>(null);
  const isNearBottomRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
      // Consider "near bottom" if within 100px
      isNearBottomRef.current = distanceFromBottom < 100;
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Only auto-scroll if user was near the bottom
    if (isNearBottomRef.current) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, dependencies);

  return containerRef;
}
