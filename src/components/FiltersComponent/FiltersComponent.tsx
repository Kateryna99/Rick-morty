import { FC } from "react";

import styles from "./FiltersComponent.module.scss";
import { SearchInput } from "@/components/FiltersComponent/SearchInput/SearchInput";
import { FilterButtons } from "@/components/FiltersComponent/FilterButtons/FilterButtons";
import { Search } from "@/types/Search";

interface Props {
  dropDownList?: FilterButtons[];
  searchList: Search[];
}

export const FiltersComponent: FC<Props> = ({ dropDownList, searchList }) => {
  return (
    <div className={styles.filter}>
      <div className={styles.filterWrapper}>
        <div className={styles.filterSearch}>
          {searchList.map((search) => {
            return <SearchInput key={search.id} {...search} />;
          })}
        </div>

        {!!dropDownList?.length && (
          <div className={styles.filterDropdowns}>
            {dropDownList.map((filter) => (
              <FilterButtons key={filter.id} {...filter} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
