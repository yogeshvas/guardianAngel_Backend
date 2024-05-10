const express = require("express");
const twilio = require("twilio");
const bodyParser = require("body-parser"); // Import body-parser middleware
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
// Middleware to parse JSON bodies
app.use(cors());
app.use(bodyParser.json());
dotenv.config();
// Replace 'YOUR_ACCOUNT_SID' and 'YOUR_AUTH_TOKEN' with your actual Twilio credentials
const accountSid = "AC3870949ae00a777d88effaf40f6cb747";
const authToken = "efdaa3d3e9834988381bf6e9c762bf79";

// Initialize Twilio client
const client = twilio(accountSid, authToken);

// Example route to send an SMS message
app.post("/sms", async (req, res) => {
  try {
    const { to, body } = req.body; // Extract 'to' and 'body' from request body

    if (!to || !body) {
      return res
        .status(400)
        .json({ error: "Missing 'to' or 'body' parameter" });
    }

    // Replace 'FROM_PHONE_NUMBER' with your Twilio phone number
    const message = await client.messages.create({
      body: body,
      to: to,
      from: "+15207779980", // Your Twilio phone number
    });

    res.json({
      success: true,
      message: "SMS sent successfully",
      messageId: message.sid,
    });
  } catch (error) {
    console.error("Error sending SMS:", error);
    res.status(500).json({ error: "Failed to send SMS" });
  }
});

// Start the Express.js server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
