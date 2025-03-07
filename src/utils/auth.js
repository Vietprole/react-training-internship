import * as v from "valibot";

const emailSchema = v.pipe(
  v.string("Email must be a string"),
  v.nonEmpty("Email must not be empty"),
  v.email("Please enter a valid email address")
);

const passwordSchemaForSignup = v.pipe(
  v.string("Password must be a string"),
  v.minLength(8, "Password must be at least 8 characters long"),
  v.regex(
    /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/,
    "Password must contain at least 1 number, 1 special character, and 1 uppercase letter"
  )
);

const passwordSchemaForLogin = v.pipe(
  v.string("Password must be a string"),
  v.nonEmpty("Password must not be empty")
);

// Validate the form fields, set errors for display if any
const validate = ({ formData, isLoginMode, setErrors }) => {
  let result = false;
  const passwordSchemaInUse = isLoginMode
    ? passwordSchemaForLogin
    : passwordSchemaForSignup;

  const emailResult = v.safeParse(emailSchema, formData.email);
  const passwordResult = v.safeParse(passwordSchemaInUse, formData.password);

  if (emailResult.success) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: "",
    }));
    result = true;
  } else {
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: emailResult.issues[0].message,
    }));
  }

  if (passwordResult.success) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: "",
    }));
  } else {
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: passwordResult.issues[0].message,
    }));
    result = false;
  }
  return result;
};

export { validate };
