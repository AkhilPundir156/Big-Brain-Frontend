import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState, AppDispatch } from "../store";
import { setNavbarItem, setUserIconClicked } from "../slices/uiSlice";

import { PlusIcon } from "../assets/icons/PlusIcon";
import { UserICon } from "../assets/icons/UserIcon";

import { Button } from "../ui/ButtonElement";

import UserDropDown from "./UserComponent/UserDropDown";

const Navbar = () => {
    const navigation = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const theme = useSelector((state: RootState) => state.ui.theme);
    const navBarIcon = useSelector((state: RootState) => state.ui.navbarItem);
    const isUserIconClicked = useSelector(
        (state: RootState) => state.ui.userIconClicked
    );
    const isUserActive = useSelector(
        (state: RootState) => state.user.isAuthenticated
    );
    const avatar_url = useSelector((state: RootState) => state.user.profilePic);

    useEffect(() => {
        if (theme === "dark") {
            document.getElementById("root")?.classList.add("light");
        } else {
            document.getElementById("root")?.classList.remove("light");
        }
    }, [theme]);

    return (
        <div className="bg-primary-bg w-screen max-w-[800px] h-[64px] fixed md:top-[16px] md:left-[calc(50%-400px)] p-[16px] py-0 flex justify-between border border-primary-border sm:rounded-[12px] z-[1]">
            {/* For Mobile View */}
            <div className="sm:hidden flex items-center">
                {/* Hamburger button */}
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="text-tertiary-text text-xl p-2 focus:outline-none z-100 relative"
                >
                    ☰
                </button>

                {/* Sliding menu */}
                <div
                    className={`fixed inset-0 z-50 flex transition-all duration-300 ease-in-out ${
                        isMenuOpen
                            ? "opacity-100"
                            : "opacity-0 pointer-events-none"
                    }`}
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/30"
                        onClick={() => setIsMenuOpen(false)}
                    />

                    {/* Side menu */}
                    <div
                        className={`relative bg-primary-bg w-1/2 max-w-xs h-full p-4 flex flex-col gap-5 transform transition-transform duration-300 ease-in-out ${
                            isMenuOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                    >
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="self-end text-4xl text-tertiary-text mb-2 focus:outline-none"
                        >
                            ×
                        </button>
                        {/* Close button */}

                        {/* Menu Links */}
                        <Link
                            to="/"
                            onClick={() => {
                                dispatch(setNavbarItem("home"));
                                setIsMenuOpen(false);
                            }}
                            className="hover:text-main-color mt-1 ripple"
                        >
                            Home
                        </Link>

                        {isUserActive && (
                            <Link
                                to="/my-brain"
                                onClick={() => {
                                    dispatch(setNavbarItem("brain"));
                                    setIsMenuOpen(false);
                                }}
                                className="hover:text-main-color mt-1 ripple"
                            >
                                My Brain
                            </Link>
                        )}

                        <Link
                            to="/about-brain"
                            onClick={() => {
                                dispatch(setNavbarItem("about"));
                                setIsMenuOpen(false);
                            }}
                            className="hover:text-main-color mt-1 ripple"
                        >
                            About us
                        </Link>

                        <Link
                            to="/how-to-use"
                            onClick={() => {
                                dispatch(setNavbarItem("usage"));
                                setIsMenuOpen(false);
                            }}
                            className="hover:text-main-color mt-1 ripple"
                        >
                            How to use
                        </Link>

                        <Link
                            to="/pricing-plan"
                            onClick={() => {
                                dispatch(setNavbarItem("plans"));
                                setIsMenuOpen(false);
                            }}
                            className="hover:text-main-color mt-1 ripple"
                        >
                            Pricing/Plans
                        </Link>

                        <div className="mt-2">
                            <Button
                                variant="primary"
                                size="md"
                                text={"Contact Us"}
                                isFull={false}
                                startIcon={<PlusIcon />}
                                onClickHandler={() => navigation("/contact")}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Logo and Hamburger */}
            <div className="flex items-center justify-between w-full sm:hidden px-2">
                {/* Logo / Title */}
                <div
                    className="text-xl font-bold text-tertiary-text"
                    onClick={() => navigation("/")}
                >
                    BIG BRAIN
                </div>
            </div>

            {/* Large Screen View */}
            <div className="hidden md:flex items-center gap-[16px] text-tertiary-text ">
                <Link to={"/"}>
                    <div
                        className={`cursor-pointer w-[60px] h-[40px] flex items-center justify-center ${
                            navBarIcon == "home"
                                ? "text-main-color font-[600]"
                                : ""
                        } hover:bg-tertiary-border rounded-[5%] transition-all duration-300`}
                        onClick={() => dispatch(setNavbarItem("home"))}
                    >
                        Home
                    </div>
                </Link>
                {isUserActive && (
                    <Link to={"/my-brain"}>
                        <div
                            className={`cursor-pointer w-[80px] h-[40px] flex items-center justify-center ${
                                navBarIcon == "brain"
                                    ? "text-main-color font-[600]"
                                    : ""
                            } hover:bg-tertiary-border rounded-[5%]  transition-all duration-300`}
                            onClick={() => dispatch(setNavbarItem("brain"))}
                        >
                            My Brain
                        </div>
                    </Link>
                )}
                <Link to={"/about-brain"}>
                    <div
                        className={`cursor-pointer w-[80px] h-[40px] flex items-center justify-center ${
                            navBarIcon == "about"
                                ? "text-main-color font-[600]"
                                : ""
                        } hover:bg-tertiary-border rounded-[5%]  transition-all duration-300`}
                        onClick={() => dispatch(setNavbarItem("about"))}
                    >
                        About us
                    </div>
                </Link>
                <Link to={"/how-to-use"}>
                    <div
                        className={`cursor-pointer w-[94px] h-[40px] flex items-center justify-center ${
                            navBarIcon == "usage"
                                ? "text-main-color font-[600]"
                                : ""
                        } hover:bg-tertiary-border rounded-[5%]  transition-all duration-300`}
                        onClick={() => dispatch(setNavbarItem("usage"))}
                    >
                        How to use
                    </div>
                </Link>
                <Link to={"/pricing-plan"}>
                    <div
                        className={`cursor-pointer w-[136px] h-[40px] flex items-center justify-center ${
                            navBarIcon == "plans"
                                ? "text-main-color font-[600]"
                                : ""
                        } hover:bg-tertiary-border rounded-[5%]  transition-all duration-300`}
                        onClick={() => dispatch(setNavbarItem("plans"))}
                    >
                        Pricing/Plans
                    </div>
                </Link>
            </div>
            <div className="flex items-center gap-[16px]">
                <div className="hidden md:flex">
                    <Button
                        variant="primary"
                        size="md"
                        text={"Contact Us"}
                        isFull={false}
                        startIcon={<PlusIcon />}
                        onClickHandler={() => navigation("/contact")}
                    />
                </div>
                <div
                    id="userIcon-ref"
                    className="cursor-pointer w-[40px] h-[40px] flex items-center text-tertiary-text justify-center hover:bg-tertiary-border rounded-[50%]  transition-all duration-300"
                    onClick={() => {
                        dispatch(setUserIconClicked(!isUserIconClicked));
                    }}
                >
                    {avatar_url ? (
                        <img src={avatar_url} />
                    ) : (
                        <UserICon strokeSize={isUserIconClicked ? "2" : "1"} />
                    )}
                </div>

                {isUserIconClicked && <UserDropDown />}
            </div>
        </div>
    );
};

export default Navbar;
