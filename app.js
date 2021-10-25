const express = require('express');
// const bodyParser = require('body-parser');

const app = express();

const auctionRoutes = require('./routes/auction-items');
const playerRoutes = require('./routes/player-items');

// app.use(bodyParser.urlencoded({extended: false}));

app.use(auctionRoutes);
app.use(playerRoutes);

app.listen(process.env.PORT || 4000);
