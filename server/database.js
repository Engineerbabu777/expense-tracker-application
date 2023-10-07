import mongoose from "mongoose"

export const databaseConnect = () => {
    mongoose
  .connect(
    'mongodb+srv://awaismumtaz0099:778677867786a..@cluster0.xyaegfu.mongodb.net/expense'
  )
  .then(() => console.log('Connected to MongoDB'))
}
