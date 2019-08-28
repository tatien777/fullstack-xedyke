const express = require('express');

const app = express();
const mongoose = require('mongoose');
const userRouter = require('./Routes/API/user/index');
const tripRouter = require('./Routes/API/trip/index')

mongoose.connect('mongodb://localhost:27017/xedike',{userNewUrlParser:true})
.then(()=> console.log('connected sucessfull '))
.catch(err => console.log(err))

// public
app.use('/',express.static('public'))

//middleware 
app.use(express.urlencoded({extended: true}))
app.use(express.json())
// middlewarae serve static files 
app.use('/uploads/avartas',express.static('./uploads/avartas'))

// test 

// router handler 
app.use('/api/users',userRouter)
app.use('/api/trips', tripRouter) /// call api trip 
const port = process.env.PORT || 5000 // lay post cua process hoac 5000 



app.listen(port,()=>{
    console.log(`App running on port ${port} `)
})