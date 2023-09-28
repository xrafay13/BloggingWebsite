import React, { useState, useEffect } from "react";
import { txtdb } from "./firebase";
import { getDocs } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";

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
    <div>
      {data.map((value) => (
        <div>
          <h1>{value.titleVal}</h1>
          <h2>{value.bodyVal}</h2>
          <img src={value.imgURL} height="200px" width="200px" />
        </div>
      ))}
    </div>
  );
}

export default ViewBlogs;
