import styles from "./AuthenticationForm.module.css";
import SubmitIcon from "/assets/submit-icon.svg";
import * as v from "valibot";
import { useState } from "react";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";
import authAPI from "../../services/api/auth";
import { useNavigate } from "react-router";

const emailSchema = v.pipe(
  v.string("Email must be a string"),
  v.nonEmpty("Email must not be empty"),
  v.email("Please enter a valid email address")
);

const passwordSchema = v.pipe(
  v.string("Password must be a string"),
  v.minLength(8, "Password must be at least 8 characters long"),
  v.regex(
    /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/,
    "Password must contain at least 1 number, 1 special character, and 1 uppercase letter"
  )
);

function AuthenticationForm({ isLoginMode }) {
  const navigate = useNavigate();
  const auth = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (formData) => {
    let result = false;
    const emailResult = v.safeParse(emailSchema, formData.email);
    const passwordResult = v.safeParse(passwordSchema, formData.password);

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

  // Handle changes to the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  async function handleSubmitButtonClick() {
    const result = validate(formData);

    if (result) {
      setIsSubmitting(true);
      try {
        if (isLoginMode) {
          await auth.login(formData);
        } else {
          const response = await authAPI.signup(formData);
          if (response.user) {
            navigate("/");
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  return (
    <form action="">
      <input
        className={styles.email}
        type="text"
        placeholder="Type your email"
        name="email"
        // autoComplete="new-email"
        value={formData.email}
        onChange={handleChange}
      />
      <span
        className={`${styles.errorMessage} ${
          errors.email ? styles.visible : ""
        }`}
      >
        {errors.email}
      </span>
      <input
        className={styles.password}
        type="password"
        placeholder="Type your password"
        name="password"
        // autoComplete="new-password"
        value={formData.password}
        onChange={handleChange}
      />
      <span
        className={`${styles.errorMessage} ${
          errors.password && !isLoginMode ? styles.visible : ""
        }`}
      >
        {errors.password}
      </span>
      <button
        className={styles.submitButton}
        type="button"
        onClick={handleSubmitButtonClick}
        disabled={isSubmitting}
      >
        <img className={styles.submitIcon} src={SubmitIcon} alt="Submit icon" />
        {isLoginMode ? "Sign in note.me" : "Sign up"}
      </button>
    </form>
  );
}

AuthenticationForm.propTypes = {
  isLoginMode: PropTypes.bool.isRequired,
};

export default AuthenticationForm;
