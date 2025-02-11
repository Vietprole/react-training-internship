import styles from "./Form.module.css";
import SubmitIcon from "/assets/submit-icon.svg";
import * as v from 'valibot';

const FormSchema = v.object({
  username: v.pipe(
    v.string(),
    v.nonEmpty(),
    v.regex(/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]*$/)
  ),
  password: v.pipe(
    v.string(),
    v.minLength(8),
    v.regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/)
  )
})

function Form({isLoginMode}) {

  function handleSubmitButtonClick() {
    if (isLoginMode) {
      console.log("Sign in");
    }
    else {
      console.log("Sign up");
    }
  }

  return(
    <form action="">
    <input
      className={styles.username}
      type="text"
      placeholder="Type your username"
    />
    <input
      className={styles.password}
      type="password"
      placeholder="Type your password"
    />
    <button
      className={styles.submitButton}
      type="submit"
      onClick={handleSubmitButtonClick}
    >
      <img className={styles.submitIcon} src={SubmitIcon} alt="Submit icon" />
      {isLoginMode ? "Sign in note.me" : "Sign up"}
    </button>
  </form>
  )
}

export default Form;
