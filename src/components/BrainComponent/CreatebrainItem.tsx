import axios from "axios";
import { useRef, useState } from "react";

import { Button } from "../../ui/ButtonElement";
import { InputElement } from "../../ui/InputElement";

const CreateBrainItem = () => {
    const SERVER_URL = import.meta.env.VITE_API_URL;

    const titleRef = useRef<HTMLInputElement>(null);
    const descRef = useRef<HTMLTextAreaElement>(null);
    const tagsRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);

    const [type, setType] = useState("instagram");
    const [image, setImage] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        const title = titleRef.current?.value.trim() || "";
        const description = descRef.current?.value.trim() || "";
        const tags = tagsRef.current?.value.trim()?.split(",") || "";
        debugger;

        if (!title || !description) return;

        try {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("tags", JSON.stringify(tags));
            formData.append("type", type);
            if (image) formData.append("image", image);
            const response = await axios.post(
                `${SERVER_URL}/brain/create`,
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            if (response.status === 201) {
                console.log("✅ Brain item created:", response.data);
                titleRef.current!.value = "";
                descRef.current!.value = "";
                tagsRef.current!.value = "";
                setType("instagram");
                setImage(null);
            }
        } catch (err) {
            console.error("❌ Error creating brain item:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col gap-5 w-[650px] max-w-full p-6 bg-first-bg border border-secondary-border rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold text-secondary-text">
                Fill in your Brain Item details 🧠
            </h2>

            <div>
                <label className="block text-sm text-secondary-text mb-1">
                    Title
                </label>
                <InputElement
                    type="text"
                    placeholder="Enter title..."
                    inputReference={titleRef}
                />
            </div>

            <div>
                <label className="block text-sm text-secondary-text">
                    Description
                </label>
                <InputElement
                    type="textarea"
                    placeholder="Enter description..."
                    inputReference={descRef}
                    addedClass="h-20 max-h-32"
                />
            </div>

            <div>
                <label className="block text-sm text-secondary-text mb-1">
                    Tags
                </label>
                <InputElement
                    type="text"
                    placeholder="Add tags (comma separated)..."
                    inputReference={tagsRef}
                />
            </div>

            <div>
                <label className="block text-sm text-secondary-text mb-1">
                    Type
                </label>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="bg-input-bg border border-primary-border text-secondary-text rounded-md px-2 py-2 focus:outline-none focus:border-secondary-text transition-all duration-200 w-full"
                >
                    <option value="instagram">Instagram</option>
                    <option value="twitter">Twitter</option>
                    <option value="content">Content</option>
                </select>
            </div>

            {(type === "content" && (
                <div>
                    <label className="block text-sm text-secondary-text mb-1">
                        Upload Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setImage(e.target.files ? e.target.files[0] : null)
                        }
                        className="text-sm text-secondary-text cursor-pointer"
                    />
                </div>
            )) ||
                ((type === "twitter" || type === "instagram") && (
                    <div>
                        <label className="">Link</label>
                        <InputElement
                            placeholder={`Enter the ${type} link`}
                            inputReference={linkRef}
                            type="text"
                        />
                    </div>
                ))}

            <div className="flex justify-end gap-3 pt-3">
                <Button
                    isFull={false}
                    variant="primary"
                    size="md"
                    text={isSubmitting ? "Creating..." : "Create"}
                    disbale={isSubmitting}
                    onClickHandler={handleSubmit}
                />
            </div>
        </div>
    );
};

export default CreateBrainItem;
