const express = require('express');
const app = express();
const path = './mocks/users.json';
const data = require(path);
const fs = require('fs');


app.use(express.json());

//METHODS HTTP
//get all users
app.get('/users', (req, res) => {
    return res.json(data)
});

//get one user
app.get('/users/:id', (req, res) => {
    const {id} = req.params;
    const user = data.find( user => user.id == id);

    if(!user) return res.status(204).json();
    
    return res.json(user);
});

//store user
app.post('/users', (req, res) => {
    let user = req.body;
    
    //save
    let newData = readJSON(path);

    user.id = newData.length + 1;
    newData.push(user);

    writeJSON(path, newData);
    
    return res.json(newData);
});

//update client = we can only change name and email for now
app.put('/users/:id', (req, res) => {
    const {id} = req.params;
    const user = data.find( user => user.id == id);
    const { name, email } = req.body;

    if(!user) return res.status(204).json();

    if (name) user.name = name;
    if (email) user.email = email;
    let newData = readJSON(path);

    //TODO find a simpler way to do this
    newData = newData.filter(u => u.id !== user.id);
    newData.push(user);
    writeJSON(path, newData);

    return res.json(newData) ;
});

//destroy user
app.delete('/users/:id', (req, res) => {
    const {id} = req.params;
    const user = data.find( user => user.id == id);

    if(!user) return res.status(204).json();

    newData = readJSON(path);
    newData = newData.filter(u => u.id !== user.id);
    writeJSON(path, newData);

    return res.json(newData);    
});


app.listen(3333);


//SUPPORT METHODS
const readJSON = (fromFilePath) => {
    return JSON.parse(fs.readFileSync(fromFilePath).toString());
}

const writeJSON = (toFilePath, data) => {
    fs.writeFile(toFilePath, JSON.stringify(data), (err) => {
        if (err) {
            console.log('error: ', err)
        }
    });
}