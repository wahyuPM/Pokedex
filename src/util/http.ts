import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

// Fetch Pokemon types
export const fetchTypes = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/type');
    if (!res.ok) throw new Error('Failed to fetch types');
    return res.json();
};

// Fetch Pokemon data
export const fetchPokemons = async ({ signal, url }: { signal?: AbortSignal, url: string }) => {

    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error('Failed to fetch Pokémon data');
    return res.json();
};

export const fetchPokemonDetail = async ({ signal, url }: { signal?: AbortSignal, url: string }) => {
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error('Failed to fetch Pokémon detail data');
    return res.json();
};

export const fetchPokemonDetailPage = async ({ signal, pokemonName, withGender = false }: { signal?: AbortSignal, pokemonName: string, withGender?: boolean }) => {
    try {
        // Fetch Pokémon details
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`, { signal });
        if (!res.ok) throw new Error('Failed to fetch Pokémon detail data');
        const pokemonData = await res.json();

        if (withGender) {
            // Fetch species data for gender information
            const speciesRes = await fetch(pokemonData.species.url, { signal });
            if (!speciesRes.ok) throw new Error('Failed to fetch Pokémon species data');
            const speciesData = await speciesRes.json();

            // Calculate gender distribution
            const genderRate = speciesData.gender_rate;
            let genderInfo;
            if (genderRate === -1) {
                genderInfo = { genderless: true };
            } else {
                const femaleChance = (genderRate / 8) * 100;
                const maleChance = 100 - femaleChance;
                genderInfo = { female: femaleChance, male: maleChance };
            }

            // Combine and return data
            return { ...pokemonData, gender: genderInfo };
        }

        return pokemonData
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching Pokémon data');
    }
};