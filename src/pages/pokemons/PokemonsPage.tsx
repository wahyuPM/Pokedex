import useFetch from '@/hooks/useFetch';
import { PokemonList, Pokemon } from '@/lib/interface';

import { Input } from "@/components/ui/input"
import CardComponent from '@/components/pokemon/CardComponent';


const PokemonsPage = () => {
    const { data } = useFetch<PokemonList>({ // the hook will expect the API to return an object that matches this type
        method: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon?limit=12&offset=0',
    });

    return (
        <div className='w-full relative py-4'>
            <div className="container mx-auto px-6 xl:px-2">
                <div className="grid grid-rows-1 auto-rows-auto gap-4">
                    <div className='flex flex-col gap-4'>
                        <h2 className='text-2xl font-semibold dark:text-white'>Pokemon Species</h2>
                        <div className='flex items-center gap-2'>
                            <Input className='w-1/4' placeholder='🔎 Search Pokemon' />
                        </div>
                    </div>
                    <div className='grid grid-cols-3 gap-3 auto-rows-[180px]'>
                        {
                            data?.results.map((data: Pokemon, index: number) => <CardComponent key={index} url={data.url} name={data.name} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonsPage