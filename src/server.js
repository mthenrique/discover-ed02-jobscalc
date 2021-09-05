const express = require("express");
const server = express();
const routes = require("./routes");
const path = require("path");

//Motor de visualização
server.set("view engine", "ejs");

//Mudar a localização da pasta Views
server.set("views", path.join(__dirname, "views"));

//Usar o req.body
server.use(express.urlencoded({extended: true}));

//Habilitar arquivos statics
server.use(express.static("public"));

//Routes
server.use(routes);

//Server
server.listen(8080, () => console.log('SERVIDOR RODANDO!'));

