import { useEffect } from "react";
import axios from "axios";

export default function Test() {
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await axios.get(
        // `${process.env.REACT_APP_BASE_URL}/api/character`,
        "http://localhost:8001/api/character",
        {
          headers: {
            "X-API-Key": process.env.REACT_APP_API_KEY,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addContent = async (customId) => {
    try {
      const response = await axios.post(
        "http://localhost:8001/api/character/add",
        {
          customId,
          quantity: 1,
        },
        {
          headers: {
            "X-API-Key": process.env.REACT_APP_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteContent = async () => {};

  return (
    <div>
      <p>Test 1</p>
      <button onClick={() => addContent("VWLysz6TVKWC")}>Add Content</button>
    </div>
  );
}
