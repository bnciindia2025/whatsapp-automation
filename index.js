const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cron = require('node-cron');

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "railway-session"
    }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ]
    }
});

client.on('qr', qr => {
    console.log('Scan this QR code:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp is ready!');

    cron.schedule('30 10 * * *', () => {

        const number = "918870614461@c.us";

        client.sendMessage(number, "Railway scheduled test message ✅")
            .then(() => console.log("Message sent successfully"))
            .catch(err => console.error("Error sending message:", err));

    }, {
        timezone: "Asia/Kolkata"
    });

});

client.on('auth_failure', msg => {
    console.error('AUTH FAILURE:', msg);
});

client.on('disconnected', reason => {
    console.log('Disconnected:', reason);
});

client.initialize();