import styles from "./licenseTab.module.css";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import cloud from "../../assets/cloudLogo.png";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

type MyData = {
  records: {
    id: number;
    name: string;
  }[];
};

interface Props {
  setCompleted: (completed: boolean) => void;
  handleNexTab: () => void;
}

export default function LicenseTab({ setCompleted, handleNexTab }: Props) {
  const { handleSubmit, control } = useForm();
  const router = useRouter();
  const [tradeLicense, setTradeLicense] = useState<File | null>(null);
  const [vatCert, setVatCert] = useState<File | null>(null);
  const [shNatID, setShNatID] = useState<File | null>(null);
  const [countryData, setCountryData] = useState<MyData>({ records: [] });

  const handleImageUploadTradeLicense = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (
        file.size <= 2 * 1024 * 1024 &&
        (file.type === "image/jpeg" || file.type === "image/png")
      ) {
        setTradeLicense(file);
      } else {
        alert("Please select a JPEG or PNG image under 2MB");
      }
    }
  };

  const handleImageUploadVatCertificate = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (
        file.size <= 2 * 1024 * 1024 &&
        (file.type === "image/jpeg" || file.type === "image/png")
      ) {
        setVatCert(file);
      } else {
        alert("Please select a JPEG or PNG image under 2MB");
      }
    }
  };

  const handleImageUploadShNatId = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (
        file.size <= 2 * 1024 * 1024 &&
        (file.type === "image/jpeg" || file.type === "image/png")
      ) {
        setShNatID(file);
      } else {
        alert("Please select a JPEG or PNG image under 2MB");
      }
    }
  };

  const handleClearTradeLicense = () => {
    setTradeLicense(null);
  };

  const handleClearVat = () => {
    setVatCert(null);
  };

  const handleClearNatID = () => {
    setShNatID(null);
  };

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();

      // Append string data
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      // Append file data
      if (tradeLicense) {
        formData.append("tradeLicense", tradeLicense);
      }

      if (vatCert) {
        formData.append("vatCertificate", vatCert);
      }

      if (shNatID) {
        formData.append("shNatID", shNatID);
      }

      const requestOptions: RequestInit = {
        method: "POST",
        body: formData,
      };

      const response = await fetch("", requestOptions);

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        router.push("/claimSuccess");
      } else {
        const responseData = await response.json();
        console.error(
          "API request failed:",
          response.status,
          response.statusText
        );
        console.log(JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.body}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          <div className={styles.inputDiv}>
            <label htmlFor="business_type">
              Business Type<span style={{ color: "red" }}>*</span>
            </label>
            <Controller
              name="business_type"
              control={control}
              render={({ field }) => <input {...field} type="text" />}
            />
          </div>

          <div className={styles.inputDiv}>
            <label htmlFor="establishment_type">
              Establishment Type<span style={{ color: "red" }}>*</span>
            </label>
            <Controller
              name="establishment_type"
              control={control}
              render={({ field }) => <input {...field} type="text" />}
            />
          </div>

          <div className={styles.inputDiv}>
            <label htmlFor="license_type">
              License Type<span style={{ color: "red" }}>*</span>
            </label>
            <Controller
              name="license_type"
              control={control}
              render={({ field }) => <input {...field} type="text" />}
            />
          </div>

          <div className={styles.inputDiv}>
            <label htmlFor="license_expiry_date">
              License Expiry Date<span style={{ color: "red" }}>*</span>
            </label>
            <Controller
              name="license_expiry_date"
              control={control}
              render={({ field }) => <input {...field} type="date" />}
            />
          </div>
          <div className={styles.inputDiv}>
            <label htmlFor="registration_country">
              Registration Country<span style={{ color: "red" }}>*</span>
            </label>
            <Controller
              name="registration_country"
              control={control}
              render={({ field }) => (
                <select {...field}>
                  {" "}
                  <option>Select Country</option>
                  {countryData.records.map((data) => (
                    <option value={data.id}>{data.name}</option>
                  ))}
                </select>
              )}
            />
          </div>
          <div className={styles.inputDiv}>
            <label htmlFor="registration_city">
              Registration City<span style={{ color: "red" }}>*</span>
            </label>
            <Controller
              name="registration_city"
              control={control}
              render={({ field }) => (
                <select {...field}>
                  {" "}
                  <option>Select City</option>
                  <option value={1}>Al qusais</option>
                </select>
              )}
            />
          </div>
          <div className={styles.inputDiv}>
            <label htmlFor="commercial_registration_number">
              Commercial Reg.No<span style={{ color: "red" }}>*</span>
            </label>
            <Controller
              name="commercial_registration_number"
              control={control}
              render={({ field }) => <input {...field} type="text" />}
            />
          </div>
          <div className={styles.inputDiv}>
            <label htmlFor="vat_certificate_number">
              VAT Certificate Number
            </label>
            <Controller
              name="vat_certificate_number"
              control={control}
              render={({ field }) => <input {...field} type="text" />}
            />
          </div>
          <div className={styles.inputDiv}>
            <label htmlFor="vat_certificate_expiry_date">
              VAT Certificate Expiry Date
            </label>
            <Controller
              name="vat_certificate_expiry_date"
              control={control}
              render={({ field }) => <input {...field} type="date" />}
            />
          </div>
        </div>
        <div className={styles.hrLine}></div>
        <div className={styles.uploadSec}>
          <h5 className={styles.uploadText}>Upload Documents</h5>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
            <div className={styles.passportSec}>
              <p>
                Trade License<span style={{ color: "red" }}>*</span>
              </p>
              <div className={styles.uploadCardMain}>
                <div className={styles.uploadCard}>
                  <Image src={cloud} alt="cloud upload" />
                  <input
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={handleImageUploadTradeLicense}
                    style={{ display: "none" }}
                    id="fileInputTrade"
                  />
                  <p id={styles.dragText}>
                    Drag & Drop your document here,
                    <br /> or{" "}
                    <span
                      style={{ color: "#0077B5", cursor: "pointer" }}
                      onClick={() => {
                        document.getElementById("fileInputTrade")?.click();
                      }}
                    >
                      Browse
                    </span>
                  </p>
                  <p id={styles.supportText}>Supports: JPEG, PNG (2MB)</p>
                </div>
                <div style={{ display: "flex", gap: "20px" }}>
                  {tradeLicense && (
                    <div className={styles.previewSec}>
                      <Image
                        alt="passport id"
                        src={URL.createObjectURL(tradeLicense)}
                        width={105}
                        height={105}
                      />
                      <div
                        id={styles.closeBtn}
                        onClick={handleClearTradeLicense}
                      >
                        <h5 style={{ cursor: "pointer" }}>✖</h5>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.passportSec}>
              <p>
                Trade License<span style={{ color: "red" }}>*</span>
              </p>
              <div className={styles.uploadCardMain}>
                <div className={styles.uploadCard}>
                  <Image src={cloud} alt="cloud upload" />
                  <input
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={handleImageUploadVatCertificate}
                    style={{ display: "none" }}
                    id="fileInputVat"
                  />
                  <p id={styles.dragText}>
                    Drag & Drop your document here,
                    <br /> or{" "}
                    <span
                      style={{ color: "#0077B5", cursor: "pointer" }}
                      onClick={() => {
                        document.getElementById("fileInputVat")?.click();
                      }}
                    >
                      Browse
                    </span>
                  </p>
                  <p id={styles.supportText}>Supports: JPEG, PNG (2MB)</p>
                </div>
                <div style={{ display: "flex", gap: "20px" }}>
                  {vatCert && (
                    <div className={styles.previewSec}>
                      <Image
                        alt="passport id"
                        src={URL.createObjectURL(vatCert)}
                        width={105}
                        height={105}
                      />
                      <div id={styles.closeBtn} onClick={handleClearVat}>
                        <h5 style={{ cursor: "pointer" }}>✖</h5>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.passportSec}>
              <p>
                Trade License<span style={{ color: "red" }}>*</span>
              </p>
              <div className={styles.uploadCardMain}>
                <div className={styles.uploadCard}>
                  <Image src={cloud} alt="cloud upload" />
                  <input
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={handleImageUploadShNatId}
                    style={{ display: "none" }}
                    id="fileInputNatId"
                  />
                  <p id={styles.dragText}>
                    Drag & Drop your document here,
                    <br /> or{" "}
                    <span
                      style={{ color: "#0077B5", cursor: "pointer" }}
                      onClick={() => {
                        document.getElementById("fileInputNatId")?.click();
                      }}
                    >
                      Browse
                    </span>
                  </p>
                  <p id={styles.supportText}>Supports: JPEG, PNG (2MB)</p>
                </div>
                <div style={{ display: "flex", gap: "20px" }}>
                  {shNatID && (
                    <div className={styles.previewSec}>
                      <Image
                        alt="passport id"
                        src={URL.createObjectURL(shNatID)}
                        width={105}
                        height={105}
                      />
                      <div id={styles.closeBtn} onClick={handleClearNatID}>
                        <h5 style={{ cursor: "pointer" }}>✖</h5>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.hrLine}></div>
            <div className={styles.continueBtn}>
              <button type="submit" id={styles.continBtn} onClick={()=>{handleNexTab(); setCompleted(true);}}>
                Continue
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
