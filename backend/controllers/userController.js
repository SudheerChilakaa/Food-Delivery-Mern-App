import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'



//Register User
const registerUser = async (req,res) => {
    const {name,email,password} = req.body;
    try {
        // checking is user already exist
        const exist = await userModel.findOne({email});

        if(exist){
            return res.json({
              success:false,
              message:"User already exist"
            })
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.status(400).json({success:false,message:"Invalid email format"})
        }
        if (password.length<8) {
            return res.json({success:false,message:"Please enter strong password"})
        }


        //hasing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        const user =  await newUser.save() 
        
        const token = createToken(user._id)
        res.json({success:true,token })


    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
        
    }

}



//Login User

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Login error" });
  }
};


// Generate JWT
const createToken = (id) => {
  return jwt.sign( {id}, process.env.JWT_SECRET, { expiresIn: "3d" });
};

export {loginUser,registerUser}