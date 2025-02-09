import { useEffect, useState } from "react";
import axios from "axios";

function WebhookListener() {
     
    const [orderStatus, setOrderStatus] = useState("Processing....");
    const [regStatus,setregStatus] = useState("waiting for registration.....")

    // 📌 Function to register webhook
    const registerWebhook = async () => {
        try {
            const response = await axios.post("http://localhost:5000/register-webhook", {
                url: "http://localhost:3001/webhook/order-status",
            });
            console.log("Webhook Registered:", response.data);
            setregStatus(response.data.message)
        } catch (error) {
            console.error("Webhook Registration Failed:", error.message);
        }
    };

    const getOrderStatus = async()=> {
        const response = await fetch("http://localhost:3001/webhook/order-status");
        const data = response.json()
        console.log(data)
        setOrderStatus(data.status)
    }

    useEffect(() => {
        registerWebhook(); // Register webhook when component loads
        getOrderStatus();
    }, []);

    return (
        <div>
            <h2>Webhook registration status:{regStatus}</h2>
            <h2>📦 Order Status: {orderStatus}</h2>
        </div>
    );
}

export default WebhookListener;
