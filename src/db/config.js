const sqlite3 = require("sqlite3");

//Apenas a funcionalidade Open do SQLite
const { open } = require("sqlite");

//Abrindo a conexão com o BD
module.exports = () => {
    open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });
};
