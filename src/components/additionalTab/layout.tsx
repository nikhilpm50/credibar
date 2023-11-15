import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import styles from "./additional.module.css";
import "@fontsource/plus-jakarta-sans";
import Link from "next/link";
import { useRouter } from "next/navigation";

type MyData = {
  records: {
    id: number; 
    name: string;
  }[];
};

export default function AdditionalTab() {
  const { control, handleSubmit } = useForm();
  const [designationData, setDesignationData] = useState<MyData>({ records: [] });
  const [currencyData, setCurrencyData] = useState<MyData>({ records: [] });
  const [countryData, setCountryData] = useState<MyData>({ records: [] });
  const [additionalUrl, setAdditionalUrl] = useState('');
  
  const router = useRouter();

  useEffect(() => {
    const getDesignations = async () => {
      try {
        const response = await fetch("https://credibar-api-dev.e8demo.com/api/user/v1/designation/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          let data: MyData = await response.json(); 
          console.log(data);
          setDesignationData(data);
        } else {
          console.error("Failed to fetch designations");
        }
      } catch (error) {
        console.error("An error occurred while fetching designations", error);
      }
    };

    const getCountries = async () => {
      try {
        const response = await fetch("https://credibar-api-dev.e8demo.com/api/user/v1/countries/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

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

    const getCurrencies = async () => {
      try {
        const response = await fetch("https://credibar-api-dev.e8demo.com/api/user/v1/currency/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          let data: MyData = await response.json(); 
          console.log(data);
          setCurrencyData(data);
        } else {
          console.error("Failed to fetch currencies");
        }
      } catch (error) {
        console.error("An error occurred while fetching currencies", error);
      }
    };

    getDesignations();
    getCountries();
    getCurrencies();

    const documentsUrl = "additionalUrl"; 

    const storedData = localStorage.getItem(documentsUrl);

    if (storedData) {
      const responseData = JSON.parse(storedData);
      const additionalInfoUrl = responseData.user_info_url;
      console.log(responseData.user_info_url)
      setAdditionalUrl(additionalInfoUrl);
    } else {
      console.log("Data not found in localStorage.");
    }
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const postData = {
        designation: parseInt(data.designation),
        country_of_residency: parseInt(data.countryOfResidence),
        national_id_number: data.nationalId,
        passport_number: data.passportNo,
        passport_issuing_country: parseInt(data.passportIssuingCountry),
        currency: parseInt(data.currency),
      };

      const response = await fetch(`${additionalUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const responseData = await response.json(); 
        console.log(responseData);
        router.push('/verifyMobile')
        localStorage.removeItem('url')
        const documentsUrl = 'verifyUrl'
        localStorage.setItem(documentsUrl, JSON.stringify(responseData));
        localStorage.removeItem('additionalUrl');
      } else {
        console.log(additionalUrl);
        console.error("Error sending data");
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
            <label htmlFor="designation">Designation</label>
            <Controller
              name="designation"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <select {...field}>
                  <option value="">Choose your Designation</option>
                  {designationData.records.map((data: any)=>(
                  <option key={data.id} value={data.id}>{data.name}</option>))}
                </select>
              )}
            />
          </div>
          <div>
            <label htmlFor="countryOfResidence">Country of Residence</label>
            <Controller
              name="countryOfResidence"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <select {...field}>
                  <option value="" >Select Country of Residency</option>
                  {countryData.records.map((data: any)=>(
                  <option key={data.id} value={data.id}>{data.name}</option>))}
                </select>
              )}
            />
          </div>
          <div>
            <label htmlFor="nationalId">National ID Number</label>
            <Controller
              name="nationalId"
              control={control}
              defaultValue=""
              render={({ field }) => <input {...field} type="text" />}
            />
          </div>
          <div>
            <label htmlFor="passportNo">Passport No</label>
            <Controller
              name="passportNo"
              control={control}
              defaultValue=""
              render={({ field }) => <input {...field} type="text" />}
            />
          </div>
          <div>
            <label htmlFor="passportIssuingCountry">
              Passport Issuing Country
            </label>
            <Controller
              name="passportIssuingCountry"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <select {...field}>
                  <option value="">Select Country</option>
                  {countryData.records.map((data: any)=>(
                  <option key={data.id} value={data.id}>{data.name}</option>))}
                </select>
              )}
            />
          </div>
          <div>
            <label htmlFor="currency">Choose Currency</label>
            <Controller
              name="currency"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <select {...field}>
                  <option value="">Select Currency</option>
                  {currencyData.records.map((data: any)=>(
                  <option key={data.id} value={data.id}>{data.name}</option>))}
                </select>
              )}
            />
          </div>

          <button className={styles.continueBtn} type="submit" >
            Submit
          </button>

        </form>
      </div>
      <Link href="/verify">
        <p className={styles.skipBtn}>Skip For Now</p>
      </Link>
    </div>
  );
}
