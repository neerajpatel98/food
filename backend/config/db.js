import mongoose from "mongoose";

export const connectDB  = async () => {
    await mongoose.connect('mongodb+srv://neeraj78000spsd:444444@cluster0.zfxnj.mongodb.net/food-del').then(() => console.log("DB connected"))
     
}