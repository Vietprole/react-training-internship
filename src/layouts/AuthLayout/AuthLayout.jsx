import { Outlet } from "react-router";
import ManImage from "/assets/man-image.svg";
import styles from "./AuthLayout.module.css";

function AuthLayout() {
  return (
    <div className={styles.container}>
      <div className={styles.introduction}>
        <img className={styles.manImage} src={ManImage} alt="Man image" />
        <h1>Keep life simple</h1>
        <p>
          Store all your notes in a simple and intuitive app that helps you enjoy
          what is most important in life.
        </p>
      </div>
      <Outlet />
    </div>
  );
}

export default AuthLayout;
