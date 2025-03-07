import styles from "./Button.module.css";
import propTypes from "prop-types";

function Button({ variant = "primary", onClick, disabled, children }) {
  return (
    <button
      className={`${styles.submitButton} ${styles[variant]}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: propTypes.oneOf(["primary", "secondary"]),
  onClick: propTypes.func,
  disabled: propTypes.bool,
  children: propTypes.node,
};

export default Button;
