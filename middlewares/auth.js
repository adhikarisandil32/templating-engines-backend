const jwt = require("jsonwebtoken")
const SECRET_KEY = "userSignUp"

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies?.jwt

    if (token) {
      const user = jwt.verify(token, SECRET_KEY)
      req.userId = user.id
      next()
    } else {
      const queryParams = new URLSearchParams({ success: false, message: "unauthorized" }).toString()
      return res.status(401).redirect(`${req.path}?${queryParams}`)
    }
  } catch (err) {
    console.log(err)
    const queryParams = new URLSearchParams({ success: false, message: "unauthorized" }).toString()
    return res.status(401).redirect(`${req.path}?${queryParams}`)
  }
}

module.exports = { auth }
