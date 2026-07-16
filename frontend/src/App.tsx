import Login from "./Login.tsx";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./Register.tsx";
import Home from "./Home.tsx";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Stoixima from "./Stoixima.tsx";
import Admin from "./Admin.tsx";

import {
  Menubar,
  MenubarMenu,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarTrigger,
} from "../@/components/ui/menubar";

import {
  Sheet,
  SheetFooter,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../@/components/ui/sheet";

import Leaderboard from "./Leaderboard.tsx";

import { getToken } from "./utils/authToken.js";

export default function App() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const [user, setUser] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      console.log("checkAuth started");

      const token = getToken();

      console.log("Token inside checkAuth:", token);

      if (!token) {
        setUser(null);

        return;
      }

      const res = await fetch(`${API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Unauthorized");
      }

      const data = await res.json();

      setUser(data.user);
    } catch (error) {
      console.error("Auth error:", error);

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <BrowserRouter>
      <div
        className="
          min-h-screen
          bg-[radial-gradient(circle_at_50%_0%,#22c55e,#15803d_45%,#064e3b)]
        "
      >
        {/* TOP BAR */}

        <div className="flex justify-between items-center px-6 pt-6">
          <Menubar className="border-0 bg-transparent p-0">
            <MenubarMenu>
              <MenubarTrigger
                className="
                  group flex h-12 w-12 items-center justify-center
                  rounded-full
                  bg-gradient-to-br from-green-700 to-green-900
                  border border-yellow-500/40
                  shadow-[0_4px_15px_rgba(0,0,0,0.5)]
                  hover:scale-105
                  transition-all
                  cursor-pointer
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="28"
                  width="28"
                  viewBox="0 -960 960 960"
                  fill="#facc15"
                  className="group-hover:rotate-90 transition-transform duration-300"
                >
                  <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                </svg>
              </MenubarTrigger>

              <MenubarContent
                className="
                  mt-2 w-52
                  rounded-xl
                  bg-green-950
                  border border-yellow-500/30
                  shadow-xl
                  p-2
                "
              >
                <MenubarGroup>
                  <Link to="/">
                    <MenubarItem className="text-white hover:bg-yellow-500/20 cursor-pointer">
                      🏠 Αρχική
                    </MenubarItem>
                  </Link>

                  <Link to="/leaderboard">
                    <MenubarItem className="text-white hover:bg-yellow-500/20 cursor-pointer">
                      💎 Leaderboard
                    </MenubarItem>
                  </Link>

                  <Link to="/live_stoixima">
                    <MenubarItem className="text-white hover:bg-yellow-500/20 cursor-pointer">
                      🎰 Στοίχημα
                    </MenubarItem>
                  </Link>

                  <Link to="/signin">
                    <MenubarItem className="text-white hover:bg-yellow-500/20 cursor-pointer">
                      ✨ Σύνδεση
                    </MenubarItem>
                  </Link>

                  <Link to="/register">
                    <MenubarItem className="text-white hover:bg-yellow-500/20 cursor-pointer">
                      🃏 Εγγραφή
                    </MenubarItem>
                  </Link>
                </MenubarGroup>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          <Sheet>
            <SheetTrigger
              className="
                rounded-full
                bg-gradient-to-r from-yellow-500 to-yellow-600
                px-5 py-2
                font-bold
                text-green-950
                shadow-[0_4px_15px_rgba(234,179,8,0.35)]
                hover:scale-105
                transition-all
              "
            >
              ❓ Οδηγίες
            </SheetTrigger>

            <SheetContent
              className="
                bg-gradient-to-b from-green-950 to-green-900
                text-white
                border-yellow-500/30
              "
            >
              <SheetHeader>
                <SheetTitle className="text-yellow-400 text-2xl font-bold">
                  🎰 Οδηγίες χρήσης
                </SheetTitle>

                <SheetDescription className="text-gray-300">
                  Δες πόσο απλή είναι η διαδικασία!
                </SheetDescription>
              </SheetHeader>

              <div className="mt-8 space-y-5">
                <div className="rounded-xl bg-black/20 p-4 border border-yellow-500/20">
                  📝 Βάλε στο κουτάκι κοντά σε κάθε ερώτηση την απάντησή σου.
                </div>

                <div className="rounded-xl bg-green-950/50 p-4 border border-green-600">
                  ⚡ Η ιστοσελίδα είναι ΑΠΛΗ και ΕΥΚΟΛΗ
                </div>
              </div>

              <SheetFooter className="mt-8">
                <p className="text-gray-400 text-center w-full">
                  Καλή διασκέδαση και καλή τύχη! 🍀
                </p>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              loading ? (
                <div className="min-h-screen flex items-center justify-center text-white">
                  Φόρτωση...
                </div>
              ) : user ? (
                <Home />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />

          <Route path="/signin" element={<Login loginSuccess={checkAuth} />} />

          <Route path="/register" element={<Signup />} />

          <Route path="/leaderboard" element={<Leaderboard />} />

          <Route path="/live_stoixima" element={<Stoixima />} />

          <Route path="/awesomeadmin" element={<Admin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
