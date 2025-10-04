const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const API_KEY = process.env.API_KEY;
const CHARACTER_INVENTORY_TABLE = process.env.CHARACTER_INVENTORY_TABLE;

const itemQuery = `
    id,
    Quantity,
    UUID,
    Items (
      id,
      UUID,
      Name,
      Type,
      SubType,
      Rarity,
      Weight,
      SellingPrice,
      BuyingPrice,
      Description
    )
  `;

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

// app.use("/api", authenticateApiKey);

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "D&D Inventory Server is running (Supabase)",
    timestamp: new Date().toISOString(),
    database: "Supabase PostgreSQL",
    secured: !!API_KEY,
  });
});

// GET all items from Items table
app.get("/api/global", async (req, res) => {
  try {
    const { data, error, count } = await supabase
      .from("Items")
      .select("*", { count: "exact" });

    if (error) throw error;

    console.log(`✅ GET request successful - ${count} items from Items table`);

    res.json({
      success: true,
      items: data.map((item) => ({
        id: item.id,
        uuid: item.UUID,
        name: item.Name || "",
        description: item.Description || "",
        sellingPrice: item.SellingPrice || "",
        buyingPrice: item.BuyingPrice || "",
        weight: item.Weight || null,
        type: item.Type || "",
        subType: item.SubType || "",
        rarity: item.Rarity || "",
      })),
      count: count || 0,
    });
  } catch (error) {
    console.error(`❌ GET error:`, error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET all items from character inventory's table with joined Items data
app.get("/api/character-inventory", async (req, res) => {
  try {
    const { data, error, count } = await supabase
      .from(CHARACTER_INVENTORY_TABLE)
      .select(itemQuery, { count: "exact" });

    if (error) throw error;

    console.log(
      `✅ GET request successful - ${count} items from ${CHARACTER_INVENTORY_TABLE}'s table`
    );

    res.json({
      success: true,
      items: data.map((record) => ({
        id: record.id,
        quantity: record.Quantity || 1,
        uuid: record.UUID,
        name: record.Items?.Name || "",
        description: record.Items?.Description || "",
        sellingPrice: record.Items?.SellingPrice || "",
        buyingPrice: record.Items?.BuyingPrice || "",
        weight: record.Items?.Weight || null,
        type: record.Items?.Type || "",
        subType: record.Items?.SubType || "",
        rarity: record.Items?.Rarity || "",
      })),
      count: count || 0,
    });
  } catch (error) {
    console.error(`❌ GET error:`, error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET all items from Store table with joined Items data
app.get("/api/store", async (req, res) => {
  try {
    const { data, error, count } = await supabase
      .from("Store")
      .select(itemQuery, { count: "exact" });

    if (error) throw error;

    console.log(`✅ GET request successful - ${count} items from Store table`);

    res.json({
      success: true,
      items: data.map((record) => ({
        id: record.id,
        quantity: record.Quantity || 1,
        uuid: record.UUID,
        name: record.Items?.Name || "",
        description: record.Items?.Description || "",
        sellingPrice: record.Items?.SellingPrice || "",
        buyingPrice: record.Items?.BuyingPrice || "",
        weight: record.Items?.Weight || null,
        type: record.Items?.Type || "",
        subType: record.Items?.SubType || "",
        rarity: record.Items?.Rarity || "",
      })),
      count: count || 0,
    });
  } catch (error) {
    console.error(`❌ GET error:`, error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET all items from Loot table with joined Items data
app.get("/api/loot", async (req, res) => {
  try {
    const { data, error, count } = await supabase
      .from("Loot")
      .select(itemQuery, { count: "exact" });

    if (error) throw error;

    console.log(`✅ GET request successful - ${count} items from Loot table`);

    res.json({
      success: true,
      items: data.map((record) => ({
        id: record.id,
        quantity: record.Quantity || 1,
        uuid: record.UUID,
        name: record.Items?.Name || "",
        description: record.Items?.Description || "",
        sellingPrice: record.Items?.SellingPrice || "",
        buyingPrice: record.Items?.BuyingPrice || "",
        weight: record.Items?.Weight || null,
        type: record.Items?.Type || "",
        subType: record.Items?.SubType || "",
        rarity: record.Items?.Rarity || "",
      })),
      count: count || 0,
    });
  } catch (error) {
    console.error(`❌ GET error:`, error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET single item from character inventory's table by id
app.get("/api/character-inventory/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;

    const { data, error } = await supabase
      .from(CHARACTER_INVENTORY_TABLE)
      .select(itemQuery)
      .eq("id", itemId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return res.status(404).json({
          success: false,
          error: "Item not found",
        });
      }
      throw error;
    }

    console.log(
      `✅ GET request successful - Item: ${itemId} from ${CHARACTER_INVENTORY_TABLE}`
    );

    res.json({
      success: true,
      data: {
        id: data.id,
        quantity: data.Quantity || 1,
        uuid: data.UUID,
        name: data.Items?.Name || "",
        description: data.Items?.Description || "",
        sellingPrice: data.Items?.SellingPrice || "",
        buyingPrice: data.Items?.BuyingPrice || "",
        weight: data.Items?.Weight || null,
        type: data.Items?.Type || "",
        subType: data.Items?.SubType || "",
        rarity: data.Items?.Rarity || "",
      },
    });
  } catch (error) {
    console.error(`❌ GET error:`, error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET all characters from CharactersInfo table
app.get("/api/all-characters", async (req, res) => {
  try {
    const { data, error, count } = await supabase
      .from("CharactersInfo")
      .select("*", { count: "exact" });

    if (error) throw error;

    console.log(
      `✅ GET request successful - ${count} characters from CharactersInfo table`
    );

    res.json({
      success: true,
      data: {
        items: data.map((record) => ({
          id: record.id,
          name: record.Name || "",
          level: record.Level || null,
          race: record.Race || "",
          class: record.Class || "",
          experience: record.Experience || null,
          strModifier: record.StrModifier || null,
          coins: record.Coins || "",
          uuid: record.UUID || "",
        })),
        count: count || 0,
      },
    });
  } catch (error) {
    console.error(`❌ GET error:`, error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET one character from CharactersInfo table
app.get("/api/all-characters/:characterUUID", async (req, res) => {
  try {
    const { characterUUID } = req.params;

    const { data, error } = await supabase
      .from("CharactersInfo")
      .select("*")
      .eq("UUID", characterUUID)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return res.status(404).json({
          success: false,
          error: "Character not found",
        });
      }
      throw error;
    }

    console.log(
      `✅ GET request successful - Character: ${characterUUID} from CharactersInfo`
    );

    res.json({
      success: true,
      data: {
        id: data.id,
        name: data.Name || "",
        level: data.Level || null,
        race: data.Race || "",
        class: data.Class || "",
        experience: data.Experience || null,
        strModifier: data.StrModifier || null,
        coins: data.Coins || "",
        uuid: data.UUID || "",
      },
    });
  } catch (error) {
    console.error(`❌ GET error:`, error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST new item to character inventory's table
app.post("/api/character-inventory/add", async (req, res) => {
  const { uuid, quantity = 1 } = req.body;

  try {
    // Verify that the item exists in Items table
    const { data: itemData, error: itemError } = await supabase
      .from("Items")
      .select("UUID, Name")
      .eq("UUID", uuid)
      .single();

    if (itemError || !itemData) {
      return res.status(404).json({
        success: false,
        error: "Item not found in Items table",
      });
    }

    // Insert into character inventory's table
    const { data, error } = await supabase
      .from(CHARACTER_INVENTORY_TABLE)
      .insert([
        {
          UUID: uuid,
          Quantity: parseInt(quantity) || 1,
        },
      ])
      .select(itemQuery)
      .single();

    if (error) throw error;

    console.log(
      `✅ POST request successful - Added: ${itemData.Name} to ${CHARACTER_INVENTORY_TABLE}`
    );

    res.json({
      success: true,
      data: {
        id: data.id,
        quantity: data.Quantity || 1,
        uuid: data.UUID,
        name: data.Items?.Name || "",
        description: data.Items?.Description || "",
        sellingPrice: data.Items?.SellingPrice || "",
        buyingPrice: data.Items?.BuyingPrice || "",
        weight: data.Items?.Weight || null,
        type: data.Items?.Type || "",
        subType: data.Items?.SubType || "",
        rarity: data.Items?.Rarity || "",
      },
    });
  } catch (error) {
    console.error(`❌ POST error:`, error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// PATCH update item in character inventory's table
app.patch("/api/character-inventory/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;

    // Build update object with only provided fields
    const updates = {};
    if (req.body.quantity !== undefined) {
      updates.Quantity = parseInt(req.body.quantity) || 1;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        error: "No valid fields to update",
      });
    }

    const { data, error } = await supabase
      .from(CHARACTER_INVENTORY_TABLE)
      .update(updates)
      .eq("id", itemId)
      .select(itemQuery)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return res.status(404).json({
          success: false,
          error: "Item not found",
        });
      }
      throw error;
    }

    console.log(
      `✅ PATCH request successful - Updated: ${data.Items?.Name} (ID: ${itemId}) in ${CHARACTER_INVENTORY_TABLE}`
    );

    res.json({
      success: true,
      data: {
        id: data.id,
        quantity: data.Quantity || 1,
        uuid: data.UUID,
        name: data.Items?.Name || "",
        description: data.Items?.Description || "",
        sellingPrice: data.Items?.SellingPrice || "",
        buyingPrice: data.Items?.BuyingPrice || "",
        weight: data.Items?.Weight || null,
        type: data.Items?.Type || "",
        subType: data.Items?.SubType || "",
        rarity: data.Items?.Rarity || "",
      },
    });
  } catch (error) {
    console.error(`❌ PATCH error:`, error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// DELETE item from character inventory's table
app.delete("/api/character-inventory/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;

    const { data, error } = await supabase
      .from(CHARACTER_INVENTORY_TABLE)
      .delete()
      .eq("id", itemId)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return res.status(404).json({
          success: false,
          error: "Item not found",
        });
      }
      throw error;
    }

    console.log(
      `✅ DELETE request successful - Deleted item: ${itemId} from ${CHARACTER_INVENTORY_TABLE}`
    );

    res.json({
      success: true,
      data: {
        id: data.id,
        deleted: true,
      },
    });
  } catch (error) {
    console.error(`❌ DELETE error:`, error.message);
    res.status(500).json({
      success: false,
      error: error.message,
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
  console.log(`🚀 D&D Inventory Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API endpoints: http://localhost:${PORT}/api`);
  console.log(`💾 Database: Supabase PostgreSQL`);
});

module.exports = app;
