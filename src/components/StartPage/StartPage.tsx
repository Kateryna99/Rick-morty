"use client"

import { useHandleFirstSession } from "@/hooks/useHandleFirstSession";
import { StartLoader } from "@/components/StartLoader/StartLoader";

export const StartPage = ({ children }) => {
  const { isLoading } = useHandleFirstSession()

  return (
    <>
      {isLoading ? (<StartLoader/>) : (
        children
      )}

    </>
  )
}