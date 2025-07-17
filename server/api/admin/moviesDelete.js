import { connection } from "../../db.js";
import { IsValid } from "../../lib/IsValid.js";
import fs from "fs/promises";
import path from "path";

export async function moviesDelete(req, res) {
  const [err, msg] = IsValid.requiredFields(req.params, [{ field: "id", validation: IsValid.idAsString }]);

  if (err) {
    return res.json({
      status: "error",
      msg: msg,
    });
  }

  try {
    const movieId = +req.params.id;

    const [rows] = await connection.execute(`SELECT thumbnail FROM movies WHERE id = ?`, [movieId]);

    if (rows.length === 0) {
      return res.json({ status: "error", msg: "Eilutė nerasta" });
    }

    const thumbnailFile = rows[0].thumbnail;

    if (thumbnailFile) {
      const imagePath = path.join(process.cwd(), "public", "img", "thumbnails", thumbnailFile);
      console.log(imagePath);
      try {
        await fs.unlink(imagePath);
      } catch (err) {}
    }

    const [result] = await connection.execute(`DELETE FROM movies WHERE id = ?`, [movieId]);

    if (result.affectedRows === 1) {
      return res.json({
        status: "success",
        msg: "Eilutė ištrinta sėkmingai",
      });
    } else {
      return res.json({
        status: "error",
        msg: "Eilutė nebuvo ištrinta",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      msg: "Serverio klaida",
    });
  }
}
