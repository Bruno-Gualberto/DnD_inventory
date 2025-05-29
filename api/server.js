const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const AIRTABLE_CONFIG = {
  BASE_ID: process.env.AIRTABLE_BASE_ID,
  ACCESS_TOKEN: process.env.AIRTABLE_ACCESS_TOKEN,
  TABLE_NAME: process.env.AIRTABLE_TABLE_NAME, // This will be set for each deployment
};

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "D&D Inventory Proxy Server is running",
    timestamp: new Date().toISOString(),
    table: AIRTABLE_CONFIG.TABLE_NAME,
  });
});

// GET data
app.get("/api/data", async (req, res) => {
  try {
    const url = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.BASE_ID}/${AIRTABLE_CONFIG.TABLE_NAME}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_CONFIG.ACCESS_TOKEN}`,
      },
    });

    // Transform Airtable format to app format
    const transformedData = {
      success: true,
      items: response.data.records.map((record) => ({
        id: record.id,
        name: record.fields.Name || "",
        quantity: record.fields.Quantity || 0,
        description: record.fields.Description || "",
        price: record.fields.Price || "",
        weight: record.fields.Weight || "",
        type: record.fields.Type || "",
        createdTime: record.createdTime,
      })),
      count: response.data.records.length,
    };

    console.log(
      `✅ GET request successful - ${transformedData.count} items from ${AIRTABLE_CONFIG.TABLE_NAME}`
    );
    res.json(transformedData);
  } catch (error) {
    console.error(`❌ GET error:`, error.message);

    if (error.response?.status === 404) {
      return res.status(404).json({
        success: false,
        error: "Table not found",
      });
    }

    res.status(500).json({
      success: false,
      error: error.response?.data?.error?.message || error.message,
    });
  }
});

// POST new item
app.post("/api/data", async (req, res) => {
  try {
    const url = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.BASE_ID}/${AIRTABLE_CONFIG.TABLE_NAME}`;

    // Transform app format to Airtable format
    const airtableData = {
      fields: {
        Name: req.body.name || "",
        Quantity: parseInt(req.body.quantity) || 1,
        Description: req.body.description || "",
        Price: req.body.price || "",
        Weight: req.body.weight || "",
        Type: req.body.type || "",
      },
    };

    const response = await axios.post(url, airtableData, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_CONFIG.ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    // Transform response back to app format
    const transformedRecord = {
      id: response.data.id,
      name: response.data.fields.Name || "",
      quantity: response.data.fields.Quantity || 0,
      description: response.data.fields.Description || "",
      price: response.data.fields.Price || "",
      weight: response.data.fields.Weight || "",
      type: response.data.fields.Type || "",
      createdTime: response.data.createdTime,
    };

    console.log(
      `✅ POST request successful - Added: ${transformedRecord.itemName} to ${AIRTABLE_CONFIG.TABLE_NAME}`
    );
    res.json({
      success: true,
      data: transformedRecord,
    });
  } catch (error) {
    console.error(`❌ POST error:`, error.message);
    res.status(500).json({
      success: false,
      error: error.response?.data?.error?.message || error.message,
    });
  }
});

// PATCH update item
app.patch("/api/data/:recordId", async (req, res) => {
  try {
    const { recordId } = req.params;
    const url = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.BASE_ID}/${AIRTABLE_CONFIG.TABLE_NAME}/${recordId}`;

    // Transform app format to Airtable format (only include fields that are provided)
    const fields = {};
    if (req.body.name !== undefined) fields.Name = req.body.name;
    if (req.body.quantity !== undefined)
      fields.Quantity = parseInt(req.body.quantity) || 0;
    if (req.body.description !== undefined)
      fields.Description = req.body.description;
    if (req.body.price !== undefined) fields.Price = req.body.price;
    if (req.body.weight !== undefined) fields.Weight = req.body.weight;
    if (req.body.type !== undefined) fields.Type = req.body.type;

    const airtableData = { fields };

    const response = await axios.patch(url, airtableData, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_CONFIG.ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    // Transform response back to app format
    const transformedRecord = {
      id: response.data.id,
      name: response.data.fields.Name || "",
      quantity: response.data.fields.Quantity || 0,
      description: response.data.fields.Description || "",
      price: response.data.fields.Price || "",
      weight: response.data.fields.Weight || "",
      type: response.data.fields.Type || "",
      createdTime: response.data.createdTime,
    };

    console.log(
      `✅ PATCH request successful - Updated: ${transformedRecord.name} (ID: ${recordId}) in ${AIRTABLE_CONFIG.TABLE_NAME}`
    );
    res.json({
      success: true,
      data: transformedRecord,
    });
  } catch (error) {
    console.error(`❌ PATCH error:`, error.message);

    if (error.response?.status === 404) {
      return res.status(404).json({
        success: false,
        error: "Record not found",
      });
    }

    res.status(500).json({
      success: false,
      error: error.response?.data?.error?.message || error.message,
    });
  }
});

// DELETE item
app.delete("/api/data/:recordId", async (req, res) => {
  try {
    const { recordId } = req.params;
    const url = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.BASE_ID}/${AIRTABLE_CONFIG.TABLE_NAME}/${recordId}`;

    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_CONFIG.ACCESS_TOKEN}`,
      },
    });

    console.log(
      `✅ DELETE request successful - Deleted record: ${recordId} from ${AIRTABLE_CONFIG.TABLE_NAME}`
    );
    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error(`❌ DELETE error:`, error.message);

    if (error.response?.status === 404) {
      return res.status(404).json({
        success: false,
        error: "Record not found",
      });
    }

    res.status(500).json({
      success: false,
      error: error.response?.data?.error?.message || error.message,
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 D&D Inventory Proxy Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API endpoints: http://localhost:${PORT}/api/data`);
  console.log(`📋 Current table: ${AIRTABLE_CONFIG.TABLE_NAME}`);
});

module.exports = app;
