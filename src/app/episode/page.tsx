import { EpisodesCatalog } from "@/app/episode/EpisodesCatalog/EpisodesCatalog";
import { Suspense } from "react";

const EpisodesPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EpisodesCatalog/>
    </Suspense>
  )
}

export default EpisodesPage;