const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

Todo.findOneAndRemove({_id: '5b92b2958d42d6c64b5e78ed'}).then((todo) => {
    console.log(todo);
});

Todo.findByIdAndRemove('5b92b2958d42d6c64b5e78ed').then((todo) => {
    console.log(todo);
});