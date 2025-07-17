import { connection } from "../../db.js";
import { IsValid } from "../../lib/IsValid.js";
import fs from "fs/promises";
import path from "path";

export async function moviesPut(req, res) {
  const [errParams, msgParams] = IsValid.requiredFields(req.params, [{ field: "id", validation: IsValid.idAsString }]);
  if (errParams) {
    return res.status(400).json({ status: "error", msg: msgParams });
  }

  const [err, msg] = IsValid.requiredFields(
    req.body,
    [
      { field: "name", validation: IsValid.nonEmptyString },
      { field: "url", validation: IsValid.urlSlug },
    ],
    [
      { field: "img", validation: IsValid.nonEmptyString },
      { field: "description", validation: IsValid.nonEmptyString },
      { field: "minutes", validation: IsValid.positiveInteger },
      { field: "hours", validation: IsValid.positiveInteger },
      { field: "category", validation: IsValid.nonEmptyString },
      { field: "status", validation: IsValid.includesInList, options: ["draft", "publish"] },
    ]
  );

  if (err) {
    return res.status(400).json({ status: "error", msg: msg });
  }

  const { img, name, url, description, minutes, hours, category, status } = req.body;
  const duration = (hours ?? 0) * 60 + (minutes ?? 0);

  let oldThumbnail = null;
  try {
    const [rows] = await connection.execute("SELECT thumbnail FROM movies WHERE id = ?", [+req.params.id]);
    if (rows.length > 0) {
      oldThumbnail = rows[0].thumbnail;
    }
  } catch (error) {
    console.log("Klaida gaunant esamą thumbnail:", error);
  }

  try {
    const sqlColumns = ["title", "url_slug", "is_published", "duration"];
    const sqValues = [name, url, status === "publish" ? 1 : 0, duration];
    if (img) {
      sqlColumns.push("thumbnail");
      sqValues.push(img);
    }
    if (description) {
      sqlColumns.push("description");
      sqValues.push(description);
    }
    if (category) {
      sqlColumns.push("category_id");
      sqValues.push(categoryId);
    }

    const sql = `UPDATE movies SET ${sqlColumns.map((s) => s + " = ?").join(", ")} WHERE id = ?;`;
    const [result] = await connection.execute(sql, [...sqValues, +req.params.id]);

    if (result.affectedRows !== 1) {
      return res.status(500).json({ status: "error", msg: "Serverio klaida, pabandykite vėliau" });
    }

    if (oldThumbnail && img && oldThumbnail !== img) {
      const oldImagePath = path.join(process.cwd(), "public", "img", "thumbnails", oldThumbnail);
      try {
        await fs.unlink(oldImagePath);
      } catch (err) {}
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", msg: "Serverio klaida, pabandykite vėliau" });
  }

  return res.json({ status: "success", msg: "Eilutė atnaujinta sėkmingai" });
}
