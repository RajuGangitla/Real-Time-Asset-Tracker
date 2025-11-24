import { memo } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatCardProps } from "@/types";

export const StatCard = memo(function StatCard({ type, value }: StatCardProps) {
    const isHigh = type === "high";
    const Icon = isHigh ? TrendingUp : TrendingDown;
    const label = isHigh ? "Session High" : "Session Low";
    const colorClass = isHigh ? "text-emerald-600 dark:text-emerald-500" : "text-rose-600 dark:text-rose-500";

    return (
        <div className="flex flex-col items-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-100 dark:border-zinc-800 transition-colors">
            <div className={cn("flex items-center gap-1.5 text-sm font-medium mb-1", colorClass)}>
                <Icon className="h-4 w-4" /> {label}
            </div>
            <span className="text-xl font-semibold tabular-nums">
                {value ? `$${value.toFixed(2)}` : "-"}
            </span>
        </div>
    );
});
