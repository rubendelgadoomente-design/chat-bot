require('dotenv').config();
const { OpenAI } = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function test() {
    console.log("Testing OpenAI Key...");
    console.log("Current Key (first bits):", process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 10) + "..." : "EMPTY");
    
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: "Say 'Key Working'" }],
        });
        console.log("Success! Response:", completion.choices[0].message.content);
    } catch (error) {
        console.error("Error from OpenAI API:");
        console.error(error.message);
        if (error.message.includes("quota")) {
            console.log("\nTIP: It looks like you don't have enough credits (USD/EUR) in your OpenAI account.");
        }
    }
}

test();
