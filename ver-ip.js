const https = require('https');
https.get('https://api.ipify.org', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        console.log('\n--- TU CONTRASEÑA DE LOCALTUNNEL ---');
        console.log(data.trim());
        console.log('-------------------------------------\n');
    });
}).on('error', (err) => {
    console.error('Error al obtener la IP:', err.message);
});
