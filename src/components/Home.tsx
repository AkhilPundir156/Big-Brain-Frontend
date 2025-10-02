import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../store";
import { setNavbarItem } from "../slices/uiSlice";

import { people } from "../demo/People_data";
import { Button } from "../ui/ButtonElement";
import ToolTip from "../ui/AnimatedTooltip";

import HomeHeroImg from "../assets/img/HomeHero.png";
import HomeHeroWhiteImg from "../assets/img/HomeHeroWhite.png";

const Home = () => {
    const navigation = useNavigate();
    const theme = useSelector((state: RootState) => state.ui);
    const dispatch = useDispatch<AppDispatch>();

    const [showWarning, setShowWarning] = useState(true);

    useEffect(() => {
        dispatch(setNavbarItem("home"));
        return () => {
            dispatch(setNavbarItem(null));
        };
    }, []);

    useEffect(() => {
        if (showWarning) {
            const timer = setTimeout(() => {
                setShowWarning(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showWarning]);

    return (
        <div className="w-full mt-[5.7%] flex flex-col relative">
            {showWarning && (
                <div className="fixed top-[90px] left-1/2 transform -translate-x-1/2 w-[25vw] bg-yellow-100 border border-yellow-500 text-yellow-800 rounded-lg shadow-lg p-4 flex items-start justify-between z-50">
                    <div>
                        <p className="font-semibold">⚠️ Limited Features</p>
                        <p className="text-sm">
                            Some features are temporarily unavailable due to
                            memory limitations and will be back as soon as we upgrade our hosting.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowWarning(false)}
                        className="ml-3 text-yellow-700 hover:text-yellow-900 font-bold"
                    >
                        ✖
                    </button>
                </div>
            )}

            <div className="flex flex-1">
                {/* Left Section */}
                <div className="w-1/2 p-[2%]">
                    <div className="w-fit pl-[20%] pt-[5%]">
                        {/* Home Page Text Content */}
                        <h2 className="text-[2.6rem] font-bold leading-snug">
                            Meet Your{" "}
                            <span className="text-green-text">
                                Smartest Brain Ever
                            </span>{" "}
                            !!!
                        </h2>
                        <p className="mt-4 text-lg tracking-wide text-tertiary-text">
                            Stop juggling tabs and apps! Effortlessly chat with
                            your{" "}
                            <span className="font-semibold">
                                Docs, Instagram, Twitter, YouTube, Files, and
                                Content
                            </span>
                            . Summarize, search, and interact with your
                            knowledge world—all in one place.
                            <br />
                            <br />
                            Save anything to your Brain, then let AI (powered by{" "}
                            <span className="font-semibold">Gemini-2.5</span>)
                            organize, explain, and supercharge it for you.
                        </p>

                        {/* Action Buttons */}
                        <div className="mt-8 flex gap-4">
                            <Button
                                variant="primary"
                                size="lg"
                                text="🚀 Get Started"
                                isFull={false}
                                onClickHandler={() => navigation("/my-brain")}
                            />
                            <Button
                                variant="secondary"
                                size="lg"
                                text="📖 How to Use"
                                isFull={false}
                                onClickHandler={() => navigation("/how-to-use")}
                            />
                        </div>

                        {/* Animated Tool Tip */}
                        <div className="m-auto pt-24 flex w-full justify-center">
                            <ToolTip items={people} />
                        </div>
                        <div className="ml-3 pt-3 text-center text-[1.2rem] font-[500] text-secondary-text">
                            10+ users built their Brain Smart !!!
                        </div>
                    </div>
                </div>

                {/* Right Section - Hero Image */}
                <div className="w-1/2 flex justify-center h-[70vh]">
                    <img
                        src={
                            theme.theme === "dark"
                                ? HomeHeroImg
                                : HomeHeroWhiteImg
                        }
                        alt="AI Powered Brain"
                        className="w-[480px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
