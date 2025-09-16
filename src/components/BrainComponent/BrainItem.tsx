import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../store";
import { setActiveItem } from "../../slices/contentSlice";

import BrainService from "../../utils/brainService";

import { Button } from "../../ui/ButtonElement";
import { InputElement } from "../../ui/InputElement";
import Loader from "../../ui/Loader";

const BrainItem = () => {
    const params = useParams();
    const navigation = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const activeBrain = useSelector(
        (state: RootState) => state.content.activeItem
    );
    const uiTheme = useSelector((state: RootState) => state.ui);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<any>(null);

    const titleRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLInputElement>(null);
    const descRef = useRef<HTMLTextAreaElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const fileDescRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const brainId = params.brainId;
        if (!brainId) {
            navigation("/my-brain");
            return;
        }
        fetchBrainItem(brainId);
    }, [params.brainId]);

    const fetchBrainItem = async (brainId: string) => {
        const response = await BrainService.getBrainById(brainId);
        if (response && response.success) {
            const data = response.data;
            dispatch(setActiveItem(data));
            setFormData(data);
        }
    };

    const handleSave = async () => {
        if (!params.brainId) return;

        const updated = {
            ...formData,
            title: titleRef.current?.value || formData.title || "",
            type: typeRef.current?.value || formData.type || "",
            description: descRef.current?.value || formData.description || "",
            fileDescription:
                fileDescRef.current?.value || formData.fileDescription || "",
            link: linkRef.current?.value || formData.link || "",
        };

        const response = await BrainService.updateBrain(
            params.brainId,
            updated
        );

        if (response.success) {
            const data = response.data;
            dispatch(setActiveItem(data));
            setFormData(data);
        }
        setIsEditing(false);
    };

    if (uiTheme.isLoading || !activeBrain || !formData) {
        return <Loader />;
    }

    return (
        <div className="w-full px-6 md:px-12 lg:px-20 mt-14">
            <div className="max-w-5xl mx-auto bg-primary-bg text-secondary-text rounded-2xl p-10 shadow-md border border-secondary-border flex flex-col md:flex-row gap-10">
                {/* Left Column - Details */}
                <div className="flex-1 flex flex-col">
                    <div className="flex-1 space-y-6">
                        {/* Title */}
                        <div>
                            <p className="text-sm text-tertiary-text mb-1">
                                Title
                            </p>
                            {isEditing ? (
                                <InputElement
                                    type="text"
                                    placeholder="Title"
                                    inputReference={titleRef}
                                    defaultValue={formData.title}
                                    addedClass="text-xl font-semibold bg-transparent border-none focus:ring-0"
                                />
                            ) : (
                                <h1 className="text-xl font-semibold">
                                    {formData.title}
                                </h1>
                            )}
                        </div>

                        {/* Type */}
                        <div>
                            <p className="text-sm text-tertiary-text mb-1">
                                Type
                            </p>
                            <p>{formData.type}</p>
                        </div>

                        {/* Description */}
                        <div>
                            <p className="text-sm text-tertiary-text mb-1">
                                Description
                            </p>
                            {isEditing ? (
                                <InputElement
                                    type="textarea"
                                    placeholder="Description"
                                    inputReference={descRef}
                                    defaultValue={formData.description}
                                    addedClass="bg-transparent border-none focus:ring-0"
                                    row={5}
                                />
                            ) : (
                                <p className="leading-relaxed">
                                    {formData.description}
                                </p>
                            )}
                        </div>

                        {/* Social Link */}
                        {(formData.type === "twitter" ||
                            formData.type === "instagram") && (
                            <div>
                                <p className="text-sm text-tertiary-text mb-1">
                                    {formData.type} Link
                                </p>
                                {isEditing ? (
                                    <InputElement
                                        type="text"
                                        placeholder={`${formData.type} Link`}
                                        inputReference={linkRef}
                                        defaultValue={formData.link}
                                        addedClass="bg-transparent border-none focus:ring-0"
                                    />
                                ) : (
                                    <a
                                        href={formData.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary-text underline hover:opacity-80"
                                    >
                                        View Post
                                    </a>
                                )}
                            </div>
                        )}

                        {/* Tags */}
                        {formData.tags?.length > 0 && (
                            <div>
                                <p className="text-sm text-tertiary-text mb-2">
                                    Tags
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {formData.tags.map((tag: any) => (
                                        <span
                                            key={tag._id}
                                            className="px-3 py-1 rounded-full bg-primary-border text-sm"
                                        >
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Actions */}
                    <div className="">
                        <div className="flex gap-4 pt-4">
                            <Button
                                variant="primary"
                                size="md"
                                text={isEditing ? "Save" : "Edit"}
                                isFull={false}
                                onClickHandler={
                                    isEditing
                                        ? handleSave
                                        : () => setIsEditing(true)
                                }
                            />
                            <Button
                                variant="secondary"
                                size="md"
                                text={isEditing ? "Cancel" : "Delete Item"}
                                isFull={false}
                                onClickHandler={
                                    isEditing
                                        ? () => setIsEditing(false)
                                        : async () => {
                                              if (!params.brainId) return;
                                              const confirmed = confirm(
                                                  "Are you sure you want to delete?"
                                              );
                                              if (confirmed) {
                                                  const res =
                                                      await BrainService.deleteBrain(
                                                          params.brainId
                                                      );
                                                  if (res?.success) {
                                                      navigation("/my-brain");
                                                  }
                                              }
                                          }
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column - File Preview & Description */}
                <div className="w-full md:w-1/3 flex flex-col items-center gap-4">
                    {formData.type === "content" && formData.fileUrl ? (
                        <img
                            src={formData.fileUrl}
                            alt="content"
                            className="w-64 rounded-lg border border-secondary-border object-contain"
                        />
                    ) : (
                        <div className="w-64 h-40 rounded-lg border border-dashed border-secondary-border flex items-center justify-center text-tertiary-text">
                            No Preview
                        </div>
                    )}

                    {/* File Description */}
                    {formData.type === "content" && (
                        <div className="w-full text-center">
                            <p className="text-sm text-tertiary-text mb-1">
                                File Description
                            </p>
                            {isEditing ? (
                                <InputElement
                                    type="textarea"
                                    placeholder="File description"
                                    defaultValue={formData.fileDescription}
                                    addedClass="w-full bg-transparent border-none focus:ring-0 text-sm"
                                    inputReference={fileDescRef}
                                    row={5}
                                />
                            ) : (
                                <p className="text-start pl-4">
                                    {formData.fileDescription || "—"}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BrainItem;
