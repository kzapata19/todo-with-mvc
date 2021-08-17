const Todo = require('../models/Todo')

module.exports = {
    getTodos: async (req, res) => {
        try {
            const todoItems = await Todo.find()
            const itemsLeft = await Todo.countDocuments({ completed: false })
            res.render('todos.ejs', { todos: todoItems, left: itemsLeft })
        } catch(err) {
            console.log(err)
        }
    },
    createTodo: async (req, res) => {
        try {
            await Todo.create({ todo: req.body.todoItems, completed: false })
            console.log('Task has been added!')
            res.redirect('/todos')
        } catch(err) {
            console.log(err)
        }
    },
    markComplete: async (req, res) => {
        try {
            await Todo.findOneAndUpdate({ _id: req.body.todoIdFromJSFile }, {
                completed: true
            })
            console.log('Marked complete')
            res.json('Marked complete')
        } catch(err) {
            console.log(err)
        }
    },
    markIncomplete : async (req, res) => {
        try {
            await Todo.findOneAndUpdate({ _id: req.body.todoIdFromJSFile }, {
                completed: false
            })
            console.log('Marked incomplete')
            res.json('Mark incomplete')
        } catch(err) {
            console.log(err)
        }
    }, 
    deleteTodo: async (req, res) => {
        console.log(req.body.todoIdFromJSFile)
        try {
            await Todo.findOneAndDelete({ _id: req.body.todoIdFromJSFile })
            console.log('Deleted todo')
            res.json('Deleted it')
        } catch(err) {
            console.log(err)
        }
    }
}