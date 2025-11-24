
import Link from "next/link";
import assets from "@/data/assets.json";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-background p-6 relative">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center text-foreground">
          Select Asset to Track
        </h1>

        <ul className="space-y-3">
          {assets.map((asset) => (
            <li key={asset.id}>
              <Link
                href={`/market/${asset.id}`}
                className="flex items-center justify-between rounded-md border bg-card p-4 shadow-sm hover:bg-accent transition"
              >
                <span className="font-medium text-card-foreground">
                  {asset.name} ({asset.id})
                </span>
                <span className="text-muted-foreground text-sm">
                  {asset.currency}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
