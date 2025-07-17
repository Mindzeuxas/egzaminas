import { connection } from "../../db.js";

export async function getAllAds(req, res) {
  try {
    const sql = `
            SELECT ads.*, categories.name AS category_name
            FROM ads
            INNER JOIN categories
                ON ads.category_id = categories.id
            WHERE banned = 0;`;
    const [result] = await connection.execute(sql);

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
