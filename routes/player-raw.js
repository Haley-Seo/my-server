const express = require('express');
const axios = require('axios');
const nbt = require('prismarine-nbt')

const router = express.Router();

const extractPlayerItems = async (items) => {
  let data = Buffer.from(items, 'base64');
  try {
    const { parsed } = await nbt.parse(data);
    const items = parsed.value.i.value.value;
    // const newItems = items.map(el => {
    //   return {
    //     id: el.id.value,
    //     name: el.tag.value.display.value.Name.value.substring(2),
    //     extra: el.tag.value.ExtraAttributes.value.id.value.toLowerCase().split('_').join(' ')
    //   }
    // })

    return {
      items
    }
  } catch (error) { 
    console.log(error);
    return null;
  }
}

router.get('/get-player-raw', async (req, res, next) => {
  const apiKey = req.query.key;
  const playerId = req.query.uuid;
  const profile = req.query.profile;
  const profileUrl = 'https://api.hypixel.net/skyblock/profile'
  try {
    const playerJson = await axios(`${profileUrl}?key=${apiKey}&uuid=${playerId}&profile=${profile}`);
    const auctionItems = await axios('http://localhost:4000/get-auction');
    console.log('AUCTIONITEMS', auctionItems.data[0]);
    // console.log(playerJson);
    const newId = playerId.split('-').join('');
    const backPackData = playerJson.data.profile.members[newId].backpack_contents;
    const coins = playerJson.data.profile.members[newId].coin_purse;
    let backPacks = [];
    for (let key in backPackData) {
      const items = await extractPlayerItems(backPackData[key].data);
      console.log(items);
      backPacks.push(items);
    }
    // const auctionItems = playerJson.data.auctions.map(item => extractAuctionItem(item));
    // const res = await Promise.all(auctionItems);
    // console.log(res);
    res.send(
      { coins, backPacks } 
    );  
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});


module.exports = router;
