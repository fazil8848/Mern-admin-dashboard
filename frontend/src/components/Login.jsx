import React, { useEffect } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { userLogin } from "../redux/slices/authSlice";

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .matches(
      /^[a-zA-Z0-9_ ]+$/,
      "Username can only contain letters, numbers, underscores, and spaces"
    )
    .required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(userLogin(values)).unwrap();
      navigate("/");
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <Card
        color="transparent"
        className="p-10 border shadow-md"
        shadow={false}
      >
        <Typography variant="h4" color="blue-gray">
          Log In
        </Typography>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Username
                </Typography>
                <Field
                  as={Input}
                  name="username"
                  type="text"
                  placeholder="Username"
                  size="lg"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                />
                <ErrorMessage
                  name="username"
                  component="span"
                  className="text-red-500 text-sm"
                />

                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Password
                </Typography>
                <Field
                  as={Input}
                  name="password"
                  type="password"
                  placeholder="********"
                  size="lg"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <Button
                className="mt-6"
                type="submit"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default Login;
