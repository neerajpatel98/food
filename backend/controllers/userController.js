import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// login users
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "User Does't Exist",
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const token = createToken(user._id);

        // send response
        res.json({
            success: true,
            token
        })


    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
    }

}


// register users

// create token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}


const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // checking user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({
                success: false,
                message: "User already exists",
            })
        }

        // validating email format and strong password

        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please Enter valid email address"
            })
        }

        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Please Enter strong password",
            })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        })

        const user = await newUser.save();

        const token = createToken(user._id);

        // send response the token
        res.json({
            success: true,
            token
        })
    }
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
    }
}

export { loginUser, registerUser };