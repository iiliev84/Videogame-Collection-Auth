import db from "#db/client";
import { createGame, createUser } from "#db/queries/games";
import { createPlatform } from "#db/queries/platforms";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.🌱");

async function seed() {

  const platforms = [
  { name: 'Nintendo Switch', manufacturer: 'Nintendo' },
  { name: 'PlayStation 5', manufacturer: 'Sony' },
  { name: 'Xbox Series X', manufacturer: 'Microsoft' },
  { name: 'PC', manufacturer: 'Various' },
  { name: 'Steam Deck', manufacturer: 'Valve' },
  { name: 'Android', manufacturer: 'Google' },
  { name: 'Lutris', manufacturer: 'Linux' },
  { name: 'Apple Arcade', manufacturer: 'Apple' },
  { name: 'SEGA Saturn', manufacturer: 'Sega' },
  { name: 'Windows', manufacturer: 'Microsoft' },
];

    for (const platform of platforms){
      await createPlatform(platform);
    }
    
const games = [
  { title: 'The Legend of Zelda: Tears of the Kingdom', genre: 'Adventure', release_year: 2023, platform_id: 1 },
  { title: 'Spider-Man 2', genre: 'Action', release_year: 2023, platform_id: 2 },
  { title: 'Halo Infinite', genre: 'Shooter', release_year: 2021, platform_id: 3 },
  { title: 'Baldur’s Gate 3', genre: 'RPG', release_year: 2023, platform_id: 4 },
  { title: 'Hades', genre: 'Roguelike', release_year: 2020, platform_id: 5 },
  { title: 'Delta Force', genre: 'Shooter', release_year: 2024, platform_id: 9 },
  { title: 'Diablo II', genre: 'Strategy', release_year: 2000, platform_id: 8 },
  { title: 'FC Mobile 25', genre: 'Sports', release_year: 2016, platform_id: 10 },
  { title: 'Real Racing 3', genre: 'Sports', release_year: 2009, platform_id: 6 },
  { title: 'Counter-Strike', genre: 'Shooter', release_year: 2000, platform_id: 7 },
];

    for (const game of games){
      await createGame(game);
    }


const users = [
    {first_name: 'Levski', last_name: 'Sofia', email: 'levski@gmail.com', password: '12345'},
    {first_name: 'Botev', last_name: 'Plovdiv', email: 'botev@gmail.com', password: '1234'},
    {first_name: 'Slavia', last_name: 'Sofia', email: 'slavia@gmail.com', password: '55555'},
    {first_name: 'Crazy', last_name: 'Forest', email: 'crazy@gmail.com', password: '4444'},
    {first_name: 'Spartak', last_name: 'Varna', email: 'spartak@gmail.com', password: '3333'},
    {first_name: 'Cherno', last_name: 'More', email: 'cherno@gmail.com', password: '2222'},
    {first_name: 'Botev', last_name: 'Vraca', email: 'vraca@gmail.com', password: '1111'},
    {first_name: 'Tire', last_name: 'Lovech', email: 'tire@gmail.com', password: '33333'},
    {first_name: 'Samo', last_name: 'Levski', email: 'samo@gmail.com', password: '22222'},
    {first_name: 'Ilian', last_name: 'Iliev', email: 'ilian@gmail.com', password: '111111'},
];

for(const user of users) {
  await createUser(user);
  }

}