var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var router = express.Router();


module.exports = router;

// import todo object
var todo = require('./../app/models/todo');
var todo = new todo;

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// homepage Router 
//=============================================
router.get('/', function (req, res) {
    res.redirect('/api');
});

// API Home & Help 
//=============================================
router.get('/api', function (req, res) {
    res.json({ message: 'Welcome , for help visit https://github.com/suhaib81/todoApi' });
});
// (/api/list) router for (view) and (reset) the list
//=============================================
router.route('/api/list')

    // view the list
    //--------------------
    .get(function (req, res) {

        res.json({ list: todo.getTodos() });

    })

    // reset the list
    //--------------------
    .delete(function (req, res) {
        res.status(200);
        res.json({ message: todo.resetToDo() });

    });

// (/api/list/:todo) router for (add) and (delete) item from the list
//=============================================
router.route('/api/list/:todo')

    // add new item to the list
    //--------------------
    .post(function (req, res) {
        var task = req.params.todo
        var listLength = todo.getTodos().length

        if (!(listLength == 1 && todo.getTodos()[0] == '')){
            task = '\r\n' + task
        }
        
        if (task == '') {
            res.status(500);
            res.json({ message: `You can't add an empty value!` });
        } else {
            res.status(200);
            res.json({ message: todo.addToDo(task) });
        }


    })

    // remove item from the list
    //--------------------
    .delete(function (req, res) {
        var lineno = parseInt(req.params.todo);
        var listLength = todo.getTodos().length
        if (!lineno) {
            res.status(500);
            res.json({ message: req.params.todo + ' : is not number' });
        } else if (lineno > listLength) {
            res.status(500);
            res.json({ message: ' sorry , you have only ' + listLength + ' items' });
        } else {
            todo.removeToDo(lineno)
            res.status(200);
            res.json({ message: 'the task has been removed' });
        }
    });


// (/api/list/:lineNo/:task) router for (update) an item in the list
//=============================================
router.route('/api/list/:lineNo/:task')

    // update item in the list
    //--------------------
    .put(function (req, res) {

        var lineNo = parseInt(req.params.lineNo);
        var task = req.params.task;
        var listLength = todo.getTodos().length;

        if (!lineNo) {
            res.status(500);
            res.json({ message: req.params.todo + ' : is not number' });
        } else if (lineNo > listLength) {
            res.status(500);
            res.json({ message: ' sorry , you have only ' + listLength + ' items' });
        } else {
            todo.updateToDo(lineNo, task)
            res.status(200);
            res.json({ message: 'the task has been updated' });
        }
    });

// Nor found (404)
//=============================================
router.get('*', function (req, res) {
    res.status(406);
    res.json({ message: 'This request is Not Acceptable' });
});