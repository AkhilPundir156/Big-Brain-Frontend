import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppDispatch } from "../../store";
import { setNavbarItem } from "../../slices/uiSlice";

import { Button } from "../../ui/ButtonElement";

const Usage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(setNavbarItem("usage"));
        return () => {
            dispatch(setNavbarItem(null));
        };
    }, []);

    return (
        <div className="w-full mt-[5%] flex">
            <div className="w-[810px] pl-3 m-auto">
                {/* Page Header */}
                <header className="w-full mb-8">
                    <h1 className="w-full mb-3 text-3xl md:text-4xl text-tertiary-text font-bold">
                        How to Use{" "}
                        <span className="text-secondary-text">Big Brain</span>
                    </h1>
                    <p className="w-full text-base md:text-lg text-tertiary-text">
                        Capture anything, organize it once, and let AI do the
                        heavy lifting. Big Brain works with{" "}
                        <span className="font-semibold">
                            Instagram, Twitter (X), YouTube, Files, Images, and
                            plain Content
                        </span>
                        . Add items, edit inline, share securely, and chat with
                        your knowledge using AI (Gemini-2.5).
                    </p>
                </header>

                {/* Quick Overview */}
                <div className="w-full mb-10 rounded-2xl p-5 md:p-6 border border-secondary-border bg-primary-bg-constant">
                    <h2 className="w-full mb-3 text-xl text-primary-text font-semibold">
                        At a Glance
                    </h2>
                    <ul className="w-full list-disc pl-5 space-y-2 text-primary-text">
                        <li>
                            Create “Brain Items” for{" "}
                            <span className="font-medium">
                                content, links, or files
                            </span>
                            .
                        </li>
                        <li>
                            <span className="font-medium">Type</span> decides
                            what’s required:
                            <span className="font-medium">
                                {" "}
                                instagram / twitter / youtube
                            </span>{" "}
                            need a link,
                            <span className="font-medium"> content</span> can be
                            text with optional image/file.
                        </li>
                        <li>
                            Edit inline on the item page, then{" "}
                            <span className="font-medium">Save</span> or{" "}
                            <span className="font-medium">Cancel</span>.
                        </li>
                        <li>
                            Delete and Share actions are available right on the
                            item card/page.
                        </li>
                        <li>
                            Open Brain Chat to summarize, search and Q&A across
                            your saved items.
                        </li>
                    </ul>
                </div>

                {/* Step 1 */}
                <section className="w-full mb-8">
                    <h3 className="w-full mb-2 text-lg text-secondary-text font-semibold">
                        1) Sign Up or Log In
                    </h3>
                    <p className="w-full text-secondary-text">
                        Create an account or log in to sync your items across
                        devices and unlock sharing & chat.
                    </p>
                    <div className="w-full mt-4 flex gap-3">
                        <Button
                            variant="primary"
                            size="md"
                            text="Create Account"
                            isFull={false}
                            onClickHandler={() => navigate("/signup")}
                        />
                        <Button
                            variant="secondary"
                            size="md"
                            text="Log In"
                            isFull={false}
                            onClickHandler={() => navigate("/login")}
                        />
                    </div>
                </section>

                {/* Step 2 */}
                <section className="w-full mb-8">
                    <h3 className="w-full mb-2 text-lg text-secondary-text font-semibold">
                        2) Create Your First Brain Item
                    </h3>
                    <div className="w-full rounded-xl p-5 border border-secondary-border bg-primary-bg-constant">
                        <ol className="w-full list-decimal pl-5 space-y-2 text-primary-text">
                            <li>
                                Go to{" "}
                                <span className="font-medium">My Brain</span>.
                            </li>
                            <li>
                                Go to{" "}
                                <span className="font-medium">
                                    Create Brain Item
                                </span>
                                .
                            </li>
                            <li>
                                Fill the fields:
                                <ul className="pl-5 list-disc space-y-1 mt-1">
                                    <li>
                                        <span className="font-medium">
                                            Title
                                        </span>{" "}
                                        — a short name you’ll recognize.
                                    </li>
                                    <li>
                                        <span className="font-medium">
                                            Type
                                        </span>{" "}
                                        — choose{" "}
                                        <code className="px-1 rounded bg-primary-dot">
                                            instagram
                                        </code>
                                        ,{" "}
                                        <code className="px-1 rounded bg-primary-dot">
                                            twitter
                                        </code>
                                        ,{" "}
                                        <code className="px-1 rounded bg-primary-dot">
                                            youtube
                                        </code>
                                        , or{" "}
                                        <code className="px-1 rounded bg-primary-dot">
                                            content
                                        </code>
                                        .
                                    </li>
                                    <li>
                                        <span className="font-medium">
                                            Description
                                        </span>{" "}
                                        — what this item is about.
                                    </li>
                                    <li>
                                        <span className="font-medium">
                                            Tags
                                        </span>{" "}
                                        — comma separated (e.g.{" "}
                                        <code className="px-1 rounded bg-primary-dot">
                                            ai, research, notes
                                        </code>
                                        ).
                                    </li>
                                    <li>
                                        <span className="font-medium">
                                            Link
                                        </span>{" "}
                                        — required for Instagram/Twitter/YouTube
                                        types.
                                    </li>
                                    <li>
                                        <span className="font-medium">
                                            Image/File
                                        </span>{" "}
                                        — optional upload for <em>content</em>{" "}
                                        items.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                Click{" "}
                                <span className="font-medium">Create</span>.
                                You’ll see success notification when it’s saved.
                            </li>
                        </ol>
                        <div className="w-full mt-4">
                            <Button
                                variant="tertiary"
                                size="md"
                                text="➕ Create Brain Item"
                                isFull={false}
                                onClickHandler={() => navigate("/create-brain")}
                            />
                        </div>
                    </div>
                </section>

                {/* Step 3 */}
                <section className="w-full mb-8">
                    <h3 className="w-full mb-2 text-lg text-secondary-text font-semibold">
                        3) Manage Items in “My Brain”
                    </h3>
                    <ul className="w-full list-disc pl-5 space-y-2 text-secondary-text">
                        <li>
                            <span className="font-medium">View Item:</span>{" "}
                            opens the detailed page.
                        </li>
                        <li>
                            <span className="font-medium">Edit:</span> switches
                            fields to editable mode (title, type, description).
                            Click <span className="font-medium">Save</span> or{" "}
                            <span className="font-medium">Cancel</span>.
                        </li>
                        <li>
                            <span className="font-medium">Delete Item:</span>{" "}
                            removes it permanently after confirmation.
                        </li>
                        <li>
                            <span className="font-medium">Share:</span> generate
                            a share link (if enabled for your item).
                        </li>
                    </ul>
                    <div className="w-full mt-4">
                        <Button
                            variant="secondary"
                            size="md"
                            text="📁 Go to My Brain"
                            isFull={false}
                            onClickHandler={() => navigate("/my-brain")}
                        />
                    </div>
                </section>

                {/* Step 4 */}
                <section className="w-full mb-8">
                    <h3 className="w-full mb-2 text-lg text-secondary-text font-semibold">
                        4) Chat with Your Brain (AI)
                    </h3>
                    <p className="w-full text-secondary-text">
                        Use <span className="font-medium">Open Brain Chat</span>{" "}
                        to summarize long documents, ask contextual Q&A, and
                        search across your items. AI is powered by{" "}
                        <span className="font-medium">Gemini-2.5</span> under
                        the hood.
                    </p>
                </section>

                {/* Tips */}
                <section className="w-full mb-10">
                    <h3 className="w-full mb-2 text-lg text-secondary-text font-semibold">
                        Pro Tips
                    </h3>
                    <ul className="w-full list-disc pl-5 space-y-2 text-secondary-text">
                        <li>
                            Prefer short, descriptive{" "}
                            <span className="font-medium">titles</span> and 2–5{" "}
                            <span className="font-medium">tags</span> for best
                            search.
                        </li>
                        <li>
                            For social links, paste the full URL (e.g., a
                            specific tweet, reel, or video).
                        </li>
                        <li>
                            Keep your{" "}
                            <span className="font-medium">description</span>{" "}
                            concise—this improves chat answers.
                        </li>
                        <li>
                            Use <span className="font-medium">Edit</span> to fix
                            typos quickly; hit{" "}
                            <span className="font-medium">Save</span> to
                            persist.
                        </li>
                    </ul>
                </section>

                {/* Final CTA */}
                <footer className="w-full mb-16">
                    <div className="w-full flex gap-3">
                        <Button
                            variant="primary"
                            size="md"
                            text="Start Creating"
                            isFull={false}
                            onClickHandler={() => navigate("/create-brain")}
                        />
                        <Button
                            variant="secondary"
                            size="md"
                            text="View My Brain"
                            isFull={false}
                            onClickHandler={() => navigate("/my-brain")}
                        />
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Usage;
