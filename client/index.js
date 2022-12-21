const client = require("./client");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    client.getAll(null, (err, data) => {
        if (!err) {
            console.log(data.items);
            res.render("index", {
                items: data.items,
                test: [{name: 'name'}, {name: 'name'}]
            });
        }
    });
});
app.post("/save", (req, res) => {
    let newItem = {
        name: req.body.name,
        isDone: false,
        quantity: req.body.quantity

    };
    client.insert(newItem, (err, data) => {
        if (err) throw err;
        console.log("Запись создана", data);
        res.redirect("/");
    });
});
app.post("/update", (req, res) => {
    const updateItem = {
        id: req.body.id,
        isDone: req.body.isDone,
        name: req.body.name,
        quantity: req.body.quantity
    };
    client.update(updateItem, (err, data) => {
        if (err) throw err;
        console.log("Элемент успешно обновлён", data);
        res.redirect("/");
    });
});
app.post("/remove", (req, res) => {
    console.log(req.body)
    const id = {id: req.body.id}
    client.remove( id, (err, _) => {
        if (err) throw err;
        console.log("Элемент удалён");
        res.redirect("/");
    });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Сервер запущен на порту %d", PORT);
});
