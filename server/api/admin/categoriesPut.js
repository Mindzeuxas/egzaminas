import { connection } from "../../db.js";
import { IsValid } from "../../lib/IsValid.js";

export async function categoriesPut(req, res) {
  const [errParams, msgParams] = IsValid.requiredFields(req.params, [{ field: "id", validation: IsValid.idAsString }]);

  if (errParams) {
    return res.json({
      status: "error",
      msg: msgParams,
    });
  }

  const [err, msg] = IsValid.requiredFields(req.body, [{ field: "name", validation: IsValid.nonEmptyString }]);

  if (err) {
    return res.json({
      status: "error",
      msg: msg,
    });
  }

  const { name } = req.body;

  try {
    const sql = `
            UPDATE categories
            SET name = ?
            WHERE id = ?;`;
    const [result] = await connection.execute(sql, [name, +req.params.id]);

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
