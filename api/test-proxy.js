const axios = require("axios");
require("dotenv").config();

const BASE_URL = `http://localhost:${process.env.PORT}`;

async function testProxyServer() {
  console.log("🧪 Testing D&D Inventory Proxy Server...\n");

  // Test 1: Health check
  console.log("1️⃣ Testing health check...");
  try {
    const response = await axios.get(`${BASE_URL}/health`);
    console.log("✅ Health check passed:", response.data.message);
    console.log("📋 Current table:", response.data.table);
  } catch (error) {
    console.log("❌ Health check failed:", error.message);
    return;
  }

  // Test 2: GET data
  console.log("\n2️⃣ Testing GET data...");
  try {
    const response = await axios.get(`${BASE_URL}/api/data`);
    console.log("✅ GET request successful");
    console.log(`📊 Found ${response.data.count} items`);
    if (response.data.items.length > 0) {
      console.log("📝 Sample item:", response.data.items[0].name);
    }
  } catch (error) {
    console.log(
      "❌ GET request failed:",
      error.response?.data?.error || error.message
    );
  }

  // Test 3: POST new item
  console.log("\n3️⃣ Testing POST new item...");
  const testItem = {
    name: "Espada longa",
    quantity: 1,
    description: "Uma espada longa pra testar a API",
    price: "100 ouro",
    weight: 4.5,
    type: "Arma",
  };

  try {
    const response = await axios.post(`${BASE_URL}/api/data`, testItem, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("✅ POST request successful");
    console.log(
      `📝 Created item: ${response.data.data.name} (ID: ${response.data.data.id})`
    );

    // Store the ID for deletion test
    global.testItemId = response.data.data.id;
  } catch (error) {
    console.log(
      "❌ POST request failed:",
      error.response?.data?.error || error.message
    );
  }

  // Test 4: PATCH update item (if we created one)
  if (global.testItemId) {
    console.log("\n4️⃣ Testing PATCH update item...");
    const updateData = {
      name: "Espada longa atualizada",
      quantity: 2,
      price: "200 ouro",
      // Note: Only updating some fields, others should remain unchanged
    };

    try {
      const response = await axios.patch(
        `${BASE_URL}/api/data/${global.testItemId}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("✅ PATCH request successful");
      console.log(
        `📝 Updated item: ${response.data.data.name} (Quantity: ${response.data.data.quantity}, Price: ${response.data.data.price})`
      );
    } catch (error) {
      console.log(
        "❌ PATCH request failed:",
        error.response?.data?.error || error.message
      );
    }
  }

  // Test 5: DELETE item (if we created one)
  if (global.testItemId) {
    console.log("\n5️⃣ Testing DELETE item...");
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/data/${global.testItemId}`
      );
      console.log("✅ DELETE request successful");
      console.log(`🗑️ Deleted item with ID: ${global.testItemId}`);
    } catch (error) {
      console.log(
        "❌ DELETE request failed:",
        error.response?.data?.error || error.message
      );
    }
  }

  console.log("\n🎉 Proxy server testing complete!");
}

// Run tests
testProxyServer().catch(console.error);
