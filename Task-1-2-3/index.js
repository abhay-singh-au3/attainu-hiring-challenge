const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const PORT = 9000;
const URL = 'mongodb://localhost:27017'
const cities = require('../cities.json')
const IndiaState = require('./IndiaState')
app.use(express.static('assets'))

const dbName = 'hiring-challenge-abhay';
var db;
MongoClient.connect(URL, { useNewUrlParser: true }, function (err, client) {
    assert.equal(null, err);
    console.log('Connection Successfull!')
    db = client.db(dbName);
    const stateCollection = db.collection('state');
    // Creating all the collections with States
    for (let i = 0; i < IndiaState.length; i++) {
        stateCollection.insertOne({ "state": IndiaState[i] }).catch(err => console.error(err))
    }
    // Filling up the each states collection with city names
    for (let i = 0; i < cities.length; i++) {
        const cityName = cities[i].name;
        const stateName = cities[i].state;
        const newItem = { "state": stateName, "cities": [cityName] };
        stateCollection.findOne({ "state": stateName }, (err, data) => {
            if (err) throw err;
            if (!data) {
                stateCollection.insertOne(newItem).catch(err => console.error(err))
            } else {
                stateCollection.findOneAndUpdate({ "state": stateName }, { $push: { "cities": cityName } }).catch(err => console.error(err))
            }
        })
    }
})

// Inserting City:
app.put('/state/:stateName/add/:cityName', (req, res) => {
    const stateCollection = db.collection('state');
    const stateName = req.params.stateName;
    const cityName = req.params.cityName;
    stateCollection.findOneAndUpdate({ "state": stateName }, { $push: { "cities": cityName } }, (err, data) => {
        if (err) throw err;
        console.log(data)
        res.json(data)
    });
})

// Removing City:
app.put('/state/:stateName/remove/:cityName', (req, res) => {
    const stateCollection = db.collection('state');
    const stateName = req.params.stateName;
    const cityName = req.params.cityName;
    stateCollection.findOneAndUpdate({ "state": stateName }, { $pull: { "cities": cityName } }, (err, data) => {
        if (err) throw err;
        res.json(data)
    })
})

app.get('/showAllCities/:alphabet', (req, res) => {
    const stateCollection = db.collection('state');
    const alphabet = req.params.alphabet;
    stateCollection.find().toArray((err, data) => {
        if (err) throw err;
        let result = [];
        for (let i = 0; i < data.length; i++) {
            const cities = data[i].cities;
            const cityLen = cities.length
            for (let j = 0; j < cityLen; j++) {
                if (cities[j].charAt(0) == alphabet.toUpperCase()) {
                    result.push(cities[j])
                }
            }
        }
        res.send(result);
        // Throwing error if nested loops are used;
    })
})


app.get('/state/:cityName', (req, res) => {
    const cityName = req.params.cityName;
    const stateCollection = db.collection('state');
    stateCollection.findOne({ "cities": cityName }, (err, data) => {
        if (err) throw err;
        const stateName = data.state;
        res.json(stateName);
    })
})

app.get('/findFrequentState', (req, res) => {
    res.sendFile(__dirname + '/freqState.html')
})




app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`)
})