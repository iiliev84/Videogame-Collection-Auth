import express from "express";
const router = express.Router();
export default router;
import { createGame, getGames, getGame, deleteGame, updateGame } from "#db/queries/games"

function isValidId(id) {
    const num = Number(id);
    return Number.isInteger(num) && num > 0;
}

router.route("/").get(async (req, res) => {
    const games = await getGames();
    res.send(games);
});

router.route("/").post(async (req, res) => {
    if(!req.body){
        return res.status(400).send({error: "Missing body"})
    }
    const {title, genre, release_year, platform_id} = req.body
    if(!title || !genre || !release_year || !platform_id){
        return res.status(400).send({error: "Missing required fields"})
    } 
    const game = await createGame({title, genre, release_year, platform_id})
    res.status(201).send(game)
})

router.route("/:id").get(async (req, res) => {
    const id = Number(req.params.id)
    if (!isValidId(id)) {
    return res.status(400).send({ error: "ID must be a positive integer" });
  }
    const game = await getGame(id)
    if(!game){
        return res.status(404).send({error: "Game not found"})
    }
    res.send(game)
})

router.route("/:id").delete(async (req, res) => {
    const id = Number(req.params.id)
    if (!isValidId(id)) {
    return res.status(400).send({ error: "ID must be a positive integer" });
  }
    const game = await deleteGame(id)
    if(!game){
        res.status(404).send({error: "Game not found"})
    }
    res.sendStatus(204)
})

router.route("/:id").put(async (req, res) => {
    const id = Number(req.params.id)
    if(!req.body){
        return res.status(400).send({error: "Missing body"})
    }
    const {title, genre, release_year} = req.body

    if(!title || !genre || !release_year){
        return res.status(400).send({error: "Missing rquired fields"})
    }
    if (!isValidId(id)) {
    return res.status(400).send({ error: "ID must be a positive integer" });
  }
    const game = await getGame(id)
    if(!game){
        return res.status(404).send({error: "Game not found"})
    }
    const games = await updateGame({id, title, genre, release_year})
    res.send(games)
})