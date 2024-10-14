import styles from "./BaseCatalogContent.module.scss";
import classNames from "classnames";
import { FC, ReactNode } from "react";

interface BaseCatalogContentProps {
  children: ReactNode;
  flex?: boolean;
}

export const BaseCatalogContent: FC<BaseCatalogContentProps> = ({
  children,
  flex,
}) => {
  return (
    <div className={styles.catalog}>
      <div
        className={classNames(styles.catalogWrapper, { [styles.flex]: flex })}
      >
        {children}
      </div>
    </div>
  );
};
