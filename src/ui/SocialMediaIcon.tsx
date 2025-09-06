import type { ReactElement } from "react";

export const SocialMediaIcon = ({
    MediaIcon,
    link,
}: {
    MediaIcon: ReactElement;
    link: string;
}) => {
    return (
        <a href={link} target="_blank">
            <div className=" ">
                <div className="h-[40px] w-[40px] text-main-color bg-primary-bg flex items-center justify-center rounded-[50%] shadow-[0px_0px_0px_0px_rgba(77,77,77,0)] hover:shadow-[0px_0px_0px_3px_rgba(100,100,100,0.7)] transition-shadow duration-300">
                    { MediaIcon }
                </div>
            </div>
        </a>
    );
};