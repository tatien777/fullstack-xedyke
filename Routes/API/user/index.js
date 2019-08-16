const express = require('express');
const router = express.Router();
const userController = require('./controller')
const jwt = require('jsonwebtoken')
// uploadImage 
const {uploadImage} = require('../../../middlewares/uploadImage');
/// GET {host}/api/users (da viet)
/// GET {host}/api/users/:id 
/// POST {host}/api/users/ (da viet)
/// UPDATE {host}/api/users/:id
/// DELETE {host}/api/users/:id 

const authenticate = (req, res, next) => {
    const { token } = req.headers;
    jwt.verify(token, "XEDIKE", (err, decoded) => {
      if (err) return res.status(401).json({ message: "Token invalid" })
      if (decoded) {
        req.user = decoded;  
        return next()
      }
      console.log(req.user)
    })
  }
  
  const authorize = (userTypeArr) => {
    return (req, res, next) => {
        // if(userType===req.user.userType) return next() // string 
        if(userTypeArr.findIndex(userType => userType === req.user.userType) !== -1) return next()
        res.status(403).json({
          message: 'Logged in, but do not have permission'
        }) 
    }
}

router.get('/',userController.getUsers)



router.get('/:id',userController.getUsersById) // PUBLIC
router.post('/',userController.createUser) // PUBLIC
router.put('/:id',authenticate,authorize(['driver','passeger']),userController.updateUserById)// PRIVATE
router.delete('/:id',authenticate,authorize(['admin']),userController.deleteUserById) 

router.post('/login',userController.login)
router.post('/upload-avartas/:id',authenticate,authorize(['driver','passeger']),uploadImage('avarta'),userController.uploadAvarta)
module.exports = router;
// export 
