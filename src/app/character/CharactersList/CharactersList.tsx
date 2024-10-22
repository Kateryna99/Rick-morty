import { FC, Suspense } from "react";
import { Character } from "@/types/Character";

import styles from "@/styles/DataList.module.scss";
import { useRouter, useSearchParams } from 'next/navigation';
import classNames from "classnames";
import { useAppSelector } from "@/store/hooks";
import Image from 'next/image';

interface Props {
  currentData: Character[];
}

export const CharactersList: FC<Props> = ({ currentData }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { character } = useAppSelector((state) => state.characters);

  const handleCharacterClick = (id: number) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('selectedId', id.toString());
    const currentPageFromHero = Math.floor((id - 1) / 6) + 1;

    newParams.set('page', currentPageFromHero.toString());

    router.push(`?${newParams.toString()}`);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={styles.dataList}>
        {currentData.map((item) => (
          <div
            key={item.id}
            className={classNames(styles.dataCard, {
              [styles.notSelected]: character?.id && character?.id !== item.id,
            })}
            onClick={() => handleCharacterClick(item.id)}
          >
            <div className={styles.dataImage}>
              <img src={item.image} alt={item.name}/>
            </div>

            <p className={styles.name}>{item.name}</p>
          </div>
        ))}
      </div>
    </Suspense>
  );
};
