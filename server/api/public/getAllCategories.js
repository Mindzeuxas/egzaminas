import { connection } from "../../db.js";

export async function getAllCategories(req, res) {
  try {
    const sql = `
            SELECT *, 
              (SELECT COUNT(*)
                FROM ads
                WHERE categories.id = ads.category_id ) AS count
            FROM categories
            ORDER BY name;`;
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
