import { connection } from "../../db.js";

export async function getAllMovies(req, res) {
  try {
    const sql = `
            SELECT movies.*, categories.url_slug AS category_url_slug
            FROM movies
            INNER JOIN categories
                ON movies.category_id = categories.id;`;
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
