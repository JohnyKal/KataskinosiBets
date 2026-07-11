import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BetCard from "./BetCard.tsx";

interface Bet {
  _id: string;
  question: string;
}

export default function Bets() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [bets, setBets] = useState<Bet[]>([]);

  const fetchBets = async () => {
    try {
      const res = await fetch(`${API_URL}/api/ans/bets`, {
        credentials: "include",
      });

      if (!res.ok) {
        setBets([]);
        return;
      }

      const data = await res.json();
      setBets(data);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBets();
  }, []);

  return (
    <div className="min-h-screen px-6 py-8">

      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <div className="text-center mb-5">
          <h1
            className="
              text-3xl md:text-5xl
              font-extrabold
              text-yellow-400
              tracking-wide
              drop-shadow-[0_3px_8px_rgba(0,0,0,0.8)]
            "
          >
            🎰 Κατασκηνωτικά Στοιχήματα 🎲
          </h1>
        </div>


        {/* Gentle Home Button */}
        <div className="flex justify-center mb-10">
          <button
            onClick={() => navigate("/")}
            className="
              px-5 py-2
              rounded-full

              bg-black/30
              backdrop-blur-sm

              border
              border-yellow-500/30

              text-yellow-200
              font-medium

              shadow-lg

              hover:bg-black/40
              hover:border-yellow-400/60

              transition-all
              duration-300
            "
          >
            🏠 Επιστροφή στην αρχική
          </button>
        </div>


        {/* Bets */}
        <div
          className="
            grid
            gap-6
            md:grid-cols-2
          "
        >

          {bets.length > 0 ? (
            bets.map((bet) => (
              <div
                key={bet._id}
                className="
                  bg-black/30
                  backdrop-blur-sm
                  rounded-xl
                  p-4

                  border
                  border-yellow-500/20

                  shadow-xl

                  hover:border-yellow-400/40
                  transition
                "
              >
                <BetCard
                  bet={bet}
                  API_URL={API_URL}
                  refreshBets={fetchBets}
                />
              </div>
            ))
          ) : (

            <div
              className="
                col-span-full
                text-center

                bg-black/30
                backdrop-blur-sm

                border
                border-yellow-500/30

                rounded-xl

                p-10

                text-white

                shadow-xl
              "
            >
              <p className="text-xl">
                🎲 Δεν υπάρχουν διαθέσιμα στοιχήματα ακόμα
              </p>
            </div>

          )}

        </div>

      </div>

    </div>
  );
}