export async function getLogin(req, res) {
  if (req.user.isLoggedIn) {
    return res.json({
      status: "success",
      msg: "Jus buvote sekmingai prijungti prie sistemos",
      user: req.user,
    });
  }

  return res.json({
    status: "error",
    msg: "Jus nesate prijungti prie sistemos",
    user: req.user,
  });
}
