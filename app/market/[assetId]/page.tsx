import AssetTrackerClient from "@/components/AssetTrackerClient";
import assets from "@/data/assets.json";
import { Metadata } from "next";

type Props = {
  params: Promise<{ assetId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { assetId } = await params;
  const asset = assets.find((a) => a.id === assetId);

  if (!asset) {
    return {
      title: "Asset Not Found",
      description: "The requested asset could not be found.",
    };
  }

  return {
    title: `${asset.name} (${asset.id}) Price Tracker`,
    description: `Real-time price tracking for ${asset.name}. Monitor live ${asset.currency} rates.`,
  };
}

export default async function MarketPage({ params }: Props) {
  const { assetId } = await params;

  return <AssetTrackerClient assetId={assetId} />;
}
