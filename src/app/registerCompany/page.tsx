"use client";
import Navbar from "@/components/navbar/layout";
import styles from "./registerCompany.module.css";
import Footer from "@/components/footer/layout";
import { useRouter } from "next/navigation";
import "@fontsource/plus-jakarta-sans";
import { useState } from "react";
import BasicBusinessRegTab from "@/components/basicBusinessRegTab/layout";
import LicenseTab from "@/components/licenseTab/layout";
import Image from "next/image";
import complete from "../../assets/success.png";
import AdditionalBusinessTab from "@/components/additionalBusinessTab/layout";

export default function RegisterCompany() {
  const router = useRouter();
  const [completed, setCompleted] = useState(true);
  const [secCompleted, setSecCompleted] = useState(false);
  const [thirdCompleted, setThirdCompleted] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);

  const handleNextTab = () => {
    setCurrentTab(currentTab + 1);
  };

  const handlePreviousTab = () => {
    setCurrentTab(currentTab - 1);
    if (currentTab === 2) {
      setThirdCompleted(false);
    } else if (currentTab === 1) {
      setSecCompleted(false);
    } else {
      setCompleted(false);
    }
  };

  const handleprogressSkip = () => {
    if (currentTab === 2) {
      setThirdCompleted(false);
    } else if (currentTab === 1) {
      setSecCompleted(false);
    } else {
      setCompleted(false);
    }
  };

  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.body}>
        {currentTab === 0 ?
        <button onClick={() => router.push("/companyRegistration")}>🡠</button>:
        <button onClick={()=>{handlePreviousTab()}}>🡠</button>}
        <div className={styles.registerHead}>
          <h5>Register a New Company</h5>
          <p>Provide details to continue.</p>
        </div>
        <div className={styles.progress}>
          <div style={{ width: "32.6%" }}>
            <div className={styles.progressContent}>
              {secCompleted ? (
                <div className={styles.stageDiv}>
                  <Image alt="" src={complete} width={36} height={35} />
                </div>
              ) : (
                <div className={styles.stageDiv}>
                  <p>STEP</p>
                  <p>1</p>
                </div>
              )}
              <div className={styles.progressHead}>
                <h5>Business Address and Details</h5>
                <p>Please provide your basic information</p>
              </div>
            </div>

            <div
              className={
                completed ? styles.progressBarActive : styles.progressBar
              }
            ></div>
          </div>
          <div style={{ width: "32.6%" }}>
            <div className={styles.progressContent}>
            {thirdCompleted ? (
                <div className={styles.stageDiv}>
                  <Image alt="" src={complete} width={36} height={35} />
                </div>
              ) : (
                <div className={styles.stageDiv}>
                  <p>STEP</p>
                  <p>2</p>
                </div>
              )}
              <div className={styles.progressHead}>
                <h5>Licensing & Registration</h5>
                <p>Upload all the required documents copies.</p>
              </div>
            </div>
            <div
              className={
                secCompleted ? styles.progressBarActive : styles.progressBar
              }
            ></div>
          </div>
          <div style={{ width: "32.6%" }}>
            <div className={styles.progressContent}>
              <div className={styles.stageDiv}>
                <p>STEP</p>
                <p>3</p>
              </div>
              <div className={styles.progressHead}>
                <h5>Additional Information</h5>
                <p>some additional details to complete registration.</p>
              </div>
            </div>
            <div
              className={
                thirdCompleted ? styles.progressBarActive : styles.progressBar
              }
            ></div>
          </div>
        </div>

        <div className={styles.hrLine}></div>
        <div>
          {currentTab === 0 && (
            <BasicBusinessRegTab
              handleNexTab={handleNextTab}
              setCompleted={setSecCompleted}
            />
          )}
          {currentTab === 1 && (
            <LicenseTab
              handleNexTab={handleNextTab}
              setCompleted={setThirdCompleted}
            />
          )}
          {currentTab === 2 && <AdditionalBusinessTab />}
        </div>
      </div>
      <Footer />
    </div>
  );
}
