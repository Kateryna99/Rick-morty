import { SearchQueries } from "@/enums/SearchQueries";

export interface Search {
  id: number;
  queryValue: string;
  wordsList: string[];
  queryType: SearchQueries;
  setQuery: (queryValue: string) => void;
}
