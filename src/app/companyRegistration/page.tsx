'use client'
import Navbar from '@/components/navbar/layout';
import styles from './companyRegistration.module.css';
import Footer from '@/components/footer/layout';
import "@fontsource/plus-jakarta-sans";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import register from '../../assets/registerCom.png'
import doc from '../../assets/document-text.png'
import Link from 'next/link';


export default function CompanyRegistration(){
    const router = useRouter();
    
    return(
        <div className={styles.main}>
            <Navbar />
            <div className={styles.body}>
            <button onClick={() => router.push("/claim")}>🡠</button>
                <div className={styles.successText}>
                    <Image alt='' src={register} className={styles.regImage} />
                    <h5>Register a new company</h5>
                    <p>Please keep the below documents ready for a smoother company registration process.</p>
                </div>
                <div className={styles.hrLine}></div>
                <div className={styles.progressDiv} >
                    <div style={{display: 'flex', gap: '10px'}}>
                        <div className={styles.borderBox}>
                            <Image alt='' src={doc} width={24} height={24} />
                        </div>
                        <div className={styles.borderText}>
                            <h5>Trade License</h5>
                            <p>Your Company trade license</p>
                        </div>
                    </div>
 
                    <div style={{display: 'flex', gap: '10px'}}>
                        <div className={styles.borderBox}>
                            <Image alt='' src={doc} width={24} height={24} />
                        </div>
                        <div className={styles.borderText}>
                            <h5>VAT Certificate</h5>
                            <p>VAT Certification of the company</p>
                        </div>
                    </div>

                    <div style={{display: 'flex', gap: '10px'}}>
                        <div className={styles.borderBox} >
                            <Image alt='' src={doc} width={24} height={24} />
                        </div>
                        <div className={styles.borderText}>
                            <h5>Shareholder National ID</h5>
                            <p>National ID Proof</p>
                        </div>
                    </div>
                </div>
                <Link href='/registerCompany'>
                <div className={styles.trackBtn}>
                    <button>Proceed</button>
                </div>
                </Link>
            </div>
            <Footer />
        </div>
    )
}