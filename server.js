const express = require('express');
const crypto = require('crypto');
const csrf = require('csurf');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const csrfProtection = csrf();

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return { encrypted, iv: iv.toString('hex') };
}

function decrypt(encrypted, ivHex) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(ivHex, 'hex'));
  let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
}

let messages = [];

app.use(session({
  secret: 'segredo-seguro',
  resave: false,
  saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(csrfProtection);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.post('/send', (req, res) => {
  const { message } = req.body;
  const encrypted = encrypt(message);
  messages.push(encrypted);
  res.json({ status: 'Mensagem enviada' });
});

app.get('/messages', (req, res) => {
  const decryptedMessages = messages.map(msg =>
    decrypt(msg.encrypted, msg.iv)
  );
  res.json({ messages: decryptedMessages });
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
