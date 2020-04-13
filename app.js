
const fs = require('fs');
const chalk = require("chalk");
const yargs = require("yargs")
let id = 0;

function loadData() {
    const buffer = fs.readFileSync("./data/database.json")
    const data = buffer.toString();
    return JSON.parse(data)
}



function saveData(todo) {
    data = loadData()
    data.push(todo)
    fs.writeFileSync("./data/database.json", JSON.stringify(data))
}

function addTodo( todoId,  todoBody, todoStatus) {
    saveData({ id:todoId todo: todoBody, status: todoStatus })
}


yargs.command({
    command: "add",
    describe: "add some todo",
    builder: {
        todo: {
            describe: "content of our todo",
            demandOptions: true,
            type: "string"
        },
        status: {
            describe: "status of your todo",
            type: "boolean",
            demandOptions: false,
            default: false
        }
    },
    handler: function ({ todo, status }) {
        addTodo(todo, status)
    }

})

yargs.command({
    command: "list",
    describe: "add some todo",
    builder: {
        status: {
            describe: "status of your todo",
            type: "boolean",
            demandOptions: false,
            default: "all"
        }
    },
    handler: function (args) {
        console.log(args)

        const todos = loadData();
        for (let { id, todo, status } of todos) {
            if (args.status === "all") {
                console.log(chalk.bold.blue(todo, status))
            } else if (status === args.status)
                console.log(chalk.bold.blue(todo, status))
        };
    }
})

yargs.parse();