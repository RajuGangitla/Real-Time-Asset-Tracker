"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import { addPrice } from "@/lib/store/features/asset/assetSlice";
import { simulateFetchPrice } from "@/lib/api/simulateFetch";

export function useAssetTracker(
  assetId: string,
  currency: string,
  pollInterval: number,
  alertThreshold: number,
  isAutoRefreshEnabled: boolean,
  userTier: string,
  onAlertTriggered: (price: number, threshold: number) => void
) {
  const dispatch = useAppDispatch();

  const thresholdRef = useRef(alertThreshold);
  const onAlertRef = useRef(onAlertTriggered);

  useEffect(() => {
    thresholdRef.current = alertThreshold;
  }, [alertThreshold]);

  useEffect(() => {
    onAlertRef.current = onAlertTriggered;
  }, [onAlertTriggered]);

  // Polling Effect
  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout | null = null;
    let activeFetchCancel: (() => void) | null = null;

    const poll = () => {
      if (!isAutoRefreshEnabled) return;

      const { promise, cancel } = simulateFetchPrice(assetId, currency, userTier);
      activeFetchCancel = cancel;

      promise.then((price) => {
        if (!isMounted) return;
        dispatch(addPrice(price));

        if (price > thresholdRef.current) {
          onAlertRef.current(price, thresholdRef.current);
        }

        timeoutId = setTimeout(poll, pollInterval);
      })
      .catch((err: unknown) => {
         if (!isMounted) return;
         console.error("Poll failed", err);
         timeoutId = setTimeout(poll, pollInterval);
      });
    };

    poll();

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
      if (activeFetchCancel) activeFetchCancel();
      console.log("Cleaning up resource for:", assetId);
    };
  }, [assetId, currency, pollInterval, userTier, isAutoRefreshEnabled]);
  
}
