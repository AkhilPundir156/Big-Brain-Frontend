import { ChevronRight } from "../assets/icons/ChevronRight";
import { Link } from "react-router-dom";

interface CardProps {
    headLine: string;
    startIconLink: string;
    description: string;
    tagLink: string;
}

export const ProjectCard = ({
    headLine,
    startIconLink,
    description,
    tagLink,
}: CardProps) => {
    return (
        <Link to={tagLink}>
            <div className="group w-full border border-tertiary-border h-[96px]  rounded-[12px] bg-tertiary-bg shadow-[0px_0px_0px_0px_rgba(77,77,77,0)] hover:shadow-[0px_0px_0px_4px_rgba(77,77,77,0.6)] transition-shadow duration-300 flex items-center gap-[16px] leading-[170%] tracking-[.32px] cursor-pointer">
                <div className="flex items-center gap-[16px] leading-[170%] tracking-[.32px] w-full ml-2">
                    <div className="w-[64px] h-[64px] flex items-center justify-center ">
                        <div className="h-[56px] w-[56px] border-[5px] border-tertiary-border rounded-[50%]">
                            <img
                                className="h-[46px] w-[46px] "
                                src={startIconLink}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-[80%]">
                        <div className="w-full">
                            <div className="text-main-color text-[20px] pb-1 w-full font-semibold">
                                {headLine}
                            </div>
                            <div className="text-tertiary-text text-[18px] font-[400] ">
                                {description}
                            </div>
                        </div>
                        <div className="text-tertiary-text transform transition-transform duration-300 group-hover:translate-x-1">
                            <ChevronRight />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};
