import { Pause } from "@/enums/Pause";

export const getPause = (duration: Pause) => {
  return new Promise(resolve => setTimeout(resolve, duration));
}