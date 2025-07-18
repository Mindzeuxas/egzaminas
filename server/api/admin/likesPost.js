import { connection } from "../../db.js";
import { IsValid } from "../../lib/IsValid.js";

export async function likesPost(req, res) {
  const [err, msg] = IsValid.requiredFields(req.body, [
    { field: "ad_id", validation: IsValid.id },
    { field: "user_id", validation: IsValid.id },
    { field: "is_liked", validation: IsValid.includesInList, options: [1, -1] },
  ]);

  if (err) {
    return res.json({
      status: "error",
      msg: msg,
    });
  }

  const { user_id, ad_id, is_liked } = req.body;

  try {
    const sql = `INSERT INTO likes (user_id, ad_id, is_liked)
                    VALUES (?, ?, ?);`;
    const [result] = await connection.execute(sql, [user_id, ad_id, is_liked]);

    if (result.affectedRows !== 1) {
      return res.json({
        status: "error",
        msg: "Serverio klaida, pabandykite sukurti veliau",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      msg: "Serverio klaida, pabandykite sukurti veliau",
    });
  }

  return res.json({
    status: "success",
    msg: "Sukurta nauja like eilutė",
  });
}
