import { connection } from "../../db.js";
import { IsValid } from "../../lib/IsValid.js";

export async function commentPost(req, res) {
  const [err, msg] = IsValid.requiredFields(req.body, [
    { field: "adId", validation: IsValid.id },
    { field: "text", validation: IsValid.nonEmptyString },
  ]);

  if (err) {
    return res.json({
      status: "error",
      msg: msg,
    });
  }

  const userId = req.user.id;
  const { adId, text } = req.body;

  try {
    const sql = "INSERT INTO comments (text, user_id, ad_id) VALUES (?, ?, ? );";
    const [result] = await connection.execute(sql, [text, userId, adId]);

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
      msg: "Serverio klaida, pabandykite eilutę sukurti veliau",
    });
  }

  return res.json({
    status: "success",
    msg: "Sukurta nauja eilutė",
  });
}
