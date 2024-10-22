import { CharactersCatalog } from "@/app/character/CharactersCatalog/CharactersCatalog";
import { Suspense } from "react";

const CharactersPage = () => {
  return <Suspense fallback={<div>Loading...</div>}>
    <CharactersCatalog />
  </Suspense>
};

export default CharactersPage;
