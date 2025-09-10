export const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-secondary-border text-center text-base text-tertiary-text h-[10vh]">
            <div className="w-full h-full flex flex-col items-center justify-center space-y-1">
                <p className="font-semibold">✨ No copyrights, just vibes ✨</p>
                <span className="text-sm text-gray-500">
                    {year} • Made Life Easy by Akhil Pundir
                </span>
            </div>
        </footer>
    );
};
