import { KeyboardEvent, useRef, useState, useEffect } from "react";

import BrainService from "../../utils/brainService";

import { Button } from "../../ui/ButtonElement";
import { InputElement } from "../../ui/InputElement";

interface Message {
    sender: "user" | "brain";
    text: string;
}

const ChatWithBrain = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<Message[]>([]);
    const [isThinking, setIsThinking] = useState(false);

    useEffect(() => {
        const textarea = inputRef.current;
        if (!textarea) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
            }
        };
        //@ts-ignore
        textarea.addEventListener("keydown", handleKeyDown);
        return () => {
            //@ts-ignore
            textarea.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
        inputRef.current?.focus();
    }, [messages, isThinking]);

    const handleSendMessage = async () => {
        const userInput = inputRef.current?.value.trim();
        if (!userInput) return;

        setMessages((prev) => [...prev, { sender: "user", text: userInput }]);
        if (inputRef.current) inputRef.current.value = "";

        setIsThinking(true);

        const response = await BrainService.chatWithBrain({ query: userInput });

        if (response.success) {
            const brainReply = response.data.llmResponse || "🤖 ...";
            setMessages((prev) => [
                ...prev,
                { sender: "brain", text: brainReply },
            ]);
        }

        setIsThinking(false);
    };

    return (
        <div className="flex flex-col h-[600px] w-[750px] max-w-full border border-primary-dot rounded-2xl bg-first-bg shadow-2xl">
            <div className="flex-1 overflow-y-auto space-y-2 py-5 px-2 scrollbar-hide">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`relative px-3 py-3 rounded-2xl shadow-sm w-fit max-w-[65%] break-words text-[15px] tracking-[-.2px] leading-[150%]
                      ${
                          msg.sender === "user"
                              ? "bg-tertiary-bg text-secondary-text self-end ml-auto mr-3 after:content-[''] after:absolute after:top-0 after:right-[-6px] after:border-[14px] after:border-b-0 after:border-transparent after:border-t-tertiary-bg"
                              : "bg-tertiary-bg text-secondary-text self-start ml-3 after:content-[''] after:absolute after:top-0 after:left-[-6px] after:border-[14px] after:border-b-0 after:border-transparent after:border-t-tertiary-bg"
                      }`}
                    >
                        {msg.text}
                    </div>
                ))}
                {isThinking && (
                    <div className="px-4 py-2 rounded-2xl bg-tertiary-bg text-tertiary-text italic shadow-sm self-start ml-3 max-w-[65%]">
                        Brain is thinking...
                    </div>
                )}

                <div ref={chatEndRef} />
            </div>

            <div className="flex gap-3 p-4 border-t border-secondary-border bg-first-bg rounded-b-2xl items-end">
                <InputElement
                    type="textarea"
                    placeholder="Type your message..."
                    inputReference={inputRef}
                    addedClass="flex-1 items-center overflow-y-auto"
                    onchange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        const target = e.target;
                        target.style.height = "auto";
                        target.style.height =
                            Math.min(target.scrollHeight, 128) + "px";
                    }}
                    row={1}
                />
                <div className="pb-0.5">
                    <Button
                        variant="primary"
                        size="md"
                        text={isThinking ? "Thinking..." : "Send"}
                        isFull={false}
                        disbale={isThinking}
                        onClickHandler={handleSendMessage}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChatWithBrain;
