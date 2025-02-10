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
        <img className={styles.manImage}src={ManImage} alt="Man image" />
        <h1>Keep life simple</h1>
        <p>
          Store all your notes in a simple and intuitive app that helps you
          enjoy what is most important in life.
        </p>
      </div>
      <div className={styles.rightSection}>
        <div>
          <Logo src={LogoIcon}/>
          <img src={AppNameIcon} alt="App name icon" />
        </div>
        <input type="text" />
        <input type="password" />
        <button type="submit">
          <img src={SubmitIcon} alt="Submit icon" />
          Sign in note.me
        </button>
        <div>or sign up here</div>
        <button type="button">
          <img src={SignUpIcon} alt="Sign up icon" />
          Sign in note.me
        </button>
      </div>
    </div>
  );
}

export default Login;
