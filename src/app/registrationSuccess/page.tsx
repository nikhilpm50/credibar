import styles from "./success.module.css";
import logo from "../../assets/logo.png";
import Image from "next/image";
import "@fontsource/plus-jakarta-sans";
import success from "../../assets/successImg.png";
import Link from "next/link";

export default function RegistrationSuccess() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Image
            className={styles.logo}
            src={logo}
            alt="logo"
            width={180}
            height={50}
          />
          <div className={styles.body}>
            <Image src={success} alt="success logo" className={styles.successLogo}  />
            <h2>
              Your account has been <br /> registered successfully !
            </h2>
            <p>
              Your account should be activated by an administrator.
              <br /> You will be notified via email once your account is
              verified.
            </p>
            <Link href="/signIn">
              <button>Back to login</button>
            </Link>
          </div>
        </div>

        <div className={styles.footer}>
          <p>Privacy policies | Terms and condition</p>
          <p>© 2023 Credibar Ltd</p>
        </div>
      </div>
    </div>
  );
}
