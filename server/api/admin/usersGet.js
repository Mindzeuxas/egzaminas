import { connection } from "../../db.js";

export async function getAllUsers(req, res) {
  try {
    const sql = `
            SELECT *
            FROM users
            ORDER BY role;`;
    const [result] = await connection.execute(sql);
    return res.json({
      status: "success",
      list: result,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: "error",
      list: [],
      msg: "Serverio klaida",
    });
  }
}
