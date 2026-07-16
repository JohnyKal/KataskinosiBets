import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../@/components/ui/card";
import { getToken } from "./utils/authToken.js";

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

      const token = getToken();

      const res = await fetch(
        `${API_URL}/api/ans/answer/${bet._id}`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );


      if (!res.ok) return;


      const data = await res.json();

      setAnswers(data);


    } catch (err) {

      console.error(err);

    }
  };



  const submitAnswer = async () => {

    try {

      const token = getToken();


      console.log({
        betId: bet._id,
        answer: text,
      });



      const res = await fetch(
        `${API_URL}/api/ans/submit`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },


          body: JSON.stringify({
            betId: bet._id,
            answer: text,
          }),
        }
      );



      const data = await res.json();


      console.log(
        "SERVER RESPONSE:",
        data
      );



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

  }, [bet._id]);



  return (

    <Card
      className="
        w-full max-w-xl
        bg-emerald-950/70
        backdrop-blur-xl
        border border-emerald-700/40
        shadow-[0_20px_50px_rgba(0,0,0,0.35)]
        rounded-3xl
        overflow-hidden
      "
    >


      <CardHeader className="space-y-4">


        <CardTitle
          className="
            text-center
            text-xl
            font-black
            text-yellow-400
            tracking-wide
          "
        >

          🎰 LIVE ΣΤΟΙΧΗΜΑ

        </CardTitle>



        <CardDescription
          className="
            text-center
            text-white
            text-lg
            font-bold
          "
        >

          {bet.question}

        </CardDescription>



        <div className="flex items-center justify-between gap-2 mt-4">


          <input
            type="text"
            placeholder="Γράψε την πρόβλεψη..."
            value={text}
            onChange={(e) => setText(e.target.value)}

            className="
              w-[65%] sm:flex-1
              rounded-full
              px-4
              py-3
              bg-black/30
              border
              border-yellow-400/40
              text-white
              placeholder:text-white/50
              outline-none
              focus:ring-2
              focus:ring-yellow-400
            "
          />



          <button
            onClick={submitAnswer}

            className="
              w-[32%] sm:w-auto
              shrink-0
              rounded-full
              px-2
              py-3
              font-black
              text-xs sm:text-sm
              uppercase
              whitespace-nowrap
              text-white
              bg-gradient-to-b
              from-red-500
              to-red-800
              border-2
              border-yellow-300
              shadow-[0_5px_0_#7f1d1d]
              hover:translate-y-1
              transition
            "
          >

            Δήλωσε

          </button>


        </div>


      </CardHeader>



      <CardContent>


        <div className="space-y-2">


          {answers.length === 0 && (

            <p
              className="
                text-center
                text-white/50
                italic
              "
            >

              Κανείς δεν έχει παίξει ακόμα 🎲

            </p>

          )}



          {answers.map((user) => (

            <div
              key={user.name}

              className="
                flex
                justify-between
                items-center
                bg-black/30
                rounded-xl
                px-4
                py-3
                border
                border-white/10
              "
            >


              <span
                className="
                  text-yellow-300
                  font-bold
                "
              >

                {user.name}

              </span>



              <span
                className="
                  text-white
                  font-semibold
                "
              >

                {user.answer}

              </span>


            </div>

          ))}


        </div>


      </CardContent>


    </Card>

  );
}