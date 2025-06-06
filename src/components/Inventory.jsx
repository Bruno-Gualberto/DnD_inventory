import { useState, useEffect } from "react";
import axios from "axios";

import { Button, Typography } from "@mui/material";
import FeedbackMessage from "./FeedbackMessage";

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [feedbackSettings, setFeedbackSettings] = useState({
    message: "",
    isOpen: false,
    isError: false,
  });

  const getInventory = async () => {
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
      setInventory(response.data);
      console.log(response.data);
    } catch (error) {
      setFeedbackSettings({
        message: error.message,
        isOpen: true,
        isError: true,
      });
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <div>
      <Typography variant='titleBold'>PÁGINA DO INVENTÁRIO</Typography>
      <Button variant='contained' color='tertiary'>
        <Typography variant='ctaBold'>Adicionar Item</Typography>
      </Button>
      {feedbackSettings.isOpen && (
        <FeedbackMessage
          message={feedbackSettings.message}
          isOpen={feedbackSettings.isOpen}
          isError={feedbackSettings.isError}
        />
      )}
    </div>
  );
}
