import express from "express";
import cors from "cors";

const app = express();
app.use(cors())
app.use(express.json())

const userList = [];
const tweetList = [];

app.post("/sign-up", (req, res) => {
    const {username, avatar} = res.body
    const user = { username, avatar}
    userList.push(user)
    res.status(201).send("OK")
})



app.listen(5000, () => console.log('Servidor rodando na porta 5000'))