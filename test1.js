const KEY = '238urodsjahgkw3uyq3_3kjlfw3jh';

const jwt = require('jsonwebtoken');

const token = jwt.sign( { email: 'aaa@bbb.ccc', password: '23o85eodifh33tfwe'}, KEY, { expiresIn: '2h'});

const decoded = jwt.verify(token, KEY);

console.log(decoded);


