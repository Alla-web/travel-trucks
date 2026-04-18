"use client";

import {
  Formik,
  Field,
  useField,
  ErrorMessage,
  Form,
  FormikHelpers,
  useFormikContext,
} from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import css from "./BookTravelTruckForm.module.css";

import { CreateTravelTruckBooking } from "@/types/travelTruck";

const bookingInitialValues: CreateTravelTruckBooking = {
  username: "",
  email: "",
  bookingDate: null,
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

function DateField({ name }: any) {
  const [field, , helpers] = useField(name);
  const { setFieldValue } = useFormikContext();

  return (
    <DatePicker
      selected={field.value}
      onChange={(date: Date | null) => setFieldValue(name, date)}
      placeholderText="Booking date*"
      className={css.formFields}
      dateFormat="dd/MM/yyyy"
      formatWeekDay={(nameOfDay) => nameOfDay.slice(0, 3).toUpperCase()}
      calendarClassName={css.datePickerCalendar}
      popperClassName={css.datePickerPopper}
      popperPlacement="bottom-end"
    />
  );
}

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
              <DateField name="bookingDate" />
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
