import { FC } from "react";

import styles from "./FiltersComponent.module.scss";
import { SearchInput } from "@/components/FiltersComponent/SearchInput/SearchInput";
import { FilterButtons } from "@/components/FiltersComponent/FilterButtons/FilterButtons";
import { Search } from "@/types/Search";
import { Filter } from "@/types/Filter";

interface Props {
    filterList?: Filter[];
  searchList: Search[];
}

export const FiltersComponent: FC<Props> = ({ filterList, searchList }) => {
  return (
    <div className={styles.filter}>
      <div className={styles.filterWrapper}>
        <div className={styles.filterSearch}>
          {searchList.map((search) => {
            return <SearchInput key={search.id} {...search} />;
          })}
        </div>

        {!!filterList?.length && (
          <div className={styles.filterDropdowns}>
            {filterList.map((filter) => (
              <FilterButtons key={filter.id} {...filter} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
