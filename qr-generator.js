const QRCode = require('qrcode');
const path = require('path');

// URL pública de tu chatbot (Cámbiala si el túnel de Cloudflare cambia)
const chatbotUrl = 'https://binding-environment-coordinator-coleman.trycloudflare.com';

const outputPath = path.join(__dirname, 'public', 'qr-camperbot.png');

async function generateQR() {
    try {
        await QRCode.toFile(outputPath, chatbotUrl, {
            color: {
                dark: '#2c3e50',  // Color principal de tu marca
                light: '#ffffff'
            },
            width: 500,
            margin: 2
        });
        console.log(`✅ ¡Código QR generado con éxito!`);
        console.log(`📍 Guardado en: ${outputPath}`);
        console.log(`🌐 Apuntando a: ${chatbotUrl}`);
    } catch (err) {
        console.error('❌ Error al generar el QR:', err);
    }
}

generateQR();
