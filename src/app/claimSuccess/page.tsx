'use client'
import Navbar from '@/components/navbar/layout';
import styles from './claimSuccess.module.css';
import Footer from '@/components/footer/layout';
import "@fontsource/plus-jakarta-sans";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import success from '../../assets/claim-success.png'
import successTick from '../../assets/success.png'
import inProgress from '../../assets/inprogress.jpg'
import pending from '../../assets/pending.png'

export default function ClaimSuccess(){
    const router = useRouter();
    
    return(
        <div className={styles.main}>
            <Navbar />
            <div className={styles.body}>
            <button onClick={() => router.push("/claim")}>🡠</button>
                <div className={styles.successText}>
                    <Image alt='' src={success} className={styles.successImage} />
                    <h5>Thank you for claiming !</h5>
                    <p>Your claiming process is undergoing verification. We will notify you once its completed.</p>
                </div>
                <div className={styles.hrLine}></div>
                <div className={styles.progressDiv} >
                    <div style={{display: 'flex', gap: '10px'}}>
                        <div className={styles.borderBox}>
                            <Image alt='' src={successTick} width={24} height={24} />
                        </div>
                        <div className={styles.borderText}>
                            <h5>Documents &Details</h5>
                            <p>23 May 2023, 12:20pm</p>
                        </div>
                    </div>
                    <div className={styles.progressBar}></div>
                    <div style={{display: 'flex', gap: '10px'}}>
                        <div className={styles.borderBox}>
                            <Image alt='' src={inProgress} width={24} height={24} />
                        </div>
                        <div className={styles.borderText}>
                            <h5>Verification Process</h5>
                            <p>25 May 2023, 12:20pm</p>
                        </div>
                    </div>
                    <div className={styles.progressBar}></div>
                    <div style={{display: 'flex', gap: '10px'}}>
                        <div className={styles.borderBox} >
                            <Image alt='' src={pending} width={24} height={24} />
                        </div>
                        <div className={styles.borderText}>
                            <h5>Request Approved</h5>
                            <p>Pending</p>
                        </div>
                    </div>
                </div>
                <div className={styles.trackBtn}>
                    <button>Track your request</button>
                </div>
 
            </div>
            <Footer />
        </div>
    )
}