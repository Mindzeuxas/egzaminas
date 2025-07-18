import { connection } from "../../db.js";
import { IsValid } from "../../lib/IsValid.js";

export async function categoriesPost(req, res) {
  const [err, msg] = IsValid.requiredFields(req.body, [{ field: "name", validation: IsValid.nonEmptyString }]);

  if (err) {
    return res.json({
      status: "error",
      msg: msg,
    });
  }

  const { name } = req.body;

  try {
    const sql = "INSERT INTO categories (name) VALUES (?);";
    const [result] = await connection.execute(sql, [name]);

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
