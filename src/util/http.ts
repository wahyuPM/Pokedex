import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

// Fetch Pokemon types
export const fetchTypes = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/type');
    if (!res.ok) throw new Error('Failed to fetch types');
    return res.json();
};

// Fetch Pokemon data
export const fetchPokemons = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch Pokémon data');
    return res.json();
};

export const fetchPokemonDetail = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch Pokémon detail data');
    return res.json();
};

export const fetchPokemonDetailPage = async (pokemonName: string) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (!res.ok) throw new Error('Failed to fetch Pokémon detail data');
    return res.json();
};