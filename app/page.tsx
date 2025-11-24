
import Link from "next/link";
import assets from "@/data/assets.json";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black p-6">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center text-zinc-800 dark:text-white">
          Select Asset to Track
        </h1>

        <ul className="space-y-3">
          {assets.map((asset) => (
            <li key={asset.id}>
              <Link
                href={`/market/${asset.id}`}
                className="flex items-center justify-between rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4 shadow-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              >
                <span className="font-medium text-zinc-900 dark:text-white">
                  {asset.name} ({asset.id})
                </span>
                <span className="text-zinc-600 dark:text-zinc-400 text-sm">
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
