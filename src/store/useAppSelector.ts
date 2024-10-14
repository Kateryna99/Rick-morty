import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export const useAppSelector = useSelector<RootState>;
