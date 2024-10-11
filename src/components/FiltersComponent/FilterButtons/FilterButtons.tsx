"use client";

import styles from "./FilterButtons.module.scss";
import { FC} from "react";
import { useDispatch } from "react-redux";
import { setDataFilter, setFilters } from "@/features/filterSlice";
import classNames from "classnames";

interface Props {
  key?: number;
  filters: string[];
  selectedOption: string;
  kayValue: string;
  placeholder: string;
}

export const FilterButtons: FC<Props> = ({
  filters,
  selectedOption,
  keyValue,
}) => {
  const dispatch = useDispatch();

  const handleClick = (option: string) => {
    dispatch(setDataFilter({ key: `${keyValue}`, payload: option }));
    dispatch(setFilters(option));
  };

  return (
    <div className={styles.filterOptions}>
      {filters.map((option, index) => (
        <button
          key={index}
          className={classNames(styles.option, {
            [styles.active]: selectedOption === option,
          })}
          onClick={() => handleClick(option)}
          disabled={selectedOption === option}
        >
          {option}
        </button>
      ))}
    </div>
  );
};
