import { connection } from "../../db.js";
import { hash } from "../../lib/hash.js";
import { IsValid } from "../../lib/IsValid.js";
import { randomString } from "../../lib/randomString.js";

export async function postRegister(req, res) {
  const [err, msg] = IsValid.requiredFields(req.body, [
    { field: "email", validation: IsValid.email },
    { field: "password", validation: IsValid.password },
  ]);

  if (err) {
    return res.json({
      status: "error",
      msg: msg,
    });
  }

  const { email, password } = req.body;

  try {
    const sql = "SELECT * FROM users WHERE email = ?;";
    const [result] = await connection.execute(sql, [email]);

    if (result.length > 0) {
      return res.json({
        status: "error",
        msg: { email: "Toks email jau uzimtas :P" },
      });
    }
  } catch (error) {
    console.log(error);
  }

  const salt = randomString();
  const hashedPassword = hash(password, salt);

  if (hashedPassword === "") {
    return res.json({
      status: "error",
      msg: { password: "Netinkamas slaptazodis" },
    });
  }

  try {
    const sql = "INSERT INTO users (email, password_hash, salt) VALUES (?, ?, ?);";
    const [result] = await connection.execute(sql, [email, hashedPassword, salt]);

    if (result.affectedRows !== 1) {
      return res.json({
        status: "error",
        msg: "Registracija nepavyko, pabandykite veliau",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      msg: "Registracija nepavyko, pabandykite veliau",
    });
  }

  return res.json({
    status: "success",
    msg: "Sekminga registracija",
  });
}
