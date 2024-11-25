import express from "express";
import cors from "cors";
import countryRoutes from "./routes/countries.js";

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", countryRoutes);


const PORT = 3333;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
