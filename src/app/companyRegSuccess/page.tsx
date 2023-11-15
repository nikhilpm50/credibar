'use client'
import Navbar from '@/components/navbar/layout';
import styles from './companyRegSuccess.module.css';
import Footer from '@/components/footer/layout';
import "@fontsource/plus-jakarta-sans";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import success from '../../assets/claim-success.png'
import Link from 'next/link';

export default function CompanyRegistrationSuccess(){
    const router = useRouter();
    
    return(
        <div className={styles.main}>
            <Navbar />
            <div className={styles.body}>
            <button onClick={() => router.push("/claim")}>🡠</button>
                <div className={styles.successText}>
                    <Image alt='' src={success} className={styles.successImage} />
                    <h5>Your profile and company linking in process</h5>
                    <p>Your Profile and Company linking should be activated by an administrator.<br/> You will be notified via email once your account is verified.</p>
                </div>
 
                <div className={styles.trackBtn}>
                    <Link href='/signIn'>
                    <button>Back to Login</button>
                    </Link>
                </div>
 
            </div>
            <Footer />
        </div>
    )
}