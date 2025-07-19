import { connection } from "../../db.js";

export async function getAllAdminAds(req, res) {
  const userId = req.user.id ? req.user.id : 0;
  try {
    const sql = `
            SELECT ads.*, categories.name AS category_name                 
            FROM ads
            INNER JOIN categories
                ON ads.category_id = categories.id;`;
    const [result] = await connection.execute(sql, [userId]);

    return res.json({
      status: "success",
      list: result.map((m) => ({
        ...m,
        thumbnail: m.thumbnail ? `http://localhost:5445/img/thumbnails/${m.thumbnail}` : "",
      })),
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
