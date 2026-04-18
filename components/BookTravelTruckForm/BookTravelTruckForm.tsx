"use client";

import { Formik, Field, ErrorMessage, Form, FormikHelpers } from "formik";
import * as Yup from "yup";

import css from "./BookTravelTruckForm.module.css";

import { CreateTravelTruckBooking } from "@/types/travelTruck";

const bookingInitialValues: CreateTravelTruckBooking = {
  username: "",
  email: "",
  bookingDate: "",
  comment: "",
};

const bookingSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  bookingDate: Yup.date()
    .nullable()
    .required("Date is required")
    .typeError("Please enter a valid date")
    .min(new Date(), "Date cannot be in the past"),
  comment: Yup.string(),
});

const handleSubmit = async () => {};

export default function BookTravelTruckForm() {
  return (
    <section className={css.bookFormContainer}>
      <h4 className={css.formTitle}>Book your campervan now</h4>
      <h5 className={css.formText}>
        Stay connected! We are always ready to help you.
      </h5>
      <Formik
        initialValues={bookingInitialValues}
        validationSchema={bookingSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <Form className={css.formikForm}>
            <div>
              <Field
                className={css.formFields}
                type="text"
                name="username"
                placeholder="Name*"
              />
              <ErrorMessage
                name="username"
                component="p"
                className={css.error}
              />
            </div>
            <div>
              <Field
                className={css.formFields}
                type="text"
                name="email"
                placeholder="Email"
              />
              <ErrorMessage name="email" component="p" className={css.error} />
            </div>
            <div>
              <Field
                className={css.formFields}
                as="select"
                type="text"
                name="bookingDate"
              >
                <option value="">Booking date*</option>
              </Field>
              <ErrorMessage
                name="bookingDate"
                component="p"
                className={css.error}
              />
            </div>
            <div>
              <Field
                className={css.formFields}
                as="textarea"
                type="text"
                name="comment"
                placeholder="Comment"
              />
              <ErrorMessage
                name="comment"
                component="p"
                className={css.error}
              />
            </div>
            <button
              className={css.sendBtn}
              type="submit"
              disabled={!formikProps.isValid || formikProps.isSubmitting}
            >
              {formikProps.isSubmitting ? "Sending..." : "Send"}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}
