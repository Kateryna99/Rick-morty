'use client'

import { useEffect } from 'react';

const StarsBackground = () => {
    useEffect(() => {
        const starsCount = 200;
        const stars = [];

        const starsContainer = document.createElement('div');
        starsContainer.className = 'stars';
        const wrapper = document.querySelector('.wrapper');
        wrapper?.appendChild(starsContainer); // Додаємо контейнер до тіла

        for (let i = 0; i < starsCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';

            const size = `${Math.random() * 3 + 2}px`;
            star.style.width = size;
            star.style.height = size;
            star.style.position = 'absolute';
            star.style.top = `${Math.random() * 100}vh`;
            star.style.left = `${Math.random() * 100}vw`;

            const randomDuration = Math.random() * 3 + 3;
            star.style.animationDuration = `${randomDuration}s`;

            starsContainer.appendChild(star);
            stars.push(star);
        }

        // Очищаємо контейнер при розмонтуванні компонента
        return () => {
            wrapper?.removeChild(starsContainer);
        };
    }, []);

    return null; // Компонент нічого не рендерить сам
};

export default StarsBackground;
