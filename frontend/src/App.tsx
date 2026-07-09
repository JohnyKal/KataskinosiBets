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
    <div >
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
            Guide
          </SheetTrigger>
          <SheetContent className="bg-[hsl(0,0%,20%)] text-white">
            <SheetHeader>
              <SheetTitle className="text-white">Quick tutorial to use this app</SheetTitle>
              <SheetDescription>
                <p>
                  TimerLink is a link hosting platform that allows users to
                  create links dynamically pointing to different things based on
                  dates.
                </p>
              </SheetDescription>
            </SheetHeader>
            <p>1) First click the "Create New" button to start working on your link.</p>

<p>
On the edit page,
2) make a title (to recognize it easier in the future), <br />
3) click on the "Add Target", place a url, <br />
4) <strong>check the "start" and the "end"</strong>, and pick the dates for that url to be online.
</p>
<p>
You can add as many targets as needed!
</p>
<p>
5) Finaly click the "Save" button and you 'll navigate to the analytics page.
</p>
<p>
The url bellow title (in the home page) is the link that will redirect to your urls based on the date 
</p>
<p>
You can access the link's analytics clicking the title.
</p>

            <SheetFooter>
              <p>
                For any inconvinience, contanct us at{" "}
                <strong>kallergisgiannis09@gmail.com</strong>
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
