'use client';

import styles from './FilterButtons.module.scss';
import { FC } from 'react';
import { setDataFilter, setFilters } from '@/features/filterSlice';
import classNames from 'classnames';
import { useAppDispatch } from '@/store/hooks';

interface Props {
    key?: number;
    filters: string[];
    selectedOption: string;
    keyValue: string;
    title: string;
}

export const FilterButtons: FC<Props> = ({
  filters,
  selectedOption,
  keyValue,
  title,
}) => {
  const dispatch = useAppDispatch();

  const handleClick = (option: string) => {
    dispatch(setDataFilter({ key: `${keyValue}`, payload: option }));
    dispatch(setFilters(option));
  };

  return (
    <div className={styles.filterButtons}>
      <h5 className={styles.title}>{title}</h5>
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
    </div>
  );
};
