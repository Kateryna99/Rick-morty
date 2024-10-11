'use client';

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function getBoolean(key: string): boolean | null {
  const value = sessionStorage.getItem(key);

  if (!value) {
    return null;
  }

  return JSON.parse(value) as boolean;
}

function setBoolean(key: string, value: boolean): void {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export const useHandleFirstSession = () => {
  const [isLoading, setIsLoading] = useState(!getBoolean("wasVisited"));
  const path = usePathname();

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => setIsLoading(false), 5000);
    }

    setBoolean("wasVisited", true);
  }, [isLoading]);

  return { isLoading, path };
};
