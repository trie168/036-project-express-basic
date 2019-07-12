const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const todoList = require('./todoData')

// parse aplikasi
app.use(bodyParser.urlencoded({ extended: false }));
// pase aplikasi json
app.use(bodyParser.json());


// get all todo list
app.get('/', (req, res) => {
    res.send(todoList);
});
app.get('/:id', (req, res) => {
    try {
        const filterTodo = todoList.find(item => item.id == req.params.id);
        res.send({
            message: 'Here is what you looking for',
            filterTodo
        });
    } catch (error) {
        res.send(error);
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Your server is runing on PORT' + process.env.PORT);
});