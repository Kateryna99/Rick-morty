'use client';

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const useHandleFirstSession = () => {
  const [isLoading, setIsLoading] = useState(true);
  const path = usePathname();

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => setIsLoading(false), 5000);
    }
  }, [isLoading]);

  return { isLoading, path };
};
