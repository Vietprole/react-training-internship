import styles from "./AuthenticationForm.module.css";
import SubmitIcon from "/assets/submit-icon.svg";
import * as v from "valibot";
import { useState } from "react";
import PropTypes from "prop-types";

const usernameSchema = v.pipe(
  v.string("Username must be a string"),
  v.nonEmpty("Username must not be empty"),
  v.regex(
    /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]*$/,
    "Username must contain only letters, numbers, and special characters"
  )
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
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validate = (formData) => {
    let result = false;
    const usernameResult = v.safeParse(usernameSchema, formData.username);
    const passwordResult = v.safeParse(passwordSchema, formData.password);

    if (usernameResult.success) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "",
      }));
      result = true;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: usernameResult.issues[0].message,
      }));
    }

    if (passwordResult.success) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "",
      }));
    }
    else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: passwordResult.issues[0].message,
      }));
      result = false;
    }
    return result;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function handleSubmitButtonClick() {
    const result = validate(formData);
    if (result) {
      alert("AuthenticationForm submitted successfully");
    }
  }

  return (
    <form action="">
      <input
        className={styles.username}
        type="text"
        placeholder="Type your username"
        name="username"
        autoComplete="new-username"
        value={formData.username}
        onChange={handleChange}
      />
      {console.log("errors", errors)}
      <span
        className={`${styles.errorMessage} ${
          errors.username ? styles.visible : ""
        }`}
      >
        {errors.username}
      </span>
      <input
        className={styles.password}
        type="password"
        placeholder="Type your password"
        name="password"
        autoComplete="new-password"
        value={formData.password}
        onChange={handleChange}
      />
      <span
        className={`${styles.errorMessage} ${
          errors.password && isLoginMode ? styles.visible : ""
        }`}
      >
        {errors.password}
      </span>
      <button
        className={styles.submitButton}
        type="button"
        onClick={handleSubmitButtonClick}
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
