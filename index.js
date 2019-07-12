const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const todoList = require('./todoData')

// parse aplikasi
app.use(bodyParser.urlencoded({ extended: false }));
// pase aplikasi json
app.use(bodyParser.json());


// get all todo list
app.get('/todo', (req, res) => {
    res.send(todoList);
});
app.get('/:todo', (req, res) => {
    try {
        const filterTodo = todoList.find(item => item.todo == req.params.todo);
        res.send({
            message: 'Hi this is exercise project node express',
            filterTodo
        });
    } catch (error) {
        res.send(error);
    }
});

// add new todo
app.post('/todo', (req, res) => {
    try {
        let newId = todoList.length + 1;
        let newTodo = {
            id: newId,
            task: req.body.task,
            done: false
        };
        todoList.push(newTodo);
        res.status(200).send({
            message: 'todo success add',
            todoList
        });
    } catch (error) {
        res.send(error);
    }
});

// delete todo
app.delete('/:todo', (req, res) => {
    try {
        const deleteId = req.param.todo;
        let newTodo = todoList.filter(item => item.todo !== parseInt(deleteId));
        todoList = newTodo;
        res.status(200).send(todoList);
    } catch (error) {
        console.log(error);
    }
});

// update todo
app.put('/:todo', (req, res) => {
    try {
        let updateTodo = todoList.findIndex(data => data.todo == req.param.id);
        todoList.map(data => {
            if (data.todo == req.param.todo) {
                todoList[updateTodo].task = req.body.task;
            }
        });
        res.send({
            message: 'todo succes update',
            todoList
        });
    } catch (error) {
        res.send(error);
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Your server is runing on PORT' + process.env.PORT);
});