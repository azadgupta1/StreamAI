import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeart,
  FaGift,
  FaRupeeSign,
  FaCrown,
  FaFire,
  FaRocket,
} from "react-icons/fa";

const DonatePanel = () => {
  const [amount, setAmount] = useState(null);
  const [burst, setBurst] = useState(false);

  const preset = [40, 100, 500, 1000];

  const donate = () => {
    if (!amount) return;

    // dummy celebration only
    setBurst(true);
    setTimeout(() => setBurst(false), 900);
    setAmount(null);
  };

  return (
    <div className="w-full mt-8 relative">

      {/* ================= MAIN CARD ================= */}
      <div
        className="
        bg-black
        p-6
        shadow-xl
        hover:border-green-500/40
        transition-all
      "
      >

        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="flex items-center gap-2 text-white font-semibold text-lg">
            <FaHeart className="text-red-500 animate-pulse" />
            Support the Stream
          </h2>

          <span className="flex items-center gap-1 text-xs text-orange-400">
            <FaFire />
            Trending
          </span>
        </div>

        {/* ===== PRESET BUTTONS ===== */}
        <div className="flex gap-3 flex-wrap mb-5">
          {preset.map((amt) => (
            <motion.button
              key={amt}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setAmount(amt)}
              className={`
                px-4 py-2 rounded-lg text-sm font-semibold
                border transition-all
                ${
                  amount === amt
                    ? "bg-green-500 text-black border-green-500 shadow-lg shadow-green-500/30"
                    : "bg-[#181818] text-gray-300 border-neutral-700 hover:border-green-400"
                }
              `}
            >
              ₹{amt}
            </motion.button>
          ))}
        </div>

        {/* ===== CUSTOM + DONATE ===== */}
        <div className="flex gap-3 mb-6">
          <div className="flex items-center bg-[#151515] border border-neutral-700 rounded-lg px-3 flex-1">
            <FaRupeeSign className="text-gray-500 text-xs" />
            <input
              placeholder="Custom amount"
              className="bg-transparent outline-none text-white px-2 py-2 text-sm w-full"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={donate}
            className="
              px-5 py-2 rounded-lg font-semibold
              bg-green-500 hover:bg-green-600
              text-black
              flex items-center gap-2
            "
          >
            <FaGift />
            Donate
          </motion.button>
        </div>

        {/* ===== GOAL BAR (DUMMY) ===== */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Stream Goal</span>
            <span>₹4,200 / ₹10,000</span>
          </div>

          <div className="h-2 bg-[#181818] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "42%" }}
              transition={{ duration: 1 }}
              className="h-full bg-green-500"
            />
          </div>
        </div>

        {/* ===== TOP SUPPORTERS (DUMMY) ===== */}
        <div>
          <p className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <FaCrown className="text-yellow-400" />
            Top Supporters
          </p>

          <div className="flex gap-2 flex-wrap text-xs">
            {["NeoLive", "RazorX", "DevKing"].map((u) => (
              <span
                key={u}
                className="bg-[#181818] px-3 py-1 rounded-full border border-neutral-700 text-gray-300"
              >
                {u}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ===== CELEBRATION ANIMATION ===== */}
      <AnimatePresence>
        {burst && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.3, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <FaRocket className="text-green-400 text-6xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DonatePanel;
