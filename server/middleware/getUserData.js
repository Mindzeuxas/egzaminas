import { connection } from "../db.js";

export async function getUserData(req, res, next) {
  req.user = {
    isLoggedIn: false,
    role: "public",
  };

  if (!req.cookies.loginToken) {
    return next();
  }

  try {
    const sql = `
            SELECT
                users.id, users.email
            FROM users
            INNER JOIN tokens
                ON users.id = tokens.user_id
            WHERE tokens.text = ?;`;
    const [result] = await connection.execute(sql, [req.cookies.loginToken]);

    if (result.length === 1) {
      req.user = {
        isLoggedIn: true,
        role: "admin",
        ...result[0],
      };
    }
  } catch (error) {
    console.log(error);
  }

  return next();
}
