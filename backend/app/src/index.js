const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');
const DatabaseMemory = require('./database/database-memory');
const jwt = require("jsonwebtoken")
require('dotenv').config();


const app = express();
const PORT = 3000;
const database = new DatabaseMemory();
const client = new OAuth2Client();

const corsOptions = {
  origin: "http://localhost:4200",
  credentials: true 
}
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post("/api/user/create", (req, res) => {

  try {
    const user = req.body;
    if(user){
      const userCreated = database.create(user);
      console.log("Usuário criado pelo form: "+ JSON.stringify(userCreated));
      const token = jwt.sign({id:userCreated.id}, process.env.MY_SECRET, {expiresIn: 100});
      return res.status(201).json({user:userCreated, token: token});
    }
  } catch (error) {
    return res.status(500).json({error: error})
  }

})

app.get("/api/secret", (req, res) => {
    const google_client_id = process.env.GOOGLE_CLIENT_ID;
    res.status(200).json({client_id: google_client_id})
});


//Rota do usuário o autentificado pelo google
app.post('/api/auth/google', async (req, res) => {
  const { credential } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
      
    });

    const payload = ticket.getPayload();

    const user = {
      nome: payload.name,
      email: payload.email,
      foto: payload.picture,
      idGoogle: payload.sub,
    };

    const userCreated = database.create(user);
    console.log("Usuário criado pelo login google:"+userCreated);
    const token = jwt.sign({id:userCreated.id}, process.env.MY_SECRET, {expiresIn: 100})
    res.status(200).json({token: token, user:userCreated});

  } catch (error) {
    console.error('Erro ao verificar token:', error);
    res.status(401).json({ mensagem: 'Token inválido ou expirado' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
