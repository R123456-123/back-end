// server.js with ES6 modules
import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

connectDb();

app.use(cors());
app.use(helmet());
app.use(morgan('combined'))
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req,res) => {
    res.json({message: 'MERN API is running'});
})

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/about', (req,res) => {
    res.send('About Page');
})

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})
