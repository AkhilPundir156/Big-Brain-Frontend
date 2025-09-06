import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState, AppDispatch } from "../store";
import { setNavbarItem, setUserIconClicked } from "../slices/uiSlice";

import { PlusIcon } from "../assets/icons/PlusIcon";
import { UserICon } from "../assets/icons/UserIcon";

import { Button } from "../ui/ButtonElement";

import UserDropDown from "./UserDropDown";

const Navbar = () => {
    const navigation = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const theme = useSelector((state: RootState) => state.ui.theme);
    const navBarIcon = useSelector((state: RootState) => state.ui.navbarItem);
    const isUserIconClicked = useSelector((state: RootState) => state.ui.userIconClicked)
    const isUserActive = useSelector((state: RootState) => state.user.isAuthenticated);
    const avatar_url = useSelector((state: RootState) => state.user.profilePic)


    useEffect(() => {
        if (theme === "dark") {
            document.getElementById("root")?.classList.add("light");
        } else {
            document.getElementById("root")?.classList.remove("light");
        }
    }, [theme]);

    return (
        <div className="bg-primary-bg w-[800px] h-[64px] fixed top-[16px] left-[calc(50%-400px)] p-[16px] py-0 flex justify-between border border-primary-border rounded-[12px] z-[1]">
            <div className="flex items-center gap-[16px] text-tertiary-text">
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
                {isUserActive && 
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
                }
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
                <Link to={"/about-dev"}>
                    <div
                        className={`cursor-pointer w-[136px] h-[40px] flex items-center justify-center ${
                            navBarIcon == "devinfo"
                                ? "text-main-color font-[600]"
                                : ""
                        } hover:bg-tertiary-border rounded-[5%]  transition-all duration-300`}
                        onClick={() => dispatch(setNavbarItem("devinfo"))}
                    >
                        About Developer
                    </div>
                </Link>
            </div>
            <div className="flex items-center gap-[16px]">
                <Button
                    variant="primary"
                    size="md"
                    text={"Contact Us"}
                    isFull={false}
                    startIcon={<PlusIcon />}
                    onClickHandler={() => navigation("/contact")}
                />

                <div
                    className="cursor-pointer w-[40px] h-[40px] flex items-center text-tertiary-text justify-center hover:bg-tertiary-border rounded-[50%]  transition-all duration-300"
                    onClick={() => {
                        dispatch(setUserIconClicked(!isUserIconClicked));
                    }}
                >
                    { avatar_url ? <img src={avatar_url} />:<UserICon strokeSize={isUserIconClicked ? "2":"1"} /> }
                </div>

                { isUserIconClicked && 
                    <UserDropDown />
                 }
            </div>
        </div>
    );
};

export default Navbar;
