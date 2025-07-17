export function cookieParser(req, res, next) {
  req.cookies = {};

  const cookieStr = req.headers.cookie;
  if (!cookieStr) {
    return next();
  }

  const cookieParts = cookieStr.split(";").map((s) => s.trim().split("="));

  for (const [key, value] of cookieParts) {
    req.cookies[key] = value;
  }

  return next();
}
