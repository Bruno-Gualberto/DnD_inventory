import { useEffect } from "react";
import axios from "axios";

export default function Test() {
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // try {
    //   const response = await axios.get(
    //     // `${process.env.REACT_APP_BASE_URL}/api/data`,
    //     "http://localhost:8001/api/data",
    //     {
    //       headers: {
    //         "X-API-Key": process.env.REACT_APP_API_KEY,
    //       },
    //     }
    //   );
    //   console.log(response.data);
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }
  };

  const addContent = async () => {};

  const deleteContent = async () => {};

  return (
    <div>
      <p>Test 1</p>
    </div>
  );
}
