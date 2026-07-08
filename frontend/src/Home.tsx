import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BetCard from "./BetCard.tsx";

export default function Home() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [bets, setBets] = useState([]);

  const fetchBets = async () => {
    try {
      const res = await fetch(`${API_URL}/api/bets`, {
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
      <h1 className="text-white text-4xl font-bold text-center p-8">
        TIMERLINK
      </h1>

      <button onClick={() => navigate("/leaderboard")}>LEADERBOARD</button>

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
