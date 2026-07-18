import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

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
        <div className="text-2xl mb-1">💰🎰🔥</div>

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

        <div className="text-2xl mt-1">🔥🎰💰</div>
      </h1>

      <div className="flex justify-center gap-5 mt-6 flex-wrap">
        {/* Leaderboard */}
        <button
          className="
            rounded-full
            border-2 border-amber-300
            bg-gradient-to-b from-red-500 via-red-600 to-red-800
            px-6 py-2.5
            font-black uppercase tracking-wide
            text-white
            shadow-[0_8px_0_#7f1d1d,0_0_30px_rgba(239,68,68,0.45)]
            transition-all duration-200
            hover:-translate-y-1
            hover:from-red-400 hover:via-red-500 hover:to-red-700
            hover:shadow-[0_10px_0_#7f1d1d,0_0_40px_rgba(250,204,21,0.4)]
            active:translate-y-[5px]
            active:shadow-[0_3px_0_#7f1d1d]
          "
          onClick={() => navigate("/leaderboard")}
        >
          👑 LEADERBOARD 👑
        </button>

        {/* Live Bets */}
        <button
          onClick={() => navigate("/live_stoixima")}
          className="
            rounded-full
            border-2 border-amber-300
            bg-gradient-to-b from-green-500 via-green-600 to-green-800
            px-6 py-2.5
            font-black uppercase tracking-wide
            text-white
            shadow-[0_8px_0_#14532d,0_0_30px_rgba(34,197,94,0.45)]
            transition-all duration-200
            hover:-translate-y-1
            hover:from-green-400 hover:via-green-500 hover:to-green-700
            hover:shadow-[0_10px_0_#14532d,0_0_40px_rgba(250,204,21,0.4)]
            active:translate-y-[5px]
            active:shadow-[0_3px_0_#14532d]
          "
        >
          🔴 ΖΩΝΤΑΝΑ ΣΤΟΙΧΗΜΑΤΑ
        </button>

        {/* Slot Machine */}
        <button
          onClick={() => navigate("/slotmachine")}
          className="
            rounded-full
            border-2 border-amber-300
            bg-gradient-to-b from-purple-500 via-purple-600 to-purple-800
            px-6 py-2.5
            font-black uppercase tracking-wide
            text-white
            shadow-[0_8px_0_#581c87,0_0_30px_rgba(168,85,247,0.45)]
            transition-all duration-200
            hover:-translate-y-1
            hover:from-purple-400 hover:via-purple-500 hover:to-purple-700
            hover:shadow-[0_10px_0_#581c87,0_0_40px_rgba(250,204,21,0.4)]
            active:translate-y-[5px]
            active:shadow-[0_3px_0_#581c87]
          "
        >
          🎰 SLOT MACHINE 🎰
        </button>
      </div>
    </div>
  );
}