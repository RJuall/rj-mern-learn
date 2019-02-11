const configValues = require('./config');

module.exports = {
    getDbConnectionString: function() {
        return 'mongodb+srv://' + configValues.uname + ':' + configValues.pwd + 
            '@node-todo-sample-jamhw.mongodb.net/test?retryWrites=true';
    }
}