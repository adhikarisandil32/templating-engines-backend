const userModel = require('../models/user')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "userSignUp"

const signup = async (req, res) => {
  // res.status(200).send("user created successfully "+req.body)

  //Check for existing user -- done
  //generate hash password -- done
  //use creation -- done
  //token generate -- done

  const {username, password} = req.body

  try{
    
    const existingUser = await userModel.findOne({username: username})
    if(existingUser){
      res.status(400).json({message: "User already exists"})
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await userModel.create({
      username: username,
      password: hashedPassword
    })

    const token = jwt.sign({username: result.username, id: result._id}, SECRET_KEY)
    res.status(200).json({user: result, token: token})

  } catch(err) {
    console.log(err)
    res.status(500).json({message: "something went wrong"})
  }

}

const signin = async (req, res) => {

  const {username, password} = req.body

  try {
    
    const existingUser = await userModel.findOne({username: username})
    if(!existingUser){
      res.status(404).json({message: "User Not Found"})
      return
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password)

    if(!matchPassword){
      res.status(400).json({message: "username and password is incorrect"})
      return
    }

    const token = jwt.sign({username: existingUser.username, id: existingUser._id}, SECRET_KEY)
    res.status(200).json({user: existingUser, token: token})

  } catch (err) {
    console.log(err)
    res.status(500).json({message: "something went wrong"})
  }
}

module.exports = {signin, signup}