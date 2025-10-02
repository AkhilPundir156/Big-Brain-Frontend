import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState, AppDispatch } from "../../store";
import {
    setActiveItem,
    setContents,
    removeContent,
} from "../../slices/contentSlice";
import { setNavbarItem } from "../../slices/uiSlice";

import BrainService from "../../utils/brainService";

import ChatWithBrain from "./ChatWithbrain";
import CreateBrainItem from "./CreatebrainItem";
import { Button } from "../../ui/ButtonElement";
import DialogModal from "../../ui/DialogModal";
import Loader from "../../ui/Loader";
import CreateDoc from "../../assets/icons/empty-doc";

const MyBrain = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const brainItems = useSelector((state: RootState) => state.content.items);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        console.log("inside the my brain");
        dispatch(setNavbarItem("brain"));
        fetchBrainItems();
        return () => {
            dispatch(setNavbarItem(null));
        };
    }, []);

    const fetchBrainItems = async () => {
        setIsLoading(true);
        const response: any = await BrainService.getMyBrains();

        if (response && response.success) {
            dispatch(setContents(response.data));
        } else {
            navigate("/");
        }
        setIsLoading(false);
    };

    const handleShareBrain = async () => {
        setIsLoading(true);
        const response = await BrainService.shareBrain();
        if (response.success) {
            await navigator.clipboard.writeText(response.data.url);
        }
        setIsLoading(false);
    };

    const handleSelectBrain = (item: any) => {
        dispatch(setActiveItem(item));
        navigate(`/my-brain/${item._id}`);
    };

    const handleDeleteBrain = async (brainItem: any) => {
        if (!brainItem) {
            navigate("/my-brain");
            return;
        }
        setIsLoading(true);
        const response = await BrainService.deleteBrain(brainItem._id);
        if (response.success) {
            dispatch(removeContent(brainItem._id));
        }
        setIsLoading(false);
    };
    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="p-6 pt-14 w-full">
            {/* Floating Actions */}
            <div className="fixed top-24 right-10 flex gap-3 z-50">
                <DialogModal
                    title="💬 Chat with My Brain"
                    trigger={
                        <Button
                            variant="primary"
                            size="md"
                            text="Open Brain Chat"
                            isFull={false}
                        />
                    }
                >
                    <ChatWithBrain />
                </DialogModal>

                <DialogModal
                    title="🧠 Create Brain Item"
                    trigger={
                        <Button
                            variant="secondary"
                            size="md"
                            text="➕ Create Brain Item"
                            isFull={false}
                        />
                    }
                >
                    <CreateBrainItem />
                </DialogModal>

                <Button
                    variant="secondary"
                    size="md"
                    text="Share Brain"
                    isFull={false}
                    onClickHandler={handleShareBrain}
                    changeText="Copied To ClipBoard"
                    changeTime={1000}
                />
            </div>

            {/* Brain Items Grid */}
            <div className="grid pt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {brainItems.length === 0 && (
                    <div className="h-[70vh] w-[96vw] flex items-center justify-center">
                        <div className="flex flex-col justify-center items-center gap-4 text-center">
                            <CreateDoc />
                            <div className="pl-10 text-xl font-[700] text-secondary-text">Please Create a Brain Item to see.</div>
                        </div>
                    </div>
                )}

                {brainItems?.map((item, index) => (
                    <div
                        key={item._id || index}
                        className="flex flex-col p-5 rounded-2xl bg-primary-bg border border-secondary-border shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
                    >
                        <h2 className="text-lg font-bold text-secondary-text mb-2 truncate uppercase">
                            {item.title || "Untitled"}
                        </h2>

                        <p className="text-sm text-tertiary-text mb-1">
                            <span className="font-medium">Type:</span>{" "}
                            {item.type || "—"}
                        </p>

                        {item.tags?.length > 0 ? (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {item.tags.map((tag: any, idx: number) => (
                                    <span
                                        key={tag._id || idx}
                                        className="px-2 py-1 text-xs rounded-full bg-primary-bg border border-secondary-border text-tertiary-text"
                                    >
                                        {typeof tag === "string"
                                            ? tag
                                            : tag.name}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-tertiary-text mb-4">
                                No tags
                            </p>
                        )}

                        <div className="mt-auto flex gap-3">
                            <Button
                                variant="primary"
                                size="sm"
                                text="🔎 View Item"
                                isFull={true}
                                onClickHandler={() => handleSelectBrain(item)}
                            />
                            <Button
                                variant="primary"
                                size="sm"
                                text="🗑️ Delete Item"
                                isFull={true}
                                onClickHandler={() => handleDeleteBrain(item)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBrain;
