import express from "express";
const router = express.Router();
export default router;
import { createPlatform, getPlatforms, getPlatform, deletePlatform, updatePlatform } from "#db/queries/platforms";

function isValidId(id) {
    const num = Number(id);
    return Number.isInteger(num) && num > 0;
}

router.route("/").get(async (req, res) => {
    const platforms = await getPlatforms();
    res.send(platforms);
});

router.route("/").post(async (req, res) => {
    if(!req.body){
        return res.status(400).send({error: "Missing body"})
    }
    const {name, manufacturer} = req.body
    if(!name || !manufacturer){
        return res.status(400).send({error: "Missing required fields"})
    } 
    const platform = await createPlatform({name, manufacturer})
    res.status(201).send(platform)
})

router.route("/:id").get(async (req, res) => {
    const id = Number(req.params.id)
    if (!isValidId(id)) {
    return res.status(400).send({ error: "ID must be a positive integer" });
  }
    const platform = await getPlatform(id)
    if(!platform){
        return res.status(404).send({error: "Platform not found"})
    }
    res.send(platform)
})

router.route("/:id").delete(async (req, res) => {
    const id = Number(req.params.id)
    if (!isValidId(id)) {
    return res.status(400).send({ error: "ID must be a positive integer" });
  }
    const platform = await deletePlatform(id)
    if(!platform){
        res.status(404).send({error: "Platform not found"})
    }
    res.sendStatus(204)
})

router.route("/:id").put(async (req, res) => {
    const id = Number(req.params.id)
    if(!req.body){
        return res.status(400).send({error: "Missing body"})
    }
    const {name, manufacturer} = req.body

    if(!name || !manufacturer){
        return res.status(400).send({error: "Missing rquired fields"})
    }
    if (!isValidId(id)) {
    return res.status(400).send({ error: "ID must be a positive integer" });
  }
    const platform = await getPlatform(id)
    if(!platform){
        return res.status(404).send({error: "Platform not found"})
    }
    const platforms = await updatePlatform({id, name, manufacturer})
    res.send(platforms)
})