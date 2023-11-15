import Image from "next/image";
import styles from "./navbar.module.css";
import logo from "../../assets/navLogo.png";
import list from "../../assets/listIcon.png";
import msg from "../../assets/message.png";
import notify from "../../assets/bellIcon.png";
import placeholder from "../../assets/placeholder.png";
import down from "../../assets/chevron-down.png";

export default function Navbar() {
  return (
    <div className={styles.main}>
      <div className={styles.contents}>
        <Image src={logo} alt="logo" width={168.3} height={46.2} />
        <div className={styles.navContents}>
          <Image alt="" src={list} />
          <Image alt="" src={msg} />
          <Image alt="" src={notify} />
          <div className={styles.profile}>
            <Image alt="" src={placeholder} width={42} height={42} style={{borderRadius: '50%'}} />
            <div className={styles.profileDetails}>
              <h5>Rayford M</h5>
              <p>rayfordm@credi.com</p>
            </div>
            <Image alt="" src={down} />
          </div>
        </div>
      </div>
    </div>
  );
}
