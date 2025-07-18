import { connection } from "../../db.js";
import { IsValid } from "../../lib/IsValid.js";
import fs from "fs/promises";
import path from "path";

export async function adPost(req, res) {
  const [err, msg] = IsValid.requiredFields(
    req.body,
    [{ field: "name", validation: IsValid.nonEmptyString }],
    [
      { field: "img", validation: IsValid.nonEmptyString },
      { field: "description", validation: IsValid.nonEmptyString },
      { field: "price", validation: IsValid.nonEmptyString },
      { field: "category", validation: IsValid.nonEmptyString },
    ]
  );

  if (err) {
    return res.status(400).json({ status: "error", msg: msg });
  }

  const userId = req.user.id;
  const { img, name, description, price, category } = req.body;

  let categoryId = 0;
  try {
    const sql = "SELECT * FROM categories WHERE name = ?;";
    const [result] = await connection.execute(sql, [category]);
    if (result.length !== 1) {
      return res.status(400).json({ status: "error", msg: "Tokia kategorija neegzistuoja." });
    }
    categoryId = result[0].id;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", msg: "Serverio klaida, pabandykite veliau (2)" });
  }

  let oldThumbnail = null;
  try {
    const [rows] = await connection.execute("SELECT thumbnail FROM ads WHERE id = ?", [+req.params.id]);
    if (rows.length > 0) {
      oldThumbnail = rows[0].thumbnail;
    }
  } catch (error) {
    console.log("Klaida gaunant esamą thumbnail:", error);
  }

  try {
    const sqlColumns = ["name", "user_id"];
    const sqValues = [name, userId];
    if (img) {
      sqlColumns.push("thumbnail");
      sqValues.push(img);
    }
    if (description) {
      sqlColumns.push("description");
      sqValues.push(description);
    }
    if (price) {
      sqlColumns.push("price");
      sqValues.push(price);
    }
    if (category) {
      sqlColumns.push("category_id");
      sqValues.push(categoryId);
    }

    const sql = `INSERT INTO ads (${sqlColumns.join(", ")}) VALUES (?${", ?".repeat(sqlColumns.length - 1)});`;
    const [result] = await connection.execute(sql, sqValues);

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
