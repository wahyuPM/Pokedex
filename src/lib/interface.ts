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

// props interface
export interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (pageNumber: number) => void;
}

export interface ComboboxProps {
    setSelectedType: React.Dispatch<React.SetStateAction<string[]>>;
    listData: { name: string, url: string }[]
    selected: string[]
    placeholder: string
}