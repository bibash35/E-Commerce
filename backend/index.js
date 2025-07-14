const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

const { ConnectToDb } = require("./db/Connection");

dotenv.config();

ConnectToDb();


// CORS (Allow frontend access)
app.use(cors({
  exposedHeaders: "X-TOTAL-COUNT",
  origin: true,
  credentials: true,
}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});



app.use("/uploads", express.static("uploads"));

// Only parse JSON **after** file uploads handled (Multer will parse multipart)
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

const authRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const messageRoutes = require("./routes/message");

app.use("/api/products", productRoutes);     
app.use("/api/auth", authRoutes);
app.use("/api", messageRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
