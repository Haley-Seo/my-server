const express = require('express');
// const bodyParser = require('body-parser');

const app = express();

const auctionRoutes = require('./routes/auction-items');
const playerRoutes = require('./routes/player-items');
const playerRawRoutes = require('./routes/player-raw');

// app.use(bodyParser.urlencoded({extended: false}));

app.use(auctionRoutes);
app.use(playerRoutes);
app.use(playerRawRoutes)

app.listen(process.env.PORT || 4000);
