"use client";

import css from "./RentalForm.module.css";

import { bookCar } from "@/app/lib/api/cars";
import { useMutation } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { RentalFormValues } from "@/types/form";

const RentalFormSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Za-zА-Яа-яЇїІіЄєҐґ\s'-]+$/, "Name must contain only letters")
    .min(2, "Name is too short")
    .required("Please enter your name"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  comment: Yup.string().required("Comment is required"),
});

function RentalForm({ carId }: { carId: string }) {
  const mutation = useMutation({
    mutationFn: (values: RentalFormValues) => bookCar(carId, values),
  });

  return (
    <Formik<RentalFormValues>
      initialValues={{ name: "", email: "", comment: "" }}
      validationSchema={RentalFormSchema}
      onSubmit={async (values, { resetForm, setSubmitting }) => {
        const iziToast = (await import("izitoast")).default;
        try {
          await mutation.mutateAsync(values);
          iziToast.success({
            title: "Ok!",
            message: "We've sent your booking request!",
          });
          resetForm();
        } catch {
          iziToast.error({ title: "Oh, no!", message: "Something went wrong" });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className={css.form}>
          <div className={css.field}>
            <Field
              id="name"
              name="name"
              placeholder=" "
              className={
                errors.name && touched.name ? css.inputError : css.input
              }
            />
            <label htmlFor="name" className={css.floatingLabel}>
              Name*
            </label>
            <ErrorMessage name="name" component="p" className={css.errorText} />
          </div>

          <div className={css.field}>
            <Field
              id="email"
              name="email"
              placeholder=" "
              className={
                errors.email && touched.email ? css.inputError : css.input
              }
            />
            <label htmlFor="email">Email*</label>
            <ErrorMessage
              name="email"
              component="p"
              className={css.errorText}
            />
          </div>

          <div className={css.field}>
            <Field
              as="textarea"
              name="comment"
              placeholder="Comment*"
              className={
                errors.comment && touched.comment ? css.inputError : css.input
              }
            />
            <ErrorMessage
              name="comment"
              component="p"
              className={css.errorText}
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default RentalForm;
