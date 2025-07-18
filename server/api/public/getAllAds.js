import { connection } from "../../db.js";

export async function getAllAds(req, res) {
  try {
    const sql = `
            SELECT ads.*, categories.name AS category_name,                 
                           (SELECT 
                         IFNULL(SUM(is_liked), 0)  
                         FROM likes
                         WHERE likes.user_id=? AND likes.ad_id = ads.id) AS liked
            FROM ads
            INNER JOIN categories
                ON ads.category_id = categories.id
            WHERE banned = 0;`;
    const [result] = await connection.execute(sql, [req.user.id]);

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
