import {useState, useEffect} from 'react'

interface FetchProps<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

export function useFetch<T>(url: string): FetchProps<T> {
    const [state, setState] = useState<FetchProps<T>>({
        data: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        setState((current) => ({ ...current, loading: true, error: null }));
        const controller = new AbortController();
        const { signal } = controller;
        const fetchData = async()=> {
            try {
                const response = await fetch(url, { signal });
                if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status} (${response.statusText})`);
        }
                const data = await response.json();
                setState({
                    data,
                    loading: false,
                    error: null
                });
            } catch (error : unknown) {
                if (signal.aborted) {
                    return;
                }
                setState({
                    data: null,
                    loading: false,
                    error: error instanceof Error ? error : new Error(String(error)),
                });
            }
        };

        fetchData();
        return () => {
      controller.abort();
    };
    }, [url]);

    return state;
}