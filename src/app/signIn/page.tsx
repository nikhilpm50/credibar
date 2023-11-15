"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import styles from "../signIn/signin.module.css";
import logo from "../../assets/logo.png";
import Image from "next/image";
import googleLogo from "../../assets/googleLogo.png";
import linkedin from "../../assets/linkLogo.png";
import "@fontsource/plus-jakarta-sans";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const { control, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const postData = {
        email: data.email,
        password: data.password,
      };

      const response = await fetch(
        "https://credibar-api-dev.e8demo.com/api/user/v1/sign_in/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (response.ok) {
        const responseData = await response.json(); 
        console.log(responseData);
        if(responseData.result != 'failure'){
        console.log(responseData + 'success');
        console.log('');
        router.push("/verify");
        localStorage.setItem('signinVerify', JSON.stringify(responseData));
        }
      } else {
        console.error(postData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Image
            className={styles.logo}
            src={logo}
            alt="logo"
            width={180}
            height={50}
          />
          <div className={styles.title}>
            <h2>Welcome back !</h2>
            <p>Please enter your details to login</p>
          </div>
          <div className={styles.form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="email">Email address:</label>
              <br />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} type="text" />}
              />
              <br />
              <label htmlFor="password">Password:</label>
              <br />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} type="password" />}
              />
              <br />

              <div className={styles.loginHelp}>
                <div className={styles.remDiv}>
                  <p>Remember me</p>
                </div>
                <div className={styles.forgot}>
                  <p>Forgot Password</p>
                  <p id={styles.reset}>Reset Password</p>
                </div>
              </div>
              <div className={styles.loginClick}>
                <button className={styles.button} type="submit">
                  Login
                </button>

                <p>Or continue with</p>
              </div>
            </form>
          </div>
          <div className={styles.buttonGroup}>
            <button>
              <Image src={googleLogo} alt="google logo" />
              Login with Google
            </button>
            <button>
              <Image src={linkedin} alt="google logo" />
              Login with Linkedin
            </button>
          </div>
          <div className={styles.registerSec}>
            <p className={styles.accountText}>
              Don&apos;t have an account ?
              <Link href="register">
                <span className={styles.regButton}>Register Now</span>
              </Link>
            </p>
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
