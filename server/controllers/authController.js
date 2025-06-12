import jwt from 'jsonwebtoken';
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import { generateOTP, getOTPExpiry } from '../utils/otp.js'
import sendEmail  from '../utils/sendEmail.js';

const login = async (req, res) => {
   try {
     const {email, password} =req.body;
     const user = await User.findOne({email})
     if(!user) {
       return res.status(404).json({ 
         success: false, 
         error: "User Not found"});
     }

     const isMatch = await bcrypt.compare(password, user.password)
     if(!isMatch) {
       return res.status(404).json({
         success: false,
          error: "wrong password"});
     }

     const token = jwt.sign({_id: user._id, role: user.role},
        process.env.JWT_KEY, {expiresIn: "10d"}
      )

      res.status(200).json({
         success: true,
          token,
          user: {_id: user._id, name: user.name, role: user.role}})

   }catch(error) {
      res.status(500).json({success: false, error: error.message})
   }
};

const verify = (req, res) => {
   return res.status(200).json({success: true, user: req.user})
}

 const forgotPassword = async (req, res) => {
   try {
     const { email } = req.body;
 
     if (!email) {
       return res.status(400).json({ success: false, error: "Email is required" });
     }
 
     const user = await User.findOne({ email });
     if (!user) {
       return res.status(404).json({ success: false, error: "User not found" });
     }
 
     const otp = generateOTP();
     const otpExpiry = getOTPExpiry();
 
     user.otp = otp;
     user.otpExpiry = otpExpiry;
     await user.save();
 
     console.log(`Sending email to: ${email} with OTP: ${otp}`);
 
     await sendEmail (email, otp)

     res.status(200).json({ success: true, message: "OTP sent successfully" });
   } catch (error) {
     console.error("Forgot password error:", error); // <- See this in terminal!
     res.status(500).json({ success: false, error: "Server error" });
   }
 };
 

const verifyOtp = async (req, res) => {
   const { email, otp } = req.body;
 
   try {
     // Check if email exists in the DB
     const user = await User.findOne({ email });
     if (!user) {
       return res.status(404).json({ success: false, error: "User not found" });
     }
 
     // Check if OTP exists and has not expired
     if (user.otp !== otp || new Date() > user.otpExpiry) {
       return res.status(400).json({ success: false, error: "Invalid or expired OTP" });
     }
 
     // OTP is valid, clear OTP fields
     user.otp = undefined;
     user.otpExpiry = undefined;
     await user.save();
 
     return res.status(200).json({ success: true, message: "OTP verified successfully" });
   } catch (err) {
     console.error(err);
     return res.status(500).json({ success: false, error: "Server Error" });
   }
 };
export {login, verify, forgotPassword, verifyOtp }