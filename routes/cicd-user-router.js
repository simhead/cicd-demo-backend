const express = require('express')

const CicdUserCtrl = require('../controllers/cicd-user-ctrl')

const router = express.Router()

router.post('/user', CicdUserCtrl.createUser)
router.put('/user/:id', CicdUserCtrl.updateUser)
router.delete('/user/:id', CicdUserCtrl.deleteUser)
router.get('/user/:id', CicdUserCtrl.getUserById)
router.get('/users', CicdUserCtrl.getUsers)

module.exports = router