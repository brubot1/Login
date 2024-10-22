const { Client, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Inicialize o cliente do WhatsApp
const client = new Client({
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
});

// Gera o QR Code no terminal
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Escaneie o código QR acima com o WhatsApp para autenticar.');
});

// Bot pronto
client.on('ready', () => {
    console.log('Bot está pronto para uso!');
});

// Evento de mensagem recebida
client.on('message', async (message) => {
    if (message.hasMedia) {
        const media = await message.downloadMedia();
        client.sendMessage(message.from, media, { caption: 'Aqui está sua mídia!' });
    }
});

// Inicialize o bot
client.initialize();
