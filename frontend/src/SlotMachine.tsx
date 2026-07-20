// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card } from "../@/components/ui/card";
// import { Button } from "../@/components/ui/button";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../@/components/ui/card";
import { Button } from "../@/components/ui/button";

import { API_URL } from "../src/config";
import { getToken } from "./utils/authToken";

// const symbols = [
//   { text: "ΑΡΧΗΓΟΣ", emoji: "🍀" },
//   { text: "ΣΟΣ", emoji: "🔥" },
//   { text: "ΚΟΙΝΟΤΑΡΧΗΣ", emoji: "⭐" },
//   { text: "ΠΑΙΔΙ", emoji: "✨" },
//   { text: "ΟΜΑΔΑΡΧΗΣ", emoji: "🎉" },
// ];

const symbols = [
  { text: "ΑΡΧΗΓΟΣ", emoji: "🍀", reward: 50 },
  { text: "ΣΟΣ", emoji: "🔥", reward: 16 },
  { text: "ΚΟΙΝΟΤΑΡΧΗΣ", emoji: "⭐", reward: 21 },
  { text: "ΠΑΙΔΙ", emoji: "✨", reward: 12 },
  { text: "ΟΜΑΔΑΡΧΗΣ", emoji: "🎉", reward: 18 },
];

interface SymbolType {
  text: string;
  emoji: string;
  reward: number;
}

export default function SlotMachine() {
  const navigate = useNavigate();

  const [reels, setReels] = useState<SymbolType[]>([
    symbols[0],
    symbols[1],
    symbols[2],
  ]);
  const [reward, setReward] = useState(0);

  const [score, setScore] = useState<number | null>(null);
  
  const [message, setMessage] = useState("");
  
  const [error, setError] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [spinningReels, setSpinningReels] = useState([false, false, false]);
  const [win, setWin] = useState(false);

  const randomSymbol = (): SymbolType =>
    symbols[Math.floor(Math.random() * symbols.length)];

  const spinRequest = async () => {
    const token = getToken();
  
    const res = await fetch(`${API_URL}/api/slot/spin`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw new Error(data.message);
    }
  
    return data;
  };

  const spin = async () => {
    if (spinning) return;
  
    setError("");
    setMessage("");
    setReward(0);
  
    try {
      setSpinning(true);
      setSpinningReels([true, true, true]);
  
      const data = await spinRequest();
  
      setScore(data.score);
  
      const finalReels: SymbolType[] = data.reels;
  
      const reel1 = setInterval(() => {
        setReels((r) => [randomSymbol(), r[1], r[2]]);
      }, 70);
  
      const reel2 = setInterval(() => {
        setReels((r) => [r[0], randomSymbol(), r[2]]);
      }, 70);
  
      const reel3 = setInterval(() => {
        setReels((r) => [r[0], r[1], randomSymbol()]);
      }, 70);
  
      setTimeout(() => {
        clearInterval(reel1);
  
        setReels((r) => [finalReels[0], r[1], r[2]]);
  
        setSpinningReels([false, true, true]);
      }, 2200);
  
      setTimeout(() => {
        clearInterval(reel2);
  
        setReels((r) => [r[0], finalReels[1], r[2]]);
  
        setSpinningReels([false, false, true]);
      }, 3200);
  
      setTimeout(() => {
        clearInterval(reel3);
  
        setReels(finalReels);
  
        if (data.win) {
          setWin(true);
  
          setReward(data.reward);
  
          setMessage(`🎉 Κέρδισες ${data.reward} πόντους!`);
  
          setTimeout(() => {
            setWin(false);
          }, 3000);
        } else {
          setMessage("😢 Δεν κέρδισες αυτή τη φορά.");
        }
  
        setSpinning(false);
  
        setSpinningReels([false, false, false]);
      }, 4200);
    } catch (err: any) {
      setSpinning(false);
  
      setSpinningReels([false, false, false]);
  
      setError(err.message || "Κάτι πήγε στραβά.");
    }
  };

  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-b
      from-red-950
      via-black
      to-red-950
      flex
      flex-col
      items-center
      justify-center
      px-4
      gap-5
    "
    >
      {/* Return Button */}
      <button
        onClick={() => navigate("/")}
        className="
          rounded-full
          border-2 border-amber-300
          bg-gradient-to-b
          from-red-500
          via-red-600
          to-red-800
          px-8
          py-2.5
          font-black
          uppercase
          tracking-wide
          text-white
          shadow-[0_8px_0_#7f1d1d,0_0_30px_rgba(239,68,68,0.45)]
          transition-all
          duration-200
          hover:-translate-y-1
          hover:shadow-[0_10px_0_#7f1d1d,0_0_40px_rgba(250,204,21,0.4)]
          active:translate-y-[5px]
          active:shadow-[0_3px_0_#7f1d1d]
        "
      >
        🏠 ΠΙΣΩ
      </button>

      <Card
        className="
          relative
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
        {win && (
          <div
            className="
              absolute
              inset-0
              z-20
              flex
              items-center
              justify-center
              bg-yellow-400/30
              backdrop-blur-sm
              animate-pulse
            "
          >
            <div className="text-center animate-bounce">
              <div
                className="
                text-7xl
                font-black
                text-yellow-300
                drop-shadow-[0_0_20px_gold]
              "
              >
                🎉 WIN! 🎉
              </div>

              <div className="text-4xl mt-4 font-bold text-white">
  +{reward} ΠΟΝΤΟΙ 🏆
</div>
            </div>
          </div>
        )}

        <div
          className="
          flex
          justify-center
          gap-2
          py-3
          bg-gradient-to-r
          from-yellow-500
          via-yellow-300
          to-yellow-500
        "
        >
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="
                h-3
                w-3
                rounded-full
                bg-yellow-100
                shadow-[0_0_10px_#fff]
              "
            />
          ))}
        </div>

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
            CAMP SLOT
          </h1>

          <p
            className="
            text-yellow-100
            mt-2
            tracking-[0.4em]
            text-sm
          "
          >
            ΔΟΚΙΜΑΣΕ ΤΗΝ ΤΥΧΗ ΣΟΥ
          </p>
        </div>
        <div className="mt-6 flex flex-col items-center gap-2">

  <div className="rounded-xl bg-black/40 px-5 py-2 border border-yellow-500">

    <span className="text-yellow-300 font-bold">
      🎰 Κόστος περιστροφής:
    </span>

    <span className="ml-2 text-red-400 font-black">
      -3 πόντοι
    </span>

  </div>

  {score !== null && (

    <div className="rounded-xl bg-green-900 px-5 py-2 border border-green-500">

      <span className="text-white font-bold">
        💰 Πόντοι:
      </span>

      <span className="ml-2 text-yellow-300 font-black">
        {score}
      </span>

    </div>

  )}

</div>

        <div
          className="
          mx-6
          rounded-2xl
          border-4
          border-yellow-400
          bg-black
          p-6
          shadow-inner
        "
        >
          <div className="grid grid-cols-3 gap-4">
            {reels.map((symbol, index) => (
              <div
                key={index}
                className={`
                  h-36
                  rounded-xl
                  border-2
                  border-yellow-300
                  bg-white
                  flex
                  items-center
                  justify-center
                  overflow-hidden
                  shadow-lg
                  ${spinningReels[index] ? "animate-bounce" : ""}
                `}
              >
                <div className="flex flex-col items-center justify-center px-1">
                  <span
                    className="
                    max-w-full
                    text-[12px]
                    font-black
                    text-black
                    text-center
                    break-all
                  "
                  >
                    {symbol.text}
                  </span>

                  <span className="text-3xl mt-1">{symbol.emoji}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {message && (

<div className="flex justify-center mb-6">

  <div
    className="
      rounded-xl
      border
      border-green-500
      bg-green-900/70
      px-6
      py-3
      text-lg
      font-bold
      text-green-200
    "
  >
    {message}
  </div>

</div>

)}
{error && (

<div className="flex justify-center mb-6">

  <div
    className="
      rounded-xl
      border
      border-red-500
      bg-red-900/70
      px-6
      py-3
      text-lg
      font-bold
      text-red-200
    "
  >
    ❌ {error}
  </div>

</div>

)}
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
            {spinning ? "🎰 ΓΥΡΙΖΕΙ..." : "🎰 SPIN (-3)"}
          </Button>
        </div>

        <div
          className="
          flex
          justify-center
          gap-2
          py-3
          bg-gradient-to-r
          from-yellow-500
          via-yellow-300
          to-yellow-500
        "
        >
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="
                h-3
                w-3
                rounded-full
                bg-yellow-100
                shadow-[0_0_10px_#fff]
              "
            />
          ))}
        </div>
      </Card>
    </div>
  );
}
