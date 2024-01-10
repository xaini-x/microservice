const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(cors());

let commentByPostId = {};

app.get('/post/:id/comment', async (req, res) => {
    const { id } = req.params;
    return res.send(commentByPostId[id] || []);
});

app.post('/post/:id/comment', async (req, res) => {
    const commentID = randomBytes(4).toString('hex');
    const { comment } = req.body;
    const { id } = req.params;
    const currentComments = commentByPostId[id] || [];
    currentComments.push({ id: commentID, comment: comment });
    commentByPostId[id] = currentComments;
    return res.status(201).send("Comment created on post " + id);
});

app.listen('2000', () => {
    console.log("Comments service listening on port 2000");
});
