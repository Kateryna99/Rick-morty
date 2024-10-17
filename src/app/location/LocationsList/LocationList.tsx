import { FC } from "react";
import styles from '@/styles/DataList.module.scss'
import classNames from 'classnames';
import Image from 'next/image';
import { Location } from '@/types/Location';

interface Props {
  locations: Location[];
}

export const LocationsList: FC<Props> = ({ locations }) => {
  return (
    <div className={classNames(styles.dataList, styles.columns)}>
      {locations.map((item) => (
        <div
          key={item.id}
          className={styles.dataCard}
        >

          <div className={styles.header}>{item.type}</div>

          <p className={styles.name}>{item.name}</p>
        </div>
      ))}
    </div>
  )
};
