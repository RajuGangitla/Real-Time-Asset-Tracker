"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAssetTracker } from "@/hooks/useAssetTracker";
import { toast } from "sonner";
import { Activity, AlertCircle, ArrowLeft } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { PriceDisplay } from "./components/PriceDisplay";
import { TrackerControls } from "./components/TrackerControls";

export default function AssetTrackerClient({ assetId }: { assetId: string }) {
    const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState(true);
    const [alertThreshold, setAlertThreshold] = useState(65000);

    const handleThresholdChange = useCallback((val: number) => {
        setAlertThreshold(val);
    }, []);

    const handleAutoRefreshChange = useCallback((val: boolean) => {
        setIsAutoRefreshEnabled(val);
    }, []);

    const handleAlert = useCallback((price: number, threshold: number) => {
        toast.warning(`Price Alert!`, {
            description: `${assetId} just crossed $${threshold.toLocaleString()} (Current: $${price.toLocaleString()})`,
            duration: 5000,
            icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
        });
    }, [assetId]);


    useAssetTracker(
        assetId,
        "USD",
        3000,
        alertThreshold,
        isAutoRefreshEnabled,
        "free",
        handleAlert
    );

    return (
        <div className="relative flex items-center justify-center min-h-screen p-4 animate-in fade-in zoom-in duration-500">
            <div className="absolute top-4 left-4">
                <Link href="/">
                    <Button variant="outline" size="icon" title="Back to Home">
                        <ArrowLeft className="h-[1.2rem] w-[1.2rem]" />
                        <span className="sr-only">Back</span>
                    </Button>
                </Link>
            </div>
            <div className="absolute top-4 right-4">
                <ModeToggle />
            </div>
            <Card className="w-full max-w-lg shadow-2xl border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800 pb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-3xl font-bold tracking-tight">
                                {assetId} Tracker
                            </CardTitle>
                            <CardDescription className="text-base mt-1">Real-time market simulation</CardDescription>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Activity className="h-6 w-6 text-primary" />
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-8 pt-8">
                    <PriceDisplay currency="USD" />
                    
                    <TrackerControls 
                        threshold={alertThreshold}
                        isAutoRefresh={isAutoRefreshEnabled}
                        onThresholdChange={handleThresholdChange}
                        onAutoRefreshChange={handleAutoRefreshChange}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
