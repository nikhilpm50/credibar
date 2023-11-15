import styles from "./document.module.css";
import cloud from "../../assets/cloudLogo.png";
import "@fontsource/plus-jakarta-sans";
import Image from "next/image";
import { ChangeEvent, useState, useEffect } from "react";

interface Props {
  setCompleted: (completed: boolean) => void;
  handleNexTab: () => void;
}

export default function DocumentsTab({ setCompleted, handleNexTab }: Props) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedBackImage, setSelectedBackImage] = useState<File | null>(null);
  const [passportImage, setPassportImage] = useState<File | null>(null);
  const [passportBackImage, setPassportBackImage] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState('');
  
  
  useEffect(() => {
    const documentsUrl = "url"; 

    const storedData = localStorage.getItem(documentsUrl);

    if (storedData) {
      const responseData = JSON.parse(storedData);
      const docUploadUrl = responseData.doc_upload_url;
      console.log(docUploadUrl)
      setUploadUrl(docUploadUrl);
    } else {
      console.log("Data not found in localStorage.");
    }
  }, []);

  const handleUpload = async() => {
    if (passportImage && selectedImage && selectedBackImage && passportBackImage) {
      const formData = new FormData();
      if (passportImage && passportBackImage) {
        formData.append("passport_front_page", passportImage, "passport_front.jpg");
        formData.append("passport_back_page", passportBackImage, "passport_back.jpg");
      }
      if (selectedImage && selectedBackImage) {
        formData.append("nationalid_front_page", selectedImage, "nationalid_front.jpg");
        formData.append("nationalid_back_page", selectedBackImage, "nationalid_back.jpg");
      }
      
      const requestOptions: RequestInit = {
        method: "POST",
        body: formData,
      };

      const response = await fetch(`${uploadUrl}`, requestOptions);


        if (response.ok) {
          const responseData = await response.json(); 
          console.log(responseData);
          setCompleted(true);
          handleNexTab();
          localStorage.setItem('additionalUrl', JSON.stringify(responseData));
        };
      
    } else {
      alert("Please upload all the required documents");
    }
  };

  const handleImageUploadPassport = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size <= 2 * 1024 * 1024 && (file.type === "image/jpeg" || file.type === "image/png")) {
        setPassportImage(file);
      } else {
        alert("Please select a JPEG or PNG image under 2MB");
      }
    }
  };

  const handleImageUploadPassportBack = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size <= 2 * 1024 * 1024 && (file.type === "image/jpeg" || file.type === "image/png")) {
        setPassportBackImage(file);
      } else {
        alert("Please select a JPEG or PNG image under 2MB");
      }
    }
  };

  const handleImageUploadNational = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size <= 2 * 1024 * 1024 && (file.type === "image/jpeg" || file.type === "image/png")) {
        setSelectedImage(file);
      } else {
        alert("Please select a JPEG or PNG image under 2MB");
      }
    }
  };

  const handleImageUploadNationalback = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size <= 2 * 1024 * 1024 && (file.type === "image/jpeg" || file.type === "image/png")) {
        setSelectedBackImage(file);
      } else {
        alert("Please select a JPEG or PNG image under 2MB");
      }
    }
  };

  const handleClearPassportFront = () => {
    setPassportImage(null);
  };

  const handleClearPassportBack = () => {
    setPassportBackImage(null);
  };


  return (
    <div>
      <div className={styles.passportSec}>
        <p>
          Passport Copy<span style={{ color: "red" }}>*</span>
        </p>
        <div className={styles.uploadCardMain}>
          <div className={styles.uploadCard}>
            <Image src={cloud} alt="cloud upload" />
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={passportImage ? handleImageUploadPassportBack : handleImageUploadPassport}
              style={{ display: "none" }}
              id="fileInputPassport"
            />
            <p id={styles.dragText}>
              Drag & Drop your document here,
              <br /> or{" "}
              <span
                style={{ color: "#0077B5", cursor: "pointer" }}
                onClick={() => {
                  document.getElementById("fileInputPassport")?.click();
                }}
              >
                Browse
              </span>
            </p>
            <p id={styles.supportText}>Supports: JPEG, PNG (2MB)</p>
          </div>
            <div style={{ display: "flex", gap: "20px" }}>
              {passportImage ?
              <div className={styles.previewSec}>
                <Image alt="passport id" src={URL.createObjectURL(passportImage)} width={105} height={105} />
                <div className={styles.closeBtn} onClick={handleClearPassportFront}>
                  <h5 style={{ cursor: "pointer" }}>✖</h5>
                </div>
              </div>:''}
              {passportBackImage ?
              <div className={styles.previewSec}>
                <Image alt="passport id" src={URL.createObjectURL(passportBackImage)} width={105} height={105} />
                <div className={styles.closeBtn} onClick={handleClearPassportBack}>
                  <h5 style={{ cursor: "pointer" }}>✖</h5>
                </div>
              </div>:''}
            </div>
        </div>
      </div>
      <div className={styles.natIdSec}>
        <p>
          National ID Copy<span style={{ color: "red" }}>*</span>
        </p>
        <div className={styles.uploadCardMain}>
          <div className={styles.uploadCard}>
            <Image src={cloud} alt="cloud upload" />
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={selectedImage ? handleImageUploadNationalback : handleImageUploadNational}
              style={{ display: "none" }}
              id="fileInputNatid"
            />
            <p id={styles.dragText}>
              Drag & Drop your document here,
              <br /> or{" "}
              <span
                style={{ color: "#0077B5", cursor: "pointer" }}
                onClick={() => {
                  document.getElementById("fileInputNatid")?.click();
                }}
              >
                Browse
              </span>
            </p>
            <p id={styles.supportText}>Supports: JPEG, PNG (2MB)</p>
          </div>
          {selectedImage ? (
            <div style={{ display: "flex", gap: "20px" }}>
              <div className={styles.previewSec}>
                <Image alt="national id" src={URL.createObjectURL(selectedImage)} width={105} height={105} />
                <div className={styles.closeBtn} onClick={() => setSelectedImage(null)}>
                  <h5>✖</h5>
                </div>
              </div>
              {selectedBackImage ?
              <div className={styles.previewSec}>
                <Image alt="national id" src={URL.createObjectURL(selectedBackImage)} width={105} height={105} />
                <div className={styles.closeBtn} onClick={() => setSelectedBackImage(null)}>
                  <h5>✖</h5>
                </div>
              </div>: ''}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <p className={styles.alertMsg}>
        *Ensure that the documents are readable, clear, well-lit, and not in black and white. Place documents against a solid-colored background.
      </p>
      <button className={styles.continueBtn} onClick={handleUpload}>
        Continue
      </button>
      <p className={styles.skipBtn} onClick={() => {
        setCompleted(true);
        handleNexTab();
      }}>
        Skip For Now
      </p>
    </div>
  );
}
