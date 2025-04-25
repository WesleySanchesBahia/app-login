require("dotenv").config();
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
require("../auth/google");

const app = express();
const port = 3000;
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false, // true em produção (https)
      sameSite: "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Rotas de autenficação
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:4200/profile");
  }
);

app.get("profile", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Não autentificado!" });
  }

  res.json(req.user);
});

app.get("logout", (req, res) => {
  req.logOut(() => {
    res.redirect("http://localhost:4200/");
  });
});

app.get("/", (req, res) => {
  res.send("API de autentificação com Google");
});


app.listen(port, () => {
    console.log(`Aplicação rodando em http://localhost:${port}`);
})