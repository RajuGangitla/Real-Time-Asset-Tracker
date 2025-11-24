import { memo } from "react";
import { Activity, Loader2 } from "lucide-react";
import { useAppSelector } from "@/lib/store/hooks";
import { selectHighLow } from "@/lib/store/features/asset/selectors";
import { selectLatestAssetPrice } from "@/lib/store/features/asset/latestPriceSelector";
import { StatCard } from "./StatCard";
import { PriceDisplayProps } from "@/types";

export const PriceDisplay = memo(function PriceDisplay({ currency }: PriceDisplayProps) {

    const price = useAppSelector(selectLatestAssetPrice);
    const { high, low } = useAppSelector(selectHighLow);
    
    const isLoading = price === null;

    return (
        <div className="space-y-6">
            <div className="flex flex-col items-center justify-center space-y-2 py-6">
                <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Activity className="h-4 w-4" /> Live Market Data
                </span>
                
                {isLoading ? (
                    <div className="flex items-center gap-2 text-5xl font-bold text-muted-foreground animate-pulse">
                        <Loader2 className="h-10 w-10 animate-spin" />
                        <span>---.--</span>
                    </div>
                ) : (
                    <div className="relative group">
                         <strong className="text-6xl font-bold tracking-tight text-foreground tabular-nums transition-all duration-300">
                            ${typeof price === 'number' ? price.toFixed(2) : '0.00'}
                        </strong>
                        <span className="absolute -right-8 top-0 text-sm font-bold text-muted-foreground">
                            {currency}
                        </span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <StatCard type="high" value={high} />
                <StatCard type="low" value={low} />
            </div>
        </div>
    );
});
