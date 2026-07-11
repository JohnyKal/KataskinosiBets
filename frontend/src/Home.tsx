import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BetCard from "./BetCard.tsx";
interface Bet {
  _id: string;
  question: string;
  // add any other fields your API returns
}
export default function Home() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [bets, setBets] = useState<Bet[]>([]);

  const fetchBets = async () => {
    try {
      const res = await fetch(`${API_URL}/api/ans/bets`, {
        // api/bets doesnt exist
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
    <div className="h-screen">
      <h1
  className="
    text-center
    py-5
    font-black
    uppercase
  "
>
  <div className="text-2xl mb-1">
    💰🎰🔥
  </div>

  <div
   className="
   font-[Cinzel]
   text-3xl
   md:text-4xl
   font-black
   tracking-wide
   text-yellow-400
   animate-pulse
   drop-shadow-[0_3px_0_rgba(120,70,0,0.8)]
 "
  >
    ΚΑΤΑΣΚΗΝΩΤΙΚΑ
    <br />
    ΣΤΟΙΧΗΜΑΤΑ
  </div>

  <div className="text-2xl mt-1">
    🔥🎰💰
  </div>
</h1>
    <div className="flex justify-center mt-6">
      <button
          className="rounded-full border-2 border-amber-300 bg-gradient-to-b from-red-500 via-red-600 to-red-800 px-6 py-2.5 font-black uppercase tracking-wide text-white shadow-[0_8px_0_#7f1d1d,0_0_30px_rgba(239,68,68,0.45)] transition-all duration-200 hover:-translate-y-1 hover:from-red-400 hover:via-red-500 hover:to-red-700 hover:shadow-[0_10px_0_#7f1d1d,0_0_40px_rgba(250,204,21,0.4)] active:translate-y-[5px] active:shadow-[0_3px_0_#7f1d1d]"
          onClick={() => navigate("/leaderboard")}
      >
        👑 LEADERBOARD 👑
      </button>
      </div>

      {bets.map((bet) => (
        <BetCard
          key={bet._id}
          bet={bet}
          API_URL={API_URL}
          refreshBets={fetchBets}
        />
      ))}
    </div>
  );
}
