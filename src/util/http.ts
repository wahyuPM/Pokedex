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

            // Gender rate logic
            const genderRate = speciesData.gender_rate;
            let genderInfo;

            if (genderRate === -1) {
                // Genderless Pokémon
                genderInfo = { genderless: true };
            } else {
                // Calculate male and female chances as percentages
                const femalePercentage = (genderRate / 8) * 100;
                const malePercentage = 100 - femalePercentage;

                genderInfo = {
                    male: `${malePercentage.toFixed()}%`, // One decimal point for better readability
                    female: `${femalePercentage.toFixed()}%`,
                };
            }

            // Filter descriptions for specific versions
            const allowedVersions = ['red', 'yellow', 'gold', 'silver', 'ruby'];
            const seen = new Set();
            const filteredDescriptions = speciesData.flavor_text_entries
                .filter(
                    (entry: { language: { name: string }; version: { name: string } }) =>
                        entry.language.name === 'en' && allowedVersions.includes(entry.version.name)
                )
                .filter((entry: any) => {
                    const cleanedText = entry.flavor_text.replace(/\n|\f/g, ' '); // Clean newlines
                    if (seen.has(cleanedText)) {
                        return false; // Skip duplicates
                    }
                    seen.add(cleanedText);
                    return true;
                })
                .map((entry: any) => ({
                    text: entry.flavor_text.replace(/\n|\f/g, ' '), // Clean newlines
                    version: entry.version.name, // Include game version
                }));

            // Find the English category
            const pokemonGenera = speciesData.genera.find(
                (entry: { language: { name: string } }) => entry.language.name === 'en'
            );

            // Convert height and weight
            const heightInMeters = pokemonData.height / 10; // From decimeters to meters
            const weightInKg = pokemonData.weight / 10; // From hectograms to kilograms

            const hatchCounter = speciesData.hatch_counter
            const eggGroups = speciesData.egg_groups

            // Combine and return data
            return {
                ...pokemonData, gender: genderInfo, desc: filteredDescriptions, genera: pokemonGenera, hatchCounter, height: heightInMeters.toFixed(1) + ' m',
                weight: weightInKg.toFixed(1) + ' kg', eggGroups
            };
        }


        return pokemonData
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching Pokémon data');
    }
};