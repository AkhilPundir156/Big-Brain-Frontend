import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { RootState } from "../../store";

import userService from "../../utils/userService";

import { InputElement } from "../../ui/InputElement";
import { Button } from "../../ui/ButtonElement";

import { BrainIcon } from "../../assets/icons/BrainIcon";
import { UserICon } from "../../assets/icons/UserIcon";
import EmailIcon from "../../assets/icons/EmailIcon";
import LockIcon from "../../assets/icons/LockIcon";
import EyeIcon from "../../assets/icons/Showpassword";
import EyeIconOff from "../../assets/icons/Hidepassword";
import { googleAuth } from "../../utils/googleAuth";

const Signup = () => {
    const naviagtion = useNavigate();
    const [signUp, setSignUp] = useState(false);

    const isShowPass = useSelector((state: RootState) => state.ui.showPassword);

    const inputEmailRef = useRef<HTMLInputElement>(null);
    const inputNameRef = useRef<HTMLInputElement>(null);
    const inputPassRef = useRef<HTMLInputElement>(null);

    const submitForm = async () => {
        setSignUp(true);

        const emailVal = inputEmailRef.current?.value;
        const passVal = inputPassRef.current?.value;
        const nameVal = inputNameRef.current?.value;

        if (
            !inputEmailRef.current?.value ||
            !inputNameRef.current?.value ||
            !inputPassRef.current?.value
        ) {
            console.log("please check credentials");
            setSignUp(false);
            return;
        }
        userService.signUpUser({
            email: emailVal,
            name: nameVal,
            password: passVal,
        });
        naviagtion("/login");

        setSignUp(false);
    };
    return (
        <div className="flex gap-[30px] flex-col mx-3 py-10 sm:p-0 mt-[30%] sm:mt-[6%] sm:py-[3%] max-w-[500px] sm:mx-auto border border-secondary-border rounded-[1%]">
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
                            Create Account!
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-[24px] flex  gap-[24px] tracking-[-.2px] flex-col">
                <div
                    className="w-full flex flex-col gap-[12px] "
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            const active = document.activeElement;
                            if (
                                active?.classList.contains(
                                    "email"
                                ) ||
                                active?.classList.contains(
                                    "name-ref"
                                )
                            ) {
                                const inputs = Array.from(
                                    document.querySelectorAll("input")
                                );
                                //@ts-ignore
                                const index = inputs.indexOf(active);
                                if (index > -1 && index + 1 < inputs.length) {
                                    inputs[index + 1].focus();
                                }

                                e.preventDefault();
                                return;
                            }
                            e.preventDefault();
                            submitForm();
                        }
                    }}
                >
                    <InputElement
                        startIcon={<UserICon strokeSize=".4" />}
                        placeholder="Name..."
                        type="Text"
                        inputReference={inputNameRef}
                        addedClass="items-center name-ref"
                    />
                    <InputElement
                        startIcon={<EmailIcon strokeSize={0.5} size={22} />}
                        placeholder="Email..."
                        type="Text"
                        inputReference={inputEmailRef}
                        addedClass="items-center email"
                    />
                    <InputElement
                        startIcon={<LockIcon strokeWidth={0.5} size={23} />}
                        placeholder="Password..."
                        type={isShowPass ? "text" : "password"}
                        inputReference={inputPassRef}
                        endIcon={isShowPass ? <EyeIcon /> : <EyeIconOff />}
                    />
                </div>
                <div className="flex justify-end items-center gap-[12px] text-[20px] font-[400] tracking-[-0.2px] leading-[120%] text-tertiary-text">
                    <div className="h-[7px] w-[7px] bg-primary-dot rounded-[50%]" />
                    <Link to={"/login"}>
                        <div className="text-[17px]">
                            Already have account ?
                        </div>
                    </Link>
                </div>
                <div>
                    <Button
                        variant="primary"
                        text="Sing Up"
                        size="lg"
                        isFull={true}
                        onClickHandler={submitForm}
                        changeButton={true}
                        changeText="Creating Account..."
                        changeTime={2000}
                        disbale={signUp}
                    />
                </div>
                <div>
                    <Button
                        variant="secondary"
                        text="Sign Up with Google"
                        size="lg"
                        isFull={true}
                        onClickHandler={googleAuth}
                        changeButton={true}
                        changeTime={2000}
                        disbale={signUp}
                    />
                </div>
            </div>
        </div>
    );
};

export default Signup;
