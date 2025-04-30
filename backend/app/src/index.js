const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

const app = express();
const PORT = 3000;

const client = new OAuth2Client();

const corsOptions = {
  origin: "http://localhost:4200",
  credentials: true 
}
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/api/secret", (req, res) => {
    const google_client_id = process.env.GOOGLE_CLIENT_ID;
    res.status(200).json({client_id: google_client_id})
});

app.post('/api/auth/google', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
      
    });

    const payload = ticket.getPayload();

    const user = {
      nome: payload.name,
      email: payload.email,
      foto: payload.picture,
      idGoogle: payload.sub,
    };


    res.status(200).json({ mensagem: 'Login com Google bem-sucedido', usuario: user });
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    res.status(401).json({ mensagem: 'Token inválido ou expirado' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
