import { useState, useEffect } from "react";
import styles from "./additionalBusiness.module.css";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import add from "../../assets/add.png";
import Link from "next/link";

type MyData = {
  records: {
    id: number;
    name: string;
  }[];
};

export default function AdditionalBusinessTab() {
  const { handleSubmit, control } = useForm();
  const [countryData, setCountryData] = useState<MyData>({ records: [] });

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await fetch(
          "https://credibar-api-dev.e8demo.com/api/user/v1/countries/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          let data: MyData = await response.json();
          console.log(data);
          setCountryData(data);
        } else {
          console.error("Failed to fetch countries");
        }
      } catch (error) {
        console.error("An error occurred while fetching countries", error);
      }
    };

    getCountries();
  }, []);

  return (
    <div className={styles.main}>
      <h5>Number of Employees</h5>

        <div className={styles.formDiv}>
          <div style={{width : '50%'}}>
            <label>Choose Country</label>
            <Controller
              name="country"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <select {...field}>
                  <option value="">Select Country</option>
                  {countryData.records.map((data: any) => (
                    <option key={data.id} value={data.id}>
                      {data.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>
          <div style={{width : '50%'}}>
            <label>Number of Employees</label>
            <Controller
              name="number_of_employees"
              control={control}
              defaultValue=""
              render={({ field }) => <input {...field} type="text" />}
            />
          </div>
          <div className={styles.addBox}>
            <Image alt="" src={add} width={32} height={32} />
          </div>
        </div>
        <div style={{display: "flex" , justifyContent: "flex-end"}}>
            <Link href='/companyRegSuccess'>
            <button id={styles.continueBtn}>Submit</button>
            </Link>
        </div>
    </div>
  );
}
