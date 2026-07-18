import { useState } from "react";
import { Card } from "../@/components/ui/card";
import { Button } from "../@/components/ui/button";

const symbols = ["🍒", "🍋", "💎", "7️⃣", "🔔", "⭐"];

export default function SlotMachine() {
  const [reels, setReels] = useState(["🍒", "🍋", "💎"]);
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    if (spinning) return;

    setSpinning(true);

    const interval = setInterval(() => {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ]);
    }, 70);

    setTimeout(() => {
      clearInterval(interval);

      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ]);

      setSpinning(false);
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-950 via-black to-red-950 flex items-center justify-center px-4">
      <Card
        className="
          w-full
          max-w-xl
          rounded-3xl
          border-4
          border-yellow-400
          bg-[#3b0000]
          shadow-[0_0_35px_rgba(255,215,0,0.45)]
          overflow-hidden
        "
      >
        {/* Top Lights */}
        <div className="flex justify-center gap-2 py-3 bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="h-3 w-3 rounded-full bg-yellow-100 shadow-[0_0_10px_#fff]"
            />
          ))}
        </div>

        {/* Title */}
        <div className="py-6 text-center">
          <h1
            className="
              text-5xl
              font-black
              tracking-widest
              text-yellow-300
              drop-shadow-[0_0_12px_gold]
              animate-pulse
            "
          >
            VEGAS SLOT
          </h1>

          <p className="text-yellow-100 mt-2 tracking-[0.4em] text-sm">
            TRY YOUR LUCK
          </p>
        </div>

        {/* Machine */}
        <div className="mx-6 rounded-2xl border-4 border-yellow-400 bg-black p-6 shadow-inner">
          <div className="grid grid-cols-3 gap-4">
            {reels.map((symbol, index) => (
              <div
                key={index}
                className={`
                  h-32
                  rounded-xl
                  border-2
                  border-yellow-300
                  bg-white
                  flex
                  items-center
                  justify-center
                  text-6xl
                  shadow-lg
                  ${
                    spinning
                      ? "animate-bounce"
                      : ""
                  }
                `}
              >
                {symbol}
              </div>
            ))}
          </div>
        </div>

        {/* Lever */}
        <div className="flex justify-end pr-10 -mt-24">
          <div className="flex flex-col items-center">
            <div className="w-3 h-28 bg-gray-300 rounded-full" />
            <div className="w-10 h-10 rounded-full bg-red-600 border-4 border-white shadow-lg" />
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center py-10">
          <Button
            onClick={spin}
            disabled={spinning}
            className="
              px-12
              py-7
              text-2xl
              font-bold
              rounded-full
              bg-gradient-to-b
              from-yellow-300
              via-yellow-500
              to-yellow-700
              text-black
              border-2
              border-yellow-100
              shadow-[0_0_20px_gold]
              hover:scale-105
              transition
            "
          >
            {spinning ? "SPINNING..." : "SPIN"}
          </Button>
        </div>

        {/* Bottom Lights */}
        <div className="flex justify-center gap-2 py-3 bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="h-3 w-3 rounded-full bg-yellow-100 shadow-[0_0_10px_#fff]"
            />
          ))}
        </div>
      </Card>
    </div>
  );
}