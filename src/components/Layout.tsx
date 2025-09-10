import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import userService from "../utils/userService";

import { AppDispatch } from "../store";
import { clearUser, setUser } from "../slices/userSlice";

import { BrainIcon } from "../assets/icons/BrainIcon";
import { Footer } from "./Footer";
import Navbar from "./Navbar";
import Loader from "../ui/Loader";

const Layout = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isCheckingSession, setCheckingSession] = useState<boolean>(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = async () => {
        const response: any = await userService.getMyProfile();
        const user = response?.user;
        setCheckingSession(false);
        if (!response || !user) {
            dispatch(clearUser());
            navigate("/login");
            return;
        }
        dispatch(
            setUser({
                _id: user._id || null,
                name: user.name || "",
                email: user.email || "",
                profilePic: user.avatar_url || "",
                isAuthenticated: true,
            })
        );
        if (user && location.pathname === "/login") {
            navigate("/my-brain");
        }
    };
    if (isCheckingSession) {
        return <Loader />;
    }

    return (
        <div className="flex min-h-screen flex-col bg-first-bg text-secondary-text selection:bg-primary-dot">
            <div>
                <Toaster position="bottom-right" reverseOrder={false} />
            </div>
            {/* Header */}
            <div className="flex items-center justify-start w-full p-6 fixed">
                <div className="flex w-full items-center">
                    <BrainIcon size={32} />
                    <div
                        className="text-[1.3rem] px-2 font-medium w-auto cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        BIG BRAIN
                    </div>
                </div>
            </div>

            <Navbar />

            {/* Main content area grows and pushes footer down */}
            <main className="flex-grow mt-10 h-[80vh] overflow-y-auto scrollbar-hide">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
