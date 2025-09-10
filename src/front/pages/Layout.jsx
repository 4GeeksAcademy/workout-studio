import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import  Navbar  from "../components/Navbar"
import Footer from "../components/Footer";


export const Layout = () => {
    return (
        <div className="bg-black text-yellow-600 min-h-screen flex flex-col">
            <ScrollToTop>
                <Navbar />
                <main className="flex-grow">
                    <Outlet />
                </main>
                <Footer />
            </ScrollToTop>
        </div>
    );
}
