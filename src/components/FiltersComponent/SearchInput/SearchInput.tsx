"use client";

import styles from "./SearchInput.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "@/types/Search";
import { useAppDispatch } from "@/store/hooks";

export const SearchInput = ({
  queryValue,
  wordsList,
  queryType,
  setQuery,
}: Search) => {
  const [placeholder, setPlaceholder] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(true);
  const [isTyping, setIsTyping] = useState(true);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setQuery(value);

    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (value) {
      newSearchParams.set(queryType, value);
    } else {
      newSearchParams.delete(queryType);
    }

    router.push(`?${newSearchParams.toString()}`, { shallow: true });
  };

  useEffect(() => {
    const nameParam = searchParams.get(queryType);

    if (nameParam) {
      setQuery(nameParam);
    }
  }, [searchParams, dispatch]);

  useEffect(() => {
    const currentWord = wordsList[currentWordIndex];

    const typingInterval = setInterval(
      () => {
        if (isTyping) {
          if (isAdding) {
            setPlaceholder((prev) => prev + currentWord[prev.length]);

            if (placeholder.length === currentWord.length - 1) {
              setIsAdding(false);
            }
          } else {
            setPlaceholder((prev) => prev.slice(0, -1));

            if (placeholder.length === 1) {
              setIsAdding(true);
              setCurrentWordIndex((prev) => (prev + 1) % wordsList.length);
            }
          }
        }
      },
      Math.floor(Math.random() * (700 - 400 + 1)) + 400,
    );

    return () => clearInterval(typingInterval);
  }, [placeholder, isAdding, currentWordIndex, isTyping, queryValue]);

  const handleFocus = () => {
    setIsTyping(false);
    setPlaceholder("");
  };

  const handleBlur = () => {
    if (!queryValue.trim().length) {
      setIsTyping(true);
      setCurrentWordIndex(0);
      setPlaceholder("");
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={styles.label}>
      <input
        className={styles.input}
        type="text"
        placeholder={!isTyping ? "" : placeholder}
        value={queryValue}
        onChange={handleFilterChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </label>
  );
};
