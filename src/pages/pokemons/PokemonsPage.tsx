import { useState, useRef, useMemo } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { Pokemon, PokemonType } from '@/lib/interface';

import { Inbox } from 'lucide-react';

import { Input } from "@/components/ui/input";
import CardComponent from '@/components/pokemon/CardComponent';
import { Spinner } from '@/components/ui/spinner';
import PaginationComponent from '@/components/pokemon/PaginationComponent';
import Combobox from '@/components/ui/combobox';
import { fetchPokemons, fetchTypes } from '@/util/http';

const PokemonsPage = () => {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [selectedType, setSelectedType] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    // Query to fetch Pokemon types
    const { data: listType, isLoading: loadingTypes } = useQuery({ queryKey: ['pokemonTypes'], queryFn: fetchTypes });

    // Build URLs based on selected types
    const urls = useMemo(() => {
        if (selectedType.length === 0) {
            return ['https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0'];
        }
        return selectedType.map(type => `https://pokeapi.co/api/v2/type/${type}`);
    }, [selectedType]);

    const { data: allData, isLoading: loadingPokemons } = useQuery({
        queryKey: ['pokemons', urls],
        queryFn: async () => {
            const data = await Promise.all(urls.map(fetchPokemons));
            if (selectedType.length === 0) {
                return data[0]?.results ?? [];
            }
            return data.flatMap((item: PokemonType) =>
                item?.pokemon?.map(({ pokemon }) => pokemon) ?? []
            );
        },
        placeholderData: keepPreviousData // Keeps data from the previous query while fetching new data
    });

    const filteredPokemons = useMemo(() => {
        return (allData ?? []).filter((pokemon: Pokemon) =>
            pokemon.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [allData, search]);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const searchValue = inputRef.current?.value || '';
            setSearch(searchValue);
            handlePageChange(1);
        }
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value.length >= 3 || value === '') {
            setSearch(value);
            handlePageChange(1);
        }
    };

    const handleOnChangeType = (currentValue: string) => {
        handlePageChange(1);
        setSelectedType((prev) =>
            prev.includes(currentValue)
                ? prev.filter((type) => type !== currentValue)
                : [...prev, currentValue]
        );
    };

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
                            <Input
                                className='w-full lg:w-[300px] dark:text-white'
                                placeholder='🔎 Search Pokemon'
                                ref={inputRef}
                                onKeyDown={handleKeyDown}
                                onChange={handleOnChange}
                            />
                            <Combobox
                                setSelectedType={handleOnChangeType}
                                selected={selectedType}
                                listData={listType?.results}
                                placeholder='Select Pokemon Type'
                            />
                        </div>
                    </div>
                    {(loadingPokemons || loadingTypes) && (
                        <div className='h-[80vh] flex items-center justify-center'>
                            <Spinner size="large" />
                        </div>
                    )}
                    {!loadingPokemons && filteredPokemons?.length > 0 && (
                        <div className='grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[250px] md:auto-rows-auto lg:auto-rows-[180px] min-h-[60vh] xl:min-h-[80vh]'>
                            {getPaginatedData().map((data: Pokemon) => (
                                <CardComponent key={data.name} url={data.url} name={data.name} />
                            ))}
                        </div>
                    )}
                    {!loadingPokemons && filteredPokemons.length === 0 && (
                        <div className='h-[80vh] flex items-center justify-center'>
                            <div className='p-6 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white flex flex-col gap-2 items-center justify-center aspect-square'>
                                <Inbox className='w-14 h-14' />
                                No results found
                            </div>
                        </div>
                    )}
                    {filteredPokemons.length > 0 && (
                        <PaginationComponent
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default PokemonsPage;
