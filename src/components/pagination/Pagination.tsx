import { FC } from "react";

import styles from "./Pagination.module.scss";
import classNames from "classnames";

interface Props {
  totalPages: number[];
  handleNextPage: () => void;
  handlePrevPage: () => void;
  currentPage: number;
  handlePageNumberClick: (pageNumber: number) => void;
}

export const Pagination: FC<Props> = ({
  totalPages,
  handleNextPage,
  handlePrevPage,
  currentPage,
  handlePageNumberClick,
}) => {
  return (
    <div className={styles.pagination}>
      <button
        className={classNames(styles.button, styles.prev)}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      />

      <div className={styles.totalPages}>
        {totalPages.map((page) => (
          <button
            key={page}
            className={classNames(styles.pageNumber, {
              [styles.active]: currentPage === page,
            })}
            onClick={() => handlePageNumberClick(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className={classNames(styles.button, styles.next)}
        onClick={handleNextPage}
        disabled={currentPage === totalPages.length}
      />
    </div>
  );
};
