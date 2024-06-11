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

const upload = multer({ storage: storage })

module.exports = { upload }
