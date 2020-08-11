const express = require('express');
const bodyParser = require('body-parser');
const port = 5048;
var items = ["WakeUp", "Exercise 10 Mins"];
var workItems = [];
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    var day = today.toLocaleDateString("en-Us", options);

    res.render('list', { lisTitle: day, newListItems: items });
});

app.post('/', (req, res) => {
    var item = req.body.newItem;
    if (req.body.list === 'Work List') {
        workItems.push(item);
        res.redirect('/work');
    } else {
        items.push(item);
        res.redirect('/');
    }

});

app.get('/work', (req, res) => {
    res.render('list', { lisTitle: "Work List", newListItems: workItems });
});


app.listen(port, () => {
    console.log(`The server is Listening to ${port}`);
});