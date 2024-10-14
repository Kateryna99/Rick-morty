"use client";

import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { fetchCharacterById, setCharacter } from "@/features/characterSlice";
import { CharacterSceleton } from "@/sceletons/CharacterSceleton";

import styles from "./CharacterDetails.module.scss";
import classNames from "classnames";
import Link from "next/link";
import {useAppSelector} from "@/store/useAppSelector";

const CharacterPage = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("selectedId");
  const router = useRouter();
  const { character, charactersList } = useAppSelector(
    (state) => state.characters,
  );

  const handlePrevCharacter = () => {
    const nextId = parseInt(selectedId, 10);

    if (!isNaN(nextId)) {
      if (!isNaN(nextId)) {
        router.push(`?selectedId=${nextId - 1}`);
      }
    }
  };

  const handleNextCharacter = () => {
    const nextId = parseInt(selectedId, 10);

    if (!isNaN(nextId)) {
      if (!isNaN(nextId)) {
        router.push(`?selectedId=${nextId + 1}`);
      }
    }
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
  }, [selectedId, dispatch]);

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
                onClick={handlePrevCharacter}
                disabled={selectedId == 1}
              />

              <div className={styles.characterImage}>
                <img src={character.image} alt={character.name} />
              </div>

              <button
                className={classNames(styles.button, "icon-chevron-up")}
                style={{ transform: "rotate(90deg)" }}
                onClick={handleNextCharacter}
                disabled={selectedId == charactersList.length}
              />
            </div>

            <div className={styles.characterMain}>
              <div className={styles.characterBlock}>
                <h5 className={styles.characterTitle}>Name:</h5>
                <p className={styles.characterText}>{character.name}</p>
              </div>

              <div className={styles.characterBlock}>
                <h5 className={styles.characterTitle}>Status:</h5>
                <p className={styles.characterText}>{character.status}</p>
              </div>

              <div className={styles.characterBlock}>
                <h5 className={styles.characterTitle}>Species:</h5>
                <p className={styles.characterText}>{character.species}</p>
              </div>

              <div className={styles.characterBlock}>
                <h5 className={styles.characterTitle}>Gender:</h5>
                <p className={styles.characterText}>{character.gender}</p>
              </div>

              <div className={styles.characterBlock}>
                <h5 className={styles.characterTitle}>Birth Place:</h5>
                <p className={styles.characterText}>
                  {character.origin?.name.split(" ").slice(0, 1)}
                </p>
              </div>

              <div className={classNames(styles.characterBlock, styles.column)}>
                <h5 className={styles.characterTitle}>Episodes:</h5>
                <div className={styles.episodeList}>
                  {character.episode?.slice(0, 1).map((item, index) => (
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
