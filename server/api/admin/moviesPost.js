import { connection } from "../../db.js";
import { IsValid } from "../../lib/IsValid.js";

export async function moviesPost(req, res) {
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
    return res.json({
      status: "error",
      msg: msg,
    });
  }

  const { img, name, url, description, minutes, hours, category, status } = req.body;
  const duration = (hours ?? 0) * 60 + (minutes ?? 0);

  let categoryId = 0;

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

    const sql = `INSERT INTO movies (${sqlColumns.join(", ")}) VALUES (?${", ?".repeat(sqlColumns.length - 1)});`;
    const [result] = await connection.execute(sql, sqValues);

    if (result.affectedRows !== 1) {
      return res.json({
        status: "error",
        msg: "Serverio klaida, pabandykite eilutę sukurti vėliau",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      msg: "Serverio klaida, pabandykite eilutę sukurti vėliau",
    });
  }

  return res.json({
    status: "success",
    msg: "Eilutė sukurta sėkmingai",
  });
}
