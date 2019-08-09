const express = require('express')

const router = express.Router();
// host: localhost:5000/xedike/  || xedike.heroku.com/
// route: GET {host}/api/users/



const {User} = require('../../Models/User')
const bycrypt = require('bcryptjs')
// desc : get list of  users 
// method:get
// access: PUBLIC 
router.get('/api/users',(req,res,next) => {
     User.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => res.json({err: 'error connect api'}))
})

// desc : create new  user
// method: post 
// access: PUBLIC 
router.post('/api/users',(req,res,next)=>{
    // validation 
    // data = req.body
    const {email,password,DOB,userType,phone} = req.body;
    const newUser = new User({
        email,password,DOB,userType,phone
    })
    // hash password 
    bycrypt.genSalt(10,(err,salt)=>{
        if(err) return res.json(err)
        bycrypt.hash(password,salt,(err,hash)=>{
            if(err) return res.json(err)
            newUser.password = hash
            newUser.save()
            .then(user =>{
                res.status(200).json(user)
            })
            .catch(err => res.json(err))
        })
    }) 
   
})

module.exports = router;
