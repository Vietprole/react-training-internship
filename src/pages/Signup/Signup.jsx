import { useNavigate } from "react-router";
import AppNameIcon from "/assets/app-name-icon.svg";
import LogoIcon from "/assets/logo.svg";
import SubmitIcon from "/assets/submit-icon.svg";
import Logo from "../../components/Logo/Logo";
import styles from "./Signup.module.css";

function Signup() {
  const navigate = useNavigate();

  function handleSignUpButtonClick() {
    navigate("/");
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
      <h2>Sign up</h2>
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
        className={styles.signUpButton}
        type="submit"
        onClick={handleSignUpButtonClick}
      >
        <img className={styles.submitIcon} src={SubmitIcon} alt="Submit icon" />
        Sign up
      </button>
    </div>
  );
}

export default Signup;
