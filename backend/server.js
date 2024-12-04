import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";


// app config
const app = express();
// port
const port = process.env.PORT || 4000;

// add middleware
app.use(express.json());  // any request is comes from client or frontend it will parse using this middleware
app.use(cors());  // due to this we can excess backend from frontend


// db connection
connectDB();


// api endpoints
app.use('/api/food', foodRouter);
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get('/', (req, res) => {
    res.send("API is working");
})

app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`)
})

// mongodb+srv://neeraj78000spsd:444444@cluster0.zfxnj.mongodb.net/?