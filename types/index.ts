export interface AssetState {
  priceHistory: number[];
}

export type PriceDisplayProps = {
  currency: string;
};

export type TrackerControlsProps = {
  threshold: number;
  isAutoRefresh: boolean;
  onThresholdChange: (val: number) => void;
  onAutoRefreshChange: (val: boolean) => void;
};

export type StatCardProps = {
  type: "high" | "low";
  value: number | null;
};

