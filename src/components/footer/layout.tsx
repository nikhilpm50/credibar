import styles from './footer.module.css';

export default function Footer (){
    return(
        <div className={styles.main}>
            <div className={styles.leftSec}>
               <p>Home      </p>
               <p>About Us</p>
               <p>Careers</p>
               <p>Media Center</p>
               <p>Analytics</p>
               <p>Market News</p>
               <p>Contact</p>
            </div>
            <div className={styles.rightSec}>
               <p>© 2023 Credibar Ltd</p>
            </div>
        </div>
    )
}