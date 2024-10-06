/*'use client'

import { useEffect, useState } from 'react';

const Loader = () => {
    const [progress, setProgress] = useState(0); // Стейт для зберігання прогресу

    useEffect(() => {
        let progressInterval = 1;

        const startLoading = () => {
            progressInterval = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress >= 100) {
                        clearInterval(progressInterval); // Зупиняємо, якщо досягли 100%
                        return 100;
                    }
                    return prevProgress + 1; // Збільшуємо на 1 кожен раз
                });
            }, 40); // 40 мс для досягнення 100% за 4 секунди
        };

        startLoading();

        return () => clearInterval(progressInterval); // Очищуємо інтервал при розмонтуванні компонента
    }, []);

    return (
        <div className="loader-container">
                <div
                    className="progress-fill"
                    style={{ width: `${progress}%`}} // Ширина лінії прогресу
                ></div>
            <div className="progress-text">{progress}%</div> {/!* Відображення цифр *!/}
        </div>
    );
};

export default Loader;*/
