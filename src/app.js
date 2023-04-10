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

app.get("/tweets", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const maxAmount = 10;
    const startIndex = (page - 1) * maxAmount;
    const endIndex = page * maxAmount;

  
    if (page < 1) {
      return res.status(400).send("Informe uma página válida!");
    }
  
    const filteredTweets = tweets.filter((tweet) => {
      const user = userList.find((u) => u.username === tweet.username || u.avatar === tweet.username);
      if (user) {
        tweetList.push({ ...user, tweet: tweet.tweet });
        return true;
      }
      return false;
    });
  
    const viewedTweets = {
      page: page,
      tweets: tweetList.slice(startIndex, endIndex),
      totalPages: Math.ceil(filteredTweets.length / maxAmount),
    };
  
    res.send(viewedTweets);
  });
  
  


app.listen(5000, () => console.log('Servidor rodando na porta 5000'))