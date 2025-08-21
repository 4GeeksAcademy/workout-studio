import React, { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import JumbotronCarousel from "../components/JumbotronConCarrusel";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();

    const loadMessage = async () => {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file");
            const response = await fetch(backendUrl + "/api/hello");
            const data = await response.json();
            if (response.ok) dispatch({ type: "set_hello", payload: data.message });
            return data;
        } catch (error) {
            if (error.message) throw new Error(
                `Could not fetch the message from the backend.
                Please check if the backend is running and the backend port is public.`
            );
        }
    };

    useEffect(() => {
        loadMessage();
    }, []);

    return (
        <>
            <JumbotronCarousel />
            <div className="flex flex-col items-center mt-8">
                <h1 className="text-3xl font-bold text-yellow-400 mb-4">Hello Rigo!!</h1>
                <img src={rigoImageUrl} className="w-32 h-32 rounded-full mb-3" alt="Rigo Baby" />
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded">
                    {store.message ? (
                        <span>{store.message}</span>
                    ) : (
                        <span className="text-red-600">
                            Loading message from the backend (make sure your python 🐍 backend is running)...
                        </span>
                    )}
                </div>
            </div>
        </>
    );
};