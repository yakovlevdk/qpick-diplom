const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = 3000;


const routes = require('./routes/index')

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes)
mongoose
  .connect(
    'mongodb+srv://yakovlevdk39:lasos2281@cluster0.0k8rc.mongodb.net/qpick?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server has been started on port ${port}`);
    });
  });
