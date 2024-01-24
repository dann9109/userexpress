const router = require('express').Router();
// const { v4 } = require('uuid');

const db = require('../db/connection')
// const { getUserData, saveUserData } = require('../db');


// Route to add a user to the json database
router.post('/users', async (requestObj, responseObj) => {
    // Get the old users array
    // const users = await getUserData();
    const userData = requestObj.body;
    // // Push the body object from the client to our old array
    // users.push(requestObj.body);

    try {
        const [results] = await db.query('SELECT * FROM users WHERE username = ?', [userData.username]);


        if (results.length) {
            return responseObj.json({
                error: 402,
                message: 'That user already exists'
            })
        }




        const [data] = await db.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [userData.username, userData.email, userData.password],);

        responseObj.json({
            message: 'User added successfully',
            insertId: data.insertId
        })

    } catch (err) {
        console.log(err);
    }


    // responseObj.send({
    //     error: 402,
    //     message: 'User alreadye xists'
    // })
    // Overwrite the old array with the newly updated array
    // await saveUserData(users);
    // if (!users.find(user => user.username === userData.username) && userData.username) {

    //     userData.id = v4();

    //     users.push(userData)

    //     await saveUserData(users);
    // }

    // Respond back to the client
    // responseObj.send({
    //     message: 'User added successfully!'
    // })
});



// GET ROUTE TO Return a user by id
router.get('/users/:id', async (requestObj, responseObj) => {



    try {
        const userId = requestObj.params.id;
        const [user] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);


        if (user.length) {
            return responseObj.json(user[0]);
        }

        responseObj.json({
            error: 402,
            message: 'User not found with that ID'
        })
    } catch (err) {
        console.log(err);
        responseObj.status(500).json({ error: 'Internal Server Error' });
    }


});





// if (user) {
//     return responseObj.send(user);

// }

// responseObj.send({
//     error: 404,
//     message: 'id not found'
// })

// })

// Route to retreive/GET all users from the json database
router.get('/users', async (requestObj, responseObj) => {
    // Read the json file data

    try {
        const [users] = await db.query('SELECT * FROM users');

        responseObj.json(users);
    } catch (err) {
        console.log(err);
    }



    // responseObj.send(users);
});


// router.delete('/user/:id', async (requestObj, responseObj) => {


//     const users = await getUserData();
//     const user_id = requestObj.params.id

//     // find the user in the users array matching the param id
//     const user = users.find(userObj => userObj.id === user_id);


//     const index = users.indexOf(user);

//     // splice the users array, starting at the index of the user object matching the id from our paramater
//     users.splice(index, 1);

//     // Overwrite the old array with the updated array
//     await saveUserData(users);


//     responseObj.send({
//         message: 'User deleted successfully'
//     })
// });


router.delete('/user/:id', async (requestObj, responseObj) => {


    try {
        const user_id = requestObj.params.id;

        // Delete the user from the database using SQL DELETE statement
        const deleteQuery = `DELETE FROM users WHERE id = ${user_id}`;
        await db.query(deleteQuery);

        responseObj.send({
            message: 'User deleted successfully'
        });
    } catch (error) {
        responseObj.status(500).send({
            error: 'An error occurred while deleting the user'
        });
    }
});



module.exports = router;