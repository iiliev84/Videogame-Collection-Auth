import db from "#db/client";

export async function createPlatform({name, manufacturer}) {
  const sql = `
  INSERT INTO platforms (name, manufacturer)
  VALUES ($1, $2)
  RETURNING *
  `;
  const { rows: [platform], } = await db.query(sql,[name, manufacturer]);
  return platform;
}

export async function getPlatforms(){
  const sql = `
  SELECT *
  FROM platforms
  `;
  const {rows: platform} = await db.query(sql);
  return platform
}

export async function getPlatform(id){
  const sql = `
  SELECT * 
  FROM platforms
  WHERE id = $1
  `;
  const {rows: platform} = await db.query(sql, [id]);
  return platform[0];
  }

export async function deletePlatform(id){
  const sql = `
  DELETE
  FROM platforms
  WHERE id = $1
  RETURNING *
  `;
  const {rows: platform} = await db.query(sql, [id]);
  return platform [0];
  }

  export async function updatePlatform({id, name, manufacturer}){
    const sql = `
    UPDATE platforms
    SET name = $1, manufacturer = $2
    WHERE id = $3
    RETURNING *
    `;
    const {rows: platform} = await db.query(sql, [name, manufacturer, id]);
    return platform[0];
  }