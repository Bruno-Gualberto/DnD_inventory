import axios from "axios";

export const getInventory = async () => {
  try {
    const response = await axios.get(
      // `${process.env.REACT_APP_BASE_URL}/api/character`,
      "http://localhost:8001/api/characte",
      {
        headers: {
          "X-API-Key": process.env.REACT_APP_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error;
  }
};

export const getCharacterInfo = async () => {
  try {
    const response = await axios.get(
      // `${process.env.REACT_APP_BASE_URL}/api/all-characters/${process.env.REACT_APP_LYA_ID}`,
      `http://localhost:8001/api/all-characters/${process.env.REACT_APP_LYA_ID}`,
      {
        headers: {
          "X-API-Key": process.env.REACT_APP_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error;
  }
};
