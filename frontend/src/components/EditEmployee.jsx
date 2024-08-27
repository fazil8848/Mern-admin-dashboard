import React, { useEffect, useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEmployees, editEmployee } from "../redux/slices/employeeSlice";

const EditEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const baseUrl = "http://localhost:3000/uploads";

  const getEmployees = async () => {
    try {
      const result = await dispatch(fetchEmployees()).unwrap();
      const temp = result.employees.filter((emply) => emply._id === id);
      setEmployee(temp[0]);
    } catch (error) {
      toast.error("An error occurred while getting the employee.");
    }
  };
  useEffect(() => {
    getEmployees();
  }, []);

  const validationSchema = Yup.object().shape({
    image: Yup.mixed().test(
      "fileType",
      "Only JPG/PNG files are accepted",
      (value) => {
        return (
          !value ||
          (value && (value.type === "image/jpeg" || value.type === "image/png"))
        );
      }
    ),
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobileNumber: Yup.string()
      .matches(/^\d+$/, "Mobile number must be numeric")
      .required("Mobile number is required"),
    designation: Yup.string().required("Designation is required"),
    gender: Yup.string().required("Gender is required"),
    course: Yup.array()
      .min(1, "At least one course is required")
      .required("Course is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      if (values.image) {
        formData.append("image", values.image);
      }
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("mobileNumber", values.mobileNumber);
      formData.append("designation", values.designation);
      formData.append("gender", values.gender);
      formData.append("course", values.course.join(", "));

      const response = await dispatch(
        editEmployee({ id, updatedEmployee: formData })
      ).unwrap();

      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success("Employee updated successfully!");
        navigate("/employeeList");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "An error occurred.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!employee) return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <Card color="transparent" className="p-10 border" shadow={true}>
        <Typography variant="h4" color="blue-gray">
          Edit Employee
        </Typography>
        <Formik
          enableReinitialize={true}
          initialValues={{
            image: "",
            name: employee.name || "",
            email: employee.email || "",
            mobileNumber: employee.mobileNumber || "",
            designation: employee.designation || "",
            gender: employee.gender || "",
            course: employee.course ? employee.course.split(", ") : [],
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-4">
                <Field name="image">
                  {({ field }) => (
                    <>
                      <Input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={(event) =>
                          setFieldValue("image", event.currentTarget.files[0])
                        }
                      />
                      <span>
                        <img
                          src={`${baseUrl}/${employee.image}`}
                          alt={employee.name}
                          className="h-10"
                        />
                      </span>
                    </>
                  )}
                </Field>
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <Field as={Input} name="name" type="text" label="Name" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <Field as={Input} name="email" type="email" label="Email" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <Field
                  as={Input}
                  name="mobileNumber"
                  type="text"
                  label="Mobile Number"
                />
                <ErrorMessage
                  name="mobileNumber"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <Field as="select" name="designation" className="form-select">
                  <option value="" label="Select designation" />
                  <option value="HR" label="HR" />
                  <option value="Manager" label="Manager" />
                  <option value="Sales" label="Sales" />
                </Field>
                <ErrorMessage
                  name="designation"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label>Gender</label>
                <div role="group" className="flex gap-4">
                  <label>
                    <Field type="radio" name="gender" value="MALE" />M
                  </label>
                  <label>
                    <Field type="radio" name="gender" value="FEMALE" />F
                  </label>
                </div>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label>Course</label>
                <div role="group" className="flex flex-wrap gap-4">
                  <label>
                    <Field type="checkbox" name="course" value="MCA" />
                    MCA
                  </label>
                  <label>
                    <Field type="checkbox" name="course" value="BCA" />
                    BCA
                  </label>
                  <label>
                    <Field type="checkbox" name="course" value="BSC" />
                    BSC
                  </label>
                </div>
                <ErrorMessage
                  name="course"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <Button type="submit" disabled={isSubmitting} className="mt-6">
                {isSubmitting ? "Submitting..." : "Update Employee"}
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default EditEmployee;
