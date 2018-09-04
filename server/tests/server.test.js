const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo')

const todos = [{
    text: 'First test todo'
},{
    text: 'Second test todo'
}];

beforeEach((done) => {
    Todo.deleteMany({}).then(function() {
        return Todo.insertMany(todos);
    }).then(function () {done()});
});

describe('POST /todos', () => {
    it('Should create a new todo', function(done) {
        let text = 'Text for testing todo';
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create todo with invalid bod data', function (done) {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err)
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            })
    })
});

describe('GET /todos', function() {
    it('Should get all todos', function(done){
        request(app)
            .get('/todos')
            .expect(200)
            .expect(function(res){
                expect(res.body.todos.length).toBe(2);
            })
            .end(done)
    });
});