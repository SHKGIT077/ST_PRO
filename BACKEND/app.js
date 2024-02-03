require('dotenv').config();
const mongoConnection = require('./App/Connection/connection')

const express = require("express");
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser')
const http = require("http");



const corsOpts = {
    origin: '*',
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept", "authorization",
    ],
  };
  app.use(cors(corsOpts));
  
  
  app.use(bodyparser.urlencoded({ extended: true }));
  app.use(bodyparser.json({ limit: '10mb', extended: true }));
  
  app.use(bodyparser.json());
  const server = http.createServer(app);
  app.use(express.json());
  
  require("./App/Routes/index")(app)

  
  // Server start
server.listen(process.env.PORT, () =>{

    console.log(`Server is running on http://0.0.0.0:${process.env.PORT}`)
  
  });