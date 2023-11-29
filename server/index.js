require("dotenv").config();
// pi3/server/index.js
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

// database connection
connection();

app.use(bodyParser.json());

// middlewares
app.use(express.json());
app.use(cors());

// Configuração do Multer para o upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Rota para upload de imagens
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("Nenhuma imagem enviada.");
  }

  const imagePath = path.join(__dirname, "uploads", req.file.filename);
  return res.status(200).json({ imagePath });
});

app.post("/updateCardInfo", (req, res) => {
  const { title, description } = req.body;

  // Lógica para salvar as informações no banco de dados ou realizar qualquer outra ação necessária

  res
    .status(200)
    .json({ message: "Informações do card atualizadas com sucesso." });
});

//routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
