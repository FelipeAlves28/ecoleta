const express = require("express");
const server = express();
const db = require("./database/db");

server.use(express.static("public"));

server.use(express.urlencoded({ extended: true }));

const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});

server.get("/", (req, res) => {
    return res.render("index.html");
});
server.get("/create-point", (req, res) => {
    return res.render("create-point.html");
});
server.post("/savepoint", (req, res) => {

    const query = `INSERT INTO places (name,image,address,address2,state,city,items) VALUES (?,?,?,?,?,?,?);`;
    const values = [
        req.body.name,
        req.body.image,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items];

    function afterInsertData(err) {
        if (err) {
            return console.log(err);
        }
        console.log("Cadastrado com Sucesso !");

        return res.render("create-point.html", { saved: true })
    }
    db.run(query, values, afterInsertData);

});

server.get("/search", (req, res) => {
    let search = req.query.search;
    
    if(search == ""){
        return res.render("search.html", { total: 0 });
    }

    db.all(`SELECT * FROM  places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            console.log(err);
            return res.send("Error ao Cadastrar");
        }
        const total = rows.length;
        return res.render("search.html", { places: rows, total: total });
    });

})

server.listen(3000);
console.log("Servidor Rodando na porta 3000");