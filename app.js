const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const opn = require('opn');


const app = express('express');
const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/index2', (req, res) => {
    res.sendFile(__dirname + '/index2.html');
})
app.get('/index3', (req, res) => {
    res.sendFile(__dirname + '/index3.html');
})
app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})


app.post('/register', (req, res) => {
    let userName = JSON.parse(Object.keys(req.body)).username;
    let userPassword = JSON.parse(Object.keys(req.body)).password;
    let data = `${userName}:${userPassword}`;

    if (userExist(userName) == false) {
        fs.appendFile('user.txt', data + '\n', (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Користувач зареєстрований');
                
            }
        });
    } else {
        console.log('Імя вже зайнято');
    }
})



function userExist(username) {
    let existRes = false;
    const data = fs.readFileSync('user.txt', 'utf-8');
    const users = data.split(`\n`);

    for (let user of users) {
        if (user.length > 0) {
            if (user.split(':')[0] == username) {
                existRes = true
            }
        }
    }

    return existRes;
}

app.listen(PORT, () => {
    console.log(`Server work on port: ${PORT}`);

})







app.post('/submit', (req, res) => {
    let data = req.body;
    let date = new Date();

    let msg = `Замовллення на сайті: ${date.toLocaleString()} | ${JSON.stringify(data)}\n`;

    fs.appendFile(`orders.txt`, msg, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Замовлення збережено`)
        }
    })
    res.send(data);
})





