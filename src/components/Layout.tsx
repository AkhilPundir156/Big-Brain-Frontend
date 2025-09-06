// 📦 Libraries
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

// 🏪 State
import { AppDispatch } from "../store";
import { clearUser, setUser } from "../slices/userSlice";

// 🎨 Components & Assets
import Navbar from "./Navbar";
import { BrainIcon } from "../assets/icons/BrainIcon";

const Layout = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();

    const [checkingSession, setCheckingSession] = useState(true);
    const SERVER_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const checkSession = async () => {
            try {
                const { status, data } = await axios.get(
                    `${SERVER_URL}/user/me`,
                    { withCredentials: true }
                );
    
                if (status === 200 && data?.user) {
                    const user = data.user;
                    dispatch(
                        setUser({
                            _id: user._id || null,
                            name: user.name || "",
                            email: user.email || "",
                            profilePic: user.avatar_url || "",
                            isAuthenticated: true,
                        })
                    );
    
                    if (location.pathname === "/login") {
                        navigate("/my-brain");
                    }
                } else {
                    dispatch(clearUser());
                    navigate("/login");
                }
            } catch (error) {
                console.error("Session check failed:", error);
                dispatch(clearUser());
                navigate("/login");
            } finally {
                setCheckingSession(false);
            }
        };
    
        checkSession();
    }, []);
    

    if (checkingSession) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg">Checking session...</p>
            </div>
        );
    }

    return (
        <div className="bg-first-bg selection:bg-primary-dot text-secondary-text h-[100vh] w-[100vw] overflow-y-scroll pb-6">
            <div className="flex items-center justify-start w-full p-6 fixed">
                <div className="flex w-full items-center">
                    <BrainIcon size={32} />
                    <div className="text-[1.3rem] px-2 font-medium w-auto">
                        BIG BRAIN
                    </div>
                </div>
            </div>

            <Navbar />

            <div className="flex w-full mt-10">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
