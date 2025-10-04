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
        <div
            className="
    flex flex-col items-center gap-6
    w-full max-w-sm sm:max-w-md md:w-1/4
    p-4 sm:p-6 md:p-10
    sm:border-l sm:border-secondary-border
    h-full
    mx-auto sm:mx-0
"
        >
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
                    className="h-48 sm:h-60 md:h-[18rem] w-48 sm:w-60 md:w-full object-cover border shadow-sm"
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
            <div className="text-center w-full flex flex-col items-center gap-2">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`text-xl sm:text-2xl font-semibold bg-transparent text-center outline-none border-b transition-colors ${
                        hasChanges
                            ? "border-accent-color"
                            : "border-transparent group-hover:border-accent-color"
                    }`}
                    style={{ width: `${name.length + 1}ch` }}
                />
                <p className="text-sm sm:text-base text-tertiary-text">
                    {email}
                </p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 w-full justify-center">
                {hasChanges ? (
                    <>
                        <Button
                            variant="primary"
                            size="md"
                            text="Save"
                            isFull={false}
                            onClickHandler={handleSave}
                        />
                        <Button
                            variant="secondary"
                            size="md"
                            text="Cancel"
                            isFull={false}
                            onClickHandler={handleCancel}
                        />
                    </>
                ) : (
                    <>
                        <ChangePasswordModal />
                        <Button
                            variant="secondary"
                            size="md"
                            text="Logout"
                            isFull={false}
                            onClickHandler={handleLogout}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default ProfileInfo;
