import { useEffect, useRef } from "react";

interface Props {
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  enabled?: boolean;
}

const useIntersectionObserver = <T extends HTMLElement>({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  enabled = true,
}: Props) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current || !enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, enabled]);

  return ref;
};

export default useIntersectionObserver;
