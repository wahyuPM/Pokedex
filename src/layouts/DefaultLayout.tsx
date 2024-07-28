import { ThemeProvider } from "@/components/theme-provider"
import NavComponent from "@/components/navigation/NavComponent"
import { Outlet } from "react-router-dom"
import { ScrollArea } from "@/components/ui/scroll-area"

const DefaultLayout = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className='bg-white dark:bg-gray-950 relative'>
                <NavComponent />
                <main className="pt-[80px]">
                    <ScrollArea className='h-[calc(100vh-80px)] w-full'>
                        <Outlet />
                    </ScrollArea>
                </main>
            </div>


        </ThemeProvider>

    )
}

export default DefaultLayout