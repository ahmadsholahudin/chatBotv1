const {default: makeWASocket, useMultiFileAuthState} = require('@whiskeysockets/baileys');
const pino = require('pino');
const pairingCode = true;
const readline = require('readline');
const question = (text) => {
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});
return new Promise((resolve) => {
rl.question(text, (answer) => {
    rl.close();
    resolve(answer);
});
});
};

const { handleMessages, handleGroupEvent } = require('./handler');

async function startBot() {
    try {
const {state, saveCreds} = await useMultiFileAuthState('session')
const sock = makeWASocket({
printQRInTerminal: !pairingCode,
logger: pino({level: 'silent'}),
browser: ['Ubuntu', 'Chrome', ''],
auth: state
})
if (pairingCode && !sock.authState.creds.registered) {
const phoneNumber = await question('Please input your WhatsApp number: \n')
const code = await sock.requestPairingCode(phoneNumber)
console.log(`Pairing code: ${code}`)}
sock.ev.on('creds.update', saveCreds)
sock.ev.on('connection.update', ({connection}) => {
if (connection === 'close') startBot()
if (connection === 'open') console.log('opened connection')
})
sock.ev.on('messages.upsert', ({messages}) => {
    const m = messages[0];
    if (!m.message) return;
    const type = Object.keys(m.message)[0];
    const chat = type === 'conversation' ? m.message.conversation : type === 'extendedTextMessage' ? m.message.extendedTextMessage.text : type === 'imageMessage' ? m.message.imageMessage.caption : '';
    const command = 
})

    } catch (err) {
        console.error('Fatal error:', err);
        setTimeout(startBot, 10000);
      }
};
startBot();