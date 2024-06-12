const express = require("express")
const app = express()
const mongoose = require("mongoose")
const expressLayouts = require("express-ejs-layouts")
const path = require("path")
const userRouter = require("./routes/userRouter")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")

require("dotenv").config()

app.use(express.static(path.join(__dirname, "/public")))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan("tiny"))
app.use(expressLayouts)

app.set("layout", "./layouts/layout.ejs")
app.set("view engine", "ejs")

app.use("/", userRouter)

app.get("/home", (req, res) => {
  return res.status(200).redirect("/")
})

app.get("/*", (_, res) => {
  return res.status(404).render("notfound", { title: "Page Not Found" })
})

const PORT = process.env.PORT || 3000
mongoose
  .connect(process.env.NODE_ENV === "DEV" ? process.env.MONGODB_URL_DEV : process.env.MONGODB_URL_PROD)
  .then(() => {
    console.log("mongoose connected")
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(err.message)
  })
