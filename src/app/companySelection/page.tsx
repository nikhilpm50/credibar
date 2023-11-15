import styles from "./company.module.css";
import logo from "../../assets/logo.png";
import Image from "next/image";
import "@fontsource/plus-jakarta-sans";
import Alsalam from "../../assets/Alsalam.png";
import Algurair from "../../assets/Algurair.png";
import sayeed from "../../assets/sayeed.png";
import delmonte from "../../assets/delmonto.png";
import addbtn from "../../assets/addbtn.png";

export default function VerifyMobile() {
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

          <div className={styles.title}>
            <h2>Choose Company</h2>
            <p>Please select your preferred company</p>
          </div>
          <div className={styles.companyDiv}>
            <p className={styles.compSel}>Select one company</p>
            <div className={styles.companylist}>
              <div className={styles.companyName}>
                <div className={styles.compNameDiv}>
                  <Image src={delmonte} alt="company-logo" />
                  <p>Del Monte Foods (U.A.E) FZE</p>
                </div>
                <input type="radio" name="company" value="Amazon" />
              </div>
              <div className={styles.companyName}>
                <div className={styles.compNameDiv}>
                  <Image src={Algurair} alt="company-logo" />
                  <p>Al Ghurair</p>
                </div>
                <input type="radio" name="company" value="Amazon" />

              </div>
              <div className={styles.companyName}>
                <div className={styles.compNameDiv}>
                  <Image src={Alsalam} alt="company-logo" />
                  <p>Al Salam</p>
                </div>
                <input type="radio" name="company" value="Amazon" />
              </div>
              <div className={styles.companyName}>
                <div className={styles.compNameDiv}>
                  <Image src={sayeed} alt="company-logo" />
                  <p>Sayeed</p>
                </div>
                <input type="radio" name="company" value="Amazon" />
              </div>
              <div className={styles.companyName}>
                <div className={styles.addCompDiv}>
                  <div className={styles.addbtn}><p>+</p></div>
                  <p className={styles.addComp}>Add a new company</p>
                </div>
              </div>
            </div>
            <button className={styles.continuebtn}>Continue</button>
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
