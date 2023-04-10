import express from "express";
import cors from "cors";

const app = express();
app.use(cors())
app.use(express.json())

const userList = [];
const tweetList = [];

app.post("/sign-up", (req, res) => {
    const {username, avatar} = req.body
    const user = { username, avatar}
    userList.push(user)
    res.status(201).send("OK")
})

app.post("/tweets", (req, res) => {
    const {tweet} = req.body;
    const username = req.headers.user;

    const isAuthorized = users.some( (t) => t.username === username );

    if(!isAuthorized){
        res.status(401).send("UNAUTHORIZED");
        return;
    }
    
        const newTweet = {username, tweet}
        tweetList.push(newTweet);
        res.status(201).send("OK");
     
});




app.listen(5000, () => console.log('Servidor rodando na porta 5000'))