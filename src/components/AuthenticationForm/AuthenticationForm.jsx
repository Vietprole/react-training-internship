import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router";
import { validate } from "../../utils/auth";
import useAuth from "../../hooks/useAuth";
import authAPI from "../../services/api/auth";
import SubmitIcon from "/assets/submit-icon.svg";
import styles from "./AuthenticationForm.module.css";
import Button from "../Button/Button";
import Input from "../Input/Input";

function AuthenticationForm({ isLoginMode }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle changes to the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  async function handleSubmitButtonClick() {
    const result = validate({ formData, isLoginMode, setErrors });

    if (result) {
      setIsSubmitting(true);
      if (isLoginMode) {
        await login(formData);
      } else {
        const response = await authAPI.signup(formData);
        if (response.user) {
          navigate("/login");
        }
      }
      setIsSubmitting(false);
    }
  }

  return (
    <form action="">
      <Input
        type="text"
        placeholder="Type your email"
        name="email"
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
      <Input
        type="password"
        placeholder="Type your password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <span
        className={`${styles.errorMessage} ${
          errors.password ? styles.visible : ""
        }`}
      >
        {errors.password}
      </span>
      <Button onClick={handleSubmitButtonClick} disabled={isSubmitting}>
        <img className={styles.submitIcon} src={SubmitIcon} alt="Submit icon" />
        {isLoginMode ? "Sign in note.me" : "Sign up"}
      </Button>
    </form>
  );
}

AuthenticationForm.propTypes = {
  isLoginMode: PropTypes.bool.isRequired,
};

export default AuthenticationForm;
