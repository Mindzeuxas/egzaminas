import { connection } from "../../db.js";

export async function getAllAdminComments(req, res) {
  try {
    const sql = `
            SELECT *,comments.id AS commentId, ads.name, ads.description, ads.thumbnail, categories.name AS category_name
            FROM comments
             INNER JOIN ads
                ON ads.id = comments.ad_id
                   INNER JOIN categories
                ON categories.id = ads.category_id
                ORDER BY ads.id;`;
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
