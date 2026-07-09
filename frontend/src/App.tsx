import Login from "./Login.tsx";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./Register.tsx";
import Home from "./Home.tsx";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
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

export default function App() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const checkAuth = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Not authenticated");
      const data = await res.json();
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <div className="bg-emerald-700">
      <BrowserRouter>
        <Menubar className="border-0 p-0">
          <MenubarMenu>
            <MenubarTrigger>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
              </svg>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarGroup>
                <Link to="/">
                  <MenubarItem>Home</MenubarItem>
                </Link>
                <Link to="/signin">
                  <MenubarItem>Login</MenubarItem>
                </Link>
                <Link to="/register">
                  <MenubarItem>Register</MenubarItem>
                </Link>
              </MenubarGroup>
            </MenubarContent> 
          </MenubarMenu>
        </Menubar>

        <Sheet>
          <SheetTrigger className="text-white">
            ΟΔΗΓΙΕΣ ΧΡΗΣΗΣ
          </SheetTrigger>
          <SheetContent className="bg-[hsl(0,0%,20%)] text-white">
            <SheetHeader>
              <SheetTitle className="text-white">Οδηγίες χρήσης για την στοιχιματική</SheetTitle>
              <SheetDescription>
                <p>
                </p>
              </SheetDescription>
            </SheetHeader>
            <p>Απλά βάλε στο κουτάκι, που ειναι κοντά σε κάθε ερώτηση,</p>
            <p> την απάντηση σου που ειναι ή κάποια σκήνη ή κάποιο όνομα </p>
            <p>ή ο,τιδήποτε μου καπνίσει</p>
            <p> Μην το πολυσκέφτεσαι, η ιστοσελίδα ειναι ΑΠΛΗ και ΕΥΚΟΛΗ στην χρήση</p>

            <SheetFooter>
              <p>
                Για οποιοδήποτε πρόβλημα ή απορία πάρτε με απόκρυψη ή στείλτε email 
              </p>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <Routes>
          <Route
            path="/"
            element={
              loading ? (
                <div className="text-[red]">WAIT for the page to load plzz...</div>
              ) : user ? (
                <Home />
              ) : (
                <Navigate to="/register" />
              )
            }
          />
          <Route path="/signin" element={<Login checkAuth={checkAuth} />} />
          <Route path="/register" element={<Signup checkAuth={checkAuth}/>} />
          <Route path="/live_stoixima" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
