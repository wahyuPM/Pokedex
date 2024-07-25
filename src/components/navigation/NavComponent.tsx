import Logo from '@/assets/logo.png'
import { Moon, Sun, LayoutDashboard, RefreshCcw } from "lucide-react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

import { NavLink } from 'react-router-dom'

const NavComponent = () => {
    const { setTheme } = useTheme()
    return (
        <nav className='w-full min-h-6 shadow-lg bg-white dark:bg-gray-950 dark:shadow-gray-800 fixed top-0 z-50'>
            <div className="container mx-auto">
                <div className="flex gap-6 items-center py-4 px-2">
                    {/* Logo */}
                    <img src={Logo} alt="Pokemon" className='w-[130px] h-auto order-2 lg:order-1' />
                    {/* Nav Menu */}
                    <NavigationMenu className='order-1 lg:order-2'>
                        <NavigationMenuList>
                            <NavigationMenuItem >
                                <NavigationMenuTrigger className='dark:text-white'>Pokedex</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[300px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                        <li className="row-span-3">

                                            <NavLink
                                                className={({ isActive }) => (isActive ? 'bg-gradient-to-b' : '') + ' flex h-full w-full select-none flex-col justify-end rounded-md hover:bg-gradient-to-b from-gray-50 dark:from-gray-800 to-gray-100 dark:to-gray-900 p-6 no-underline outline-none focus:shadow-md'}
                                                to="/"
                                            >
                                                <div className='flex items-center justify-between'>
                                                    <div className="flex flex-col">
                                                        <div className="text-sm font-medium leading-none">
                                                            Pokemon
                                                        </div>
                                                        <p className="text-sm leading-tight text-muted-foreground">
                                                            Pokemon List
                                                        </p>
                                                    </div>
                                                    <LayoutDashboard />
                                                </div>

                                            </NavLink>

                                        </li>
                                        <li className="row-span-3">

                                            <NavLink
                                                className="flex h-full w-full select-none flex-col justify-end rounded-md hover:bg-gradient-to-b from-gray-50 dark:from-gray-800 to-gray-100 dark:to-gray-900 p-6 no-underline outline-none focus:shadow-md"
                                                to="/"
                                            >
                                                <div className='flex items-center justify-between'>
                                                    <div className="flex flex-col">
                                                        <div className="text-sm font-medium leading-none">
                                                            Evolutions
                                                        </div>
                                                        <p className="text-sm leading-tight text-muted-foreground">
                                                            Pokemon Evolutions
                                                        </p>
                                                    </div>
                                                    <RefreshCcw />
                                                </div>

                                            </NavLink>

                                        </li>

                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <div className="ml-auto order-3">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-white" />
                                    <span className="sr-only">Toggle theme</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setTheme("light")}>
                                    Light
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("dark")}>
                                    Dark
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    )
}



export default NavComponent