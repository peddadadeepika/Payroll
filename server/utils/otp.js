// utils/otp.js

// Generate a random 6-digit OTP
export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit string
  };
  
  // Get OTP expiry time (e.g., 5 minutes from now)
  export const getOTPExpiry = () => {
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 5); // expires in 5 mins
    return expiry;
  };
  