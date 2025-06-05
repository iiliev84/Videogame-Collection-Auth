import db from "#db/client";
import bcrypt from "bcrypt"

export async function createUser({first_name, last_name, email, password}) {
  const sql = `
  INSERT INTO users (first_name, last_name, email, password)
  VALUES ($1, $2, $3, $4) 
  RETURNING *`; 
  const { rows: [user], } = await db.query(sql, [first_name, last_name, email, password]);
  return user;
};

export async function registerUser({first_name, last_name,email, password}){
  const hashedPassword = await bcrypt.hash(password, 2)
  const sql = `
  INSERT INTO users (first_name, last_name, email, password)
  VALUES ($1, $2, $3, $4) 
  RETURNING *`;
  const {rows: [user]} = await db.query(sql, [first_name, last_name, email, hashedPassword])
  return user
};

export async function loginUser({email}){
  const sql = `SELECT *
  FROM users 
  WHERE email = $1`
  const {rows: [user]} = await db.query(sql, [email])
  return user
};