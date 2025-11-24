import { memo, useState, useEffect } from "react";
import { AlertCircle, DollarSign, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { TrackerControlsProps } from "@/types";

export const TrackerControls = memo(function TrackerControls({ 
    threshold, 
    isAutoRefresh, 
    onThresholdChange, 
    onAutoRefreshChange 
}: TrackerControlsProps) {
    const [inputValue, setInputValue] = useState(threshold.toString());

    useEffect(() => {
        if (Number(inputValue) !== threshold) {
            setInputValue(threshold.toString());
        }
    }, [threshold]);

    useEffect(() => {
        const val = Number(inputValue);
        if (!isNaN(val) && val !== threshold) {
            const timer = setTimeout(() => {
                onThresholdChange(val);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [inputValue, threshold, onThresholdChange]);

    return (
        <div className="space-y-6 pt-6 border-t border-border">
            <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    Price Alert Threshold
                </label>
                <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="pl-9 h-12 text-lg font-mono"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                <div className="flex items-center gap-3">
                    <div className={cn(
                        "p-2.5 rounded-full transition-colors",
                        isAutoRefresh ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500"
                    )}>
                        <RefreshCw className={cn("h-5 w-5", isAutoRefresh && "animate-spin-slow")} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">Auto-Refresh</span>
                        <span className="text-xs text-muted-foreground">
                            {isAutoRefresh ? "Updates every 3s" : "Polling paused"}
                        </span>
                    </div>
                </div>
                <Switch
                    checked={isAutoRefresh}
                    onCheckedChange={onAutoRefreshChange}
                    className="scale-110"
                />
            </div>
        </div>
    );
});
