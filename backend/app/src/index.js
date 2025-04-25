// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Cliente OAuth do Google
const client = new OAuth2Client();

// Middlewares
const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true // se estiver usando cookies ou login com Google
}
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Rota de autenticação
app.post('/api/auth/google', async (req, res) => {
  const { token } = req.body;
  try {
    // Valida o token com o Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
      
    });

    const payload = ticket.getPayload();

    // Aqui você pode salvar/consultar o usuário no seu banco, se quiser
    const user = {
      nome: payload.name,
      email: payload.email,
      foto: payload.picture,
      idGoogle: payload.sub,
    };

    console.log('Usuário autenticado:', user);

    res.status(200).json({ mensagem: 'Login com Google bem-sucedido', usuario: user });
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    res.status(401).json({ mensagem: 'Token inválido ou expirado' });
  }
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
});
