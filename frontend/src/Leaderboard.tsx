import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../src/config";

interface User {
  _id: string;
  name: string;
  score: number;
}

export default function Leaderboard() {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`${API_URL}/api/leaderboard`, {
          
          headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLeaderboard();
  }, []);

  const sortedUsers = [...users].sort((a, b) => b.score - a.score);

  let currentRank = 1;
  let previousScore: number | null = null;

  const rankedUsers = sortedUsers.map((user, index) => {
    if (previousScore !== user.score) {
      currentRank = index + 1;
    }

    previousScore = user.score;

    return {
      ...user,
      rank: currentRank,
    };
  });

  return (
    <>
      <Card
        className="
          w-full
          max-w-lg
          mx-auto
          rounded-3xl
          border-2
          border-yellow-400/80
          bg-gradient-to-b
          from-neutral-900
          via-zinc-950
          to-black
          shadow-[0_0_30px_rgba(220,38,red,0.35),0_12px_30px_rgba(0,0,0,0.7)]
          text-white
        "
      >
        <CardHeader className="px-4 py-3">
          <CardTitle
            className="
              text-3xl
              font-black
              text-center
              tracking-widest
              uppercase
              text-yellow-300
              drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]
            "
          >
            🏆 LEADERBOARD
          </CardTitle>
        </CardHeader>

        <CardContent className="px-4 pb-4 space-y-3">
          {rankedUsers.map((user) => (
            <div
              key={user._id}
              className="
                flex
                items-center
                justify-between
                rounded-xl
                border
                border-white/10
                bg-white/5
                px-5
                py-3
                transition-all
                duration-200
                hover:bg-red-600/20
                hover:border-yellow-400/40
                hover:translate-x-1
              "
            >
              {/* Rank */}
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-b
                  from-yellow-300
                  to-yellow-500
                  font-black
                  text-black
                  shadow-[0_0_15px_rgba(250,204,21,0.6)]
                "
              >
                {user.rank}
              </div>

              {/* Name */}
              <span className="ml-4 flex-1 text-lg font-semibold">
                {user.name}
              </span>

              {/* Score */}
              <span
                className="
                  text-xl
                  font-extrabold
                  text-red-400
                  drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]
                "
              >
                {user.score}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

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
    </>
  );
}