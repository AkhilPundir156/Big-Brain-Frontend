import { useState } from "react";
import { Lock } from "lucide-react";

import userService from "../../utils/userService";

import { Button } from "../../ui/ButtonElement";
import DialogModal from "../../ui/DialogModal";

const ChangePasswordModal = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChangePassword = async () => {
        setError("");
        setSuccess("");

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        try {
            const res = await userService.changePassword({
                oldPassword,
                newPassword,
            });
            if (!res) {
                return;
            }
            setSuccess("Password updated successfully!");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            setError("Failed to update password. Try again.");
        }
    };

    return (
        <DialogModal
            title="Change Password"
            trigger={
                <Button
                    isFull={false}
                    variant="primary"
                    size="md"
                    text="Change Password"
                />
            }
            onclose={() => {}}
        >
            <div className="flex flex-col gap-4">
                {/* Password fields */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary-text">
                        Old Password
                    </label>
                    <input
                        type="password"
                        placeholder="Enter old password"
                        className="p-2  rounded-lg w-full focus:ring-2 focus:ring-accent-color bg-tertiary-bg border-0"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary-text">
                        New Password
                    </label>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        className="p-2  rounded-lg w-full focus:ring-2 focus:ring-accent-color bg-tertiary-bg border-0"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary-text">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        placeholder="Re-enter new password"
                        className="p-2  rounded-lg w-full focus:ring-2 focus:ring-accent-color bg-tertiary-bg border-0"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                {/* Error / Success messages */}
                {error && <p className="text-sm text-red-500">{error}</p>}
                {success && (
                    <p className="text-sm text-green-500 flex items-center gap-1">
                        <Lock className="w-4 h-4" /> {success}
                    </p>
                )}

                {/* Update button */}
                <Button
                    isFull={true}
                    variant="primary"
                    size="md"
                    text="Update Password"
                    onClickHandler={handleChangePassword}
                />
            </div>
        </DialogModal>
    );
};

export default ChangePasswordModal;
