import { useEffect, useState, useRef } from 'react';

import useFetch from '@/hooks/useFetch';
import { PokemonList, Pokemon } from '@/lib/interface';

import { Input } from "@/components/ui/input"
import CardComponent from '@/components/pokemon/CardComponent';
import { Spinner } from '@/components/ui/spinner';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const PokemonsPage = () => {
    const [search, setSearch] = useState('');
    const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const inputRef = useRef<HTMLInputElement>(null);

    const [{ data, loading }, fetchData] = useFetch<PokemonList>({
        method: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0'
    });

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (data?.results) {
            const copyData = data.results.map((item) => item);
            const filtered = copyData.filter((pokemon: Pokemon) =>
                pokemon.name.toLowerCase().includes(search.toLowerCase())
            );
            if (search !== '') {
                setFilteredPokemons(filtered);
                handlePageChange(1)
            } else {
                setFilteredPokemons(data.results);
                handlePageChange(1)
            }
        }
    }, [data, search]);

    const handleBlur = () => {
        const searchValue = inputRef.current?.value || '';
        setSearch(searchValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const searchValue = inputRef.current?.value || '';
            setSearch(searchValue);
        }
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredPokemons.slice(startIndex, endIndex);
    };

    const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);

    const getPaginationItems = () => {
        const paginationItems = [];
        const addEllipsis = (items: any, key) => items.push(<PaginationEllipsis key={key} />);

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                paginationItems.push(
                    <PaginationItem key={i}>
                        <PaginationLink href="#" onClick={() => handlePageChange(i)} isActive={currentPage === i}>
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        } else {
            paginationItems.push(
                <PaginationItem key={1}>
                    <PaginationLink href="#" onClick={() => handlePageChange(1)} isActive={currentPage === 1}>
                        1
                    </PaginationLink>
                </PaginationItem>
            );

            if (currentPage > 4) {
                addEllipsis(paginationItems, 'start-ellipsis');
            }

            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                paginationItems.push(
                    <PaginationItem key={i}>
                        <PaginationLink href="#" onClick={() => handlePageChange(i)} isActive={currentPage === i}>
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }

            if (currentPage < totalPages - 3) {
                addEllipsis(paginationItems, 'end-ellipsis');
            }

            paginationItems.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink href="#" onClick={() => handlePageChange(totalPages)} isActive={currentPage === totalPages}>
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return paginationItems;
    };

    return (
        <div className='w-full relative py-4'>
            <div className="container mx-auto px-6 xl:px-2">
                <div className="grid grid-rows-1 auto-rows-auto gap-4">
                    <div className='flex flex-col gap-4'>
                        <h2 className='text-2xl font-semibold dark:text-white'>Pokemon Species</h2>
                        <div className='flex items-center gap-2'>
                            <Input className='w-1/4' placeholder='🔎 Search Pokemon' ref={inputRef} onBlur={handleBlur} onKeyDown={handleKeyDown}
                            />
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

                    <Pagination className='self-center'>
                        <PaginationContent>
                            {currentPage > 1 && <PaginationItem>
                                <PaginationPrevious href="#" onClick={() => handlePageChange(currentPage - 1)} />
                            </PaginationItem>}
                            {getPaginationItems()}
                            {totalPages !== currentPage && <PaginationItem>
                                <PaginationNext href="#" onClick={() => handlePageChange(currentPage + 1)} />
                            </PaginationItem>}
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
}

export default PokemonsPage;
