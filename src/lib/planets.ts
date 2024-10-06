// src/lib/planets.js
import db from '../../initdb'; // Імпортуємо екземпляр бази даних

export const getPlanets = <T>(): T[] => {
    return db.prepare('SELECT * FROM planets').all() as T[];
};
