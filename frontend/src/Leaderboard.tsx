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

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`${API_URL}/api/leaderboard`, {
          credentials: "include",
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
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Leaderboard</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {rankedUsers.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold w-8">{user.rank}.</span>
                  <span>{user.name}</span>
                </div>

                <span className="font-semibold">{user.score}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <button onClick={() => navigate("/live_stoixima")}>
        Ζωντανά στοιχήματα
      </button>
    </>
  );
}