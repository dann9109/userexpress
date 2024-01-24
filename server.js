const express = require('express');



const fs = require('fs');
const cors = require('cors');




// db.query('SELECT * FROM users', (err, results) =>{
//     if(err) return console.log(err);

//     console.log(results);
// })

// db.query('INSERT INTO users (username, email, password) VALUES ("dan", "dan@test.com", "pass123")', (err, results)=>{
//     if(err) return console.log(err);

//     console.log(results);
// });

const PORT = 3333;

const app = express();

const api_routes = require('./routes/api_routes');





// Opening up the middleware channel to allow json to be sent through from the client
app.use(express.json());




app.use(express.static('./public'));

// opens cors to all domains
app.use(cors());
// app.get('/', (requestObj, responseObj) =>{
//  responseObj.sendFile(path.join(__dirname, './public/index.html')) 
// });

// app.get('/css/style.css', (requestObj, responseObj) =>{
//     responseObj.sendFile(path.join(__dirname, './public/css/style.css'))
// })




// Load Routes
app.use('/api', api_routes);

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

