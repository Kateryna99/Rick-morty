import { Location } from "./Location";

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Partial<Location>;
  location: Partial<Location>;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
