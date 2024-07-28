export interface FetchOptions {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    body?: any;
    headers?: HeadersInit;
}

export interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}


export interface PokemonList {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
}

export interface Pokemon {
    name: string
    url: string
}