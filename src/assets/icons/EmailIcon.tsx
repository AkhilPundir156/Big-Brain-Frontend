interface IconProps {
    size?: number;
    strokeSize?: number;
    className?: string;
}

// Email Icon
const EmailIcon = ({
    size = 24,
    strokeSize = 2,
    className = "",
}: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={strokeSize}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l9 6 9-6M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"
        />
    </svg>
);

export default EmailIcon;
