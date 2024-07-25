import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiRequest } from '@/store/apiSlice';
import { RootState } from '@/store/index';

import { Input } from "@/components/ui/input"

const PokemonsPage = () => {
    const dispatch = useDispatch();
    const { data, status } = useSelector((state: RootState) => state.api);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(apiRequest({ url: 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0', method: 'GET' }));
        }
        console.log(data);
    }, [data, dispatch, status]);
    return (
        <div className='w-full relative my-4'>
            <div className="container mx-auto">
                <div className="grid grid-rows-2">
                    <div className='flex flex-col gap-4'>
                        <h2 className='text-2xl font-semibold dark:text-white'>Pokemon Species</h2>
                        <div className='flex items-center gap-2'>
                            <Input className='w-1/4' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonsPage