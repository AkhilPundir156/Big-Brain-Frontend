import { useRef } from "react";
import { InputElement } from "../ui/InputElement";
import { Button } from "../ui/ButtonElement";

const Contact = () => {
    const inputEmailRef = useRef<HTMLInputElement>(null);
    const inputNameRef = useRef<HTMLInputElement>(null);
    const inputMessageRef = useRef<HTMLTextAreaElement>(null);
    const submitForm = () => {};
    return (
        <div className="flex gap-[40px] flex-col">
            <div className="px-[24px] flex items-center justify-between">
                <div className="flex items-center gap-[12px] text-[20px] font-[400] tracking-[-0.2px] leading-[120%] text-tertiary-text">
                    <div className="h-[8px] w-[8px] bg-primary-dot rounded-[50%]" />
                    <div>Hire Me</div>
                </div>
                <div className="rounded-[63px] text-[12px] bg-green-bg text-green-text font-semibold flex items-center gap-2 px-3 h-[24px]">
                    <div className="h-[6px] w-[6px] bg-green-text rounded-[50%]" />
                    AVAILABLE FOR WORK
                </div>
            </div>
            <div className="px-[24px] flex items-center justify-between gap-[40px] tracking-[-.2px]">
                <div className="flex flex-col gap-[24px]">
                    <div className="flex flex-col gap-[8px] ">
                        <div className="text-[36px] font-[500] text-main-color">
                            Let's Connect
                        </div>
                        <div className="text-[18px] w-auto font-[400] text-tertiary-text">
                            Got an idea and need design help? Reach out now.
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-[24px] flex  gap-[24px] tracking-[-.2px] flex-col">
                <div className="w-full flex gap-[12px]">
                    <InputElement
                        placeholder="Name..."
                        type="Text"
                        inputReference={inputNameRef}
                    />
                    <InputElement
                        placeholder="Email..."
                        type="email"
                        inputReference={inputEmailRef}
                    />
                </div>
                <div className="w-full">
                    <InputElement
                        placeholder="Message..."
                        type="textarea"
                        inputReference={inputMessageRef}
                    />
                </div>
                <div>
                    <Button
                        variant="primary"
                        text="Submit"
                        size="lg"
                        isFull={true}
                        onClickHandler={submitForm}
                        changeButton={true}
                        changeText="Submitted..."
                        changeTime={2000}
                    />
                </div>
            </div>
        </div>
    );
};

export default Contact;
