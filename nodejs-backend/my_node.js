const express = require('express')
const app = express()
app.use(express.json())   
const port = 3000

// redis client
const redis = require("redis");
const client = redis.createClient();

client.on("error", function(error) {
  console.error(error);
});

// sha256
const { createHash } = require('crypto');

function hash(string) {
  return createHash('sha256').update(string).digest('hex');
}

//get
app.get('/node/sha256', (req, res) => {
  const {
    shaIn,
  } = req.query;
  client.get(shaIn, function(err, reply) {
    if(reply == null){
      res.send("not exist");
      return
    }
    res.send(reply);
  });
});

//post
app.post('/node/sha256', (req, res) => {
  const stIn = req.body.stIn
  if (stIn.length < 8) {
    res.send("-1");   // this is a string!!!!!!!!!!!!
    return
  }
  const hashed = hash(stIn) 
  client.set(hashed, stIn);
  res.send(hashed);
  
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

