import { useEffect, useState, useRef, useMemo } from 'react';

import useFetch from '@/hooks/useFetch';
import { PokemonType, Pokemon } from '@/lib/interface';

import { Inbox } from 'lucide-react';

import { Input } from "@/components/ui/input"
import CardComponent from '@/components/pokemon/CardComponent';
import { Spinner } from '@/components/ui/spinner';
import PaginationComponent from '@/components/pokemon/PaginationComponent';
import Combobox from '@/components/ui/combobox';

const PokemonsPage = () => {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [selectedType, setSelectedType] = useState<string[]>([])
    const [url, setUrl] = useState<string[]>([])
    const [pokemonsData, setPokemonsData] = useState<Pokemon[]>([]); // State to store combined Pokémon data
    const [loading, setLoading] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null);

    const [{ data: listType }, fetchListtype] = useFetch<any>({
        method: 'GET',
        url: 'https://pokeapi.co/api/v2/type'
    });

    // Update URLs based on selected types
    useEffect(() => {
        if (selectedType.length === 0) {
            setUrl(['https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0']);
        } else {
            setUrl(selectedType.map(type => `https://pokeapi.co/api/v2/type/${type}`));
        }
    }, [selectedType]);

    // Fetch data for all URLs and combine results
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true)
                let newData: Pokemon[] = [];
                const allData = await Promise.all(url.map(url => fetch(url).then(res => res.json()))); //Promise.all will return error if there is one rejected promise //this will fetch the api paralel
                if (selectedType.length === 0) {
                    newData = allData[0]?.results ?? []
                } else {
                    newData = allData.flatMap((data: PokemonType) => {
                        return data?.pokemon?.map(({ pokemon }) => pokemon) ?? [];
                    });
                }
                setPokemonsData(newData)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.error('Error fetching Pokémon data:', error);
            }
        };
        fetchAllData();
    }, [url]);

    useEffect(() => {
        fetchListtype()
    }, [fetchListtype]);

    // With useMemo: The filtering is only recalculated when pokemonData or search changes, reducing unnecessary computations and potentially improving performance.
    const filteredPokemons = useMemo(() => {
        return pokemonsData.filter((pokemon: Pokemon) =>
            pokemon.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [pokemonsData, search]);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => { // define function type withot void, its optional
        if (event.key === 'Enter') {
            const searchValue = inputRef.current?.value || '';
            setSearch(searchValue);
            handlePageChange(1)
        }
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => { // define function type with void, its optional
        if (event.target.value.length >= 3) {
            setSearch(event.target.value);
            handlePageChange(1)
        } else if (event.target.value === '') {
            setSearch('')
            handlePageChange(1)
        }
    }

    const handleOnChangeType = (curentValue: string): void => {
        handlePageChange(1)
        setSelectedType((prev: string[]) =>
            prev.includes(curentValue)
                ? prev.filter((val) => val !== curentValue)
                : [...prev, curentValue]
        );
    }

    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredPokemons.slice(startIndex, endIndex);
    };

    const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);

    return (
        <div className='w-full relative py-4'>
            <div className="container mx-auto px-6 xl:px-2">
                <div className="grid grid-rows-1 auto-rows-auto gap-4">
                    <div className='flex flex-col gap-4'>
                        <h2 className='text-2xl font-semibold dark:text-white'>Pokemon Species</h2>
                        <div className='flex flex-col md:flex-row items-center gap-2'>
                            <Input className='w-full lg:w-[300px] dark:text-white' placeholder='🔎 Search Pokemon' ref={inputRef} onKeyDown={handleKeyDown} onChange={handleOnChange}
                            />
                            <Combobox setSelectedType={handleOnChangeType} selected={selectedType} listData={listType?.results} placeholder='Select Pokemon Type' />
                        </div>
                    </div>
                    {loading && <div className='h-[80vh] flex items-center justify-center'>
                        <Spinner size="large"></Spinner>
                    </div>}

                    {!loading && filteredPokemons?.length > 0 && <div className='grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[250px] md:auto-rows-auto lg:auto-rows-[180px] min-h-[60vh] xl:min-h-[80vh]'>
                        {
                            getPaginatedData().map((data: Pokemon) => (
                                <CardComponent key={data.name} url={data.url} name={data.name} />
                            ))
                        }
                    </div>
                    }
                    {
                        filteredPokemons.length === 0 && <div className='h-[80vh] flex items-center justify-center'>
                            <div className='p-6 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white flex flex-col gap-2 items-center justify-center aspect-square'>
                                <Inbox className='w-14 h-14' />
                                No results found
                            </div>
                        </div>
                    }
                    {
                        filteredPokemons.length > 0 && <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    }
                </div>
            </div>
        </div>
    );
}

export default PokemonsPage;
