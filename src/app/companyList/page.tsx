"use client";
import Navbar from "@/components/navbar/layout";
import styles from "./companyList.module.css";
import "@fontsource/plus-jakarta-sans";
import Footer from "@/components/footer/layout";
import Image from "next/image";
import placeholder from "../../assets/placeholder.png";
import tickCircle from "../../assets/tick-circle.png";
import cd from "../../assets/cd.png";
import { useState } from "react";
import arrowUp from "../../assets/arrow-up.png";
import arrowDown from "../../assets/arrow-down.png";
import profileCircle from "../../assets/profile-circle.png";
import linkCircle from "../../assets/link-circle.png";
import flag from "../../assets/flag-2.png";
import notFound from "../../assets/not-found-img.png";
import searchIcon from "../../assets/search.png";
import Link from "next/link";

export default function CompanyList() {
  const cardDetails = [
    {
      name: "Al Seer Trading Co",
      claim: false,
    },
    {
      name: "Al Seer Trading Co",
      claim: true,
    },
    {
      name: "Al Seer Trading Co",
      claim: true,
    },
    {
      name: "Al Seer Trading Co",
      claim: true,
    },
    {
      name: "Al Seer Trading Co",
      claim: false,
    },
    {
      name: "Al Seer Trading Co",
      claim: true,
    },
    {
      name: "Al Seer Trading Co",
      claim: true,
    },
    {
      name: "Al Seer Trading Co",
      claim: false,
    },
  ];

  const [collapseStates, setCollapseStates] = useState(
    Array(cardDetails.length).fill(true)
  );

  const handleCollapseToggle = (index: number) => {
    const newCollapseStates = [...collapseStates];
    newCollapseStates[index] = !newCollapseStates[index];
    setCollapseStates(newCollapseStates);
  };

  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.body}>
        <button>🡠</button>
        <div className={styles.head}>
          <h5>Link your profile to a company</h5>
          <p>
            Please choose your company from the below list or register your
            company.
          </p>
        </div>
        <div style={{ display: "flex" }}>
          <div className={styles.leftSection}>
            <div className={styles.searchDiv}>
              <p>Search company</p>
              <div style={{ position: "relative" }}>
                <input type="search" />
                <Image src={searchIcon} alt="" />
              </div>
            </div>
            <div className={styles.companyMain}>
              <div className={styles.companyList}>
                {cardDetails.map((data, idx) => (
                  <div
                    key={data.name}
                    className={
                      collapseStates[idx]
                        ? styles.companyCardCollapse
                        : styles.companyCard
                    }
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ display: "flex", gap: "15px" }}>
                        <div className={styles.circleAvatar}>
                          <Image
                            alt=""
                            src={placeholder}
                            width={35}
                            height={35}
                            style={{ borderRadius: "50%" }}
                          />
                        </div>
                        <div className={styles.companyHead}>
                          <h5>{data.name}</h5>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <div className={styles.tags}>
                              <Image alt="" src={tickCircle} />
                              <span>Active</span>
                            </div>
                            <div
                              className={
                                data.claim ? styles.claimedTag : styles.claimTag
                              }
                            >
                              <Image alt="" src={data.claim ? flag : cd} />
                              <span>
                                {data.claim ? "Claimed" : "Not Claimed"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.collapse}>
                        <Image
                          onClick={() => handleCollapseToggle(idx)}
                          key={idx}
                          alt=""
                          src={collapseStates[idx] ? arrowDown : arrowUp}
                        />
                      </div>
                    </div>
                    <div className={styles.hrLine}></div>
                    <div className={styles.addressBox}>
                      <div>
                        <h5>Registered Address</h5>
                        <p>Concord Tower </p>{" "}
                        <p> Al Sufouh, United Arab Emirates</p>
                        <p>Dubai</p>
                      </div>
                      <div>
                        <h5>Commercial Reg.No</h5>
                        <p>64478</p>
                      </div>
                      <div>
                        <h5>P.O. Box</h5>
                        <p>3123</p>
                      </div>
                    </div>
                    <div className={styles.buttonGroup}>
                      <div className={styles.imageBorder}>
                        <Image alt="" src={profileCircle} />
                      </div>
                      <div className={styles.imageBorder}>
                        <Image alt="" src={linkCircle} />
                      </div>
                      {data.claim ? (
                        ""
                      ) : (
                        <Link href="/claim">
                          <button id={styles.claimBtn}>Claim</button>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.rightSection}>
            <Image alt="" src={notFound} />
            <h5>Can’t find your business</h5>
            <p>No problem, Request for a new registration</p>
            <Link href="/companyRegistration">
              <button>Register a new company</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
