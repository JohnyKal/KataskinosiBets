import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../@/components/ui/card";

const API_URL = import.meta.env.VITE_API_URL;

interface Answer {
  userId: string;
  betId: string;
  name: string;
  bet: string;
  answer: string;
  time: string;
}

export default function Admin() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);

  const [newBet, setNewBet] = useState("");

  const [correctAnswers, setCorrectAnswers] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    fetchAnswers();
  }, []);

  async function fetchAnswers() {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/admin/answers`, {
        credentials: "include",
      });

      const data = await res.json();

      setAnswers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function addBet() {
    if (!newBet.trim()) return;

    try {
      await fetch(`${API_URL}/api/admin/bets`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: newBet,
        }),
      });

      setNewBet("");

      alert("Bet created");
    } catch (error) {
      console.error(error);
    }
  }

  async function submitAnswer(userId: string, betId: string) {
    try {
      await fetch(`${API_URL}/api/admin/answers/${userId}/${betId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value: correctAnswers[`${userId}-${betId}`],
        }),
      });

      alert("Answer checked");
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteAnswer(userId: string, betId: string) {
    if (!window.confirm("Delete this answer?")) return;

    try {
      await fetch(`${API_URL}/api/admin/answers/${userId}/${betId}`, {
        method: "DELETE",
        credentials: "include",
      });

      setAnswers((prev) =>
        prev.filter((item) => !(item.userId === userId && item.betId === betId))
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className="
      min-h-screen
      bg-[radial-gradient(circle_at_50%_0%,#22c55e,#15803d_45%,#064e3b)]
      p-8
    "
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <Card
          className="
          bg-zinc-900
          border-green-600
          shadow-2xl
        "
        >
          <CardHeader>
            <CardTitle
              className="
              text-3xl
              text-green-400
            "
            >
              🏛️ Admin Panel
            </CardTitle>

            <CardDescription
              className="
              text-zinc-400
            "
            >
              Create bets and manage user answers.
            </CardDescription>
          </CardHeader>

          <CardContent>
  <div
    className="
      flex
      flex-col
      md:flex-row
      gap-4
    "
  >
    <input
      value={newBet}
      onChange={(e) => setNewBet(e.target.value)}
      placeholder="Write a new bet..."
      className="
        flex-1
        min-w-0
        rounded-lg
        bg-zinc-800
        border
        border-zinc-700
        p-3
        text-white
        outline-none
        focus:border-green-500
      "
    />

    <button
      onClick={addBet}
      className="
        w-full
        md:w-auto
        bg-green-600
        hover:bg-green-500
        text-white
        px-8
        py-3
        rounded-lg
        font-semibold
        whitespace-nowrap
      "
    >
      Add Bet
    </button>
  </div>
</CardContent>
        </Card>

        {loading ? (
          <div
            className="
              text-white
              text-center
              text-2xl
            "
          >
            Loading...
          </div>
        ) : answers.length === 0 ? (
          <div
            className="
              text-white
              text-center
              text-xl
            "
          >
            No answers found.
          </div>
        ) : (
          <div className="grid gap-6">
            {answers.map((item) => (
              <Card
                key={`${item.userId}-${item.betId}`}
                className="
                      bg-zinc-900
                      border-green-700
                      shadow-xl
                    "
              >
                <CardHeader>
                  <CardTitle
                    className="
                        text-green-400
                      "
                  >
                    🎲 {item.bet}
                  </CardTitle>

                  <CardDescription
                    className="
                        text-zinc-400
                      "
                  >
                    Submitted by {item.name}
                  </CardDescription>
                </CardHeader>

                <CardContent
                  className="
                      space-y-6
                    "
                >
                  <div
                    className="
                        grid
                        md:grid-cols-3
                        gap-6
                      "
                  >
                    <div>
                      <p className="text-zinc-400">👤 User:</p>

                      <p className="text-white font-semibold">{item.name}</p>
                    </div>

                    <div>
                      <p className="text-zinc-400">💬 Answer:</p>

                      <p className="text-white font-semibold">{item.answer}</p>
                    </div>

                    <div>
                      <p className="text-zinc-400">🕒 Time:</p>

                      <p className="text-white">
                        {new Date(item.time).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div
                    className="
                        flex
                        flex-col
                        md:flex-row
                        gap-3
                      "
                  >
                    <input
                      value={
                        correctAnswers[`${item.userId}-${item.betId}`] || ""
                      }
                      onChange={(e) =>
                        setCorrectAnswers((prev) => ({
                          ...prev,

                          [`${item.userId}-${item.betId}`]: e.target.value,
                        }))
                      }
                      placeholder="
                            Correct answer
                          "
                      className="
                            flex-1
                            rounded-lg
                            bg-zinc-800
                            border
                            border-zinc-700
                            p-3
                            text-white
                          "
                    />

                    <button
                      onClick={() => submitAnswer(item.userId, item.betId)}
                      className="
                            bg-emerald-600
                            hover:bg-emerald-500
                            text-white
                            px-6
                            rounded-lg
                          "
                    >
                     ✅ Save
                    </button>

                    <button
                      onClick={() => deleteAnswer(item.userId, item.betId)}
                      className="
                            bg-red-600
                            hover:bg-red-500
                            text-white
                            px-6
                            rounded-lg
                          "
                    >
                      🚫 Remove
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
