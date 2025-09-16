import { useRef } from "react";

import ChangePasswordModal from "./ChangePasswordModal";

import { Button } from "../../ui/ButtonElement";
import userService from "../../utils/userService";

const ProfileInfo = ({
    user,
    name,
    setName,
    email,
    avatar,
    setAvatar,
}: any) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const originalName = user?.name || "";
    const originalAvatar = user?.avatar_url || "";

    const hasChanges = name !== originalName || avatar !== originalAvatar;

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const preview = URL.createObjectURL(file);
        setAvatar(preview);

        const formData = new FormData();
        formData.append("avatar", file);

        try {
            const res = await userService.uploadAvatar(formData);

            //@ts-ignore
            if (res?.url) setAvatar(res.url);
        } catch (err) {
            console.error("Upload failed", err);
        }
    };

    const handleSave = async () => {
        try {
            await userService.updateProfile({ name, avatar_url: avatar });
        } catch (err) {
            console.error("Update failed", err);
        }
    };

    const handleCancel = () => {
        setName(originalName);
        setAvatar(originalAvatar);
    };

    const handleLogout = () => {
        userService.logoutUser();
        window.location.href = "/login";
    };

    return (
        <div className="flex flex-col items-center gap-6 w-1/4 border-l border-secondary-border p-10 h-full">
            {/* Profile picture */}
            <div className="relative group">
                <img
                    src={
                        avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            name
                        )}&background=random`
                    }
                    alt="Avatar"
                    className="h-[18rem]  object-cover border shadow-sm"
                />
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-1 right-1 bg-accent-color text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                    ✏️
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>

            {/* Name + Email */}
            <div className="text-center w-full flex flex-col items-center group gap-2">
                <div className="hover:border-b">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`text-xl font-semibold bg-transparent text-center outline-none
                        border-b transition-colors
                        ${
                            hasChanges
                                ? "border-accent-color"
                                : "border-transparent group-hover:border-accent-color"
                        }`}
                        style={{ width: `${name.length + 1}ch` }}
                    />
                </div>
                <p className="text-sm text-tertiary-text">{email}</p>
            </div>

            {/* Action buttons */}
            {hasChanges ? (
                <div className="flex gap-4">
                    <Button
                        variant="primary"
                        size="md"
                        text="Save"
                        onClickHandler={handleSave}
                    />
                    <Button
                        variant="secondary"
                        size="md"
                        text="Cancel"
                        onClickHandler={handleCancel}
                    />
                </div>
            ) : (
                <div className="flex gap-4">
                    <ChangePasswordModal />
                    <Button
                        variant="secondary"
                        size="md"
                        text="Logout"
                        onClickHandler={handleLogout}
                    />
                </div>
            )}
        </div>
    );
};

export default ProfileInfo;
