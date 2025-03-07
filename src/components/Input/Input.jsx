import styles from "./Input.module.css";
import propTypes from "prop-types";

function Input({ type, placeholder, name, value, onChange }) {
  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}

Input.propTypes = {
  type: propTypes.string,
  placeholder: propTypes.string,
  name: propTypes.string,
  value: propTypes.string,
  onChange: propTypes.func,
};

export default Input;
