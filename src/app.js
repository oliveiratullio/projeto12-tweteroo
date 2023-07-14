import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
  const { username, avatar } = req.body;

  const user = { username, avatar };
  users.push(user);

  res.status(201).send('OK');
});

app.post('/tweets', (req, res) => {
  const { username, tweet } = req.body;

  if (!username || !tweet) {
    return res.status(400).send('Todos os campos são obrigatórios!');
  }

  const isAuthorized = users.find((user) => user.username === username);

  if (!isAuthorized) {
    return res.sendStatus(401);
  }

  const newTweet = { username, tweet };
  tweets.push(newTweet);

  res.status(201).send('OK');
});

app.get('/tweets', (req, res) => {
  const { page } = parseInt(req.query);

  if (page) {
    if (page < 1) {
      return res.status(400).send('Informe uma página válida!');
    }

    const limit = 10;
    const start = (page - 1) * limit;
    const end = page * limit;

    if (tweets.length > 10) {
      const tenTweets = tweets
        .map((t) => {
          const newFormat = users.find((u) => u.username === t.username || u.avatar);
          return { ...newFormat, tweet: t.tweet };
        })
        .slice(start, end)
        .reverse();

      return res.send(tenTweets);
    }

    const lessThan10Tweets = tweets
      .map((t) => {
        const newFormat = users.find((u) => u.username === t.username || u.avatar);
        return { ...newFormat, tweet: t.tweet };
      })
      .reverse();

    res.send(lessThan10Tweets);
  }

  const tenLastTweets = tweets
    .map((t) => {
      const newFormat = users.find((u) => u.username === t.username || u.avatar);
      return { ...newFormat, tweet: t.tweet };
    })
    .slice(-10)
    .reverse();

  res.send(tenLastTweets);
});
const a = 0;

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
