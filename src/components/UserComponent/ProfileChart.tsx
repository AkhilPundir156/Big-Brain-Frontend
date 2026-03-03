import { useState, useMemo } from "react";
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

type QueryData = {
    date: string;
    count: number;
};

type ProfileChartProps = {
    profileStats?: {
        total_queries?: string[];
    };
};

const ProfileChart = ({ profileStats }: ProfileChartProps) => {
    const [timeRange, setTimeRange] = useState<"days" | "months" | "years">(
        "days"
    );

    const chartData: QueryData[] = useMemo(() => {
        if (!profileStats?.total_queries) return [];

        const grouped: Record<string, number> = {};

        profileStats.total_queries.forEach((q) => {
            const date = new Date(q);

            let key = "";

            if (timeRange === "days") {
                key = date.toISOString().split("T")[0];
            } else if (timeRange === "months") {
                key = `${date.getFullYear()}-${date.getMonth() + 1}`;
            } else {
                key = `${date.getFullYear()}`;
            }

            grouped[key] = (grouped[key] || 0) + 1;
        });

        return Object.entries(grouped).map(([date, count]) => ({
            date,
            count,
        }));
    }, [profileStats, timeRange]);

    if (!profileStats) return null;

    return (
        <div className="border rounded-xl shadow-sm pb-10 border-secondary-border w-full sm:w-[90%] md:w-full mx-auto">
            <div className="flex justify-between items-center p-4 sm:p-8">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-accent-color" /> Activity
                </h2>
                <select
                    value={timeRange}
                    onChange={(e) =>
                        setTimeRange(
                            e.target.value as "days" | "months" | "years"
                        )
                    }
                    className="text-sm border rounded-md px-2 py-1 bg-primary-bg outline-none border-secondary-border"
                >
                    <option value="days">Days</option>
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                </select>
            </div>

            <ResponsiveContainer width="95%" height={250}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="gray" />
                    <XAxis dataKey="date" stroke="gray" />
                    <YAxis stroke="gray" />
                    <Tooltip />
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
