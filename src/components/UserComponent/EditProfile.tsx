import axios from "axios";
import { useRef } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store";

import { Button } from "../../ui/ButtonElement";
import DialogModal from "../../ui/DialogModal";
import { InputElement } from "../../ui/InputElement";

const EditProfile = () => {
    const SERVER_URL = import.meta.env.VITE_API_URL;
    const RootUser = useSelector((state: RootState) => state.user);

    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const avatarRef = useRef<HTMLInputElement>(null);

    const handleSave = async () => {
        try {
            const response = await axios.put(
                `${SERVER_URL}/user/update`,
                {
                    name: nameRef.current?.value,
                    email: RootUser.email,
                    ProfilePic: avatarRef.current?.value,
                    password: passwordRef.current?.value,
                },
                { withCredentials: true }
            );
            if (response.status === 200) {
                console.log(response);
            }
        } catch (error) {
            console.error("Profile update failed:", error);
        }
    };

    return (
        <>
            <DialogModal
                title="Edit Profile"
                trigger={
                    <Button
                        variant="primary"
                        size="md"
                        text="Edit Profile"
                        isFull={false}
                    />
                }
            >
                <div>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="text-sm text-tertiary-text">
                                Name
                            </label>
                            <InputElement
                                type="text"
                                placeholder="Enter name"
                                inputReference={nameRef}
                                addedClass="mt-1"
                                defaultValue={RootUser.name}
                            />
                        </div>
                        <div>
                            <label className="text-sm text-tertiary-text">
                                Password
                            </label>
                            <InputElement
                                type="password"
                                placeholder="Enter new password"
                                inputReference={passwordRef}
                                addedClass="mt-1"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-tertiary-text">
                                Profile Picture URL
                            </label>
                            <InputElement
                                type="text"
                                placeholder="Enter profile picture URL"
                                inputReference={avatarRef}
                                addedClass="mt-1"
                                defaultValue={RootUser.profilePic}
                            />
                        </div>
                        {RootUser.profilePic && (
                            <img
                                src={RootUser.profilePic}
                                alt="Preview"
                                className="w-16 h-16 rounded-full mt-2 border border-secondary-border"
                            />
                        )}
                    </div>

                    <div className="mt-6 flex justify-end gap-4">
                        <Button
                            isFull={false}
                            variant="secondary"
                            size="md"
                            text="Save"
                            onClickHandler={handleSave}
                        />
                    </div>
                </div>
            </DialogModal>
        </>
    );
};

export default EditProfile;
