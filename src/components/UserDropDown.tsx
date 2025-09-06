import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState, AppDispatch } from "../store";
import { setTheme, setUserIconClicked } from "../slices/uiSlice";
import { clearUser } from "../slices/userSlice";

import { MoonIcon } from "../assets/icons/MoonIcon";
import { LightIcon } from "../assets/icons/LightIcon";
import { UserICon } from "../assets/icons/UserIcon";
import { ChevronRight } from "../assets/icons/ChevronRight";
import { ArrowLink } from "../assets/icons/ArrowLink";
import userService from "../utils/userService";

const UserDropDown = () => {
    const navigation = useNavigate();

    const dispatch = useDispatch<AppDispatch>();

    const theme = useSelector((state: RootState) => state.ui.theme);
    const isuserIconClicked = useSelector(
        (state: RootState) => state.ui.userIconClicked
    );
    const isUserActive = useSelector(
        (state: RootState) => state.user.isAuthenticated
    );

    return (
        <div className="absolute h-[145px] top-[70px] border border-primary-border right-0 min-w-[150px] bg-primary-bg rounded-[6%] pt-2">
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
                    onClick={() => {
                        dispatch(setTheme(theme == "dark" ? "light" : "dark"));
                        dispatch(setUserIconClicked(!isuserIconClicked));
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
