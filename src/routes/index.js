import express from "express";
//import controllers

import { getDataCovid, updateDataCovids } from '../controllers/saveDataCovidControllers';
const router = express.Router();

//get data covid
router.get("/data/covids", getDataCovid);
router.post("/data/covid/update", updateDataCovids);






export default router;