const BASE_URL = "https://poker-backend-ecu5.onrender.com";

// ✅ Send OTP
export const sendOtp = async (mobile) => {
  const res = await fetch(`${BASE_URL}/v1/otp/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mobile })
  });

  if (!res.ok) {
    throw new Error("Failed to send OTP");
  }

  return res.text();
};

// ✅ Verify OTP
export const verifyOtp = async (mobile, otp) => {
  const res = await fetch(`${BASE_URL}/v1/otp/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ mobile, otp })
  });

  if (!res.ok) throw new Error("Invalid OTP");
  return res.text();
};

// ✅ Register User
export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/v1/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Registration failed");
  return res.json();
};
