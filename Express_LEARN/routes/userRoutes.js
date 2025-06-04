const express = require('express');

const router = express.Router();
const {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

router.post('/createuser' , createUser);
router.get('/getall' , getUsers);
router.get('/getone/:id' , getUser);
router.put('/putuser/:id' , updateUser);
router.delete('/deleteuser/:id' , deleteUser);

module.exports = router;