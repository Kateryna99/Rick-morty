import { FC } from "react";
import { Episode } from "@/types/Episode";

interface Props {
  episodes: Episode[];
}

export const EpisodesList: FC<Props> = ({ episodes }) => {
  return <p>EpisodesList</p>;
};
