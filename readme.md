
# APP-LOGIN

Aplicação desenvolvida para fins de conhecimento e desenvovimento da habilitade de codar.




## Funcionalidades

✔️ Implementação de Dark mode

✔️ Criação de usuário usando API autentificação Google.

✔️ Cadastro de usuário.

✔️ Proteção de rota no frontend.

✔️ API em node.js para criar token de acesso e percitencia do dados localmente usuário localmente.

✔️ Upload do front-end na nuvem na plataforma vercel.com e backend no render.com

# 📘 Documentação

Esta API permite criar usuários e autenticar via formulário ou Google OAuth. Abaixo estão as rotas disponíveis, parâmetros esperados e exemplos de respostas.

---

## 📌 Base URL

```
http://localhost:3000
```

---

## 📤 Rotas

### ✅ Criar Usuário e Retornar Token

```http
POST /api/user/create
```

Cria um novo usuário com nome e e-mail. Retorna um token JWT para autenticação.

#### Headers

| Nome         | Tipo     | Obrigatório | Descrição                   |
| ------------ | -------- | ----------- | --------------------------- |
| Content-Type | `string` | Sim         | Deve ser `application/json` |

#### Body

```json
{
  "nome": "Mario",
  "email": "mario@email.com"
}
```

| Parâmetro | Tipo     | Obrigatório | Descrição         |
| --------- | -------- | ----------- | ----------------- |
| `nome`    | `string` | Sim         | Nome do usuário   |
| `email`   | `string` | Sim         | E-mail do usuário |

#### Resposta (201)

```json
{
  "user": {
    "id": "1",
    "nome": "Mario José",
    "email": "mario@email.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

#### Possíveis Erros

| Código | Mensagem                 | Causa                            |
| ------ | ------------------------ | -------------------------------- |
| 400    | Dados inválidos          | Body incompleto ou mal formatado |
| 500    | Erro interno do servidor | Problemas no processo de criação |

---

### 🔐 Autenticação via Google

```http
POST /api/auth/google
```

Autentica um usuário usando um token de login do Google. Cria o usuário, se não existir, e retorna um token JWT.

#### Headers

| Nome         | Tipo     | Obrigatório | Descrição                   |
| ------------ | -------- | ----------- | --------------------------- |
| Content-Type | `string` | Sim         | Deve ser `application/json` |

#### Body

```json
{
  "credential": "TOKEN_GOOGLE_RECEBIDO"
}
```

| Parâmetro    | Tipo     | Obrigatório | Descrição                                |
| ------------ | -------- | ----------- | ---------------------------------------- |
| `credential` | `string` | Sim         | Token JWT de login fornecido pelo Google |

#### Resposta (200)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "user": {
    "id": "2",
    "nome": "Maria",
    "email": "maria@email.com",
    "foto": "https://...",
    "idGoogle": "1234567890"
  }
}
```

#### Possíveis Erros

| Código | Mensagem                   | Causa                             |
| ------ | -------------------------- | --------------------------------- |
| 401    | Token inválido ou expirado | Token do Google não é mais válido |
| 500    | Erro interno do servidor   | Problemas ao verificar o token    |

---

### 🔑 Obter Client ID do Google

```http
GET /api/secret
```

Retorna o `client_id` usado na autenticação Google. Útil para o frontend configurar o login.

#### Resposta (200)

```json
{
  "client_id": "1234567890-abc123def456.apps.googleusercontent.com"
}
```

---

## 🛠️ Execução

### Instalar dependências

```bash
npm install
```

### Executar servidor

```bash
node index.js
```

---


### Demo do projeto rodando em 
```
https://app-login-ten.vercel.app/
```