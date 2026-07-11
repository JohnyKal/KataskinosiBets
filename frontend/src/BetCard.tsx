import { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
} from "../@/components/ui/card";

type Answer = {
  name: string;
  answer: string;
};

type Bet = {
  _id: string;
  question: string;
};

type Props = {
  bet: Bet;
  API_URL: string;
  refreshBets: () => void;
};

export default function BetCard({
  bet,
  API_URL,
  refreshBets,
}: Props) {
  const [text, setText] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([]);

  const fetchAnswers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/answers/find`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          betId: bet._id,
        }),
      });

      if (!res.ok) return;

      const data = await res.json();
      setAnswers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const submitAnswer = async () => {
    try {
      const res = await fetch(`${API_URL}/api/ans/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          betId: bet._id,
          answer: text,
        }),
      });

      if (!res.ok) return;

      setText("");
      refreshBets();
      fetchAnswers();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAnswers();
  }, []);

  return (
    <Card className="m-[8vw] bg-white ">
      <CardHeader>
        <CardDescription>{bet.question}</CardDescription>

        <CardAction>
          <input
            type="text"
            placeholder="απλή ΚΑΤΑΝΟΗΤΗ απάντηση"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
            onClick={submitAnswer}
          >
            Δήλωσε
          </button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <ul>
          {answers.map((user) => (
            <li key={user.name}>
              <strong>{user.name}</strong>: {user.answer}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}