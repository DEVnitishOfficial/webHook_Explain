const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors()); // Allow frontend access
app.use(bodyParser.json());

let webhookSubscribers = []; // Store webhook URLs (temporary, in real case use DB)

// 📌 API for React app to register webhook URL
app.post("/register-webhook", (req, res) => {
    const { url } = req.body;
    console.log('urlll',url);
    if (!url) return res.status(400).json({ error: "URL is required" });

    webhookSubscribers.push(url);
    res.json({ success: true, message: "Webhook registered successfully!" });
});

// 📌 Function to send webhook notifications
const sendWebhookNotification = async (orderId, status) => {
    console.log('webhookSubscribers',webhookSubscribers);
    webhookSubscribers.forEach(async (url) => {
        try {
            await axios.post(url, { orderId, status });
            console.log(`✅ Webhook sent to ${url}: Order ${orderId} is now ${status}`);
        } catch (error) {
            console.error(`❌ Webhook failed for ${url}:`, error.message);
        }
    });
};

// 📌 Simulating order status change after 10 seconds
setTimeout(() => {
    sendWebhookNotification(12345, "Shipped");
}, 10000);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Webhook server running on port ${PORT}`));
