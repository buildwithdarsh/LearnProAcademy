"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useAsyncData<T>(
  fetcher: () => T,
  delay: number = 1000
): AsyncState<T> & { refetch: () => void } {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  // Store fetcher in a ref so the effect doesn't re-run when fetcher identity changes
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  // Store delay in a ref to avoid re-triggering
  const delayRef = useRef(delay);
  delayRef.current = delay;

  const refetch = useCallback(() => {
    setState({ data: null, loading: true, error: null });
    const jitter = delayRef.current + Math.random() * 400 - 200;
    const timeout = setTimeout(() => {
      try {
        const result = fetcherRef.current();
        setState({ data: result, loading: false, error: null });
      } catch (e) {
        setState({
          data: null,
          loading: false,
          error: e instanceof Error ? e.message : "Unknown error",
        });
      }
    }, Math.max(300, jitter));
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const cleanup = refetch();
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ...state, refetch };
}

export function useLazySection<T>(
  fetcher: () => T,
  delay: number = 400
): AsyncState<T> {
  return useAsyncData(fetcher, delay);
}

export function useSlowSection<T>(
  fetcher: () => T
): AsyncState<T> {
  // Use a ref so the random delay is stable across renders
  const delayRef = useRef(1800 + Math.random() * 700);
  return useAsyncData(fetcher, delayRef.current);
}

export function useActionDelay() {
  const [loading, setLoading] = useState(false);

  const execute = useCallback(async (action?: () => void) => {
    setLoading(true);
    const delay = 400 + Math.random() * 300;
    await new Promise((resolve) => setTimeout(resolve, delay));
    action?.();
    setLoading(false);
  }, []);

  return { loading, execute };
}
