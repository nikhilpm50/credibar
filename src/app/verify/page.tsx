'use client'
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import styles from "./verify.module.css";
import logo from "../../assets/logo.png";
import Image from "next/image";
import "@fontsource/plus-jakarta-sans";
import { useRouter } from "next/navigation";

export default function VerifyMobile() {
  const { control, handleSubmit } = useForm();
  const router = useRouter();
  const [verifyUrl, setVerifyUrl] = useState('');
  

  useEffect(() => {
    const storedData = localStorage.getItem("signinVerify");

    if (storedData) {
      const responseData = JSON.parse(storedData);
      const verificationUrl = responseData.verification_url;
      console.log(verificationUrl)
      setVerifyUrl(verificationUrl);
    } else {
      console.log("Data not found in localStorage.");
    }
  }, []);


  const onSubmit = async (data: any) => {
    const otp = data.otp1 + data.otp2 + data.otp3 + data.otp4;
    try {
      const response = await fetch(`${verifyUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        router.push('/companySelection')
        localStorage.removeItem('signinVerify')
      } else {
        // Handle any errors from the API
        console.error("Failed to submit the form");
      }
    } catch (error) {
      // Handle any network or other errors
      console.error("Error occurred while submitting the form", error);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Image className={styles.logo} src={logo} alt="logo" width={180} height={50} />
        </div>
        <div className={styles.body}>
          <h2>Verify your mobile number</h2>
          <p>
            We will be sending you a One-Time Password (OTP) on your registered mobile number or email ID. Enter the OTP to login.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.otpInput}>
              <Controller
                name="otp1"
                control={control}
                defaultValue=""
                render={({ field }) => <input type="tel"  {...field} />}
              />
              <Controller
                name="otp2"
                control={control}
                defaultValue=""
                render={({ field }) => <input type="tel"  {...field} />}
              />
              <Controller
                name="otp3"
                control={control}
                defaultValue=""
                render={({ field }) => <input type="tel"  {...field} />}
              />
              <Controller
                name="otp4"
                control={control}
                defaultValue=""
                render={({ field }) => <input type="tel"  {...field} />}
              />
            </div>
            <div>
              <p id={styles.otpText}>
                Didn&apos;t receive OTP.
                <span className={styles.resend}> Click to Resend</span>
              </p>
            </div>
            <button type="submit" className={styles.verifybtn}>
              Verify
            </button>
          </form>
        </div>
        <div className={styles.footer}>
          <p>Privacy policies | Terms and conditions</p>
          <p>© 2023 Credibar Ltd</p>
        </div>
      </div>
    </div>
  );
}
