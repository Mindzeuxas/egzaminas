import { connection } from "../../db.js";
import { IsValid } from "../../lib/IsValid.js";

export async function usersAdminPut(req, res) {
  const [err, msg] = IsValid.requiredFields(req.body, [
    { field: "adId", validation: IsValid.id },
    { field: "isBanned", validation: IsValid.positiveInteger },
  ]);

  if (err) {
    return res.json({
      status: "error",
      msg: msg,
    });
  }

  const { adId, isBanned } = req.body;

  try {
    const sql = `
            UPDATE ads
            SET banned = ?
            WHERE id = ?;`;
    const [result] = await connection.execute(sql, [isBanned, adId]);

    if (result.affectedRows !== 1) {
      return res.json({
        status: "error",
        msg: "Serverio klaida, pabandykite atnaujinti vėliau",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      msg: "Serverio klaida, pabandykite atnaujinti vėliau",
    });
  }

  return res.json({
    status: "success",
    msg: "Eilutė atnaujinta sėkmingai",
  });
}
