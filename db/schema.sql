
DROP TABLE IF EXISTS platforms CASCADE;
DROP TABLE IF EXISTS games;

CREATE TABLE platforms (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  manufacturer TEXT NOT NULL
);

CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  genre TEXT NOT NULL,
  release_year INTEGER NOT NULL,
  platform_id INTEGER NOT NULL,
  FOREIGN KEY (platform_id) REFERENCES platforms (id) ON DELETE CASCADE,
  UNIQUE(title, release_year)
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY, 
    first_name TEXT, 
    last_name TEXT, 
    email TEXT NOT NULL, 
    password TEXT NOT NULL
);
