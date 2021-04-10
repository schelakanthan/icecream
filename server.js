require('dotenv').config()
const express =require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')

const { reg } = require('./controllers/userCtrl')
const app =express()


app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({useTempFiles:true}))


//routing
// app.post('/',(req,res)=>{
//     res.json('DB routed Sucessfull')
// })
app.use('/user',require('./routes/userRouter'))
app.use('/api',require('./routes/categoryRouter'))
app.use('/api',require('./routes/upload'))
app.use('/api',require('./routes/productRouter'))
app.use('/api',require('./routes/paymentRouter'))


// Connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
})


//mongo db connection
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log('zujans Server live on '+PORT)
})
