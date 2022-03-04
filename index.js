'use strict'

import express from "express";
import configDbMongo from './src/configs/config';
import route from "./src/routes";
import cors from 'cors';
import updateEveryDay from "./src/middlewares/cronJob";



require('dotenv').config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.set(configDbMongo);
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use("/api/v1", route);
app.set(updateEveryDay.start())


app.listen(PORT,() =>console.log(`Running on Port ${PORT}`));