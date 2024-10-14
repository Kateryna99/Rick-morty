import { FC } from "react";
import { Character } from "@/types/Character";

import styles from "../../styles/DataList.module.scss";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import { useAppSelector } from "@/store/hooks";

interface Props {
  currentData: Character[];
}

export const CharactersList: FC<Props> = ({ currentData }) => {
  const router = useRouter();
  const { character } = useAppSelector((state) => state.characters);

  const handleCharacterClick = (id: number) => {
    router.push(`/character?selectedId=${id}`);
  };

  return (
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
            <img src={item.image} alt={item.name} />
          </div>

          <p className={styles.name}>{item.name}</p>
        </div>
      ))}
    </div>
  );
};
