import { FC } from "react";
import { Episode } from "@/types/Episode";
import styles from '@/styles/DataList.module.scss'
import classNames from 'classnames';
import Image from 'next/image';

interface Props {
  episodes: Episode[];
}

export const EpisodesList: FC<Props> = ({ episodes }) => {
  return (
    <div className={classNames(styles.dataList, styles.columns)}>
      {episodes.map((item) => (
        <div
          key={item.id}
          className={styles.dataCard}
        >

          <div className={styles.header}>{item.id}</div>

          <p className={styles.name}>{item.name}</p>
        </div>
      ))}
    </div>
  )
};
