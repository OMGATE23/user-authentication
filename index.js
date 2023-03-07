const express = require("express");
const app = express();
const userRoute = require('./routes/user')
const connectToDB = require('./config/db')
require('dotenv').config()

connectToDB()
app.use(express.json())

app.use('/user' , userRoute)

app.listen(process.env.PORT, () => {
  console.log("Server is running on port" , process.env.PORT);
});


app.get('/' , (req,res) => {
    res.send('<h1>Home Page</h1>')
})
