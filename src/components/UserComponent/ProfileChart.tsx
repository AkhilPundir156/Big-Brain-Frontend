import { useState } from "react";
import {
    LineChart,
    Line,
    YAxis,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Calendar } from "lucide-react";

import { profileStats } from "../../demo/profileStats";

const ProfileChart = () => {
    const [timeRange, setTimeRange] = useState<"days" | "months" | "years">(
        "days"
    );

    return (
        <div className="border rounded-xl shadow-sm pb-10 border-secondary-border w-full sm:w-[90%] md:w-full mx-auto">
            <div className="flex justify-between items-center p-4 sm:p-8">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-accent-color" /> Activity
                </h2>
                <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value as any)}
                    className="text-sm border rounded-md px-2 py-1 bg-primary-bg outline-none border-secondary-border"
                >
                    <option value="days">Days</option>
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                </select>
            </div>
            <ResponsiveContainer width="95%" height={250}>
                <LineChart data={profileStats.queriesPerDay}>
                    <CartesianGrid strokeDasharray="3 3" stroke="gray" />
                    <XAxis
                        dataKey="date"
                        stroke="gray"
                        tickFormatter={(date) => date.slice(5)}
                    />
                    <YAxis stroke="gray" />
                    <Tooltip labelClassName="text-black" />
                    <Line
                        type="monotone"
                        dataKey="count"
                        stroke="green"
                        strokeWidth={2}
                        dot
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ProfileChart;
