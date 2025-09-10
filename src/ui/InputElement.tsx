import { type Ref, ReactElement } from "react";

interface InputProps {
    type: string;
    placeholder: string;
    inputReference: Ref<HTMLInputElement> | Ref<HTMLTextAreaElement>;
    addedClass?: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    defaultValue?: string;
    onchange?: any;
    row?: number
}

export const InputElement = ({
    type,
    placeholder,
    inputReference,
    addedClass,
    startIcon,
    endIcon,
    defaultValue,
    onchange,
    row
}: InputProps) => {
    const InputClass =
        "bg-input-bg border border-primary-border text-secondary-text rounded-md px-3 py-2 focus:outline-none focus:border-secondary-text disabled:opacity-50 transition-all duration-200 w-full";

    return (
        <div className={`relative flex items-center ${addedClass}`}>
            {startIcon && (
                <span className="absolute left-3 text-secondary-text">
                    {startIcon}
                </span>
            )}

            {type === "textarea" ? (
                <textarea
                    className={`${InputClass} ${startIcon ? "pl-10" : " "} ${endIcon ? "pr-10" : " "} scrollbar-hide`}
                    ref={inputReference as Ref<HTMLTextAreaElement>}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    onChange={onchange}
                    rows={row ?? 1}
                />
            ) : (
                <input
                    className={`${InputClass} ${startIcon ? "pl-10" : ""} ${endIcon ? "pr-10" : ""}`}
                    ref={inputReference as Ref<HTMLInputElement>}
                    placeholder={placeholder}
                    type={type}
                    defaultValue={defaultValue}
                    onChange={onchange}
                />
            )}

            {endIcon && (
                <span className="absolute right-3 text-secondary-text">
                    {endIcon}
                </span>
            )}
        </div>
    );
};
