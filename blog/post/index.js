const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const post ={};
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(post);
});

app.post('/post', (req, res) => {
   try{ const id = randomBytes(4).toString('hex');
    const {title} = req.body;
if (!title) return res.send("enter some value")
    post[id]= {
        id,
        title
    }

    return res.status(201).send({message:"success"});
   }catch(e){
    return res.status(400).send({message:"error"});
   }
})
app.listen('1000', (req, res) => {
    console.log('Spost listen on port 1000');
})


