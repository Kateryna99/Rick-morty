// eslint-disable-next-line @typescript-eslint/no-require-imports
const sql = require('better-sqlite3');

const db = new sql('planets.db');

db.prepare(`
    CREATE TABLE IF NOT EXISTS planets(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        temperature TEXT NOT NULL,
        image TEXT NOT NULL
    )
`).run();

const planetsList = [
  {
    title: 'Snake Planet',
    temperature: '70℉',
    image: '/planets/snake_planet.jpg',
  },
  {
    title: 'Gazorpazorp Planet',
    temperature: '360℉',
    image: '/planets/gazo.jpg',
  },
  {
    title: 'Kepler Planet',
    temperature: '10℉',
    image: '/planets/kepler.jpg',
  },
  {
    title: 'Burma Planet',
    temperature: '40℉',
    image: '/planets/burma.jpg',
  },
  {
    title: 'Gramuflack Planet',
    temperature: '-40℉',
    image: '/planets/gramuflack.jpg',
  },
  {
    title: 'Sexy Planet',
    temperature: '300℉',
    image: '/planets/sexy.jpg',
  },
];

// Функція для вставки планет
async function insertPlanets() {
  const stmt = db.prepare(`
        INSERT INTO planets (title, temperature, image) VALUES (
            @title,
            @temperature,
            @image
        )
    `);

  // Вставка планет, тільки якщо їх немає
  for (const planet of planetsList) {
    // Перевірка, чи існує вже планета
    const exists = db.prepare('SELECT COUNT(*) FROM planets WHERE title = ?')
      .get(planet.title)['COUNT(*)'];

    if (exists === 0) {
      stmt.run(planet);
    }
  }
}

function clearPlanets() {
  db.prepare('DELETE FROM planets').run();
}

// Виклик очищення перед вставкою нових планет
clearPlanets();
insertPlanets();

export default db;
