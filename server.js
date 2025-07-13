const express = require('express');

const app = express();  
const dotenv = require('dotenv').config();

const connectDB = require('./config/connectionDB');
const PORT =  process.env.PORT||3000;
const API=process.env.API
connectDB();

app.use(express.json());
const cors = require('cors');
app.use(cors());
app.use(`${API}/recipe`, require('./routes/recipe'));
app.use(`${API}/user`, require('./routes/user'));
app.use(`${API}/public`, express.static('public'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});