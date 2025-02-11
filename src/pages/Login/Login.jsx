import { useNavigate } from "react-router";
import AppNameIcon from "/assets/app-name-icon.svg";
import LogoIcon from "/assets/logo.svg";
import SignUpIcon from "/assets/signup-icon.svg";
import SubmitIcon from "/assets/submit-icon.svg";
import Logo from "../../components/Logo/Logo";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();

  function handleSignInButtonClick() {
    navigate("/home");
  }

  function handleSignUpButtonClick() {
    navigate("/signup");
  }

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Logo src={LogoIcon} variant="large" />
        <img
          className={styles.appNameIcon}
          src={AppNameIcon}
          alt="App name icon"
        />
      </div>
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
        className={styles.signInButton}
        type="submit"
        onClick={handleSignInButtonClick}
      >
        <img className={styles.submitIcon} src={SubmitIcon} alt="Submit icon" />
        Sign in note.me
      </button>
      <div className={styles.separator}>or sign up here</div>
      <button
        className={styles.signUpButton}
        type="button"
        onClick={handleSignUpButtonClick}
      >
        <img
          className={styles.signUpIcon}
          src={SignUpIcon}
          alt="Sign up icon"
        />
        Sign up
      </button>
    </div>
  );
}

export default Login;
