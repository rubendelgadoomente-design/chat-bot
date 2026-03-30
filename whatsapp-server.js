require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const path = require('path');
const { processMessageAI } = require('./llm-logic');

// Inicializar el cliente de WhatsApp con persistencia de sesión
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

const qrcodeFile = require('qrcode');

// Generar el código QR tanto en terminal como en un archivo PNG para escaneo fácil
client.on('qr', async (qr) => {
    console.log('🚨 ¡NUEVO CÓDIGO QR GENERADO!');
    
    // Lo mostramos en pequeño en la consola por si acaso
    qrcode.generate(qr, { small: true });

    // Lo guardamos como una imagen real para que el usuario lo vea perfecto
    const qrPath = path.join(__dirname, 'public', 'whatsapp-auth.png');
    try {
        await qrcodeFile.toFile(qrPath, qr, { width: 500 });
        console.log(`🖼️ ¡Código QR guardado en: ${qrPath}!`);
    } catch (err) {
        console.error('❌ Error guardando QR en archivo:', err);
    }
});

// Confirmar conexión
client.on('ready', () => {
    console.log('✅ ¡CamperBot está conectado y listo en WhatsApp!');
});

// Manejar mensajes entrantes
client.on('message', async (msg) => {
    // 1. IMPORTANTE: Solo responder a mensajes de texto (evita estados, vcards, etc.)
    if (msg.type !== 'chat') return;

    // 2. IMPORTANTE: No respondas a tus propios mensajes (evitar bucles)
    if (msg.fromMe) return;

    // 3. IMPORTANTE: Ignora si el mensaje está vacío o solo tiene espacios
    if (!msg.body || msg.body.trim().length === 0) {
        console.log(`🧹 Ignorando mensaje no textual o vacío de ${msg.from}`);
        return;
    }

    const chat = await msg.getChat();
    if (chat.isGroup) return;

    console.log(`📩 Mensaje recibido de ${msg.from}: ${msg.body}`);

    // --- LÓGICA DE COMANDOS DE ADMINISTRADOR ---
    if (msg.body.startsWith('/resena')) {
        const parts = msg.body.split(' ');
        if (parts.length < 2) {
            return msg.reply('❌ Uso: /resena [número_con_prefijo]\nEjemplo: /resena 34600112233');
        }

        const targetNumber = parts[1].includes('@c.us') ? parts[1] : `${parts[1]}@c.us`;
        const reviewMessage = `¡Hola! Esperamos que hayas disfrutado de tu aventura en libertad con nosotros. 🚐✨\n\nPara nosotros ha sido un placer acompañarte. Si te ha gustado la experiencia, nos ayudarías muchísimo dejando una valoración de 5 estrellas aquí:\n👉 [TU_LINK_DE_GOOGLE_MAPS_AQUÍ]\n\n¡Buen viaje de vuelta!`;

        try {
            await client.sendMessage(targetNumber, reviewMessage);
            return msg.reply(`✅ Solicitud de reseña enviada con éxito a ${parts[1]}`);
        } catch (err) {
            return msg.reply(`❌ Error enviando mensaje a ${parts[1]}: ${err.message}`);
        }
    }
    // ------------------------------------------

    try {
        // Enviar el mensaje al cerebro de IA (OpenAI + Contexto Local)
        const aiResponse = await processMessageAI(msg.body.trim());
        
        // Responder por WhatsApp
        await msg.reply(aiResponse);
        console.log(`🚀 Respuesta enviada con éxito.`);
    } catch (error) {
        console.error('❌ Error procesando mensaje de WhatsApp:', error);
    }
});

// Iniciar el cliente
console.log('🚀 Iniciando puente de WhatsApp...');
client.initialize();
