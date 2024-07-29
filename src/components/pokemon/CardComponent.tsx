import React, { useEffect } from 'react';
import useFetch from '@/hooks/useFetch';
import { Pokemon } from '@/lib/interface'
import { getTypeColorClass } from '@/lib/utils';

const CardComponent: React.FC<Pokemon> = ({ url, name }) => {
    const [{ data, loading }, fetchData] = useFetch<any>({
        method: 'GET',
        url
    })

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const formatNumber = (number: number, length: number) => {
        return number.toString().padStart(length, '0');
    }
    return (
        <>
            {
                !loading && <div className={`rounded-md shadow-lg p-5 overflow-hidden border transition-all cursor-pointer border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white ${data?.types.length > 0 ? getTypeColorClass(data.types[0].type.name) : 'bg-white dark:bg-gray-900 '
                    }`}>
                    <div className="flex relative h-full">
                        <svg className='absolute z-0 -right-24 -top-16 transform -rotate-45 h-[400px] w-[400px] text-gray-200 opacity-40 dark:opacity-10' fill="currentColor" viewBox="0 0 512 512" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><title /><path d="M450.46,256.09C449.35,175.17,399.81,102.71,324,73.79,247.59,44.67,157.49,69,105.82,132.13,54.4,195,46.61,285.58,88.49,355.68c41.8,69.95,123.74,106,203.55,91.63,91-16.37,156.14-98.12,158.35-189.14A20.16,20.16,0,0,0,450.46,256.09ZM119.05,174.38C152.76,118,220.23,87,285,99.43c69.4,13.29,120.43,70.47,128.83,139H318.41c-8.26-27.36-32-48-62.62-48-29.65,0-55.15,20.65-63.11,48H97.74A158,158,0,0,1,119.05,174.38ZM286.13,256.1c-2,38.75-60.67,39.4-60.67,0S284.17,217.33,286.13,256.1Zm24,149.79C246.85,428.58,175,408.74,132.3,356.82a157.53,157.53,0,0,1-34.57-83H192.6c7.91,27.39,33.7,48,63.19,48,30.67,0,54.36-20.68,62.62-48h95.45C406.61,333,367.54,385.32,310.14,405.89Z" /></svg>
                        <div className='flex-1 flex flex-col z-10'>
                            <p className='text-lg dark:text-white font-semibold capitalize'>{name}</p>
                            <span className='text-gray-500 dark:text-gray-300'>#{data ? formatNumber(data?.id, 4) : ''}</span>
                            <div className=' mt-auto'>
                                {data?.types.map((item: any, index: number, array: any[]) => <span className='italic text-sm dark:text-gray-300' key={index}>{array.length === index + 1 ? item.type.name : (item.type.name + ',')} </span>)}
                            </div>
                        </div>
                        <img src={data?.sprites.other['official-artwork']?.front_default} alt={data?.sprites.other['official-artwork']?.front_default} className='z-10 h-[150px] w-[150px]' />
                    </div>
                </div>
            }
            {loading && <div className='rounded-md bg-gray-300 animate-pulse p-5'>
                <div className="flex h-full gap-4">
                    <div className="flex-1 flex flex-col gap-4">
                        <div className='h-4 w-full rounded-sm bg-gray-400 animate-pulse'></div>
                        <div className='h-3 w-1/2 rounded-sm bg-gray-400 animate-pulse'></div>
                    </div>
                    <div className='h-[150px] w-[150px] rounded-md bg-gray-400 animate-pulse'>

                    </div>
                </div>
            </div>}
        </>
    )
}

export default CardComponent