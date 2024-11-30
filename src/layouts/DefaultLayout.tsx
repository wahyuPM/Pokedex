import { useEffect, useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import NavComponent from "@/components/navigation/NavComponent"
import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import { useNavigation } from "react-router-dom"

const DefaultLayout = () => {

    const navigation = useNavigation();
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (navigation.state === "loading") {
            setIsAnimating(true);
        } else {
            // Delay hiding the bar for a smoother transition
            const timer = setTimeout(() => setIsAnimating(false), 300);
            return () => clearTimeout(timer);
        }
    }, [navigation.state]);

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Toaster />
            <div className='bg-white dark:bg-gray-950 relative min-h-screen'>
                {isAnimating && (
                    <div className="fixed top-0 left-0 right-0 z-[10000] h-1 bg-gradient-to-r from-blue-500 via-yellow-500 to-red-500 animate-loading-bar"></div>
                )}
                <NavComponent />
                <main className="pt-[80px]">
                    <Outlet />
                </main>
            </div>
        </ThemeProvider>

    )
}

export default DefaultLayout