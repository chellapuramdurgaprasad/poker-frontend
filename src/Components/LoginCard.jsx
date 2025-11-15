import React, { useState } from "react";
import { sendOtp, verifyOtp, registerUser } from "../api";

export default function LoginCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [message, setMessage] = useState("");

  const [regData, setRegData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    mobile: "",
    password: "",
  });

  const [otpValue, setOtpValue] = useState("");

  const [loginData, setLoginData] = useState({
    loginId: "",
    password: "",
  });

  // ---------------- VALIDATION CHECK ----------------
  const validateRegister = () => {
    const { firstName, lastName, dateOfBirth, mobile, password } = regData;

    if (!firstName || !lastName || !dateOfBirth || !mobile || !password)
      return "All fields are required.";

    if (!/^[6-9]\d{9}$/.test(mobile))
      return "Enter valid 10-digit mobile starting with 6-9.";

    const age = Math.floor(
      (new Date() - new Date(dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000)
    );
    if (age < 18) return "You must be at least 18 years old.";

    return null;
  };

  // ---------------- SEND OTP ----------------
  const handleSendOtp = async () => {
    const error = validateRegister();
    if (error) {
      setMessage("⚠ " + error);
      return;
    }

    try {
      await sendOtp(regData.mobile);
      setMessage("✅ OTP Sent");
      setShowOtpScreen(true);
    } catch {
      setMessage("❌ Failed to send OTP");
    }
  };

  // ---------------- VERIFY OTP + REGISTER ----------------
  const handleVerifyOtp = async () => {
    if (!otpValue) {
      setMessage("⚠ Enter OTP first");
      return;
    }

    try {
      await verifyOtp(regData.mobile, otpValue);
      await registerUser(regData);

      setMessage("✅ Registration Successful! Returning to login...");

      setTimeout(() => {
        setShowOtpScreen(false);
        setIsFlipped(false);

        // Clear form
        setRegData({
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          mobile: "",
          password: "",
        });
        setOtpValue("");
        setMessage("");
      }, 1500);
    } catch {
      setMessage("❌ Invalid OTP. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-950">
      <div
        className={`relative w-80 h-[520px] transition-transform duration-700`}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* LOGIN SIDE */}
        <div className="absolute inset-0 bg-[#f6e8cc] rounded-3xl shadow-2xl p-6 flex flex-col items-center backface-hidden">
          {/* Card Symbols */}
          <div className="absolute top-4 left-4 text-black text-6xl font-bold">
            <div>A</div>
            <div>♥</div>
          </div>
          <div className="absolute bottom-4 right-4 text-black text-6xl font-bold rotate-180">
            <div>A</div>
            <div>♥</div>
          </div>

          <h1 className="text-2xl font-bold text-black mt-24 mb-6">Login</h1>

          <input
            type="text"
            placeholder="Login Id"
            className="w-full p-3 mb-4 border rounded-lg"
            value={loginData.loginId}
            onChange={(e) =>
              setLoginData({ ...loginData, loginId: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 border rounded-lg"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />

          <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
            LOGIN
          </button>

          <p className="mt-4 text-sm text-black">
            New user?{" "}
            <span
              onClick={() => {
                setIsFlipped(true);
                setMessage("");
              }}
              className="underline cursor-pointer"
            >
              Click here to register
            </span>
          </p>
        </div>

        {/* REGISTER SIDE */}
        <div className="absolute inset-0 bg-[#f6e8cc] rounded-3xl shadow-2xl p-6 flex flex-col items-center rotate-y-180 backface-hidden">
          {showOtpScreen ? (
            <>
              <h1 className="text-xl font-bold text-black mt-28 mb-4">
                Verify OTP
              </h1>

              <input
                placeholder="Enter OTP"
                className="w-full p-3 border rounded mb-4"
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value)}
              />

              <button
                className="w-full bg-black text-white py-3 rounded-lg"
                onClick={handleVerifyOtp}
              >
                Verify & Register
              </button>

              {message && <p className="mt-3 text-sm text-red-600">{message}</p>}
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-black mt-8 mb-3">
                Register
              </h1>

              {message && <p className="text-sm text-red-600 mb-2">{message}</p>}

              <input
                placeholder="First Name"
                className="w-full p-2 mb-3 border rounded"
                value={regData.firstName}
                onChange={(e) =>
                  setRegData({ ...regData, firstName: e.target.value })
                }
              />
              <input
                placeholder="Last Name"
                className="w-full p-2 mb-3 border rounded"
                value={regData.lastName}
                onChange={(e) =>
                  setRegData({ ...regData, lastName: e.target.value })
                }
              />
              <input
                type="date"
                className="w-full p-2 mb-3 border rounded"
                value={regData.dateOfBirth}
                onChange={(e) =>
                  setRegData({ ...regData, dateOfBirth: e.target.value })
                }
              />
              <input
                placeholder="Mobile Number"
                className="w-full p-2 mb-3 border rounded"
                value={regData.mobile}
                onChange={(e) =>
                  setRegData({ ...regData, mobile: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 mb-4 border rounded"
                value={regData.password}
                onChange={(e) =>
                  setRegData({ ...regData, password: e.target.value })
                }
              />

              <button
                className="w-full bg-black text-white py-3 rounded-lg"
                onClick={handleSendOtp}
              >
                Send OTP
              </button>

              <p
                className="mt-3 text-sm cursor-pointer underline"
                onClick={() => {
                  setIsFlipped(false);
                  setShowOtpScreen(false);
                  setMessage("");
                }}
              >
                Back to Login
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
