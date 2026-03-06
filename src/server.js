require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const clinicRoutes = require("./routes/clinic.routes");


const authRoutes = require("./routes/auth.routes");

connectDB();

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // your Next.js URL
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/clinics", clinicRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});