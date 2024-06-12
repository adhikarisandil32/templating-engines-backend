const multer = require("multer")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads") // first parameter for error handling
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    const fileExtension = file.originalname.split(".").slice(-1)
    cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtension}`)
    // fieldname refers to the name= attribute in the type="file" input element
  },
})

const uploadFile = (req, res, next) => {
  // this is the preperation for uploading, so no error can be here
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024,
    },
  }).single("image")

  // real uploading process begins hence the try catch inside here
  upload(req, res, function (err) {
    try {
      if (err) {
        throw new Error(err.message)
      }
      next()
    } catch (error) {
      return res.status(406).render("signup", { error: err.message })
    }
  })
}

module.exports = { uploadFile }
