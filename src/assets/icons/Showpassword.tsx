import { useDispatch, useSelector } from "react-redux";

import { RootState, AppDispatch } from "../../store";
import { setShowPassword } from "../../slices/uiSlice";

interface IconProps {
    size?: number; // default 24
    strokeWidth?: number; // default 2
    className?: string; // for custom tailwind/css
}

const EyeIcon = ({
    size = 24,
    strokeWidth = 2,
    className = "",
}: IconProps) => {

    const dispatch = useDispatch<AppDispatch>();

    const isShowPass = useSelector((state: RootState) => state.ui.showPassword);
    console.log(isShowPass)


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
        onClick={()=>dispatch(setShowPassword(!isShowPass))}
        >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
    </svg>
)};

export default EyeIcon;