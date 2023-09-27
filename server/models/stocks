const{ Schema,model} = require("mongoose")

const stockSchema = new Schema({
    symbol:{
        type:String,
        required:true,
        unique:true,
        primaryKey:true
    },
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

const Stock = model("Stock",stockSchema)

module.exports = Stock;
