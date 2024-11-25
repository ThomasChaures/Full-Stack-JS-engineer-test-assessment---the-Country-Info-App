import express from "express";
import {
  getAvailableCountries,
  getCountryInfo,
} from "../service/api.service.js";

const router = express.Router();


router.get("/available-countries", async (req, res) => {
  try {
    const countries = await getAvailableCountries();
    res.json(countries);
  } catch (error) {
    console.error("Error in /available-countries:", error.message);
    res.status(500).json({ error: "Error to get data." });
  }
});


router.get("/country-info/:countryCode", async (req, res) => {
  const { countryCode } = req.params;

  if (!countryCode || countryCode.length !== 2) {
    return res.status(400).json({ error: "Invalid Code." });
  }

  try {
    const countryInfo = await getCountryInfo(countryCode.toUpperCase());
    res.json(countryInfo);
  } catch (error) {
    console.error("Error in /country-info:", error.message);
    res.status(500).json({ error: "Error to get data." });
  }
});

export default router;
