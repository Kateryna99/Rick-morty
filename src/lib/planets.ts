
import db from '../../planetsdb';

export const getPlanets = <T>(): T[] => {
  return db.prepare('SELECT * FROM planets ORDER BY RANDOM() LIMIT 3').all() as T[];
};
