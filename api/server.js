const express = require('express');
var cors = require("cors");
const app = express();

app.use(cors());
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const port = process.env.SERVER_PORT || 3010;
const mongoose = require('mongoose');
const projectModel = require('./models/project/project.model.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
// Replace the following with your Atlas connection string                                                                                                                                        
const connectionUrl = process.env.MONGODB_URI;
mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
  }).catch(error => {
    console.log(error);
  }); 

//import routes
const projectRoutes = require('./routes/project/project.route.js'); 

//register the route
projectRoutes(app);

app.listen(port, () => {
  console.log(`> API listening at http://localhost:${port}`)
})