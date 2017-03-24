var fs = require('fs');
//create class for todo list 
class todo {
    constructor() { }

    // view the list
    // ======================================
    getTodos() {
        var list = fs.readFileSync('./todo.txt', 'utf8', function (error, data) {
            if (error) {
                throw error;
            }
        });
        return list.split('\r\n')


    }
    // Add a new task
    // ======================================
    addToDo(value) {
        fs.appendFileSync('./todo.txt', value);
        var message = "your new item has been added"
        return message;
    }

    // update a task
    // ======================================
    updateToDo(lineno, value) {
        var todoArr = this.getTodos()
        var index = lineno - 1
        todoArr[index] = value;
        this.resetToDo();
        var newlist = todoArr.toString().replace(/,/g, '\r\n');
        this.addToDo(newlist);

    }

    // Reset the list
    // ======================================
    resetToDo() {
        fs.writeFile('./todo.txt', '');
        var message = "your list has been resetted"
        return message;
    }

    // Remove a task
    // ======================================
    removeToDo(item) {
        fs.readFile('./todo.txt', 'utf8', (err, data) => {
            if (err) throw err;

            var data = data.split('\n');
            data.splice(item - 1, 1);
            var restData = data.join('\n');
            fs.writeFile('./todo.txt', restData, (err) => {
                if (err) throw err;
            });
        });
    }
}


module.exports = todo;