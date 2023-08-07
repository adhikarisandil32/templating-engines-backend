const express = require("express")
const router = express.Router()
const { signin, signup } = require("../controller/userController")

router.get("/signin", (req, res) => {
  res.status(200).render("signin", {title: "Sign In"})
})

router.post("/signin", signin)

router.get("/signup", (req, res) => {
  res.status(200).render("signup", {title: "Sign Up"})
})

router.post("/signup", signup)

module.exports = router

