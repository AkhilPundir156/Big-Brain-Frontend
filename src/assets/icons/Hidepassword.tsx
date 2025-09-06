import { useDispatch, useSelector } from "react-redux";

import { RootState, AppDispatch } from "../../store";
import { setShowPassword } from "../../slices/uiSlice";

interface IconProps {
    size?: number; // default 24
    strokeWidth?: number; // default 2
    className?: string; // for custom tailwind/css
}

const EyeIconOff = ({
    size = 24,
    strokeWidth = 2,
    className = "",
}: IconProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const isShowPass = useSelector((state: RootState) => state.ui.showPassword);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            onClick={() => dispatch(setShowPassword(!isShowPass))}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.963 9.963 0 012.505-4.254"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.18 6.18A9.955 9.955 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.96 9.96 0 01-4.208 5.227"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 01-3 3m0-6a3 3 0 013 3"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
        </svg>
    );
};

export default EyeIconOff;
