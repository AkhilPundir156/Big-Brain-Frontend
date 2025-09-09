import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import userService from "../utils/userService";

import { AppDispatch, RootState } from "../store";
import { clearUser, setUser } from "../slices/userSlice";

import { BrainIcon } from "../assets/icons/BrainIcon";
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
