import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useFetch from "@/hooks/useFetch"
import { formatNumber, baseColors } from "@/lib/utils"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Leaf, Skull, Circle } from "lucide-react"
import { GiFluffyWing, GiFlamer, GiSpottedBug, GiElectric, GiPolarStar, GiSoundWaves, GiMailedFist, GiGhost, GiSnowflake2, GiSpikedDragonHead, GiStoneWall } from "react-icons/gi";
import { IoWater } from "react-icons/io5";
import { LuMountain } from "react-icons/lu";
import { BsFillNutFill } from "react-icons/bs";
import { WiMoonAltWaxingCrescent2 } from "react-icons/wi"

const DetailPage = () => {
    const { pokemonName } = useParams()

    const [{ data }, fetchData] = useFetch<any>({
        method: 'GET',
        url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    })

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const listIcon = (type: string) => {
        let icon
        switch (type) {
            case 'fire':
                icon = <GiFlamer size={24} />
                break;
            case 'grass':
                icon = <Leaf />
                break
            case 'poison':
                icon = <Skull />
                break
            case 'flying':
                icon = <GiFluffyWing size={24} />
                break
            case 'water':
                icon = <IoWater size={24} />
                break
            case 'bug':
                icon = <GiSpottedBug size={24} />
                break
            case 'normal':
                icon = <Circle />
                break
            case 'electric':
                icon = <GiElectric size={24} />
                break
            case 'ground':
                icon = <LuMountain size={24} />
                break
            case 'fairy':
                icon = <GiPolarStar size={24} />
                break
            case 'psychic':
                icon = <GiSoundWaves size={24} />
                break
            case 'fighting':
                icon = <GiMailedFist size={24} />
                break
            case 'ghost':
                icon = <GiGhost size={24} />
                break
            case 'steel':
                icon = <BsFillNutFill size={24} />
                break
            case 'ice':
                icon = <GiSnowflake2 size={24} />
                break
            case 'dragon':
                icon = <GiSpikedDragonHead size={24} />
                break
            case 'dark':
                icon = <WiMoonAltWaxingCrescent2 size={24} />
                break
            case 'rock':
                icon = <GiStoneWall size={24} />
                break
            default:
                icon = <Circle />
                break;
        }
        return icon
    }

    return (
        <div className="w-full relative py-4">
            <div className="container mx-auto px-6 xl:px-2">
                <div>

                    <div className="grid grid-cols-[300px_1fr_300px] gap-4">
                        <div className="flex flex-col gap-4">
                            <div>
                                <p className="text-2xl font-semibold capitalize">{pokemonName}</p>
                                <span className='text-gray-500 dark:text-gray-300 text-lg'>#{data ? formatNumber(data?.id, 4) : ''}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                {
                                    data?.types.map((item: { type: { name: string } }, index: number) => {
                                        const typeName = item.type.name
                                        const bgColor = `${baseColors[typeName].slice(0, -2) || '#ffffff'}`

                                        return <TooltipProvider key={index} >
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="rounded-full p-[10px] self-start text-white" key={index} style={{ backgroundColor: bgColor }}>
                                                        {typeName ? listIcon(typeName) : ''}
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p className='text-xs'>{typeName}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    })
                                }
                            </div>
                        </div>
                        <div className="flex items-center p-6 relative">
                            {/* start: atomic animation */}
                            <div className="border-2 border-[#D7D7EB] flex items-center justify-center rounded-full relative before:content-[''] before:absolute before:w-[20px] before:h-[20px] before:bg-water before:rounded-full before:-top-[30px] w-full aspect-square animate-orbit-1">
                                <div className="border-2 border-[#D7D7EB] flex items-center justify-center rounded-full relative before:content-[''] before:absolute before:w-[20px] before:h-[20px] before:bg-fire before:rounded-full before:-top-[30px] w-[calc(100%-120px)] aspect-square animate-orbit-2">
                                    <div className="border-2 border-[#D7D7EB] flex items-center justify-center rounded-full relative before:content-[''] before:absolute before:w-[20px] before:h-[20px] before:bg-electric before:rounded-full before:-top-[30px] w-[calc(100%-120px)] aspect-square animate-orbit-3">

                                    </div>
                                </div>
                            </div>
                            {/* end: atomic animation */}
                            <img src={data?.sprites.other['official-artwork']?.front_default} alt={data?.sprites.other['official-artwork']?.front_default} className='z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-xl aspect-square w-[342px]' />
                        </div>
                        <div>Pokemon Height, Weight and abilities</div>
                    </div>
                </div>
                Content Detail Pokemon {pokemonName}
            </div>
        </div>
    )
}

export default DetailPage