import React from "react";

export default function HeartCard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-900">
      <div className="relative w-72 h-[480px] bg-[#f6e8cc] rounded-3xl shadow-2xl flex flex-col items-center justify-between py-6">
        
        {/* Top left and right hearts */}
        <div className="flex justify-between w-full px-6 text-black text-5xl">
          <span>♥</span>
          <span>♥</span>
        </div>

        {/* Bottom left and right hearts (rotated) */}
        <div className="flex justify-between w-full px-6 text-black text-5xl rotate-180">
          <span>♥</span>
          <span>♥</span>
        </div>

      </div>
    </div>
  );
}
