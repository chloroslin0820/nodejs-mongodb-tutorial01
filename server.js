import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Thread from "./models/Thread.js";

const app = express();
const PORT = 3000;

// express JSONの使用を宣言
app.use(express.json());

// express クライアント部分と接続設定
app.use(express.static("public"));

// dotenv 部分
dotenv.config();
// const dbUri = process.env.MONGODB_URI;
const dbUri = "mongodb+srv://chloroslin:12345120maths@trial531.tijmifl.mongodb.net/threads?retryWrites=true&w=majority&appName=trial531";

// mongoose データベースと接続部分
mongoose
.connect(dbUri)
.then(() => console.log('データベースに接続成功'))
.catch((err) => console.log('エラーが発生しました:', err));

// API 設置 (GET)
app.get("/api/v1/threads", async (req, res) => {
    try {
        const allThreads = await Thread.find({});
        res.status(200).json(allThreads);
    } catch (err) {
        console.log(err);
    }
});

// API 設置 (POST)
app.post("/api/v1/thread", async (req, res) => {
    try {
        const createThread = await Thread.create(req.body);
        res.status(200).json(createThread);
    } catch (err) {
        console.log(err);
    }
});

// サーバーが起動
app.listen(process.env.PORT || PORT, console.log("サーバーが起動しました", process.env.PORT));