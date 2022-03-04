import express from "express";
import { getBacklogData } from "../controllers/getBackLogData";
//import controllers

import { getDataCovid, updateDataCovids } from '../controllers/saveDataCovidControllers';
const router = express.Router();

//get data covid
router.get("/data/covids", getDataCovid);
router.get("/data/backlog", getBacklogData);
router.post("/data/covid/update", updateDataCovids);






export default router;