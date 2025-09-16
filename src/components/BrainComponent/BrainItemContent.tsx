const BrianItemContent = ({ brainItem }: { brainItem: any }) => {
    return (
        <div className="w-full">
            <div className="max-w-5xl min-w-[50rem] mx-auto bg-primary-bg text-secondary-text rounded-2xl p-10 shadow-md border border-secondary-border flex flex-col md:flex-row gap-10">
                {/* Left Column - Details */}
                <div className="flex-1 space-y-6">
                    <div>
                        <p className="text-sm text-tertiary-text mb-1">Title</p>

                        <h1 className="text-xl font-semibold">
                            {brainItem.title}
                        </h1>
                    </div>

                    <div>
                        <p className="text-sm text-tertiary-text mb-1">Type</p>
                        <p>{brainItem.type}</p>
                    </div>

                    <div>
                        <p className="text-sm text-tertiary-text mb-1">
                            Description
                        </p>
                        <p className="leading-relaxed">
                            {brainItem.description}
                        </p>
                    </div>


                    {/* Tags */}
                    {brainItem.tags?.length > 0 && (
                        <div>
                            <p className="text-sm text-tertiary-text mb-2">
                                Tags
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {brainItem.tags.map((tag: any) => (
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

                <div className="w-1/3 flex flex-col items-center gap-4">
                    {brainItem.type === "content" && brainItem.fileUrl ? (
                        <img
                            src={brainItem.fileUrl}
                            alt="content"
                            className="w-64 rounded-lg border border-secondary-border object-contain"
                        />
                    ) : (
                        <div className="w-64 h-40 rounded-lg border border-dashed border-secondary-border flex items-center justify-center text-tertiary-text">
                            No Preview
                        </div>
                    )}

                    {brainItem.type === "content" && (
                        <div className="w-full text-center">
                            <p className="text-sm text-tertiary-text mb-1">
                                File Description
                            </p>
                            <p className="text-start pl-4">
                                {brainItem.fileDescription || "—"}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BrianItemContent;
