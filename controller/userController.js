const userModel = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const signupGetReq = async (req, res) => {
  return res.status(200).render("signup", { title: "Sign Up" })
}

const signupPostReq = async (req, res) => {
  //Check for existing user -- done
  //generate hash password -- done
  //use creation -- done
  //token generate -- done
  const { email, password, name } = req.body

  try {
    const existingUser = await userModel.findOne({ email: email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await userModel.create({
      email: email,
      password: hashedPassword,
      fullName: name,
    })

    return res.status(200).redirect("/signin")
  } catch (err) {
    console.log(err)
    return res.status(500).redirect(req.path)
  }
}

const signinGetReq = async (req, res) => {
  return res.status(200).render("signin", { title: "Sign In" })
}

const signinPostReq = async (req, res) => {
  const { email, password } = req.body

  try {
    const existingUser = await userModel.findOne({ email: email })

    if (!existingUser) {
      return res.status(404).json({ message: "User Not Found" })
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password)

    if (!matchPassword) {
      return res.status(400).json({ message: "email or password is incorrect" })
    }

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRE_TIME,
    })

    return res.status(200).cookie("jwt", token, { httpOnly: true }).redirect("/")
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "something went wrong" })
  }
}

const homeGetReq = async (req, res) => {
  try {
    const token = req.cookies?.jwt

    if (!token) {
      return res.render("index", { authenticationStatus: false, userInfo: null, title: "Home" })
    }

    const { id } = jwt.verify(token, process.env.SECRET_KEY)

    const userInfo = await userModel.findOne({ _id: id }).select("-__v -password")

    return res.render("index", { authStatus: true, userInfo: userInfo, title: "Home" })
  } catch (error) {
    console.log(error.message)
    return res.clearCookie("jwt").render("index", { authStatus: false, userInfo: null, title: "Home" })
  }
}

module.exports = { signinGetReq, signinPostReq, signupGetReq, signupPostReq, homeGetReq }
