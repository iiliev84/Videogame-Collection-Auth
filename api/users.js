import express from "express";
import db from "#db/client";
const router = express.Router();
export default router;
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { loginUser, registerUser } from "#db/queries/users"
const app = express();

export function verifyToken(req, res, next){
  const authHeader = req.headers['Authorization'];
  const token = authHeader.split(' ')[1];
  const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decodedJWT
  next();
}

router.get('/', async(req,res,next) => {
  try {
    const allUsers = await db.query(`SELECT * FROM users`);
    if(!allUsers) return res.status(404).send('Cant find users');

    res.status(200).json(allUsers);
  }catch(err){
    console.log(err)
    res.status(400).send('Cant find the info');
  }
})


router.post('/register', async(req,res,next) => {
  const {email, password, name} = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 5)
    const newUser = await registerUser({email, password})

    if(!newUser) return res.status(401).send('Could not make new user');
    const token = jwt.sign({id: newUser.id, email: newUser.email}, process.env.JWT_SECRET);
    res.status(201).json(token)

  }catch(err){
    console.log(err);
    res.send('Error registering')
  }
})

router.post('/login', async(req,res,next) => {
  const {email, password} = req.body;
  try {
    const realUserInfo = await loginUser({email})

    const isPWMatch = await bcrypt.compare(password, realUserInfo.password);
    if(!isPWMatch) return res.status(401).send('not authorized');
    const token = jwt.sign({id: realUserInfo.id, email: realUserInfo.email});
    res.status(201).json(token);
  }catch(err){
    console.log('could not log in')
  }
})

router.get('/users', verifyToken, async(req,res,next) => {
  try {
    const users = await client.query(`SELECT * FROM user WHERE favorite = true`);
    if(!users) return res.status(404).send('cant find relatives');
    res.status(201).json(users);
  }catch(err){
    console.log(err);
    res.send('Error getting users');
  }
})