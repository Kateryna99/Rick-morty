'use client';

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const useHandleFirstSession = () => {
    const [isLoading, setIsLoading] = useState(true); // Початково true
    const path = usePathname();

    useEffect(() => {
        const firstVisitSession = sessionStorage.getItem('firstVisit');

        if (!firstVisitSession) {
            sessionStorage.setItem('firstVisit', 'true');
            //setIsLoading(true);

            // Залишаємо isLoading як true на 5 секунд
            const timer = setTimeout(() => {
                console.log('Loading...')
                setIsLoading(false); // Оновлюємо стан через 5 секунд
            }, 5000);

            // Очищення таймера при розмонтуванні компонента (на всяк випадок)
            return () => clearTimeout(timer);
        } else {
            // Якщо це не перший візит у сесії
            setIsLoading(false);
        }
    }, []);

    return { isLoading, path };
};
