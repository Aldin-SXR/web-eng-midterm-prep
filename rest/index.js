const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const mongoDB = require("mongodb").MongoClient;
const {ObjectID} = require("mongodb");
let port = process.env.PORT || 5000;
let db;
let mongoDbUri = "mongodb://aldin_sxr:testing97@ds145750.mlab.com:45750/mean-stack-workshop";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/users", (req, res) => {
    db.collection("users").find().toArray((error, users) => {
        if (error) {
            return console.log(error);
        }
        res.json(users);
    });
})

app.get("/users/:id", (req, res) => {
    db.collection("users").findOne({ _id: ObjectID(req.params.id) }, (error, user) => {
        if (error) {
            return console.log(error);
        }
        if (user) {
            res.json(user);
        } else {
            res.status(404).send({ status: "Not found." });
        }
    })
});

app.post("/users", (req, res) => {
    /* creating a new user object in order to avoid adding uncessary fields later on */
    let user = {
        name: req.body.name,
        surname: req.body.surname,
        email_address: req.body.email_address,
        phone_number: req.body.phone_number,
        age: req.body.age,
        gpa: req.body.gpa,
        enrolled: req.body.enrolled
    }
    db.collection("users").insertOne(user, (error, result) => {
        if (error) {
            return console.log(error);
        }
        res.json(result.ops[0]);
    })
});

app.put("/users/:id", (req, res) => {
    delete req.body._id;
    db.collection("users").findOneAndUpdate({ _id: ObjectID(req.params.id) }, { $set: req.body }, (error, result) => {
        if (error) {
            return console.log(error);
        }
        if (result.value) {
            res.json({
                ...result.value,
                ...req.body
            });
        } else {
            res.status(404).send({ status: "Not found." });
        }
    });
});

app.delete("/users/:id", (req, res) => {
    db.collection("users").findAndRemove({ _id: ObjectID(req.params.id) }, (error, result) => {
        if (error) {
            return console.log(error);
        }
        if (result.value) {
           res.json(result.value);
        } else {
            res.status(404).send({ status: "Not found." })
        }
    })
});

mongoDB.connect(mongoDbUri, (error, database) => {
    if (error) {
        return console.log(error);
    }
    db = database;
    app.listen(port, () => {
        console.log("Server listening on port: " + port);
    });
});
