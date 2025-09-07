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

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<any>(null);

    const titleRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLInputElement>(null);
    const descRef = useRef<HTMLTextAreaElement>(null);

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
            dispatch(setActiveItem(response.data));
            setFormData(response.data);
        }
    };

    const handleSave = async () => {
        if (!params.brainId) return;

        const updated = {
            ...formData,
            title: titleRef.current?.value || "",
            type: typeRef.current?.value || "",
            description: descRef.current?.value || "",
        };

        const response = await BrainService.updateBrain(
            params.brainId,
            updated
        );

        if (response.success) {
            dispatch(setActiveItem(response.data));
            setFormData(response.data);
        }
        setIsEditing(false);
    };

    if (!activeBrain || !formData) {
        return <Loader />;
    }

    return (
        <div className="w-[800px] ml-[29.4%] bg-primary-bg text-secondary-text rounded-2xl p-8 mt-14 shadow-md border border-secondary-border">
            {/* Title & Type */}
            {isEditing ? (
                <>
                    <InputElement
                        type="text"
                        placeholder="Title"
                        inputReference={titleRef}
                        defaultValue={formData.title}
                        addedClass="mb-2 text-3xl font-bold bg-transparent border-none focus:ring-0"
                    />
                    <InputElement
                        type="text"
                        placeholder="Type"
                        inputReference={typeRef}
                        defaultValue={formData.type}
                        addedClass="mb-6 text-secondary-text bg-transparent border-none focus:ring-0"
                    />
                </>
            ) : (
                <>
                    <h1 className="text-3xl font-bold mb-2 uppercase">
                        {activeBrain.title}
                    </h1>
                    <p className="text-secondary-text mb-6">
                        Type: {activeBrain.type}
                    </p>
                </>
            )}

            {/* Description */}
            {isEditing ? (
                <InputElement
                    type="textarea"
                    placeholder="Description"
                    inputReference={descRef}
                    defaultValue={formData.description}
                    addedClass="mb-6 text-base bg-transparent border-none focus:ring-0"
                />
            ) : (
                <p className="text-base mb-6">{activeBrain.description}</p>
            )}

            {/* Extra Fields depending on type */}
            {formData.type === "content" && formData.image && (
                <div className="mb-6">
                    <img
                        src={formData.image}
                        alt="content"
                        className="w-full rounded-lg border border-secondary-border"
                    />
                </div>
            )}

            {(formData.type === "twitter" || formData.type === "instagram") && (
                <div className="mb-6">
                    {isEditing ? (
                        <InputElement
                            type="text"
                            placeholder={`${formData.type} Link`}
                            inputReference={descRef}
                            defaultValue={formData.link}
                            addedClass="mb-6 text-base bg-transparent border-none focus:ring-0"
                        />
                    ) : (
                        <a
                            href={formData.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-text underline hover:opacity-80"
                        >
                            View {formData.type} Post
                        </a>
                    )}
                </div>
            )}

            {/* Tags */}
            {activeBrain.tags?.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {activeBrain.tags.map((tag: any) => (
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

            {/* Actions */}
            <div className="flex gap-4 mt-6">
                <Button
                    variant="primary"
                    size="md"
                    text={isEditing ? "Save" : "Edit"}
                    isFull={true}
                    onClickHandler={
                        isEditing ? handleSave : () => setIsEditing(true)
                    }
                />
                <Button
                    variant="primary"
                    size="md"
                    text={isEditing ? "Cancel" : "Delete Item"}
                    isFull={true}
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
    );
};

export default BrainItem;
