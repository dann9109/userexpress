const router = require('express').Router();
const { v4 } = require('uuid');


const { getUserData, saveUserData } = require('../db');


// Route to add a user to the json database
router.post('/users', async (requestObj, responseObj) => {
    // Get the old users array
    const users = await getUserData();
    const userData = requestObj.body;
    // // Push the body object from the client to our old array
    // users.push(requestObj.body);

    // Overwrite the old array with the newly updated array
    await saveUserData(users);
    if (!users.find(user => user.username === userData.username) && userData.username) {

        userData.id = v4();

        users.push(userData)

        await saveUserData(users);
    }

    // Respond back to the client
    responseObj.send({
        message: 'User added successfully!'
    })
});



// GET ROUTE TO Return a user by id
router.get('/users/:id', async (requestObj, responseObj) => {

    const users = await getUserData();
    const id = requestObj.params.id
    const user = users.find(user => user.id === id)


    console.log(requestObj.params);

    if (user) {
        return responseObj.send(user);

    }

    responseObj.send({
        error: 404,
        message: 'id not found'
    })

})

// Route to retreive/GET all users from the json database
router.get('/users', async (requestObj, responseObj) => {
    // Read the json file data
    const users = await getUserData();

    responseObj.send(users);
});


router.delete('/user/:id', async (requestObj, responseObj) => {


    const users = await getUserData();
    const user_id = requestObj.params.id

    // find the user in the users array matching the param id
    const user = users.find(userObj => userObj.id === user_id);


    const index = users.indexOf(user);

    // splice the users array, starting at the index of the user object matching the id from our paramater
    users.splice(index, 1);

    // Overwrite the old array with the updated array
    await saveUserData(users);


    responseObj.send({
        message: 'User deleted successfully'
    })
});

module.exports = router;