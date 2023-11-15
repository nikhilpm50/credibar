"use client";

import styles from "./register.module.css";
import logo from "../../assets/navLogo.png";
import Image from "next/image";
import "@fontsource/plus-jakarta-sans";
import { useState } from "react";
import BasicsTab from "@/components/basicsTab/layout";
import DocumentsTab from "@/components/documentsTab/layout";
import AdditionalTab from "@/components/additionalTab/layout";

export default function Register() {
  const [completed, setCompleted] = useState(true);
  const [secCompleted, setSecCompleted] = useState(false);
  const [thirdCompleted, setThirdCompleted] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);

  const handleNextTab = () => {
    setCurrentTab(currentTab + 1);
  };

  const handlePreviousTab = () => {
    setCurrentTab(currentTab - 1);
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
      <div className={styles.backBtn} onClick={()=>{handlePreviousTab(); handleprogressSkip();}}>
        <button disabled={currentTab === 0}>🡠</button>
      </div>
      <div className={styles.container}>
        <div className={styles.header}>
          <Image
            className={styles.logo}
            src={logo}
            alt="logo"
            width={201}
            height={55}
          />

          <div className={styles.headText}>
            <h2>Create an account</h2>
            <p>Enter basic details below to start a new account.</p>
          </div>
          <div className={styles.progress}>
            <div className={styles.progressContent}>
              <div className={styles.stageDiv}>
                <p>STEP</p>
                <p>{currentTab === 0 ? "1" : currentTab === 1 ? "2" : "3"}</p>
              </div>
              <div className={styles.progressHead}>
                <h5>
                  {currentTab === 0
                    ? "Basic Information"
                    : currentTab === 1
                    ? "Documents Details"
                    : "Additional Information"}
                </h5>
                <p>
                  {currentTab === 0
                    ? "Please provide your basic information"
                    : currentTab === 1
                    ? "Upload all the required documents copies."
                    : "We need some more additional details to complete registration."}
                </p>
              </div>
            </div>
            <div className={styles.progressBarDiv}>
              <div
                className={
                  completed ? styles.progressBarActive : styles.progressBar
                }
              ></div>
              <div
                className={
                  secCompleted ? styles.progressBarActive : styles.progressBar
                }
              ></div>
              <div
                className={
                  thirdCompleted ? styles.progressBarActive : styles.progressBar
                }
              ></div>
            </div>
          </div>
          <div className={styles.tabs}>
            {currentTab === 0 && (
              <BasicsTab
                setCompleted={setSecCompleted}
                handleNexTab={handleNextTab}
              />
            )}
            {currentTab === 1 && (
              <DocumentsTab
                setCompleted={setThirdCompleted}
                handleNexTab={handleNextTab}
              />
            )}
            {currentTab === 2 && <AdditionalTab />}
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
