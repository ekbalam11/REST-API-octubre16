const express = require('express');
const dotenv = require('dotenv')
const fs = require('fs');
dotenv.config();

const app = express();

// Middleware to process POST request with express for JSON
app.use(express.json());


app.post('/users', (req, res) => {

    const { name, surname } = req.body;
    const newUser = `${name},${surname}\n`
    fs.appendFileSync("users.txt", newUser);

    res.status(201).json({
        "message": "User added successfully",
        "user": req.body
    })
});

app.get('/users', (req, res) => {
    function readFileLineByLine() {
        const data = fs.readFileSync('users.txt', 'utf-8');
        console.log("🚀 ~ readFileLineByLine ~ data:", data)
        const lines = data.split('\n');
        console.log("🚀 ~ readFileLineByLine ~ lines:", lines)
        lines.pop();
        return lines;
    }

    const namesRawDataBase = readFileLineByLine()

    const usersDB = namesRawDataBase.map(name => {
        const user = name.split(',');
        return {
            name: user[0],
            surname: user[1]
        };
    })
    console.log("🚀 ~ usersDB ~ usersDB:", usersDB)

    const { name } = req.query;

    // const query = {
    //     name:name
    // };
    const filteredName = usersDB.find(user => user.name == name
)
    if(usersDB[1].includes(filteredName)) {

    res.status(201).json({
        message: "GET req executed succesfully",
        result: usersDB
    })
} else {
    res.status(201).json({
        message: "petamos!",
    }) 
}
})


//---------------------Server config

const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
    console.log("Server listening correctly in port: " + PORT);   
});

