const { processMessage } = require('./chatbot-logic');

const tests = [
    'hola',
    '¿cómo funciona el poti?',
    'no sale agua del grifo',
    'quiero aparcar la furgo',
    'la bateria no carga',
    'huele a gas en la cocina',
    'la nevera no enfria nada',
    'tumbado en la cama tengo frio',
    'tengo un fallo en la bomba',
    'gracias adios',
    'reseña'
];

console.log('--- Iniciando Test del Cerebro Local ---\n');

tests.forEach(msg => {
    console.log(`Usuario: ${msg}`);
    console.log(`Asistente: ${processMessage(msg)}`);
    console.log('-'.repeat(20));
});

console.log('\n--- Test Finalizado ---');
