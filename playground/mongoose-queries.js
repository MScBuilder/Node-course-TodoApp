const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

const id = '5b8e68007c014c1bece75ad1';

// if (!ObjectID.isValid(id)) {
//     console.log('Id not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log('Id not found')
    }
    console.log('Todo By Id', todo)
}).catch((e) => {
    console.log(e)
});

const id2 = '5b80555553d67515487c53dc';

User.findById(id2).then((user) => {
    if(!user) {
        return console.log('User not find');
    }
    console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => {
    console.log(e)
});