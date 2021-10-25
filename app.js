const express = require('express');
// const bodyParser = require('body-parser');

const app = express();

const auctionRoutes = require('./auctioni-items');
const playerRoutes = require('./player-items');

// app.use(bodyParser.urlencoded({extended: false}));

app.use(auctionRoutes);
app.use(playerRoutes);

app.listen(3000);
