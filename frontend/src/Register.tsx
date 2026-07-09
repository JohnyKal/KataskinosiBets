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
 import { API_URL } from "./config";

interface RegValues {
  
  name: string;
  password: string;
}
type LoginProps = {
  checkAuth: () => Promise<void>;
};

export default function Signup({ checkAuth }: LoginProps) {
 const navigate = useNavigate();

  return (
    <div className=" h-screen">
      <h1 className="text-white text-4xl font-bold text-center p-8">
      Καλώς ήρθες! 🍀
      </h1>
      <Card className="m-[8vw] shadow-xl/30 border-amber-50 bg-white shadow-[0_0_3rem_hsl(279,94%,100%)] ">
        <CardHeader>
          <CardTitle>
            <h2>ΕΓΓΡΑΦΗ</h2>
          </CardTitle>
          <CardDescription>
            Φτιάξε ένα account και κατευθείαν συνδέσου σε αυτό
          </CardDescription>
          <CardAction>
            <Link to="/signin"><small>Σύνδεση</small></Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Formik<RegValues>
            initialValues={{ name: "", password: "" }}
            onSubmit={async (values) => {
              try {
                const res = await fetch(
                  `${API_URL}/api/auth/register`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                  }
                );

                if (!res.ok) {
                  console.log("Registration failed");
                  return;
                }

                await checkAuth(); 
                navigate("/signin");

                console.log("Form data", values);
              } catch (err) {
                console.error("Registration error", err);
              }
            }}
          >
            <Form autoComplete="on">
              <Field name="name" placeholder="Name" />
              <Field name="password" type="password" placeholder="Password (numbers only)" />
              <button type="submit"><strong>Εγγραφή</strong></button>
            </Form>
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
