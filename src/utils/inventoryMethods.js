import axios from "axios";

export const getInventory = async () => {
  try {
    const response = await axios.get(
      // `${import.meta.env.VITE_BASE_URL}/api/character`,
      "http://localhost:8001/api/character-inventory",
      {
        headers: {
          "X-API-Key": import.meta.env.VITE_API_KEY,
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
      // `${import.meta.env.VITE_BASE_URL}/api/all-characters/${import.meta.env.VITE_CHARACTER_UUID}`,
      `http://localhost:8001/api/all-characters/${
        import.meta.env.VITE_CHARACTER_UUID
      }`,
      {
        headers: {
          "X-API-Key": import.meta.env.VITE_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error;
  }
};
