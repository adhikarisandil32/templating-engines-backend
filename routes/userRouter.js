const express = require("express")
const router = express.Router()
const { signinGetReq, signinPostReq, signupGetReq, signupPostReq, homeGetReq } = require("../controller/userController")
const { upload } = require("../middlewares/multer")

// sign in route
router.get("/signin", signinGetReq)
router.post("/signin", signinPostReq)

// signup route
router.get("/signup", signupGetReq)
router.post("/signup", upload.single("image"), signupPostReq)

// home route
router.get("/", homeGetReq)

module.exports = router
