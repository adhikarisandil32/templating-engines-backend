const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")
const path = require("path")
const mongoose = require("mongoose")
const userRouter = require("./routes/userRouter")

app.use(express.static(path.join(__dirname, "/public")))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(expressLayouts)
app.use("/", userRouter)

app.set('layout', './layouts/layout.ejs')
app.set('view engine', 'ejs')

app.get("/home", (req, res) => {
  res.status(200).redirect("/")
})

app.get("/*", (req, res) => {
  res.status(404).render("notfound", {title: "Page Not Found"})
})

mongoose.connect("mongodb+srv://adhikarisandil32:n0th1ng00@cluster.xqva1xu.mongodb.net/?retryWrites=true&w=majority").then(() => {
  console.log("mongoose connected")
  app.listen(3000, () => {
    console.log("listening on port 3000")
  })
}).catch((err) => {
  console.log(err)
})
