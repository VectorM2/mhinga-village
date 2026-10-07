"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/shared/client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="container-page py-20">
      <ErrorState onRetry={reset} />
    </div>
  );
}
