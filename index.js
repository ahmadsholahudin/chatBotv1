const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const pino = require('pino');

async function startBot() {
  const auth = await useMultiFileAuthState('session');
  const sock = makeWASocket({
    printQRInTerminal: true,
    logger: pino ({ level: 'silent' }),
    browser: ['Ubuntu', 'Chrome', '1.0.0'],
    auth: auth
  });
  sock.ev.on('creds.update' auth.saveCreds);
  sock.ev.on('connection.update', (connection) => {
    if (connection ==='open') console.log('isOpen')
    if (connection ==='close') startBot()
  });
};
startBot();
