import { useState, ChangeEvent } from "react";
import styles from "./basicBusiness.module.css";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import cloud from "../../assets/cloudLogo.png";

interface Props {
    setCompleted: (completed: boolean) => void;
    handleNexTab: () => void;
  }

export default function BasicBusinessRegTab({ setCompleted, handleNexTab }: Props) {
  const { handleSubmit, control } = useForm();
  const [companyLogoUpload, setCompanyLogoUpload] = useState<File | null>(null);

  const handleCompanyLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (
        file.size <= 2 * 1024 * 1024 &&
        (file.type === "image/jpeg" || file.type === "image/png")
      ) {
        setCompanyLogoUpload(file);
      } else {
        alert("Please select a JPEG or PNG image under 2MB");
      }
    }
  };

  const handleClearCompanyLogo = () => {
    setCompanyLogoUpload(null);
  };

  return (
    <div className={styles.main}>
      <form>
        <div className={styles.radioDiv}>
          <label>Business Type</label>
          <div>
            <label>
              <Controller
                control={control}
                name="businessType"
                defaultValue=""
                render={({ field }) => <input type="radio" {...field} />}
              />
              Business
            </label>
            <label>
              <Controller
                control={control}
                name="businessType"
                defaultValue=""
                render={({ field }) => <input type="radio" {...field} />}
              />
              Collection Agent
            </label>
            <label>
              <Controller
                control={control}
                name="businessType"
                defaultValue=""
                render={({ field }) => <input type="radio" {...field} />}
              />
              Auditor
            </label>
          </div>
        </div>
        <div className={styles.inputSec}>
          <div className={styles.inputDiv}>
            <label htmlFor="company_name">Company Name</label>
            <Controller
              name="company_name"
              control={control}
              render={({ field }) => <input {...field} type="text" />}
            />
          </div>
          <div className={styles.inputDiv}>
            <label htmlFor="email">Email</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <input {...field} type="text" />}
            />
          </div>
          <div className={styles.inputDiv}>
            <label htmlFor="mobile">Mobile Number</label>
            <Controller
              name="mobile"
              control={control}
              render={({ field }) => <input {...field} type="text" />}
            />
          </div>
          <div className={styles.inputDiv}>
            <label htmlFor="website">Company Website</label>
            <Controller
              name="website"
              control={control}
              render={({ field }) => <input {...field} type="text" />}
            />
          </div>
          <div className={styles.selectDiv}>
            <label htmlFor="street">Street</label>
            <Controller
              name="street"
              control={control}
              render={({ field }) => (
                <select {...field}>
                  <option value={1}>Select or enter</option>
                </select>
              )}
            />
          </div>
          <div className={styles.selectDiv}>
            <label htmlFor="area">Area</label>
            <Controller
              name="area"
              control={control}
              render={({ field }) => (
                <select {...field}>
                  <option value={1}>Select or enter</option>
                </select>
              )}
            />
          </div>
          <div className={styles.selectDiv}>
            <label htmlFor="country">Country</label>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <select {...field}>
                  <option value={1}>Select or enter</option>
                </select>
              )}
            />
          </div>
          <div className={styles.uploadSec}>
            <p>Upload Company Logo</p>
            <div className={styles.uploadCardMain}>
              <div className={styles.uploadCard}>
                <Image src={cloud} alt="cloud upload" />
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  onChange={handleCompanyLogoUpload}
                  style={{ display: "none" }}
                  id="fileInputCompanyLogo"
                />
                <p id={styles.dragText}>
                  Drag & Drop your document here,
                  <br /> or{" "}
                  <span
                    style={{ color: "#0077B5", cursor: "pointer" }}
                    onClick={() => {
                      document.getElementById("fileInputCompanyLogo")?.click();
                    }}
                  >
                    Browse
                  </span>
                </p>
                <p id={styles.supportText}>Supports: JPEG, PNG (2MB)</p>
              </div>
              <div>
                {companyLogoUpload ? (
                  <div className={styles.previewSec}>
                    <Image
                      alt="passport id"
                      src={URL.createObjectURL(companyLogoUpload)}
                      width={105}
                      height={105}
                    />
                    <div
                      className={styles.closeBtn}
                      onClick={handleClearCompanyLogo}
                    >
                      <h5 style={{ cursor: "pointer" }}>✖</h5>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

        </div>
        <div className={styles.contactSec}>
            <h5>Contact Person</h5>
            <div style={{display: 'flex', width:'100%', gap: '10px'}}>
              <div className={styles.contactInputDiv}>
                <label htmlFor="contact_person_name">Contact Person Name</label>
                <Controller
                  name="contact_person_name"
                  control={control}
                  render={({ field }) => <input {...field} type="text" />}
                />
              </div>
              <div className={styles.contactInputDiv}>
                <label htmlFor="contact_person_number">Contact Number</label>
                <Controller
                  name="contact_person_number"
                  control={control}
                  render={({ field }) => <input {...field} type="text" />}
                />
              </div>
              <div className={styles.contactInputDiv}>
                <label htmlFor="contact_person_email">Email</label>
                <Controller
                  name="contact_person_email"
                  control={control}
                  render={({ field }) => <input {...field} type="text" />}
                />
              </div>
            </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <button id={styles.continueBtn} onClick={()=>{handleNexTab(); setCompleted(true);}}>Continue</button>
          </div>
      </form>
    </div>
  );
}
