const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose.js');
const {Todo} = require('./models/todo.js');
const {User} = require('./models/user.js');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', function(req, res) {
    Todo.find().then(function(todos){
        res.send({todos});
    }, function(e) {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', function(req, res) {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findById(id).then(function(todo){
        if (!todo){
            return res.status(404).send()
        }
        res.send({todo});  
    }).catch(function(e) {
        return res.status(400).send()
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};