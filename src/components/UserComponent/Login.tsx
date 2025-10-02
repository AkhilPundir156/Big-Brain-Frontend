import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { RootState, AppDispatch } from "../../store";
import { setNavbarItem } from "../../slices/uiSlice";
import { setUser } from "../../slices/userSlice";

import { Button } from "../../ui/ButtonElement";
import { BrainIcon } from "../../assets/icons/BrainIcon";
import EmailIcon from "../../assets/icons/EmailIcon";
import EyeIconOff from "../../assets/icons/Hidepassword";
import { InputElement } from "../../ui/InputElement";
import LockIcon from "../../assets/icons/LockIcon";
import EyeIcon from "../../assets/icons/Showpassword";

import { googleAuth } from "../../utils/googleAuth";
import userService from "../../utils/userService";

const Login = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isShowPass = useSelector((state: RootState) => state.ui.showPassword);

    const [isLogingIn, setLoginIn] = useState(false);
    const navigation = useNavigate();

    const inputEmailRef = useRef<HTMLInputElement>(null);
    const inputPasswordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        dispatch(setNavbarItem(null));
    }, []);

    const submitForm = async () => {
        setLoginIn(true);

        if (!inputEmailRef.current?.value || !inputPasswordRef.current?.value) {
            alert("Please enter your credentials");
            setLoginIn(false);
            return;
        }

        const loginResponse = await userService.loginUser({
            email: inputEmailRef.current.value,
            password: inputPasswordRef.current.value,
        });

        const user = loginResponse.user;

        dispatch(
            setUser({
                _id: user.id || null,
                name: user.name || "",
                email: user.email || "",
                theme: user.theme || "light",
                profilePic: user.imgUrl || "",
                isAuthenticated: true,
            })
        );
        navigation("/my-brain");

        setLoginIn(false);
    };

    return (
        <div className="flex gap-[30px] flex-col mt-[6%] py-[3%] w-[500px] mx-auto border border-secondary-border rounded-[1%]">
            <div className="flex items-center justify-center w-full">
                <div>
                    <div className="flex w-full justify-center items-center">
                        {<BrainIcon size={48} />}{" "}
                        <div className="text-[2.3rem] px-2 font-[500] w-auto">
                            BIG BRAIN
                        </div>
                    </div>
                    <div className="-tracking-[.2px] -mt-1 text-[16px] text-center text-tertiary-text">
                        Your Personal AI Knowledge Hub
                    </div>
                </div>
            </div>
            <div className="px-[24px] flex items-center justify-center gap-[30px] tracking-[-.2px]">
                <div className="flex gap-[24px] justify-center">
                    <div className="flex flex-col gap-[8px] justify-center text-center">
                        <div className="text-[24px] font-[500] text-main-color">
                            Welcome Back!
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-[24px] flex  gap-[24px] tracking-[-.2px] flex-col" onKeyDown={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    submitForm();
                }}}>
                <div className="w-full flex flex-col gap-[12px] ">
                    <InputElement
                        startIcon={<EmailIcon strokeSize={0.5} size={22} />}
                        placeholder="Email..."
                        type="Text"
                        inputReference={inputEmailRef}
                        addedClass="items-center"
                    />
                    <InputElement
                        startIcon={<LockIcon strokeWidth={0.5} size={23} />}
                        placeholder="Password..."
                        type={isShowPass ? "text" : "password"}
                        inputReference={inputPasswordRef}
                        endIcon={isShowPass ? <EyeIcon /> : <EyeIconOff />}
                        
                    />
                </div>
                <div className="flex justify-end items-center gap-[12px] text-[20px] font-[400] tracking-[-0.2px] leading-[120%] text-tertiary-text">
                    <div className="h-[7px] w-[7px] bg-primary-dot rounded-[50%]" />
                    <Link to={"/forgot-password"}>
                        <div className="text-[17px]">Forgot Password ?</div>
                    </Link>
                </div>
                <div>
                    <Button
                        variant="primary"
                        text="LogIn"
                        size="lg"
                        isFull={true}
                        onClickHandler={submitForm}
                        changeButton={true}
                        changeText="Logging In..."
                        changeTime={2000}
                        disbale={isLogingIn}
                    />
                </div>
                <div>
                    <Button
                        variant="secondary"
                        text="Login with Google"
                        size="lg"
                        isFull={true}
                        onClickHandler={googleAuth}
                        changeButton={true}
                        changeTime={2000}
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
