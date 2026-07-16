import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../@/components/ui/card";
import { useState } from "react";

interface LogValues {
  name: string;
  password: string;
}

type LoginProps = {
  checkAuth: () => Promise<void>;
};

export default function Login({ checkAuth }: LoginProps) {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [error, setError] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center px-4">
      <h1
        className="
          text-white
          text-4xl
          md:text-5xl
          font-black
          text-center
          mb-6
          drop-shadow-[0_0_15px_rgba(255,215,0,0.7)]
        "
      >
        Συνδέσου και παίξε! 🍀
      </h1>

      <Card
        className="
          w-full
          max-w-md
          border-2
          border-yellow-400/50
          bg-gradient-to-b
          from-white
          to-gray-100
          rounded-3xl
          shadow-[0_0_40px_rgba(255,215,0,0.35)]
        "
      >
        <CardHeader className="text-center">
          <CardTitle
            className="
              text-3xl
              font-black
              text-red-700
            "
          >
            ΣΥΝΔΕΣΗ 🎰
          </CardTitle>

          <CardDescription className="text-gray-600">
            Μπες στον λογαριασμό σου και ξεκίνα τα στοιχήματα
          </CardDescription>

          <p className="text-sm mt-3">
            Δεν έχεις λογαριασμό;{" "}
            <Link
              to="/register"
              className="
                font-bold
                text-red-600
                hover:text-red-800
              "
            >
              Εγγραφή
            </Link>
          </p>
        </CardHeader>

        <CardContent>
          <Formik<LogValues>
            initialValues={{
              name: "",
              password: "",
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setError("");

              try {
                const res = await fetch(`${API_URL}/api/auth/login`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                });

                if (!res.ok) {
                  setError("Λάθος όνομα ή κωδικός");
                  return;
                }

                const data = await res.json();

                console.log("Login response:", data);
                console.log("AAAAAA");

                if (!data.token) {
                  console.error("No token received!");
                  return;
                }

                sessionStorage.setItem("token", data.token);

                console.log("Immediately after set:", localStorage.getItem("token"));

                console.log("Stored token:", localStorage.getItem("token"));

                await checkAuth();

                navigate("/");
              } catch(err) {
                console.error("Login error:", err);
                setError("Δεν ήταν δυνατή η σύνδεση");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-5">
                <Field
                  name="name"
                  type="text"
                  placeholder="Όνομα"
                  className="
                    rounded-xl
                    border
                    border-gray-300
                    px-4
                    py-3
                    outline-none
                    focus:border-red-500
                    focus:ring-2
                    focus:ring-red-200
                  "
                />

                <Field
                  name="password"
                  type="password"
                  placeholder="Κωδικός"
                  className="
                    rounded-xl
                    border
                    border-gray-300
                    px-4
                    py-3
                    outline-none
                    focus:border-red-500
                    focus:ring-2
                    focus:ring-red-200
                  "
                />

                {error && (
                  <p
                    className="
                      text-center
                      text-red-600
                      font-bold
                    "
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    mt-3
                    rounded-full
                    border-2
                    border-yellow-300
                    bg-gradient-to-b
                    from-red-500
                    via-red-600
                    to-red-800
                    px-6
                    py-3
                    font-black
                    uppercase
                    tracking-wide
                    text-white
                    shadow-[0_7px_0_#7f1d1d,0_0_30px_rgba(239,68,68,0.6)]
                    transition
                    hover:scale-105
                    active:translate-y-1
                    active:shadow-[0_3px_0_#7f1d1d]
                    disabled:opacity-70
                  "
                >
                  {isSubmitting ? "Σύνδεση..." : "Σύνδεση 🎲"}
                </button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
