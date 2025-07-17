import crypto from "node:crypto";

export function hash(text, salt) {
  try {
    return crypto
      .createHash("sha512")
      .update(text + salt)
      .digest("hex");
  } catch (error) {
    return "";
  }
}
