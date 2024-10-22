"use client";

import styles from "./SearchInput.module.scss";
import { ChangeEvent, useCallback, useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "@/types/Search";
import { useAppDispatch } from "@/store/hooks";
import { debounce } from "lodash";
import { Pause } from '@/enums/Pause';

export const SearchInput = ({
  queryValue,
  wordsList,
  queryType,
  setQuery,
  title
}: Search) => {
  const [placeholder, setPlaceholder] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(true);
  const [isTyping, setIsTyping] = useState(true);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const debounceHandleChange = useCallback(
    debounce((value: string) => {
      setQuery(value);

    }, Pause.debounce), [queryType]
  );

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (value) {
      newSearchParams.set(queryType, value);
    } else {
      newSearchParams.delete(queryType);
    }

    router.push(`?${newSearchParams.toString()}`, { shallow: true });

    debounceHandleChange(value);
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
    <Suspense fallback={null}>
      <div className={styles.searchInput}>
        <h5 className={styles.title}>{title}</h5>
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
      </div>
    </Suspense>
  );
};
