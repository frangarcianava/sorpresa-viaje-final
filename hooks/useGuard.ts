"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProgress } from "@/lib/progress";

export const useGuard = (requiredStep: number) => {
  const router = useRouter();

  useEffect(() => {
    const progress = getProgress();
    if (progress < requiredStep) {
      router.replace("/");
    }
  }, [router, requiredStep]);
};
