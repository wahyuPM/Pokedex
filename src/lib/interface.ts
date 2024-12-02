export interface PokemonList {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
}

export interface Pokemon {
    name: string
    url?: string
}

export interface PokemonType {
    pokemon: {
        pokemon: Pokemon;
    }[];
}

// props interface
export interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (pageNumber: number) => void;
}

export interface ComboboxProps {
    setSelectedType: (curentValue: string) => void
    listData: { name: string, url: string }[]
    selected: string[]
    placeholder: string
}