import { useState, useCallback } from 'react';
import { FetchOptions, FetchState } from '@/lib/interface';

const useFetch = <T>({ method, url, body, headers }: FetchOptions): [FetchState<T>, () => void] => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
                body: body ? JSON.stringify(body) : null,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setData(result);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [url, method, body, headers]);

    return [{ data, loading, error }, fetchData];
};

export default useFetch;