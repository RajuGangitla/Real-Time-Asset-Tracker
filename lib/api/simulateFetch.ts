import assets from "@/data/assets.json";

export interface FetchHandle {
    promise: Promise<number>;
    cancel: () => void;
}

export function simulateFetchPrice(
    assetID: string,
    currency: string,
    userTier: string
): FetchHandle {
    const asset = assets.find((a) => a.id === assetID);

    if (!asset) {
        return {
            promise: Promise.reject(new Error("Asset not found")),
            cancel: () => { }
        };
    }

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let rejectPromise: ((reason?: unknown) => void) | null = null;

    const promise = new Promise<number>((resolve, reject) => {
        rejectPromise = reject;
        const delay = 500 + Math.random() * 1000;

        timeoutId = setTimeout(() => {
            const fluctuation = (Math.random() - 0.5) * 0.02;
            const newPrice = asset.basePrice * (1 + fluctuation);

            resolve(Number(newPrice.toFixed(2)));
        }, delay);
    });

    return {
        promise,
        cancel: () => {
            if (timeoutId !== null) {
                clearTimeout(timeoutId);
            }
            if (rejectPromise) {
                rejectPromise(new Error("Request cancelled"));
            }
        }
    };
}
