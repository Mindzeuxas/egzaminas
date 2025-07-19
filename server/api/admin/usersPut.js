import { connection } from "../../db.js";
import { IsValid } from "../../lib/IsValid.js";

export async function usersPut(req, res) {
  const [err, msg] = IsValid.requiredFields(req.body, [
    { field: "userId", validation: IsValid.id },
    { field: "isBanned", validation: IsValid.positiveInteger },
  ]);

  if (err) {
    return res.json({
      status: "error",
      msg: msg,
    });
  }

  const { userId, isBanned } = req.body;

  try {
    const sql = `
            UPDATE users
            SET isBanned = ?
            WHERE id = ?;`;
    const [result] = await connection.execute(sql, [isBanned, userId]);

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
