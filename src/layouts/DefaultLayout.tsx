import { ThemeProvider } from "@/components/theme-provider"
import NavComponent from "@/components/navigation/NavComponent"
import { Outlet } from "react-router-dom"


const DefaultLayout = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className='bg-white dark:bg-gray-950  relative'>
                <NavComponent />
                <main className="pt-[80px] min-h-screen">
                    <Outlet />
                </main>
            </div>
        </ThemeProvider>

    )
}

export default DefaultLayout