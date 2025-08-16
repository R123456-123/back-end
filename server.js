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
  res.send('Welcome to the Express Server');
})

app.get('/users', (req,res) => {
  console.log(req.query);
  res.send('Filtering users based on age$(req.query.age), city$(req.query.city)');
})

// app.post('/users', (req,res) => {
//   console.log(req.body);
//   res.json({
//     msg: 'User created',
//     user: req.body
//   })
// })

app.get('/users/:id', (req,res) => {
  console.log(req.params);
  res.send(`Fetching user with ID: ${req.params.id}`);
})

// app.get('/', (req,res) => {
//     res.json({
//       id: 1,
//       name: 'Express Server'
//     });
// })

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/google', (req,res) => {
  res.redirect('https://www.wikipedia.org/wiki/Google');
})

app.get('/error', (req,res) => {
  res.status(500).json({
    error: 'Internal Server Error'
  })
})

// app.get('/download', (req,res) => {
//   res.download('sample.txt', (err) => {
//     if(err) {
//       console.log('Error downloading file', err);
//       res.status(500).send('Error downloading file');
//     } else {
//       console.log('File downloaded successfully');
//       res.status(200).send('File downloaded successfully');
//     }
//   })
// })

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})
