const express = require('express');
const axios = require('axios');
const nbt = require('prismarine-nbt')

const router = express.Router();

const extractAuctionItem = async (item) => {
  let itemBytes = item.item_bytes;
  let data = Buffer.from(itemBytes, 'base64');
  try {
    const { parsed: parsedItem } = await nbt.parse(data);
    return {
      name: item.item_name,
      id: parsedItem.value.i.value.value[0].id.value,
      extra: item.extra,
      bin: (item.bin? true: false),
      currentPrice: item.starting_bid,
    }
  } catch (error) { 
    console.log(error);
    return null;
  }
}

router.get('/get-auction', async (req, res, next) => {
  try {
    const auctionJson = await axios('https://api.hypixel.net/skyblock/auctions');
    console.log(auctionJson);
    const auctionItems = auctionJson.data.auctions.map(item => extractAuctionItem(item));
    const res5 = await Promise.all(auctionItems);
    console.log(res5);
    res.send(
      res5
    );  
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});


module.exports = router;
