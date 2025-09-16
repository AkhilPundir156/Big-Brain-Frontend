import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store";

import userService from "../../utils/userService";

import ProfileChart from "./ProfileChart";
import ProfileInfo from "./ProfileInfo";
import ProfileStats from "./ProfileStats";

import Loader from "../../ui/Loader";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
    const [user, setUser] = useState<any>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");

    const isLoading = useSelector((state: RootState) => state.ui.isLoading);
    const navigation = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await userService.getMyProfile();

                //@ts-ignore
                const user = res?.user;

                if (!user) {
                    navigation("/");
                    return;
                }
                setUser(user);
                setName(user.name);
                setEmail(user.email);
                setAvatar(user.avatar_url || "");
            } catch (err) {
                console.error("Failed to load profile", err);
            }
        };
        fetchUser();
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="mx-auto flex justify-between p-20 pb-0 h-full gap-10">
            {/* Left: Stats + Chart */}
            <div className="flex flex-col gap-8 w-[40%] mx-auto p-10">
                <ProfileStats />
                <ProfileChart />
            </div>

            {/* Right: Profile Info */}
            <ProfileInfo
                user={user}
                name={name}
                setName={setName}
                email={email}
                avatar={avatar}
                setAvatar={setAvatar}
            />
        </div>
    );
};

export default MyProfile;
