import { useState } from "react";
import { Card } from "../@/components/ui/card";
import { Button } from "../@/components/ui/button";

const symbols = [
  "ΑΡΧΗΓΟΣ",
  "ΣΟΣ",
  "ΚΟΙΝΩΤΑΡΧΗΣ",
  "ΠΑΙΔΙ",
  "ΟΜΑΔΑΡΧΗΣ",
  "⭐",
];

export default function SlotMachine() {
  const [reels, setReels] = useState([
    "ΑΡΧΗΓΟΣ",
    "ΣΟΣ",
    "⭐",
  ]);

  const [spinning, setSpinning] = useState(false);

  const [spinningReels, setSpinningReels] = useState([
    false,
    false,
    false,
  ]);

  const randomSymbol = () =>
    symbols[Math.floor(Math.random() * symbols.length)];


  const spin = () => {
    if (spinning) return;

    setSpinning(true);
    setSpinningReels([true, true, true]);

    const isWin = Math.random() < 0.3;

    let finalReels: string[];

    if (isWin) {
      const symbol = randomSymbol();
      finalReels = [symbol, symbol, symbol];
    } else {
      do {
        finalReels = [
          randomSymbol(),
          randomSymbol(),
          randomSymbol(),
        ];
      } while (
        finalReels[0] === finalReels[1] &&
        finalReels[1] === finalReels[2]
      );
    }


    const reel1 = setInterval(() => {
      setReels((r) => [
        randomSymbol(),
        r[1],
        r[2],
      ]);
    }, 70);


    const reel2 = setInterval(() => {
      setReels((r) => [
        r[0],
        randomSymbol(),
        r[2],
      ]);
    }, 70);


    const reel3 = setInterval(() => {
      setReels((r) => [
        r[0],
        r[1],
        randomSymbol(),
      ]);
    }, 70);


    // Stop first reel
    setTimeout(() => {
      clearInterval(reel1);

      setReels((r) => [
        finalReels[0],
        r[1],
        r[2],
      ]);

      setSpinningReels([
        false,
        true,
        true,
      ]);

    }, 2200);



    // Stop second reel
    setTimeout(() => {
      clearInterval(reel2);

      setReels((r) => [
        r[0],
        finalReels[1],
        r[2],
      ]);

      setSpinningReels([
        false,
        false,
        true,
      ]);

    }, 3200);



    // Stop third reel
    setTimeout(() => {
      clearInterval(reel3);

      setReels(finalReels);

      setSpinningReels([
        false,
        false,
        false,
      ]);

      setSpinning(false);

    }, 4200);
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

        <div className="flex justify-center gap-2 py-3 bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="h-3 w-3 rounded-full bg-yellow-100 shadow-[0_0_10px_#fff]"
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
            VEGAS SLOT
          </h1>

          <p className="text-yellow-100 mt-2 tracking-[0.4em] text-sm">
            TRY YOUR LUCK
          </p>
        </div>


        <div className="mx-6 rounded-2xl border-4 border-yellow-400 bg-black p-6 shadow-inner">

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
                    text-[14px]
                    font-extrabold
                    text-center
                    leading-tight
                    px-2
                    break-words
                    overflow-hidden
                    shadow-lg
                    ${
                      spinningReels[index]
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