import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Links from "../../helpers/Links";

function Registration() {
  const initialValues = {
    username: "",
    password: "",
    usermail: "",
  };
  let history = useHistory();

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
    usermail: Yup.string().min(3).max(15).required(),
  });

  const onSubmit = (data) => {
    axios.post(Links.Auth, data).then(() => {
      alert("Successfully Registered");
      history.push("/login");

      console.log(data);
    });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. John123...)"
          />

          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autocomplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="Your Password..."
          />
          <label>Email: </label>
          <ErrorMessage name="usermail" component="span" />
          <Field
            autocomplete="off"
            type="text"
            id="inputCreatePost"
            name="usermail"
            placeholder="Your email..."
          />

          <button className="animation" type="submit">
            {" "}
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
