interface IconProps {
    size?: number;
    strokeWidth?: number;
    className?: string;
}
const LockIcon = ({
    size = 24,
    strokeWidth = 2,
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
        strokeWidth={strokeWidth}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 15v2m6-2V9a6 6 0 00-12 0v6m12 0H6"
        />
    </svg>
);

export default LockIcon;
