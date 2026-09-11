const mongoose =require('mongoose')

function mongodbconfig(){
    return mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log('mongodb connected')
    }).catch((error)=>
    {
        console.log('mongodb connection error:', error)
    })
}

module.exports= mongodbconfig