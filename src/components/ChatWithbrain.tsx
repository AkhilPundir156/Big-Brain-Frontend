import { useRef, useState, useEffect } from "react";

import { Button } from "../ui/ButtonElement";
import { InputElement } from "../ui/InputElement";
import BrainService from "../utils/brainService";

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
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
        <div className="flex flex-col h-[600px] w-[750px] max-w-full border border-primary-border rounded-2xl bg-first-bg shadow-2xl">
            <div className="flex-1 overflow-y-auto space-y-2 py-5 px-2">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`px-3 py-3 rounded-2xl shadow-sm max-w-[75%] break-words text-[15px] tracking-[-.2px] leading-[150%] ${
                            msg.sender === "user"
                                ? "bg-tertiary-bg text-secondary-text self-end ml-auto mr-3"
                                : "bg-tertiary-bg text-secondary-text self-start ml-3"
                        }`}
                    >
                        {msg.text}
                    </div>
                ))}

                {isThinking && (
                    <div className="px-4 py-2 rounded-2xl bg-secondary-bg text-tertiary-text italic shadow-sm self-start ml-3 max-w-[60%]">
                        Brain is thinking...
                    </div>
                )}

                <div ref={chatEndRef} />
            </div>

            <div className="flex gap-3 p-4 border-t border-secondary-border bg-first-bg rounded-b-2xl items-center">
                <InputElement
                    type="text"
                    placeholder="Type your message..."
                    inputReference={inputRef}
                    addedClass="flex-1 items-center bg-secondary-bg rounded-xl text-base"
                />
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
    );
};

export default ChatWithBrain;
