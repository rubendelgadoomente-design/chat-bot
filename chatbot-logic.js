/**
 * Lógica básica del chatbot para el MVP (Versión Local)
 * Esta lógica simula el "cerebro" hasta que conectemos Dialogflow.
 */

const intents = {
    saludo: {
        keywords: ['hola', 'buenos dias', 'buenas', 'que tal'],
        response: '¡Hola! 🚐 Soy tu asistente de CamperBot. Estoy aquí para ayudarte con dudas técnicas sobre tu vehículo. ¿En qué puedo ayudarte hoy? (Poti, agua, electricidad...)'
    },
    potencia: {
        keywords: ['luz', 'electricidad', '220', 'enchufe', 'inversor', 'corriente', 'panel', 'centralita'],
        response: '⚡ Centralita / Electricidad:\n1. Revisa que el interruptor general de la centralita esté en ON.\n2. Para los enchufes de 220V, el inversor debe estar encendido.\n3. Si algo no luce, puede ser un fusible fundido. ¿Qué es lo que no funciona exactamente?'
    },
    poti: {
        keywords: ['poti', 'wc', 'baño', 'toilet', 'quimico', 'negras'],
        response: '🚽 Gestión del Poti (WC):\n1. Asegúrate de que la trampilla esté cerrada antes de sacar el depósito.\n2. Si está lleno, el indicador se pondrá en rojo.\n3. Recuerda usar solo líquidos químicos autorizados.\n\n🎥 [VIDEO: Cómo vaciar el Poti](https://www.youtube.com/watch?v=8p_hI6_9b2Q)'
    },
    agua: {
        keywords: ['agua', 'bomba', 'grifo', 'ducha', 'deposito', 'vaciar', 'grises', 'negras'],
        response: 'Gestión de Aguas: \n1. Para que salga agua, el interruptor de la BOMBA debe estar en ON.\n2. Si el depósito está bajo, rellénalo en un punto autorizado.\n3. Vacía las aguas grises y negras solo en áreas de servicio.\n\n🎥 [VIDEO: Llenado y vaciado de aguas](https://www.youtube.com/watch?v=6YhS1W_mXzM)'
    },
    normativa: {
        keywords: ['aparcamiento', 'aparcar', 'pernoctar', 'acampar', 'donde', 'normativa', 'multa'],
        response: 'Recuerda la regla de oro: APARCAR es legal siempre que no saques elementos fuera (toldos, sillas) ni viertas líquidos. ACAMPAR solo está permitido en campings o áreas específicas. ¡Cuidado con las dimensiones de la furgoneta!'
    },
    fin: {
        keywords: ['terminar', 'fin', 'devolver', 'entrega', 'gracias', 'adios'],
        response: '¡Gracias por confiar en nosotros! 🚐 Antes de irte, ¿podrías dejarnos una reseña? Nos ayuda mucho a mejorar. (Escribe "reseña" para empezar).'
    },
    resena: {
        keywords: ['reseña', 'valorar', 'opinión', 'estrellas'],
        response: '¡Genial! Valora tu experiencia del 1 al 5 (siendo 5 la mejor). Tu opinión es muy valiosa.'
    },
    bateria: {
        keywords: ['bateria', 'batería', 'carga', 'descargada', 'no arranca', 'auxiliar', 'vivienda'],
        response: '⚠️ Errores de Batería:\n1. Si es la batería de la vivienda, comprueba el panel de control. \n2. ¿Has estado mucho tiempo parado sin conectarte a 220v?\n3. Arranca el motor 15 min para cargar la auxiliar o conéctate en un camping.'
    },
    gas: {
        keywords: ['gas', 'cocina', 'fuego', 'bombona', 'olor', 'butano', 'propano'],
        response: '🔥 Seguridad con el Gas:\n1. Asegúrate de que la llave de paso de la bombona esté abierta.\n2. Si huele a gas, cierra todo y ventila inmediatamente.\n3. Revisa si hay otra llave de paso secundaria bajo los fogones.'
    },
    nevera: {
        keywords: ['nevera', 'nevera no enfria', 'frigorifico', 'congelador'],
        response: '❄️ Problemas con la Nevera:\n1. Si estás aparcado, ponla en modo GAS (icono de llama).\n2. En marcha, usa el modo 12v (icono de batería).\n3. En camping, usa el modo 220v (icono de enchufe).'
    },
    calefaccion: {
        keywords: ['calefaccion', 'calefacción', 'tengo frio', 'tengo frío', 'truma', 'webasto', 'calor', 'agua caliente'],
        response: '🌡️ Calefacción / Agua caliente:\n1. La calefacción suele funcionar con GAS o DIESEL (según modelo). \n2. Si da error, comprueba que haya combustible o gas suficiente.\n3. Un error común es falta de presión de agua. ¿Has revisado la bomba?'
    },
    errores_generales: {
        keywords: ['error', 'fallo', 'roto', 'no funciona', 'avería', 'averia', 'ayuda'],
        response: '🔧 Soporte Técnico:\nVeo que tienes un problema. Por favor, especifica si es de AGUA, LUZ, GAS o MOTOR para poder darte pasos de solución específicos.'
    }
};

function processMessage(message) {
    const msg = message.toLowerCase();
    
    for (const key in intents) {
        if (intents[key].keywords.some(keyword => msg.includes(keyword))) {
            return intents[key].response;
        }
    }
    
    return "Lo siento, no he entendido esa pregunta. 🚐 Por favor, prueba con palabras clave como 'luz', 'agua', 'poti' o 'normativa'.";
}

module.exports = { processMessage };
