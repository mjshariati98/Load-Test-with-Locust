const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;

// redis client
const redis = require("redis");
const client = redis.createClient();

client.on("error", function (error) {
    console.error(error);
});

// sha256
const { createHash } = require("crypto");

function hash(string) {
    return createHash("sha256").update(string).digest("hex");
}

//get
app.get("/node/sha256", (req, res) => {
    const { shaInput } = req.query;
    const result = client.get(shaInput, function (err, reply) {
        if (err) {
            res.status(500).send("Something is wrong.");
            return;
        }
        if (reply == null) {
            res.status(400).send("Not exists.");
            return;
        }
        res.status(200).send(reply);
    });
    if (!result) {
        res.status(500).send("Redis is down.");
    }
});

//post
app.post("/node/sha256", (req, res) => {
    const InputString = req.body.InputString;
    if (InputString.length < 8) {
        res.status(400).send("String length must be greater than 7.");
        return;
    }
    const hashed = hash(InputString);
    const result = client.set(hashed, InputString);
    if (!result) {
        res.status(500).send("Redis is down.");
        return;
    }
    res.status(200).send(hashed);
});

app.listen(port, () => {
    console.log(`NodeJS server listening at http://localhost:${port}`);
});
