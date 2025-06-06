import { useState, useEffect } from "react";

import { getInventory, getCharacterInfo } from "../utils/inventoryMethods";

import { Button, Typography } from "@mui/material";
import FeedbackMessage from "./FeedbackMessage";

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [characterInfo, setCharacterInfo] = useState({});
  const [feedbackSettings, setFeedbackSettings] = useState({
    message: "",
    isOpen: false,
    isError: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const inventory = await getInventory();
      const characterInfo = await getCharacterInfo();

      inventory.success
        ? setInventory(inventory.items)
        : setFeedbackSettings({
            message: inventory.message,
            isOpen: true,
            isError: true,
          });
      characterInfo.success
        ? setCharacterInfo(characterInfo.data)
        : setFeedbackSettings({
            message: characterInfo.message,
            isOpen: true,
            isError: true,
          });
    };
    fetchData();
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
