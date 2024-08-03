import Logo from '@/assets/logo.png'
import { Moon, Sun, LayoutDashboard, RefreshCcw, Menu } from "lucide-react"
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
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useTheme } from "@/components/theme-provider"

import { NavLink } from 'react-router-dom'

const NavComponent = () => {
    const { setTheme } = useTheme()
    return (
        <nav className='w-full min-h-6 shadow-lg bg-white dark:bg-gray-950 dark:shadow-gray-800 fixed top-0 z-50'>
            <div className="container mx-auto">
                <div className="flex gap-1 xl:gap-6 items-center py-4 px-2">
                    {/* Logo */}
                    <img src={Logo} alt="Pokemon" className='w-[130px] h-auto' />
                    {/* Nav Menu */}
                    <NavigationMenu className='hidden xl:block'>
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
                    <div className="ml-auto">
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
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className='flex visible xl:hidden xl:invisible'>
                                <Menu className='dark:text-white' />
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Are you absolutely sure?</SheetTitle>
                                <SheetDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    )
}



export default NavComponent