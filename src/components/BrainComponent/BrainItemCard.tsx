import { Button } from "../../ui/ButtonElement";

interface BrainItem {
    type: string;
    tags: any;
    title: string;
    _id: string;
}

const BrainItemCard = ({
    brainItems,
    isShared = false,
    handleSelectBrain,
    handleDeleteBrain,
}: {
    brainItems: [BrainItem];
    isShared?: Boolean;
    handleSelectBrain: any;
    handleDeleteBrain?: any;
}) => {
    return (
        <div className="grid pt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                    {typeof tag === "string" ? tag : tag.name}
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
                        {!isShared && (
                            <Button
                                variant="primary"
                                size="sm"
                                text="🗑️ Delete Item"
                                isFull={true}
                                onClickHandler={() => handleDeleteBrain(item)}
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BrainItemCard;
