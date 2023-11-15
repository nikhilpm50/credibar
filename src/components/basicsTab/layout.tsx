import styles from "./basics.module.css";
import "@fontsource/plus-jakarta-sans";
import { useForm, Controller } from "react-hook-form";
import React, { useState } from "react";
import Image from "next/image";
import show from "../../assets/show.png";
import { Console } from "console";

interface Props {
  setCompleted: (completed: boolean) => void;
  handleNexTab: () => void;
}

export default function BasicsTab({ setCompleted, handleNexTab }: Props) {
  const { control, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState([])

  const togglePassword =()=>{
     setShowPassword(!showPassword);
  }
  const toggleConfirmPassword =()=>{
    setShowConfirmPassword(!showConfirmPassword);
 }


  const onSubmit = async (data: any) => {
    try {
      const postData = {
        first_name: data.firstname,
        last_name: data.lastname,
        email: data.email,
        mobile: '+91'+data.number,
        password: data.password,
      };

      const requestOptions: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(postData),
      };

      const response = await fetch("https://credibar-api-dev.e8demo.com/api/user/v1/signup-basic/", requestOptions);

      if (response.ok) {
        const responseData = await response.json(); 
        console.log(responseData);
        setCompleted(true);
        handleNexTab();
        const documentsUrl = 'url'
        localStorage.setItem(documentsUrl, JSON.stringify(responseData));
      } else {
        const responseData = await response.json(); 
        console.log(responseData.errors);
        setErrorMsg(responseData.errors);
        console.error(
          "API request failed:",
          response.status,
          response.statusText
        );
        console.log(JSON.stringify(postData));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className={styles.form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="firstname">First Name</label>
            <Controller
              name="firstname"
              control={control}
              render={({ field }) => <input {...field} type="text" />}
            />
          </div>
          <div>
            <label htmlFor="lastname">Last Name</label>
            <Controller
              name="lastname"
              control={control}
              render={({ field }) => <input {...field} type="text" />}
            />
          </div>
          <div>
            <label htmlFor="email">Email address</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <input {...field} type="text" />}
            />
          </div>
          <div>
            <label htmlFor="number">Mobile Number</label>
            <Controller
              name="number"
              control={control}
              render={({ field }) => <input {...field} type="number" />}
            />
          </div>
          <div style={{ position: "relative" }}>
            <label htmlFor="password">Password</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => <input {...field} type={showPassword ? 'text' : 'password'} />}
            />
            <Image className={styles.showPassword} src={show} alt="show" onClick={togglePassword} />
          </div>
          <div style={{ position: "relative" }} >
            <label htmlFor="confirmpassword">Confirm Password</label>
            <Controller
              name="confirmpassword"
              control={control}
              render={({ field }) => <input {...field} type={showConfirmPassword ? 'text' : 'password'} />}
            />
            <Image className={styles.showPassword} src={show} alt="show" onClick={togglePassword} />
          </div>
          <p className={styles.passInfo}>
            *At least 8 characters, at least 1 upper case and 1 lower case
            character and numbers.
          </p>
          <button className={styles.continueBtn} type="submit" onClick={()=>console.log(errorMsg)}>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
