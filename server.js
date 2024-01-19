const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = 3333;

const app = express();

async function getUserData() {
    const users = await fs.promises.readFile('./data.json', 'utf8');

    return JSON.parse(users);
}

async function saveUserData(usersArr) {
    await fs.promises.writeFile('./data.json', JSON.stringify(usersArr, null, 2));
    
    console.log('User Data Updated');
}

// Opening up the middleware channel to allow json to be sent through from the client
app.use(express.json());

// Route to retreive/GET all users from the json database
app.get('/api/users', async (requestObj, responseObj) => {
    // Read the json file data
    const users = await getUserData();
    
    responseObj.send(users);
});

// Route to add a user to the json database
app.post('/api/users', async (requestObj, responseObj) => {
    // Get the old users array
    const users = await getUserData();
    
    // // Push the body object from the client to our old array
    // users.push(requestObj.body);
    
    // Overwrite the old array with the newly updated array
    await saveUserData(users);
    if(!users.find(user => user.username === requestObj.body.username) && requestObj.body.username){
        users.push(requestObj.body)
    
        await saveUserData(users);
    }
    
    // Respond back to the client
    responseObj.send({
        message: 'User added successfully!'
    })
});

app.listen(PORT, () => {
    console.log('Server started on port', PORT);
});

// app.get('/test', (req, res) => {
    //     res.send('Hi from the server')
    // })
    
    
    // app.get('/', (req, res) => {
//     res.send('root visited');
// })


// app.get('/api/recipe', (req, res) => {
    //     res.send({
        //         name: 'mac&cheese',
        //         ingredients: ['cheese', 'pasta', 'heavy cream']
        //     });
        // })

// app.get('/page', (req, res) => {
//     res.sendFile(path.join(__dirname, './index.html'));
// })

// app.use((req, res) => {
//     res.sendFile(path.join(__dirname, '/notfound.html'))
// })

