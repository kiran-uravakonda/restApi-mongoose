var express=require('express');
var app=express()
var mongoose=require('mongoose');
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var router=require('./data/router.js')
var data=require('./data/dishes.js')
var url='mongodb://localhost:27017';

app.use('/data',router)
mongoose.connect(url).then((result)=>{
    console.log("database connected successfully")
})
.catch((err)=>{
    console.log(err)
})




app.listen(3000,()=>{
    console.log("server running on 3000 port")
})