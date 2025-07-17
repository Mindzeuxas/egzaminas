import { connection } from "../../db.js";
import { hash } from "../../lib/hash.js";
import { IsValid } from "../../lib/IsValid.js";
import { randomString } from "../../lib/randomString.js";

export async function postLogin(req, res) {
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
  let userObj = null;

  try {
    const sql = "SELECT * FROM users WHERE email = ?;";
    const [result] = await connection.execute(sql, [email]);

    if (result.length === 0) {
      return res.json({
        status: "error",
        msg: "Neteisinga email ir password kombincija, arba tokia paskyra neegzistuoja",
      });
    } else {
      userObj = result[0];
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      msg: "Serverio klaida, pabandykite prisijungti veliau",
    });
  }

  const hashedPassword = hash(password, userObj.salt);

  if (hashedPassword !== userObj.password_hash) {
    return res.json({
      status: "error",
      msg: "Netinkamas slaptazodis",
    });
  }

  const loginToken = randomString(20);

  try {
    const sql = "INSERT INTO tokens (text, user_id) VALUES (?, ?);";
    const [result] = await connection.execute(sql, [loginToken, userObj.id]);

    if (result.affectedRows !== 1) {
      return res.json({
        status: "error",
        msg: "Serverio klaida, pabandykite prisijungti veliau",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      msg: "Serverio klaida, pabandykite prisijungti veliau",
    });
  }

  const cookie = [
    "loginToken=" + loginToken,
    "domain=localhost",
    "path=/",
    "max-age=3600",
    "Same-Site=Lax",
    "Secure",
    "HttpOnly",
  ];

  return res.set("Set-Cookie", cookie.join("; ")).json({
    status: "success",
    msg: "Jus buvote sekmingai prijungti prie sistemos",
    user: {
      id: userObj.id,
      email: email,
    },
  });
}
