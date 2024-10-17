"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect } from 'react';
import { fetchCharacterById, setCharacter } from "@/features/characterSlice";
import { CharacterSceleton } from "@/sceletons/CharacterSceleton";

import styles from "./CharacterDetails.module.scss";
import classNames from "classnames";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

interface Props {
  itemsPerPage: number;
}

const CharacterPage: FC<Props> = ({ itemsPerPage }) => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams);
  const idParam = searchParams.get("selectedId");
  const router = useRouter();
  const { character, charactersList } = useAppSelector(
    (state) => state.characters,
  );

  const selectedId = idParam ? parseInt(idParam) : null;
  const getCurrentPageFromHero = (id) => Math.floor((id - 1) / itemsPerPage) + 1;

  const handleButtonClick = (id) => {

    newParams.set('selectedId', id.toString());

    const currPage = getCurrentPageFromHero(id)

    newParams.set('page', currPage.toString());

    router.push(`?${newParams.toString()}`);
  };

  const handleReset = () => {
    dispatch(setCharacter({}));

    const params = new URLSearchParams(window.location.search);

    params.delete("selectedId");
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {

    if (selectedId) {
      dispatch(fetchCharacterById(selectedId));
    }
  }, [selectedId]);

  return (
    <>
      {!character || !selectedId ? (
        <CharacterSceleton />
      ) : (
        <div className={styles.selectedCharacter}>
          <div className={styles.characterWrapper}>
            <div className={styles.characterHeader}>
              <button
                className={classNames(styles.button, "icon-chevron-up")}
                style={{ transform: "rotate(-90deg)" }}
                onClick={() => handleButtonClick(selectedId - 1)}
                disabled={selectedId === 1}
              />

              <div className={styles.characterImage}>
                <img src={character.image} alt={character.name} />
              </div>

              <button
                className={classNames(styles.button, "icon-chevron-up")}
                style={{ transform: "rotate(90deg)" }}
                onClick={() => handleButtonClick(selectedId + 1)}
                disabled={selectedId === charactersList.length}
              />
            </div>

            <div className={styles.characterMain}>
              <div className={styles.characterBlock}>
                <h5 className={styles.characterTitle}>Name:</h5>
                <p className={styles.characterText}>{character?.name}</p>
              </div>

              <div className={styles.characterBlock}>
                <h5 className={styles.characterTitle}>Status:</h5>
                <p className={styles.characterText}>{character?.status}</p>
              </div>

              <div className={styles.characterBlock}>
                <h5 className={styles.characterTitle}>Species:</h5>
                <p className={styles.characterText}>{character?.species}</p>
              </div>

              <div className={styles.characterBlock}>
                <h5 className={styles.characterTitle}>Gender:</h5>
                <p className={styles.characterText}>{character?.gender}</p>
              </div>

              <div className={styles.characterBlock}>
                <h5 className={styles.characterTitle}>Birth Place:</h5>
                <p className={styles.characterText}>
                  {character?.origin?.name?.split(" ").slice(0, 1)}
                </p>
              </div>

              <div className={classNames(styles.characterBlock, styles.column)}>
                <h5 className={styles.characterTitle}>Episodes:</h5>
                <div className={styles.episodeList}>
                  {character?.episode?.slice(0, 1).map((item, index) => (
                    <Link href={item} key={index}>
                      Episode {item.split("/").pop()}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <button className={styles.reset} onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CharacterPage;
