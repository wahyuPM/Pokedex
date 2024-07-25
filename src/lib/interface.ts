export interface ApiRequestParams<T> {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: T;
    headers?: HeadersInit;
}

export interface ApiState<T = unknown> {
    data: T;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}