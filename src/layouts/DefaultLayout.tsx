import { ThemeProvider } from "@/components/theme-provider"
import NavComponent from "@/components/navigation/NavComponent"
import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"

const DefaultLayout = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Toaster />
            <div className='bg-white dark:bg-gray-950 relative min-h-screen'>
                <NavComponent />
                <main className="pt-[80px]">
                    <Outlet />
                </main>
            </div>


        </ThemeProvider>

    )
}

export default DefaultLayout