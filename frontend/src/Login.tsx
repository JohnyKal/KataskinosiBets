import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../@/components/ui/card";

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

  return (
    <div className=" h-screen">
      <h1 className="text-white  text-4xl font-bold text-center p-8">
        Συνδέσου γρήγορα να παίξεις! 🎰
      </h1>
      <Card className="m-[8vw] shadow-xl/30 border-amber-50 bg-white shadow-[0_0_3rem_hsl(279,94%,100%)]">
        <CardHeader>
          <CardTitle>
            <h2>ΣΥΝΔΕΣΗ</h2>
          </CardTitle>
          <CardDescription>
            Σύνδεσου στο account που έχεις φτιάξει
          </CardDescription>
          <CardAction>
            <Link to="/register"><small>Εγγραφή</small></Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Formik<LogValues>
            initialValues={{ name: "", password: "" }}
            onSubmit={async (values) => {
              try {
                const res = await fetch(`${API_URL}/api/auth/login`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  credentials: "include",
                  body: JSON.stringify(values),
                });

                if (!res.ok) {
                  console.log(" Failed to login");
                  return;
                }
                await checkAuth(); // see if that need to be more top level that here (ex. in line 24)
                navigate("/");
                console.log("Form data", values);
              } catch (err) {
                console.error("Login error", err);
              }
            }}
          >
            <Form autoComplete="on">
              <Field name="name" type="name" placeholder="name" />
              <Field name="password" type="password" placeholder="Password (numbers only)" />
              <button type="submit"><strong>Σύδεση</strong></button>
            </Form>
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
