import AppNameIcon from "/assets/app-name-icon.svg";
import LogoIcon from "/assets/logo.svg";
import ManImage from "/assets/man-image.svg";
import SignUpIcon from "/assets/signup-icon.svg";
import SubmitIcon from "/assets/submit-icon.svg";
import Logo from "../../components/Logo/Logo";
import styles from "./Login.module.css";

function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <img className={styles.manImage} src={ManImage} alt="Man image" />
        <h1>Keep life simple</h1>
        <p>
          Store all your notes in a simple and intuitive app that helps you
          enjoy what is most important in life.
        </p>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.logoContainer}>
          <Logo src={LogoIcon} variant="large"/>
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
        <button className={styles.signInButton} type="submit">
          <img
            className={styles.submitIcon}
            src={SubmitIcon}
            alt="Submit icon"
          />
          Sign in note.me
        </button>
        <div className={styles.separator}>or sign up here</div>
        <button className={styles.signUpButton} type="button">
          <img
            className={styles.signUpIcon}
            src={SignUpIcon}
            alt="Sign up icon"
          />
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Login;
