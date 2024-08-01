import { useEffect, useState, useRef } from 'react';

import useFetch from '@/hooks/useFetch';
import { PokemonList, Pokemon } from '@/lib/interface';

import { Input } from "@/components/ui/input"
import CardComponent from '@/components/pokemon/CardComponent';
import { Spinner } from '@/components/ui/spinner';
import PaginationComponent from '@/components/pokemon/PaginationComponent';
import Combobox from '@/components/ui/combobox';

const PokemonsPage = () => {
    const [search, setSearch] = useState('');
    const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [selectedType, setSelectedType] = useState<string[]>([])
    const inputRef = useRef<HTMLInputElement>(null);

    const [{ data, loading }, fetchData] = useFetch<PokemonList>({
        method: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0'
    });

    const [{ data: listType }, fetchListtype] = useFetch<any>({
        method: 'GET',
        url: 'https://pokeapi.co/api/v2/type'
    });

    useEffect(() => {
        fetchData();
        fetchListtype()
    }, [fetchData, fetchListtype]);

    useEffect(() => {
        if (data?.results) {
            const copyData = data.results.map((item) => item);
            const filtered = copyData.filter((pokemon: Pokemon) =>
                pokemon.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredPokemons(filtered);
            setCurrentPage(1);
        }
    }, [data, search]);


    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const searchValue = inputRef.current?.value || '';
            setSearch(searchValue);
        }
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.value.length >= 3) {
            setSearch(event.target.value);
        } else if (event.target.value === '') {
            setSearch('')
        }
    }

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
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
                        <div className='flex items-center gap-2'>
                            <Input className='w-1/4 dark:text-white' placeholder='🔎 Search Pokemon' ref={inputRef} onKeyDown={handleKeyDown} onChange={handleOnChange}
                            />
                            <Combobox setSelectedType={setSelectedType} selected={selectedType} listData={listType?.results} placeholder='Select Pokemon Type' />
                        </div>
                    </div>
                    {loading && <div className='h-[80vh] flex items-center justify-center'>
                        <Spinner size="large"></Spinner>
                    </div>}

                    {!loading && <div className='grid grid-cols-3 gap-3 auto-rows-[180px]'>
                        {
                            getPaginatedData().map((data: Pokemon, index: number) => (
                                <CardComponent key={index} url={data.url} name={data.name} />
                            ))
                        }
                    </div>
                    }
                    <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
            </div>
        </div>
    );
}

export default PokemonsPage;
