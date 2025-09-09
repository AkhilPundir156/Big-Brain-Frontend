import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import { AppDispatch, RootState, store } from "../../store";
import { setNavbarItem } from "../../slices/uiSlice";

import { Button } from "../../ui/ButtonElement";
import EditProfile from "./EditProfile";
import userService from "../../utils/userService";
import { clearUser } from "../../slices/userSlice";
import Loader from "../../ui/Loader";

interface UserResponse {
    user: {
        _id: string;
        name: string;
        email: string;
        avatar_url?: string;
    };
}

const Myprofile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const uiTheme = useSelector((state: RootState) => state.ui);

    const [user, setUser] = useState<any>(null);

    const stats = {
        totalBrainItems: 12,
        totalQueries: 47,
        queriesPerDay: [
            { date: "2025-08-26", count: 3 },
            { date: "2025-08-27", count: 5 },
            { date: "2025-08-28", count: 8 },
            { date: "2025-08-29", count: 4 },
            { date: "2025-08-30", count: 10 },
            { date: "2025-08-31", count: 6 },
            { date: "2025-09-01", count: 11 },
        ],
    };

    useEffect(() => {
        dispatch(setNavbarItem(null));
        getMyProfile();
    }, []);

    const getMyProfile = async () => {
        try {
            const response: any = await userService.getMyProfile();
            const user = response?.user;
            if (user) {
                setUser({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    profilePic: user.avatar_url || "",
                    isAuthenticated: true,
                });
                return;
            }
            navigate("/login");
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                console.error(
                    "API error while fetching profile:",
                    err.response?.data || err.message
                );
            } else {
                console.error("Unexpected error while fetching profile:", err);
            }
            navigate("/login");
        }
    };

    if (uiTheme.isLoading || !user) {
        return <Loader />;
    }

    return (
        <div className="max-w-5xl mx-auto mt-20 p-6 bg-secondary-bg border border-secondary-border rounded-2xl shadow-lg">
            {/* Profile Header */}
            <div className="flex items-center gap-4">
                <img
                    src={
                        user.avatar_url ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user.name || "User"
                        )}&background=random`
                    }
                    alt="Profile Avatar"
                    className="w-20 h-20 rounded-full border border-secondary-border shadow"
                />
                <div>
                    <h1 className="text-xl font-bold text-primary-text">
                        {user.name || "Unnamed User"}
                    </h1>
                    <p className="text-sm text-tertiary-text">{user.email}</p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="p-4 bg-primary-bg border border-secondary-border rounded-xl shadow text-center">
                    <p className="text-lg font-bold text-primary-text">
                        {stats.totalBrainItems}
                    </p>
                    <p className="text-sm text-tertiary-text">Brain Items</p>
                </div>

                <div className="p-4 bg-primary-bg border border-secondary-border rounded-xl shadow text-center">
                    <p className="text-lg font-bold text-primary-text">
                        {stats.totalQueries}
                    </p>
                    <p className="text-sm text-tertiary-text">Queries Fired</p>
                </div>

                <div className="p-4 bg-primary-bg border border-secondary-border rounded-xl shadow text-center">
                    <p className="text-lg font-bold text-primary-text">
                        {
                            //@ts-ignore
                            stats.queriesPerDay.at(-1)?.count ?? 0
                        }
                    </p>
                    <p className="text-sm text-tertiary-text">
                        Today’s Queries
                    </p>
                </div>
            </div>

            {/* Chart Section */}
            <div className="mt-10">
                <h2 className="text-lg font-bold text-primary-text mb-4">
                    Queries Per Day
                </h2>
                <div className="h-64 bg-primary-bg border border-secondary-border rounded-xl shadow p-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={stats.queriesPerDay}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#444"
                            />
                            <XAxis
                                dataKey="date"
                                tick={{ fill: "var(--tertiary-text)" }}
                                tickFormatter={(date) => date.slice(5)}
                            />
                            <YAxis
                                allowDecimals={false}
                                tick={{ fill: "var(--tertiary-text)" }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "var(--primary-bg)",
                                    border: "1px solid var(--secondary-border)",
                                    borderRadius: "0.5rem",
                                }}
                                labelStyle={{ color: "var(--primary-text)" }}
                            />
                            <Line
                                type="monotone"
                                dataKey="count"
                                stroke="var(--accent-color, #4F46E5)"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="mt-10 flex gap-4">
                {/**Modal to Edit Profile */}
                <EditProfile />

                {/**LogOut Button */}
                <Button
                    variant="secondary"
                    size="md"
                    text="Logout"
                    isFull={false}
                    onClickHandler={async () => {
                        await userService.logoutUser();
                        store.dispatch(clearUser());
                        navigate("/login");
                    }}
                />
            </div>
        </div>
    );
};

export default Myprofile;
