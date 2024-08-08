import { useState, useCallback } from 'react';
import { FetchOptions, FetchState } from '@/lib/interface';
import { useToast } from "@/components/ui/use-toast"

const useFetch = <T>({ method, url, body, headers }: FetchOptions): [FetchState<T>, () => Promise<void>] => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const { toast } = useToast()

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
                throw new Error(`Network response was not ok, with status ${response.status}`);
            }

            const result = await response.json();
            setData(result);
        } catch (err: any) {
            setError(err.message);
            toast({
                variant: "destructive",
                title: `Uh oh! Something went wrong.`,
                description: err.message,
            })
        } finally {
            setLoading(false);
        }
    }, [url, method, body, headers]);

    return [{ data, loading, error }, fetchData]; // can destructure this array and rename the variables and function for clarity and to avoid naming conflicts at the component
};

export default useFetch;