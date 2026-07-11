import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../@/components/ui/card";
import { API_URL } from "./config";
import { useState } from "react";

interface RegValues {
  name: string;
  password: string;
}

export default function Signup() {
  const navigate = useNavigate();
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
        mb-8
        drop-shadow-[0_0_15px_rgba(255,215,0,0.7)]
      "
      >
        Καλώς ήρθες! 🎰
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
        shadow-[0_0_40px_rgba(255,215,0,0.35)]
        rounded-3xl
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
            ΕΓΓΡΑΦΗ 🎲
          </CardTitle>

          <CardDescription className="text-gray-600">
            Φτιάξε λογαριασμό, και μετά κάνε <strong>ΣΥΝΔΕΣΗ</strong>
          </CardDescription>

          <p className="text-sm mt-3">
            Έχεις ήδη λογαριασμό;{" "}
            <Link
              to="/signin"
              className="
                font-bold 
                text-red-600
                hover:text-red-800
              "
            >
              Σύνδεση
            </Link>
          </p>
        </CardHeader>

        <CardContent>
          <Formik<RegValues>
            initialValues={{
              name: "",
              password: "",
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setError("");

              try {
                const res = await fetch(`${API_URL}/api/auth/register`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                });

                if (!res.ok) {
                  setError("Το όνομα χρήστη υπάρχει ήδη");
                  return;
                }

                navigate("/signin");
              } catch (err) {
                setError("Κάτι πήγε στραβά");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-5">
                <Field
                  name="name"
                  placeholder="Ονοματεπώνυμο"
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
                  placeholder="Κωδικός (μόνο ΑΡΙΘΜΟΙ)"
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
                  text-red-600
                  text-center
                  font-bold
                "
                  >
                    {error}
                  </p>
                )}

                <button
                  disabled={isSubmitting}
                  type="submit"
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
                "
                >
                  {isSubmitting ? "Φόρτωση..." : "Εγγραφή 🎰"}
                </button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
