const MongoDb = require('mongodb');
const Schema = MongoDb.Schema;

const todoSchema = new Schema({
    username: String,
    todo: String,
    isDone: Boolean,
    hasAttachment: Boolean
});

const Todos = MongoDb.Schema('Todos', todoSchema);
module.exports = Todos;