const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cron = require('node-cron');

const client = new Client({
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', qr => {
    console.log('Scan this QR code:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp is ready!');

    // Schedule message at specific time daily
    // Example: 14:30 (2:30 PM)
    cron.schedule('48 9 * * *', () => {

    const number = "918870614461@c.us"; // replace with your number

    client.sendMessage(number, "Scheduled test message at 9:30 AM ✅")
        .then(() => console.log("Scheduled message sent"))
        .catch(err => console.log(err));

}, {
    timezone: "Asia/Kolkata"
});

});

client.initialize();