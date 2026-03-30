const { OpenAI } = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "TU_CLAVE_AQUI",
});

const { processMessage: processLocalMessage } = require('./chatbot-logic');

// Contexto técnico de la camper (extraído de la lógica local)
const CAMPER_KNOWLEDGE = `
Eres un asistente experto en autocaravanas de "CamperBot". 
Tu objetivo es ayudar a los clientes con dudas técnicas de forma amable, empática y profesional.
Evita sonar robótico. Si el usuario tiene un problema (ej: poti atascado), primero muéstrate comprensivo y luego da la solución.

DATOS TÉCNICOS DE REFERENCIA:
- Electricidad: Revisa interruptor general en ON. Inversor encendido para 220V. Check fusibles.
- Poti (WC): Trampilla cerrada antes de sacar. Indicador rojo cuando está lleno. Solo líquidos autorizados. Vídeo: https://www.youtube.com/watch?v=8p_hI6_9b2Q
- Aguas: Bomba en ON para que salga agua. Grises/Negras vaciar solo en áreas de servicio. Vídeo: https://www.youtube.com/watch?v=6YhS1W_mXzM
- Normativa: Aparcar es legal sin sacar trastos. Acampar (toldos, sillas) solo en campings.
- Batería: Si no carga, arranca motor 15 min o conéctate a 220V.
- Gas: Llave de paso abierta. Si huele a gas, ventila y cierra todo.
- Nevera: Modo GAS parado, 12V en marcha, 220V en camping.

REGLA CRÍTICA:
Si mencionas una solución que tenga un vídeo (Poti o Aguas), incluye SIEMPRE el enlace markdown exactamente así: 
[VIDEO: Título](URL)
`;

async function processMessageAI(message) {
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "TU_CLAVE_AQUI") {
        return "⚠️ Falta la clave de OpenAI (OPENAI_API_KEY) en el archivo .env. Por favor, añádela para que pueda hablar de forma más natural.";
    }

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: CAMPER_KNOWLEDGE },
                { role: "user", content: message }
            ],
            temperature: 0.7,
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error("Error en OpenAI:", error);
        return "Lo siento, ha habido un problema conectando con mi cerebro de IA. Mientras lo soluciono, puedo decirte que revises el manual o me preguntes por el 'poti' o 'agua'.";
    }
}

module.exports = { processMessageAI };
