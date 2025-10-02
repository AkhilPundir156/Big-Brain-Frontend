import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState, AppDispatch } from "../../store";
import { setTheme, setUserIconClicked } from "../../slices/uiSlice";
import { clearUser } from "../../slices/userSlice";

import userService from "../../utils/userService";

import { MoonIcon } from "../../assets/icons/MoonIcon";
import { LightIcon } from "../../assets/icons/LightIcon";
import { UserICon } from "../../assets/icons/UserIcon";
import { ChevronRight } from "../../assets/icons/ChevronRight";
import { ArrowLink } from "../../assets/icons/ArrowLink";
import { useEffect, useRef } from "react";

const UserDropDown = () => {
    const navigation = useNavigate();

    const dispatch = useDispatch<AppDispatch>();
    const userIconRef = useRef<HTMLDivElement>(null);

    const theme = useSelector((state: RootState) => state.ui.theme);
    const isuserIconClicked = useSelector(
        (state: RootState) => state.ui.userIconClicked
    );
    const isUserActive = useSelector(
        (state: RootState) => state.user.isAuthenticated
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                userIconRef.current &&
                !userIconRef.current.contains(event.target as Node) &&
                !document
                    .getElementById("userIcon-ref")
                    ?.contains(event.target as Node)
            ) {
                if (isuserIconClicked) {
                    dispatch(dispatch(setUserIconClicked(!isuserIconClicked)));
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            className="absolute h-[145px] top-[70px] border border-primary-border right-0 min-w-[150px] bg-primary-bg rounded-[6%] pt-2"
            ref={userIconRef}
        >
            <div>
                <div
                    className="h-[40px] flex items-center align-center px-2 mb-1 justify-between cursor-pointer  hover:bg-tertiary-border rounded-[5%] transition-all duration-300 "
                    onClick={() => {
                        dispatch(setUserIconClicked(!isuserIconClicked));
                        {
                            isUserActive
                                ? navigation("/my-profile")
                                : navigation("/login");
                        }
                    }}
                >
                    <div className="">
                        {isUserActive ? "My Profile" : "Login"}
                    </div>
                    <div className=" w-[40px] h-[40px] flex items-center text-tertiary-text justify-center ">
                        {<UserICon strokeSize="1" />}
                    </div>
                </div>
                <div
                    className="h-[40px] flex items-center align-center px-2 mb-1 justify-between cursor-pointer  hover:bg-tertiary-border rounded-[5%] transition-all duration-300 "
                    onClick={async () => {
                        dispatch(setUserIconClicked(!isuserIconClicked));
                        if (!isUserActive) {
                            navigation("/signup");
                            return;
                        }
                        {
                            try {
                                await userService.logoutUser();
                                dispatch(clearUser());
                            } catch (err) {
                                console.log(err);
                            } finally {
                                navigation("/login");
                            }
                        }
                    }}
                >
                    <div className="">{isUserActive ? "Logout" : "SignUp"}</div>
                    <div className=" w-[40px] h-[40px] flex items-center text-tertiary-text justify-center ">
                        {/* Logout icon to be added instead of ArrowLink */}
                        {isUserActive ? <ChevronRight /> : <ArrowLink />}
                    </div>
                </div>

                <div
                    className="flex items-center align-center justify-between px-2 cursor-pointer   hover:bg-tertiary-border rounded-[5%] transition-all duration-300 "
                    onClick={async() => {
                        const newTheme = theme === "dark" ? "light" : "dark"
                        dispatch(setTheme(newTheme));
                        dispatch(setUserIconClicked(!isuserIconClicked));

                        try{
                            if(isUserActive){
                                await userService.updateTheme(newTheme);
                            }
                        }catch(err){
                            console.error("Failed to update them:", err);
                        }
                    }}
                >
                    <div className="">
                        {theme == "light" ? "Light" : "Dark"}
                    </div>
                    <div className=" w-[40px] h-[40px] flex items-center text-tertiary-text justify-center ">
                        {theme === "dark" ? <MoonIcon /> : <LightIcon />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDropDown;
