import { connection } from "../../db.js";

export async function getLogout(req, res) {
  try {
    const sql = "DELETE FROM tokens WHERE text = ?;";
    const [result] = await connection.execute(sql, [req.cookies.loginToken]);

    if (result.affectedRows !== 1) {
      return res.status(500).json({
        status: "error",
        msg: "Serverio klaida, pabandykite atsijungti vėliau",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      msg: "Serverio klaida, pabandykite atsijungti vėliau",
    });
  }

  const cookie = ["loginToken=", "domain=localhost", "path=/", "max-age=-1", "Same-Site=Lax", "Secure", "HttpOnly"];

  return res.set("Set-Cookie", cookie.join("; ")).json({
    status: "success",
    msg: "Jus buvote sėkmingai atjungti nuo sistemos",
  });
}
