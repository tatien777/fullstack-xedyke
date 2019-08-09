const express = require('express');

const app = express();
const mongoose = require('mongoose');
const userRouter = require('./Routes/API/user');

mongoose.connect('mongodb://localhost:27017/xedike',{userNewUrlParser:true})
.then(()=> console.log('connected sucessfull '))
.catch(err => console.log(err))

//middleware 
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// test 
// app.use((req,res,next) =>{
//     console.log('miidleware 1')
//     next()
// },(req,res,next) =>{
//     console.log('miidleware 2')
//     next()
// },(req,res,next) =>{
//     console.log('miidleware 3')
//     next()
// })
// router handler 
app.use('/',userRouter)
const port = process.env.PORT || 5000 // lay post cua process hoac 5000 



app.listen(port,()=>{
    console.log(`App running on port ${port} `)
})