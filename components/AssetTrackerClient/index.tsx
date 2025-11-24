"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useAssetTracker } from "@/hooks/useAssetTracker";
import { toast } from "sonner";

export default function AssetTrackerClient({ assetId }: { assetId: string }) {
    const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState(true);
    const [alertThreshold, setAlertThreshold] = useState(65000);

    const { latestPrice, highLow } = useAssetTracker(
        assetId,
        "USD",
        3000,
        alertThreshold,
        isAutoRefreshEnabled,
        "free",
        (price, threshold) => {
            toast(`🚨 ${assetId} crossed $${threshold}! Current: $${price}`);
        }
    );

    return (
        <div className="flex items-center justify-center min-h-[70vh] p-4">
            <Card className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700">
                <CardHeader>
                    <CardTitle className="text-center text-xl">
                        {assetId} Price Tracker
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-5">
                    <div className="text-center text-lg">
                        <span className="text-zinc-600 dark:text-zinc-300">Current:</span>{" "}
                        <strong className="text-zinc-900 dark:text-white">
                            {latestPrice !== null ? `$${latestPrice}` : "Loading..."}
                        </strong>
                    </div>

                    <div className="flex justify-between text-sm opacity-80">
                        <p>High: {highLow.high ?? "-"}</p>
                        <p>Low: {highLow.low ?? "-"}</p>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm text-zinc-500 dark:text-zinc-400">
                            Alert Above
                        </label>
                        <Input
                            type="number"
                            value={alertThreshold}
                            onChange={(e) => setAlertThreshold(Number(e.target.value))}
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-sm">Enable Auto Refresh</span>
                        <Switch
                            checked={isAutoRefreshEnabled}
                            onCheckedChange={setIsAutoRefreshEnabled}
                        />
                    </div>

                    {!isAutoRefreshEnabled && (
                        <p className="text-xs text-center opacity-60">
                            Auto refresh is off
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
