import { useRef } from "react";
import { toast } from "react-hot-toast";

import userService from "../../utils/userService";

import { Button } from "../../ui/ButtonElement";
import { InputElement } from "../../ui/InputElement";
import toasterClass from "../../ui/toasterStyles";

const Contact = () => {
    const inputEmailRef = useRef<HTMLInputElement>(null);
    const inputNameRef = useRef<HTMLInputElement>(null);
    const inputMessageRef = useRef<HTMLTextAreaElement>(null);

    const submitForm = async () => {
        const name = inputNameRef.current?.value;
        const email = inputEmailRef.current?.value;
        const message = inputMessageRef.current?.value;
        if (!name || !email || !message) {
            toast.error("Please fill all the fields", toasterClass);
            return;
        }

        const res = await userService.SendContactMessage({
            name,
            email,
            message,
        });

        if (res.ok) {
            if (inputNameRef.current) inputNameRef.current.value = "";
            if (inputEmailRef.current) inputEmailRef.current.value = "";
            if (inputMessageRef.current) inputMessageRef.current.value = "";
        }
    };

    return (
        <div className="min-h-[100%] flex items-center justify-center ">
            <div className=" flex flex-col gap-10 p-16 rounded border border-secondary-border">
                {/* Header */}
                <div className="text-center space-y-3">
                    <h2 className="text-4xl font-semibold text-main-color tracking-tight">
                        Let’s Connect
                    </h2>
                    <p className="text-lg font-normal text-tertiary-text">
                        Got an idea and need design help? Reach out now.
                    </p>
                </div>

                {/* Form */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <InputElement
                            placeholder="Name..."
                            type="text"
                            inputReference={inputNameRef}
                        />
                        <InputElement
                            placeholder="Email..."
                            type="email"
                            inputReference={inputEmailRef}
                        />
                    </div>

                    <InputElement
                        placeholder="Message..."
                        type="textarea"
                        inputReference={inputMessageRef}
                        row={4}
                    />

                    <Button
                        variant="primary"
                        text="Submit"
                        size="lg"
                        isFull={true}
                        onClickHandler={submitForm}
                        changeButton={true}
                        changeText="Submitted..."
                        changeTime={2000}
                    />
                </div>
            </div>
        </div>
    );
};

export default Contact;
