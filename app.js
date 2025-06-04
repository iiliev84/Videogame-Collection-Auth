import express from "express";
const app = express();
export default app;
import gamesRouter from "#api/games";
import platformsRouter from "#api/platforms";

app.use(express.json())

app.route('/').get((req,res)=>{
    res.send("Welcome to the Videogame Collection API.")
})

app.use("/games", gamesRouter);
app.use("/platforms", platformsRouter);

app.use((err,req,res,next)=>{
    console.log(err)
    res.status(500).send("An error occured " + err)
})