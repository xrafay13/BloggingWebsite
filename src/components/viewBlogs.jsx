import React, { useState, useEffect } from "react";
import { txtdb } from "./firebase";
import { getDocs } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import "./dashboard.css";

function ViewBlogs() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const valRef = collection(txtdb, "formData");
        const dataDb = await getDocs(valRef);
        const allData = dataDb.docs.map((val) => ({
          ...val.data(),
          id: val.id,
        }));
        setData(allData);
        console.log(allData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        marginTop: "16rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {data.map((value) => (
        <div
          key={value.id}
          style={{
            display: "flex",

            marginBottom: "1rem",
            marginTop: "1rem",
            alignItems: "flex-start",
          }}
        >
          <img
            src={value.imgURL}
            height="200px"
            width="200px"
            style={{ marginRight: "20px" }}
          />
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
                {"Title:"}
              </h1>
              <p
                style={{
                  fontSize: "22px",
                  marginLeft: "8px",
                  textDecoration: "underline",
                  fontWeight: "bold",
                }}
              >
                {value.titleVal}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column", // Display description below the heading
                alignItems: "flex-start",
                marginTop: "-2rem",
              }}
            >
              <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
                {"Description:"}
              </h2>
              <p
                style={{
                  fontSize: "18px",
                  marginLeft: "8px",
                  marginTop: "-1rem",
                  marginLeft: "0",
                }}
              >
                {value.bodyVal}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ViewBlogs;
