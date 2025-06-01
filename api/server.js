const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(express.json());

const AIRTABLE_CONFIG = {
  BASE_ID: process.env.AIRTABLE_BASE_ID,
  ACCESS_TOKEN: process.env.AIRTABLE_ACCESS_TOKEN,
  STORE_TABLE_ID: process.env.AIRTABLE_STORE_TABLE_ID,
  LOOT_TABLE_ID: process.env.AIRTABLE_LOOT_TABLE_ID,
  CHARACTER_TABLE_ID: process.env.AIRTABLE_CHARACTER_TABLE_ID, // This will be set for each deployment
};

// API Key for authentication
const API_KEY = process.env.API_KEY;

// API Key authentication middleware
const authenticateApiKey = (req, res, next) => {
  const providedKey = req.headers["x-api-key"] || req.headers["X-API-Key"];

  if (!API_KEY) {
    console.error("❌ API_KEY environment variable not set");
    return res.status(500).json({
      success: false,
      error: "Server configuration error",
    });
  }

  if (!providedKey) {
    console.log("❌ API request without API key");
    return res.status(401).json({
      success: false,
      error: "No authorization provided",
    });
  }

  if (providedKey !== API_KEY) {
    console.log("❌ API request with invalid API key");
    return res.status(401).json({
      success: false,
      error: "Not authorized",
    });
  }

  console.log("✅ API key authenticated");
  next();
};

// Apply API key authentication to all /api routes
app.use("/api", authenticateApiKey);

// Health check endpoint (public - no API key required)
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "D&D Inventory Proxy Server is running",
    timestamp: new Date().toISOString(),
    table: AIRTABLE_CONFIG.CHARACTER_TABLE_ID,
    secured: !!API_KEY, // Indicates if API key protection is enabled
  });
});

function extractSingleValue(value) {
  return Array.isArray(value) ? value[0] : value;
}

// GET all items data from CHARACTER table
app.get("/api/data", async (req, res) => {
  console.log(AIRTABLE_CONFIG.CHARACTER_TABLE_ID);
  try {
    const url = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.BASE_ID}/${AIRTABLE_CONFIG.CHARACTER_TABLE_ID}`;

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
        customId: extractSingleValue(record.fields.CustomId) || "",
        name: extractSingleValue(record.fields.Name) || "",
        quantity: record.fields.Quantity || 0,
        description: extractSingleValue(record.fields.Description) || "",
        price: extractSingleValue(record.fields.Price) || "",
        weight: extractSingleValue(record.fields.Weight) || "",
        type: extractSingleValue(record.fields.Type) || "",
        createdTime: record.createdTime,
      })),
      count: response.data.records.length,
    };

    console.log(
      `✅ GET request successful - ${transformedData.count} items from ${AIRTABLE_CONFIG.CHARACTER_TABLE_ID}`
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

// GET all items data from STORE table
app.get("/api/data/store", async (req, res) => {
  console.log(AIRTABLE_CONFIG.STORE_TABLE_ID);
  try {
    const url = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.BASE_ID}/${AIRTABLE_CONFIG.STORE_TABLE_ID}`;

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
        customId: extractSingleValue(record.fields.CustomId) || "",
        name: extractSingleValue(record.fields.Name) || "",
        quantity: record.fields.Quantity || 0,
        description: extractSingleValue(record.fields.Description) || "",
        price: extractSingleValue(record.fields.Price) || "",
        weight: extractSingleValue(record.fields.Weight) || "",
        type: extractSingleValue(record.fields.Type) || "",
        createdTime: record.createdTime,
      })),
      count: response.data.records.length,
    };

    console.log(
      `✅ GET request successful - ${transformedData.count} items from ${AIRTABLE_CONFIG.STORE_TABLE_ID}`
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

// GET all items data from LOOT table
app.get("/api/data/loot", async (req, res) => {
  console.log(AIRTABLE_CONFIG.LOOT_TABLE_ID);
  try {
    const url = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.BASE_ID}/${AIRTABLE_CONFIG.LOOT_TABLE_ID}`;

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
        customId: extractSingleValue(record.fields.CustomId) || "",
        name: extractSingleValue(record.fields.Name) || "",
        quantity: record.fields.Quantity || 0,
        description: extractSingleValue(record.fields.Description) || "",
        price: extractSingleValue(record.fields.Price) || "",
        weight: extractSingleValue(record.fields.Weight) || "",
        type: extractSingleValue(record.fields.Type) || "",
        createdTime: record.createdTime,
      })),
      count: response.data.records.length,
    };

    console.log(
      `✅ GET request successful - ${transformedData.count} items from ${AIRTABLE_CONFIG.LOOT_TABLE_ID}`
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

// GET single item from CHARACTER table
app.get("/api/data/:recordId", async (req, res) => {
  try {
    const { recordId } = req.params;
    const url = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.BASE_ID}/${AIRTABLE_CONFIG.CHARACTER_TABLE_ID}/${recordId}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_CONFIG.ACCESS_TOKEN}`,
      },
    });

    console.log(
      `✅ GET request successful - Record: ${recordId} from ${AIRTABLE_CONFIG.CHARACTER_TABLE_ID}`
    );

    const { id, createdTime, fields } = response.data;

    // Transform response back to app format
    const transformedRecord = {
      id,
      customId: extractSingleValue(fields.CustomId) || "",
      name: extractSingleValue(fields.Name) || "",
      quantity: fields.Quantity || 0,
      description: extractSingleValue(fields.Description) || "",
      price: extractSingleValue(fields.Price) || "",
      weight: extractSingleValue(fields.Weight) || "",
      type: extractSingleValue(fields.Type) || "",
      createdTime,
    };

    res.json({
      success: true,
      data: transformedRecord,
    });
  } catch (error) {
    console.error(`❌ GET error:`, error.message);

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

// GET single item from CHARACTER table by customId
app.get("/api/data/customId/:customId", async (req, res) => {
  try {
    const { customId } = req.params;
    const url = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.BASE_ID}/${AIRTABLE_CONFIG.CHARACTER_TABLE_ID}?filterByFormula=CustomId%3D%22${customId}%22`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_CONFIG.ACCESS_TOKEN}`,
      },
    });

    console.log(
      `✅ GET request successful - CustomId: ${customId} from ${AIRTABLE_CONFIG.CHARACTER_TABLE_ID}`
    );

    const { id, createdTime, fields } = response.data.records[0];

    // Transform response back to app format
    const transformedRecord = {
      id,
      customId: extractSingleValue(fields.CustomId) || "",
      name: extractSingleValue(fields.Name) || "",
      quantity: fields.Quantity || 0,
      description: extractSingleValue(fields.Description) || "",
      price: extractSingleValue(fields.Price) || "",
      weight: extractSingleValue(fields.Weight) || "",
      type: extractSingleValue(fields.Type) || "",
      createdTime,
    };

    res.json({
      success: true,
      data: transformedRecord,
    });
  } catch (error) {
    console.error(`❌ GET error:`, error.message);
    res.status(500).json({
      success: false,
      error: error.response?.data?.error?.message || error.message,
    });
  }
});

// POST new item to CHARACTER table
app.post("/api/data", async (req, res) => {
  try {
    const url = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.BASE_ID}/${AIRTABLE_CONFIG.CHARACTER_TABLE_ID}`;

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

    const { id, createdTime, fields } = response.data;

    // Transform response back to app format
    const transformedRecord = {
      id,
      customId: extractSingleValue(fields.CustomId) || "",
      name: extractSingleValue(fields.Name) || "",
      quantity: fields.Quantity || 0,
      description: extractSingleValue(fields.Description) || "",
      price: extractSingleValue(fields.Price) || "",
      weight: extractSingleValue(fields.Weight) || "",
      type: extractSingleValue(fields.Type) || "",
      createdTime,
    };

    console.log(
      `✅ POST request successful - Added: ${transformedRecord.itemName} to ${AIRTABLE_CONFIG.CHARACTER_TABLE_ID}`
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

// PATCH update item in CHARACTER table
app.patch("/api/data/:recordId", async (req, res) => {
  try {
    const { recordId } = req.params;
    const url = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.BASE_ID}/${AIRTABLE_CONFIG.CHARACTER_TABLE_ID}/${recordId}`;

    // Transform app format to Airtable format (only include fields that are provided)
    const airtableFields = {};
    if (req.body.name !== undefined) airtableFields.Name = req.body.name;
    if (req.body.quantity !== undefined)
      airtableFields.Quantity = parseInt(req.body.quantity) || 0;
    if (req.body.description !== undefined)
      airtableFields.Description = req.body.description;
    if (req.body.price !== undefined) airtableFields.Price = req.body.price;
    if (req.body.weight !== undefined) airtableFields.Weight = req.body.weight;
    if (req.body.type !== undefined) airtableFields.Type = req.body.type;

    const airtableData = { airtableFields };

    const response = await axios.patch(url, airtableData, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_CONFIG.ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const { id, createdTime, fields } = response.data;

    // Transform response back to app format
    const transformedRecord = {
      id,
      customId: extractSingleValue(fields.CustomId) || "",
      name: extractSingleValue(fields.Name) || "",
      quantity: fields.Quantity || 0,
      description: extractSingleValue(fields.Description) || "",
      price: extractSingleValue(fields.Price) || "",
      weight: extractSingleValue(fields.Weight) || "",
      type: extractSingleValue(fields.Type) || "",
      createdTime,
    };

    console.log(
      `✅ PATCH request successful - Updated: ${transformedRecord.name} (ID: ${recordId}) in ${AIRTABLE_CONFIG.CHARACTER_TABLE_ID}`
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

// DELETE item from CHARACTER table
app.delete("/api/data/:recordId", async (req, res) => {
  try {
    const { recordId } = req.params;
    const url = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.BASE_ID}/${AIRTABLE_CONFIG.CHARACTER_TABLE_ID}/${recordId}`;

    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_CONFIG.ACCESS_TOKEN}`,
      },
    });

    console.log(
      `✅ DELETE request successful - Deleted record: ${recordId} from ${AIRTABLE_CONFIG.CHARACTER_TABLE_ID}`
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
});

module.exports = app;
