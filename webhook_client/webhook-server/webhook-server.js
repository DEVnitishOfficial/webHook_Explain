const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 📌 Webhook endpoint for order status updates
app.post("/webhook/order-status", (req, res) => {
    console.log("🚀 Order Status Update Received:", req.body);
    res.status(200).json({ success: true, data:req.body });
});
console.log('four')

const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 Webhook listener running on port ${PORT}`));
