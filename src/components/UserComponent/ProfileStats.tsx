import { Database, BarChart2 } from "lucide-react";

import { profileStats } from "../../demo/profileStats";

const ProfileStats = () => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 w-full mx-auto">
            <div className="p-4 border rounded-xl flex flex-col items-center text-center shadow-sm flex-1 border-secondary-border">
                <Database className="text-accent-color w-6 h-6 mb-2" />
                <p className="text-sm text-tertiary-text">Brain Items</p>
                <p className="text-2xl font-semibold">
                    {profileStats.totalBrainItems}
                </p>
            </div>
            <div className="p-4 border rounded-xl flex flex-col items-center text-center shadow-sm flex-1 border-secondary-border">
                <BarChart2 className="text-accent-color w-6 h-6 mb-2" />
                <p className="text-sm text-tertiary-text">Total Queries</p>
                <p className="text-2xl font-semibold">
                    {profileStats.totalQueries}
                </p>
            </div>
            <div className="p-4 border rounded-xl flex flex-col items-center text-center shadow-sm flex-1 border-secondary-border">
                <BarChart2 className="text-accent-color w-6 h-6 mb-2" />
                <p className="text-sm text-tertiary-text">Today's Queries</p>
                <p className="text-2xl font-semibold">
                    {profileStats.todayQueries}
                </p>
            </div>
        </div>
    );
};

export default ProfileStats;
