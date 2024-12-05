import { useState, useEffect } from "react"
import { useLoaderData, useParams } from "react-router-dom"
import { formatNumber, baseColors } from "@/lib/utils"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Leaf, Skull, Circle } from "lucide-react"
import { GiFluffyWing, GiFlamer, GiSpottedBug, GiElectric, GiPolarStar, GiSoundWaves, GiMailedFist, GiGhost, GiSnowflake2, GiSpikedDragonHead, GiStoneWall } from "react-icons/gi";
import { IoWater, IoMaleSharp, IoFemaleSharp } from "react-icons/io5";
import { LuMountain } from "react-icons/lu";
import { BsFillNutFill } from "react-icons/bs";
import { WiMoonAltWaxingCrescent2 } from "react-icons/wi"
import TextLabel from "@/components/pokemon/TextLabel";
import { cn } from "@/lib/utils";
import {
    Carousel, CarouselContent,
    CarouselItem, type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import { Button } from "@/components/ui/button"

interface PokemonData {
    id: number;
    name: string;
    sprites: {
        other: {
            "official-artwork": {
                front_default: string;
            };
        };
    };
    types: Array<{
        type: {
            name: string;
        };
    }>;
    height: string;
    weight: string;
    gender: {
        female: number;
        male: number;
        genderless?: boolean
    };
    genera: {
        genus: string
    };
    hatchCounter: number
    eggGroups: {
        name: string
        url: string
    }[],
    desc: {
        text: string
        version: string
    }[]
}

const DetailPage = () => {
    const { pokemonName } = useParams()
    const data = useLoaderData() as PokemonData
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) return;

        // Update the current slide on select
        const updateCurrent = () => setCurrent(api.selectedScrollSnap());
        api.on("select", updateCurrent);

    }, [api]);

    console.log(current);

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
                <div className="grid grid-cols-[300px_1fr_300px] gap-4">
                    <div className="relative">
                        <div className="flex flex-col gap-2">
                            <div>
                                <p className="text-2xl font-semibold capitalize">{pokemonName}</p>
                                <span className='text-gray-500 dark:text-gray-300 text-lg'>#{data ? formatNumber(data?.id, 4) : ''}</span>
                            </div>
                            <div className="flex gap-2">
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
                        <div className="rounded-l-full absolute -right-[75px] top-1/2 transform -translate-y-1/2 h-[calc(100%-220px)] items-center overflow-hidden w-[calc(100%+75px)] z-0 border-water border border-r-0 shadow-[0px_0px_29px_10px_#1b56f73c_inset]">
                            <div className="h-[134%] bg-white rounded-l-[50%] absolute -right-[310px] top-1/2 transform -translate-y-1/2 w-full z-[-1] border-l border-water shadow-[28px_0px_29px_21px_#1b56f73c]">

                            </div>
                            <div className="relative h-full w-[calc(100%-80px)] mr-auto py-10 pl-8 flex flex-col items-center justify-center gap-4">
                                <Carousel
                                    plugins={[
                                        Autoplay({
                                            delay: 3000,
                                        }),
                                    ]}
                                    setApi={setApi}
                                    opts={{
                                        loop: true,
                                    }}
                                    className="w-full">
                                    <CarouselContent>
                                        {data.desc.map((value, index) => (
                                            <CarouselItem key={index} className="flex items-center">
                                                <div className="p-0">
                                                    {value.text}
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                </Carousel>
                                {/* start: Bullet Navigation */}
                                <div className=" flex justify-center gap-2">
                                    {data.desc.map((_, index) => (
                                        <Button
                                            key={index}
                                            size="icon"
                                            className={cn(
                                                "bullet",
                                                current === index && "bullet-active"
                                            )}
                                            onClick={() => api?.scrollTo(index)}
                                        />
                                    ))}
                                </div>
                                {/* end: Bullet Navigation */}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center p-6 relative z-10">
                        {/* start: atomic animation */}
                        <div className="border-2 border-[#D7D7EB] flex items-center justify-center rounded-full relative before:content-[''] before:absolute before:w-[18px] before:h-[18px] before:bg-water before:rounded-full before:-top-[25px] w-full aspect-square animate-orbit-1">
                            <div className="border-2 border-[#D7D7EB] flex items-center justify-center rounded-full relative before:content-[''] before:absolute before:w-[18px] before:h-[18px] before:bg-fire before:rounded-full before:-top-[25px] w-[calc(100%-118px)] aspect-square animate-orbit-2">
                                <div className="border-2 border-[#D7D7EB] flex items-center justify-center rounded-full relative before:content-[''] before:absolute before:w-[18px] before:h-[18px] before:bg-electric before:rounded-full before:-top-[25px] w-[calc(100%-120px)] aspect-square animate-orbit-3">

                                </div>
                            </div>
                        </div>
                        {/* end: atomic animation */}
                        <img src={data?.sprites.other['official-artwork']?.front_default} alt={data?.sprites.other['official-artwork']?.front_default} className='z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-xl aspect-square w-3/4' />
                    </div>
                    <div className="relative">
                        <div className="rounded-r-full absolute -left-[75px] top-1/2 transform -translate-y-1/2 h-[calc(100%-220px)] items-center overflow-hidden w-[calc(100%+75px)] z-0 border-fire border border-l-0 shadow-[0px_0px_29px_10px_#f71b1b3d_inset]">
                            <div className="h-[134%] bg-white rounded-r-[50%] absolute -left-[310px] top-1/2 transform -translate-y-1/2 w-full z-[-1] border-r border-fire shadow-[28px_0px_29px_-21px_#f71b1b3d]">

                            </div>
                            <div className="relative h-full w-[calc(100%-80px)] ml-auto py-10 flex items-center">
                                <div className="grid grid-cols-[100px_150px] auto-rows-min gap-3">
                                    <TextLabel title="Height" value={data.height} />
                                    <TextLabel title="Category" value={data.genera.genus} />
                                    <TextLabel title="Weight" value={data.weight} />
                                    <TextLabel title="Egg Cycle" value={data.hatchCounter} />
                                    <div className="text-lg">
                                        <p className="text-red-400 font-semibold">Gender</p>
                                        <div className="flex gap-2">
                                            <IoMaleSharp className="text-water" size={25} /> <span>:</span> <span>{data.gender.male}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <IoFemaleSharp className="text-fairy" size={25} /> <span>:</span> <span>{data.gender.female}</span>
                                        </div>
                                    </div>
                                    <TextLabel title="Egg Groups" value={data.eggGroups.map((value) => value.name).join(', ')} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                Content Detail Pokemon {pokemonName}
            </div>
        </div>
    )
}

export default DetailPage