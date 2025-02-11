import AppNameIcon from "/assets/app-name-icon.svg";
import LogoIcon from "/assets/logo.svg";
import Logo from "../../components/Logo/Logo";
import styles from "./Signup.module.css";
import Form from "../../components/Form/Form";

function Signup() {
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
      <Form isLoginMode={false} />
    </div>
  );
}

export default Signup;
