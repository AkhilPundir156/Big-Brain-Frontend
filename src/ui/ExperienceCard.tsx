import { ArrowLink } from "../assets/icons/ArrowLink";

interface CardProps {
    headLine: string;
    startIconLink: string;
    tagLink: string;
    iconAddClass?: string;
}

export const ExperienceCard = ({
    headLine,
    startIconLink,
    tagLink,
    iconAddClass
}: CardProps) => {
    return (
        <a href={ tagLink } target="_blank">
            <div className={`group w-full border border-tertiary-border h-[80px] rounded-[12px] bg-tertiary-bg shadow-[0px_0px_0px_0px_rgba(77,77,77,0)] hover:shadow-[0px_0px_0px_4px_rgba(77,77,77,0.6)] transition-shadow duration-300 flex items-center gap-[16px] leading-[170%] tracking-[.32px] cursor-pointer `}>
                <div className="h-[40px] flex items-center gap-[16px] leading-[170%] tracking-[.32px] w-full ml-2">
                    <div className="w-[64px] h-[64px] flex items-center justify-center ">
                        <div className="h-[41px] w-[41px] border-[5px] border-tertiary-border rounded-[50%] flex items-center justify-center">
                            <img
                                className={`${iconAddClass?iconAddClass:'h-[32px] w-[32px]'} `}
                                src={startIconLink}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-[80%]">
                        <div className="w-[85%] flex items-center justify-start">
                            <div className="text-main-color text-[20px] pb-1 w-full font-semibold">
                                {headLine}
                            </div>
                            <div className="bg-primary-dot w-[129px] h-[24px] rounded-[63px] flex items-center justify-center">
                                <div className="text-tertiary-text text-[12px] font-[400px] tracking-[.96px] leading-[100%]">
                                    Homepage
                                </div>
                            </div>
                        </div>
                        <div className="text-tertiary-text transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                            <ArrowLink />
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
};
