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


    } catch(err) {
      console.error(err);
    }
  };


  useEffect(() => {
    fetchBets();
  }, []);



  return (

    <div className="
      min-h-screen
      px-4
      py-8
    ">


      <div className="
        max-w-6xl
        mx-auto
      ">



        {/* TITLE */}

        <div className="text-center mb-4">

          <h1
            className="
            text-3xl
            md:text-5xl
            font-black
            text-yellow-400
            tracking-wide
            drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]
            "
          >
            🎰 Στοιχήματα 🎲
          </h1>

        </div>




        {/* HOME BUTTON */}

        <div className="
          flex
          justify-center
          mb-8
        ">

          <button
            onClick={() => navigate("/")}
            className="
            rounded-full
            px-5
            py-2

            bg-black/30
            backdrop-blur-md

            border
            border-yellow-400/40

            text-yellow-200
            font-bold

            shadow-lg

            hover:bg-black/50
            hover:border-yellow-400

            transition
            "
          >

            🏠 Επιστροφή στην αρχική

          </button>


        </div>





        {/* BET CARDS */}

        {
          bets.length > 0 ? (

            <div
              className="
              flex
              flex-col
              items-center
              gap-8
              "
            >

              {
                bets.map((bet)=>(
                  
                  <BetCard
                    key={bet._id}
                    bet={bet}
                    API_URL={API_URL}
                    refreshBets={fetchBets}
                  />

                ))
              }

            </div>


          ) : (


            <div
              className="
              max-w-xl
              mx-auto

              bg-black/30
              backdrop-blur-md

              border
              border-yellow-400/30

              rounded-3xl

              p-10

              text-center

              text-white

              shadow-xl
              "
            >

              <p className="text-xl font-bold">
                🎲 Δεν υπάρχουν διαθέσιμα στοιχήματα ακόμα
              </p>


            </div>


          )
        }



      </div>


    </div>

  );
}