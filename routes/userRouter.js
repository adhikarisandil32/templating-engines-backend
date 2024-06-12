const express = require("express")
const router = express.Router()
const {
  signinGetReq,
  signinPostReq,
  signupGetReq,
  signupPostReq,
  homeGetReq,
  signoutPostReq,
} = require("../controller/userController")
const { uploadFile } = require("../middlewares/multer")

// sign in route
router.get("/signin", signinGetReq)
router.post("/signin", signinPostReq)

// signup route
router.get("/signup", signupGetReq)
router.post("/signup", uploadFile, signupPostReq)

// logout
router.post("/signout", signoutPostReq)

// home route
router.get("/", homeGetReq)

module.exports = router
