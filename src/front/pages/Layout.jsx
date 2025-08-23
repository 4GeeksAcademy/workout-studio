import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
<<<<<<< HEAD
import  Navbar  from "../components/Navbar"
=======
import Navbar from "../components/Navbar"
>>>>>>> f708852ae44022f35abf0c64372ebad71409c187
import Footer from "../components/Footer";


export const Layout = () => {
    return (
        <ScrollToTop>
            <Navbar />
            <Outlet />
            <Footer />
        </ScrollToTop>
    );
}