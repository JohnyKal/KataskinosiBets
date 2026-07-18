import { useState } from "react";
import { Card } from "../@/components/ui/card";
import { Button } from "../@/components/ui/button";

const symbols = [
  { text: "ΑΡΧΗΓΟΣ", emoji: "🍀" },
  { text: "ΣΟΣ", emoji: "🔥" },
  { text: "ΚΟΙΝΩΤΑΡΧΗΣ", emoji: "⭐" },
  { text: "ΠΑΙΔΙ", emoji: "✨" },
  { text: "ΟΜΑΔΑΡΧΗΣ", emoji: "🎉" },
];

type SymbolType = (typeof symbols)[number];

export default function SlotMachine() {
  const [reels, setReels] = useState<SymbolType[]>([
    symbols[0],
    symbols[1],
    symbols[2],
  ]);

  const [spinning, setSpinning] = useState(false);

  const [spinningReels, setSpinningReels] = useState([
    false,
    false,
    false,
  ]);

  const [win, setWin] = useState(false);

  const randomSymbol = (): SymbolType =>
    symbols[Math.floor(Math.random() * symbols.length)];


  const spin = () => {
    if (spinning) return;

    setSpinning(true);
    setSpinningReels([true, true, true]);

    const isWin = Math.random() < 0.3;

    let finalReels: SymbolType[];

    if (isWin) {
      const symbol = randomSymbol();
      finalReels = [
        symbol,
        symbol,
        symbol,
      ];
    } else {
      do {
        finalReels = [
          randomSymbol(),
          randomSymbol(),
          randomSymbol(),
        ];
      } while (
        finalReels[0].text === finalReels[1].text &&
        finalReels[1].text === finalReels[2].text
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


      if (
        finalReels[0].text === finalReels[1].text &&
        finalReels[1].text === finalReels[2].text
      ) {
        setWin(true);

        setTimeout(() => {
          setWin(false);
        }, 3000);
      }


      setSpinningReels([
        false,
        false,
        false,
      ]);

      setSpinning(false);

    }, 4200);
  };


  return (
    <div className="
      min-h-screen
      bg-gradient-to-b
      from-red-950
      via-black
      to-red-950
      flex
      items-center
      justify-center
      px-4
    ">


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

            <div className="
              text-center
              animate-bounce
            ">

              <div className="
                text-7xl
                font-black
                text-yellow-300
                drop-shadow-[0_0_20px_gold]
              ">
                🎉 WIN! 🎉
              </div>


              <div className="
                text-4xl
                mt-4
              ">
                🏆 JACKPOT 🏆
              </div>

            </div>

          </div>
        )}



        {/* Top Lights */}
        <div className="
          flex
          justify-center
          gap-2
          py-3
          bg-gradient-to-r
          from-yellow-500
          via-yellow-300
          to-yellow-500
        ">
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


          <p className="
            text-yellow-100
            mt-2
            tracking-[0.4em]
            text-sm
          ">
            TRY YOUR LUCK
          </p>

        </div>



        {/* Slots */}
        <div className="
          mx-6
          rounded-2xl
          border-4
          border-yellow-400
          bg-black
          p-6
          shadow-inner
        ">

          <div className="
            grid
            grid-cols-3
            gap-4
          ">

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
                  text-center
                  shadow-lg
                  overflow-hidden
                  ${
                    spinningReels[index]
                      ? "animate-bounce"
                      : ""
                  }
                `}
              >

                <div className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  px-2
                ">

                  <span className="
                    text-[14px]
                    font-black
                    leading-tight
                    break-words
                  ">
                    {symbol.text}
                  </span>


                  <span className="
                    text-3xl
                    mt-1
                  ">
                    {symbol.emoji}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>




        {/* Button */}
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
        <div className="
          flex
          justify-center
          gap-2
          py-3
          bg-gradient-to-r
          from-yellow-500
          via-yellow-300
          to-yellow-500
        ">
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