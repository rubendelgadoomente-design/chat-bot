const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Note: The Node SDK doesn't have a direct listModels method on the genAI object easily accessible without more complex setup.
    // We will just try a few known model names.
    const modelsToTry = [
        "gemini-1.5-flash",
        "gemini-1.5-pro",
        "gemini-pro",
        "gemini-2.0-flash"
    ];

    console.log("--- Probando modelos ---");
    for (const modelName of modelsToTry) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hola");
            console.log(`✅ ${modelName} funciona!`);
            process.exit(0); // Arreglado, ya encontramos uno
        } catch (err) {
            console.log(`❌ ${modelName} falló: ${err.message.substring(0, 50)}...`);
        }
    }
}

listModels();
