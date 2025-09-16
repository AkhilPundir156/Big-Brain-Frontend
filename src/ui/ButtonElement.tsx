import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type ReactElement } from "react";

interface ButtonProps {
    variant: string;
    size: string;
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    isFull?: boolean;
    onClickHandler?: () => void;
    changeButton?: boolean;
    changeText?: string;
    changeTime?: number;
    disbale?: boolean;
}

type mapTypes = {
    [key: string]: string;
};

export const Button = ({
    variant,
    size,
    text,
    startIcon,
    endIcon,
    isFull = false,
    onClickHandler,
    changeButton,
    changeText,
    changeTime,
    disbale,
}: ButtonProps) => {
    const variantClass: mapTypes = {
        primary:
            "bg-secondary-bg border-0 text-primary-text shadow-[0px_0px_0px_0px_rgba(77,77,77,0)] hover:shadow-[0px_0px_0px_4px_rgba(77,77,77,0.3)] transition-shadow duration-300",
        secondary:
            "border border-secondary-border text-secondary-text shadow-[0px_0px_0px_0px_rgba(77,77,77,0)] hover:shadow-[0px_0px_0px_4px_rgba(77,77,77,0.3)] transition-shadow duration-300",
        tertiary:
            "bg-tertiary-bg border border-secondary-border text-secondary-text shadow-[0px_0px_0px_0px_rgba(77,77,77,0)] hover:shadow-[0px_0px_0px_4px_rgba(77,77,77,0.3)] transition-shadow duration-300 pl-[12px] pr-[12px]",
    };
    const sizeClass: mapTypes = {
        sm: `h-[34px] pl-[6px] pt-[0] pr-[10px] pb-[0] font-[500] gap-[6px] rounded-[5px] text-[13px]`,
        md: `h-[36px] pl-[8px] pt-[0] pr-[12px] pb-[0] font-[500] gap-[8px] rounded-[6px] text-[14px]`,
        lg: `h-[38px] pl-[10px] pt-[0] pr-[14px] pb-[0] font-[500] gap-[10px] rounded-[7px] text-[15px]`,
    };

    const [btnText, setBtnText] = useState(text);

    useEffect(() => {
        setBtnText(text);
    }, [text]);

    const changeButtonSpec = () => {
        if (changeButton && changeTime && changeText) {
            const currentText = btnText;
            setBtnText(changeText);

            setTimeout(() => {
                setBtnText(currentText);
            }, changeTime);
        }
        return true;
    };
    return (
        <button
            disabled={disbale}
            onClick={() => changeButtonSpec() && onClickHandler?.()}
            className={`flex justify-center items-center transition-all duration-300 ${
                variantClass[variant]
            } ${sizeClass[size]} ${isFull ? "w-full" : "w-fit"}`}
        >
            {startIcon}

            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={btnText}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                >
                    {btnText}
                </motion.span>
            </AnimatePresence>

            {endIcon}
        </button>
    );
};
