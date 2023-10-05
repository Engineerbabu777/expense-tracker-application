const mongoose = require('mongoose');

const databaseConnect = () => {
    mongoose
  .connect(
    'mongodb+srv://awaismumtaz0099:778677867786a..@cluster0.zxm1ozf.mongodb.net/expense'
  )
  .then(() => console.log('Connected to MongoDB'))
}

module.exports = databaseConnect;